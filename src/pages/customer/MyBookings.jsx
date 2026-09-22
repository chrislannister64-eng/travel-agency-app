import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { useMyBookings } from '../../hooks/useMyBookings'

const statusColor = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'default',
}

export default function MyBookings() {
  const { user } = useAuth()
  const { bookings, loading } = useMyBookings(user?.uid)

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>My bookings</Typography>

      {loading && <CircularProgress />}

      {!loading && bookings.length === 0 && (
        <Typography color="text.secondary">
          You haven't booked anything yet — browse packages to get started.
        </Typography>
      )}

      <Stack spacing={2}>
        {bookings.map((b) => (
          <Card key={b.id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                <div>
                  <Typography variant="h6">{b.packageSnapshot?.title || 'Package'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {b.numTravelers} traveler{b.numTravelers !== 1 ? 's' : ''} ·{' '}
                    {b.packageSnapshot?.currency} {Number(b.packageSnapshot?.price || 0).toLocaleString()} each
                  </Typography>
                </div>
                <Stack spacing={0.5} alignItems="flex-end">
                  <Chip
                    size="small"
                    label={b.status}
                    color={statusColor[b.status] || 'default'}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Payment: {b.paymentStatus}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
