import { doc, updateDoc } from 'firebase/firestore'
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { db } from '../../lib/firebase'
import { useAllBookings } from '../../hooks/useAllBookings'

const statusColor = { pending: 'warning', confirmed: 'success', cancelled: 'default' }

export default function Bookings() {
  const { bookings, loading } = useAllBookings()

  async function handleStatusChange(bookingId, status) {
    await updateDoc(doc(db, 'bookings', bookingId), { status })
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>OPERATIONS / CUSTOMER JOURNEYS</Typography>
        <Typography variant="h3" sx={{ mt: 0.5, mb: 1 }}>All bookings</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Every booking across all customers. Status can be overridden manually —
        useful if a payment needs manual review.
      </Typography>
      </Box>

      {loading && <CircularProgress />}

      {!loading && bookings.length === 0 && (
        <Typography color="text.secondary">No bookings yet.</Typography>
      )}

      {!loading && bookings.length > 0 && (
        <Paper elevation={0} sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 720 }}>
            <TableHead sx={{ bgcolor: 'primary.dark' }}>
              <TableRow>
                {['Customer', 'Package', 'Travelers', 'Payment', 'Status'].map((heading) => <TableCell key={heading} sx={{ color: 'white', fontWeight: 700 }}>{heading}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell>
                    <Typography variant="body2">{b.customerName || '—'}</Typography>
                    <Typography variant="caption" color="text.secondary">{b.customerEmail}</Typography>
                  </TableCell>
                  <TableCell>{b.packageSnapshot?.title}</TableCell>
                  <TableCell>{b.numTravelers}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={b.paymentStatus}
                      color={b.paymentStatus === 'paid' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    >
                      <MenuItem value="pending">
                        <Chip size="small" label="pending" color={statusColor.pending} />
                      </MenuItem>
                      <MenuItem value="confirmed">
                        <Chip size="small" label="confirmed" color={statusColor.confirmed} />
                      </MenuItem>
                      <MenuItem value="cancelled">
                        <Chip size="small" label="cancelled" color={statusColor.cancelled} />
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  )
}