import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { usePackage } from '../../hooks/usePackage'
import { useAuth } from '../../context/AuthContext'
import { payWithPaystack } from '../../lib/paystack'

export default function Booking() {
  const { packageId } = useParams()
  const { pkg, loading } = usePackage(packageId)
  const { user } = useAuth()
  const navigate = useNavigate()

  const [travelers, setTravelers] = useState('1')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle') // idle | processing | verifying | error
  const [error, setError] = useState('')

  if (loading) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!pkg) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5">Package not found</Typography>
      </Container>
    )
  }

  const travelerCount = Number(travelers)
  const totalAmount = Number(pkg.price) * (Number.isInteger(travelerCount) && travelerCount > 0 ? travelerCount : 0)

  async function handlePay(e) {
    e.preventDefault()
    setError('')

    if (!Number.isInteger(travelerCount) || travelerCount < 1) {
      setError('Enter at least 1 traveler.')
      return
    }

    setStatus('processing')

    try {
      // 1. Create the booking as "pending" BEFORE payment. This gives us a
      // record even if the user closes the tab mid-payment, and a stable
      // ID to tie the Paystack reference to.
      const bookingRef = await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        packageId: pkg.id,
        packageSnapshot: { title: pkg.title, price: pkg.price, currency: pkg.currency },
        numTravelers: travelerCount,
        phone,
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: serverTimestamp(),
      })

      const reference = `${bookingRef.id}-${Date.now()}`

      // 2. Open Paystack. amount is in kobo (smallest unit) — hence * 100.
      await payWithPaystack({
        email: user.email,
        amountKobo: totalAmount * 100,
        reference,
        onSuccess: async (response) => {
          setStatus('verifying')
          try {
            // 3. NEVER trust the client-side "success" callback alone —
            // it can be spoofed. The Vercel API verifies the transaction
            // server-side before we mark it paid.
            const idToken = await user.getIdToken()
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                bookingId: bookingRef.id,
                reference: response.reference || response.trxref,
              }),
            })

            const verifyData = await verifyResponse.json()
            if (!verifyResponse.ok || !verifyData.verified) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            navigate('/my-bookings')
          } catch (err) {
            console.error(err)
            setError('Payment succeeded but verification failed. Contact support with reference: ' + reference)
            setStatus('error')
          }
        },
        onClose: () => {
          if (status !== 'verifying') setStatus('idle')
        },
      })
    } catch (err) {
      console.error(err)
      setError('Something went wrong creating your booking. Please try again.')
      setStatus('error')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Book your trip</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>{pkg.title} · {pkg.destination}</Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <form onSubmit={handlePay}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of travelers"
                type="number"
                fullWidth
                required
                inputProps={{ min: 1 }}
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                onBlur={() => {
                  if (!travelers || Number(travelers) < 1) setTravelers('1')
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone number"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary">Total</Typography>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            {pkg.currency} {totalAmount.toLocaleString()}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={status === 'processing' || status === 'verifying'}
          >
            {status === 'processing' && 'Opening payment…'}
            {status === 'verifying' && 'Confirming payment…'}
            {(status === 'idle' || status === 'error') && `Pay ${pkg.currency} ${totalAmount.toLocaleString()}`}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
