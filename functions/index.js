const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https')
const { setGlobalOptions } = require('firebase-functions/v2')
const admin = require('firebase-admin')
const https = require('https')

admin.initializeApp()
setGlobalOptions({ maxInstances: 10 })

const db = admin.firestore()

// Paystack secret key — set with:
//   firebase functions:secrets:set PAYSTACK_SECRET_KEY
// Never hardcode it, never send it to the client.
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

function verifyWithPaystack(reference) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.paystack.co',
        path: `/transaction/verify/${encodeURIComponent(reference)}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (err) {
            reject(err)
          }
        })
      },
    )
    req.on('error', reject)
    req.end()
  })
}

// Called by the client right after Paystack's popup reports success.
// This is the ONLY place a booking is allowed to flip to "paid" from a
// client-triggered call — and even here, we re-check with Paystack's
// servers using the secret key rather than trusting the client's word.
exports.verifyPayment = onCall({ secrets: ['PAYSTACK_SECRET_KEY'] }, async (request) => {
  const { bookingId, reference } = request.data
  if (!request.auth) throw new HttpsError('unauthenticated', 'Must be logged in.')
  if (!bookingId || !reference) throw new HttpsError('invalid-argument', 'Missing bookingId or reference.')

  const bookingRef = db.collection('bookings').doc(bookingId)
  const bookingSnap = await bookingRef.get()
  if (!bookingSnap.exists) throw new HttpsError('not-found', 'Booking not found.')

  const booking = bookingSnap.data()
  if (booking.userId !== request.auth.uid) {
    throw new HttpsError('permission-denied', 'This booking does not belong to you.')
  }

  const result = await verifyWithPaystack(reference)
  const expectedAmountKobo = Math.round(booking.packageSnapshot.price * booking.numTravelers * 100)

  if (result.status && result.data?.status === 'success' && result.data.amount === expectedAmountKobo) {
    await bookingRef.update({
      status: 'confirmed',
      paymentStatus: 'paid',
      paystackRef: reference,
      amountPaid: result.data.amount / 100,
    })
    await db.collection('payments').add({
      bookingId,
      userId: request.auth.uid,
      reference,
      amount: result.data.amount / 100,
      status: 'success',
      paystackResponse: result.data,
      verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    return { verified: true }
  }

  throw new HttpsError('failed-precondition', 'Payment could not be verified.')
})

// Backup path: Paystack calls this directly when a transaction completes,
// independent of whether the client ever calls verifyPayment above (e.g.
// user closed the tab right after paying). Configure this URL in your
// Paystack dashboard under Settings > API Keys & Webhooks.
exports.paystackWebhook = onRequest({ secrets: ['PAYSTACK_SECRET_KEY'] }, async (req, res) => {
  const crypto = require('crypto')
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex')

  if (hash !== req.headers['x-paystack-signature']) {
    res.status(401).send('Invalid signature')
    return
  }

  const event = req.body
  if (event.event === 'charge.success') {
    const reference = event.data.reference
    // reference was created client-side as `${bookingId}-${timestamp}`
    const bookingId = reference.split('-')[0]
    const bookingRef = db.collection('bookings').doc(bookingId)
    const bookingSnap = await bookingRef.get()

    if (bookingSnap.exists && bookingSnap.data().paymentStatus !== 'paid') {
      await bookingRef.update({
        status: 'confirmed',
        paymentStatus: 'paid',
        paystackRef: reference,
        amountPaid: event.data.amount / 100,
      })
      await db.collection('payments').add({
        bookingId,
        userId: bookingSnap.data().userId,
        reference,
        amount: event.data.amount / 100,
        status: 'success',
        paystackResponse: event.data,
        verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }
  }

  res.status(200).send('ok')
})

// One-time-use function to promote a user to admin. Call it manually
// (e.g. via the Firebase Functions shell) — there is deliberately no
// UI button for this, since admin status must never be client-settable.
exports.setAdminClaim = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Must be logged in.')
  // TODO: before using this in production, restrict who can call it —
  // e.g. check request.auth.token.email against a hardcoded allowlist,
  // or remove this function after promoting your first admin manually.
  const { targetUid } = request.data
  await admin.auth().setCustomUserClaims(targetUid, { admin: true })
  return { success: true }
})
