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
  Box,
} from '@mui/material'
import { useAllPayments } from '../../hooks/useAllPayments'

export default function Payments() {
  const { payments, loading } = useAllPayments()
  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0)

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
      <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>FINANCE / AUDIT TRAIL</Typography>
      <Typography variant="h3" sx={{ mt: 0.5, mb: 1 }}>Payments</Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        Every payment verified server-side via Cloud Functions — these records
        are never written directly by a client, so this list is the audit trail.
      </Typography>
      <Paper elevation={0} sx={{ display: 'inline-block', p: 2.5, mb: 4, bgcolor: 'primary.dark', color: 'white' }}>
        <Typography variant="overline" sx={{ opacity: 0.75, letterSpacing: '0.14em' }}>TOTAL VERIFIED</Typography>
        <Typography variant="h4">{total.toLocaleString()}</Typography>
      </Paper>
      </Box>

      {loading && <CircularProgress />}

      {!loading && payments.length === 0 && (
        <Typography color="text.secondary">
          No payments yet — this fills in once bookings are paid for and verified
          by the verifyPayment Cloud Function.
        </Typography>
      )}

      {!loading && payments.length > 0 && (
        <Paper elevation={0} sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 640 }}>
            <TableHead sx={{ bgcolor: 'primary.dark' }}>
              <TableRow>
                {['Reference', 'Booking ID', 'Amount', 'Status'].map((heading) => <TableCell key={heading} sx={{ color: 'white', fontWeight: 700 }}>{heading}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id} hover>
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