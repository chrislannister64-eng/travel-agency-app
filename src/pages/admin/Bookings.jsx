import { doc, updateDoc } from 'firebase/firestore'
import {
  Container,
  Typography,
  Paper,
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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>All bookings</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Every booking across all customers. Status can be overridden manually —
        useful if a payment needs manual review.
      </Typography>

      {loading && <CircularProgress />}

      {!loading && bookings.length === 0 && (
        <Typography color="text.secondary">No bookings yet.</Typography>
      )}

      {!loading && bookings.length > 0 && (
        <Paper sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Travelers</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
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