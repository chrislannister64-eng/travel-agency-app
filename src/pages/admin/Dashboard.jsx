import { Link as RouterLink } from 'react-router-dom'
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box, Stack } from '@mui/material'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const tiles = [
  { label: 'Packages', desc: 'Add, edit, archive tour packages', to: '/admin/packages', icon: Inventory2OutlinedIcon, color: 'primary' },
  { label: 'Bookings', desc: 'View all bookings, override status', to: '/admin/bookings', icon: LuggageOutlinedIcon, color: 'secondary' },
  { label: 'Payments', desc: 'Reconcile verified payments', to: '/admin/payments', icon: PaymentsOutlinedIcon, color: 'success' },
]

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>VOYAGE / CONTROL ROOM</Typography>
        <Typography variant="h3" sx={{ mt: 0.5, mb: 1 }}>Good to see you, admin.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620 }}>Keep your destinations fresh, monitor customer journeys, and stay on top of verified payments.</Typography>
      </Box>
      <Grid container spacing={3}>
        {tiles.map((tile) => (
          <Grid item xs={12} md={4} key={tile.label}>
            <Card sx={{ height: '100%', overflow: 'hidden' }}>
              <CardActionArea component={RouterLink} to={tile.to}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                    <Box sx={{ width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: 3, bgcolor: `${tile.color}.light`, color: `${tile.color}.dark` }}>
                      <tile.icon />
                    </Box>
                    <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
                  </Stack>
                  <Typography variant="h5" sx={{ mb: 1 }}>{tile.label}</Typography>
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