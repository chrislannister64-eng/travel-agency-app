import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { usePackage } from '../../hooks/usePackage'
import { useAuth } from '../../context/AuthContext'
import { useSavedTrips } from '../../hooks/useSavedTrips'

export default function PackageDetail() {
  const { id } = useParams()
  const { pkg, loading } = usePackage(id)
  const { user } = useAuth()
  const navigate = useNavigate()

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

  function handleBookNow() {
    if (!user) {
      navigate('/login', { state: { from: `/booking/${id}` } })
      return
    }
    navigate(`/booking/${id}`)
  }

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              height: 320,
              bgcolor: 'action.hover',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: imageSource !== 'none' ? `url(${imageSource})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!pkg.image && (
              <Typography color="text.secondary">No image yet</Typography>
        )}
          </Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2} sx={{ mt: 3 }}>
            <Typography variant="h4">{pkg.title}</Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={isSaved(pkg.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => toggleSavedTrip(pkg)}
              sx={{ flexShrink: 0 }}
            >
              {isSaved(pkg.id) ? 'Saved' : 'Save trip'}
            </Button>
          </Stack>
          <Chip label={pkg.destination} color="primary" variant="outlined" sx={{ mt: 1, mb: 2 }} />
          {pkg.tagline && <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>{pkg.tagline}</Typography>}
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {pkg.description || 'No description provided yet.'}
          </Typography>
          {pkg.inclusions?.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" sx={{ mb: 1 }}>What’s included</Typography>
              <List disablePadding>
                {pkg.inclusions.map((item) => (
                  <ListItem key={item} disableGutters>
                    <ListItemIcon sx={{ minWidth: 34 }}><CheckCircleOutlineIcon color="primary" fontSize="small" /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {pkg.itinerary?.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>Your itinerary at a glance</Typography>
              <Stack spacing={1.5}>
                {pkg.itinerary.map((day, index) => (
                  <Stack direction="row" spacing={2} key={day}>
                    <Typography color="secondary.main" fontWeight={700} sx={{ minWidth: 56 }}>DAY {index + 1}</Typography>
                    <Typography>{day}</Typography>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 16 }}>
            <Typography variant="h5" fontWeight={600}>
              {pkg.currency} {Number(pkg.price).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              per person · {pkg.duration}
            </Typography>
            <Button variant="contained" size="large" fullWidth onClick={handleBookNow}>
              Book now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
