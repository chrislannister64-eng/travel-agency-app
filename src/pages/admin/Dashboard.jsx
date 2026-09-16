import { Link as RouterLink } from 'react-router-dom'
import { Container, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material'

const tiles = [
  { label: 'Packages', desc: 'Add, edit, archive tour packages', to: '/admin/packages' },
  { label: 'Bookings', desc: 'View all bookings, override status', to: '/admin/bookings' },
  { label: 'Payments', desc: 'Reconcile verified payments', to: '/admin/payments' },
]

export default function Dashboard() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Admin dashboard</Typography>
      <Grid container spacing={3} sx={{ maxWidth: 800 }}>
        {tiles.map((tile) => (
          <Grid item xs={12} sm={4} key={tile.label}>
            <Card>
              <CardActionArea component={RouterLink} to={tile.to}>
                <CardContent>
                  <Typography variant="h6">{tile.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{tile.desc}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}