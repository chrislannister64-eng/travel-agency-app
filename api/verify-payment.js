import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      })

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  const { bookingId, reference } = req.body
  const authorization = req.headers.authorization || ''
  const idToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : ''

  if (!bookingId || !reference || !idToken) {
    return res.status(400).json({
      error: 'bookingId, reference, and authentication are required',
    })
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken)

    // 1. Find the booking in Firestore
    const bookingRef = db.collection('bookings').doc(bookingId)
    const bookingSnap = await bookingRef.get()

    if (!bookingSnap.exists) {
      return res.status(404).json({
        error: 'Booking not found',
      })
    }

    const booking = bookingSnap.data()
    if (booking.userId !== decodedToken.uid) {
      return res.status(403).json({
        error: 'You are not allowed to verify this booking',
      })
    }

    // 2. Verify the payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Paystack verification failed',
      })
    }

    // 3. Make sure Paystack says the payment succeeded
    if (!data.status || data.data?.status !== 'success') {
      return res.status(400).json({
        error: 'Payment was not successful',
      })
    }

    // 4. Calculate what the customer SHOULD have paid
    const expectedAmountKobo = Math.round(
      Number(booking.packageSnapshot.price) *
      Number(booking.numTravelers) *
      100
    )

    // 5. Compare Paystack's actual amount with our expected amount
    if (data.data.amount !== expectedAmountKobo) {
      return res.status(400).json({
        error: 'Payment amount does not match booking amount',
      })
    }

    // 6. Make sure we don't process the same booking twice
    if (booking.paymentStatus === 'paid') {
      return res.status(200).json({
        verified: true,
        message: 'Payment was already verified',
      })
    }

    // 7. Mark booking as paid
    await bookingRef.update({
      status: 'confirmed',
      paymentStatus: 'paid',
      paystackRef: reference,
      amountPaid: data.data.amount / 100,
    })

    // 8. Save a payment record
    await db.collection('payments').add({
      bookingId,
      userId: booking.userId,
      reference,
      amount: data.data.amount / 100,
      status: 'success',
      paystackResponse: data.data,
      verifiedAt: new Date(),
    })

    return res.status(200).json({
      verified: true,
    })
  } catch (error) {
    console.error('Payment verification error:', error)

    return res.status(500).json({
      error: 'Unable to verify payment',
    })
  }
}