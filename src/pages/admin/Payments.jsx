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
  CircularProgress,
} from '@mui/material'
import { useAllPayments } from '../../hooks/useAllPayments'

export default function Payments() {
  const { payments, loading } = useAllPayments()
  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0)

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Payments</Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        Every payment verified server-side via Cloud Functions — these records
        are never written directly by a client, so this list is the audit trail.
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Total verified: {total.toLocaleString()}
      </Typography>

      {loading && <CircularProgress />}

      {!loading && payments.length === 0 && (
        <Typography color="text.secondary">
          No payments yet — this fills in once bookings are paid for and verified
          by the verifyPayment Cloud Function.
        </Typography>
      )}

      {!loading && payments.length > 0 && (
        <Paper sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Booking ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {p.reference}
                    </Typography>
                  </TableCell>
                  <TableCell>{p.bookingId}</TableCell>
                  <TableCell>{Number(p.amount).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip size="small" label={p.status} color="success" />
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