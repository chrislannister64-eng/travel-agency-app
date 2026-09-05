import { Link as RouterLink } from 'react-router-dom'
import { Container, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material'

const tiles = [
  { label: 'Packages', desc: 'Add, edit, archive tour packages', to: '/admin/packages', enabled: true },
  { label: 'Bookings', desc: 'View and manage all bookings', to: '#', enabled: false },
  { label: 'Payments', desc: 'Reconcile payments against Paystack', to: '#', enabled: false },
]

export default function Dashboard() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Admin dashboard</Typography>
      <Grid container spacing={3} sx={{ maxWidth: 800 }}>
        {tiles.map((tile) => (
          <Grid item xs={12} sm={4} key={tile.label}>
            <Card sx={{ opacity: tile.enabled ? 1 : 0.5 }}>
              <CardActionArea
                component={tile.enabled ? RouterLink : 'div'}
                to={tile.enabled ? tile.to : undefined}
                disabled={!tile.enabled}
              >
                <CardContent>
                  <Typography variant="h6">{tile.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tile.enabled ? tile.desc : 'Coming soon'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
