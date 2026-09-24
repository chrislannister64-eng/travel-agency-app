import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Card, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useSavedTrips } from '../../hooks/useSavedTrips'

export default function SavedTrips() {
  const { savedTrips, toggleSavedTrip } = useSavedTrips()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ maxWidth: 680, mb: 5 }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
          YOUR TRAVEL NOTEBOOK
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>Plan a trip at your own pace.</Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          Save the journeys that catch your eye, compare the details and come back when you are ready to make them real.
        </Typography>
      </Box>

      {savedTrips.length === 0 ? (
        <Card sx={{ p: { xs: 2, md: 5 }, bgcolor: 'primary.light' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1 }}>Your notebook is empty</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Browse our curated journeys and save your favourites here.
            </Typography>
            <Button component={RouterLink} to="/packages" variant="contained" endIcon={<ArrowForwardIcon />}>
              Explore journeys
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {savedTrips.map((trip) => (
            <Grid item xs={12} md={6} key={trip.id}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ height: 190, backgroundImage: `url(/images/${trip.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <CardContent>
                  <Typography variant="overline" color="primary.main">{trip.destination}</Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>{trip.title}</Typography>
                  <Typography color="text.secondary">{trip.tagline || trip.description}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Button component={RouterLink} to={`/packages/${trip.id}`} endIcon={<ArrowForwardIcon />}>View journey</Button>
                    <Button color="inherit" startIcon={<DeleteOutlineIcon />} onClick={() => toggleSavedTrip(trip)}>Remove</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
