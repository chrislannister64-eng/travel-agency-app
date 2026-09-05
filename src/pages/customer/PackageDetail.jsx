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
} from '@mui/material'
import { usePackage } from '../../hooks/usePackage'
import { useAuth } from '../../context/AuthContext'

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
              backgroundImage: pkg.images?.[0] ? `url(${pkg.images[0]})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!pkg.images?.[0] && (
              <Typography color="text.secondary">No image yet</Typography>
            )}
          </Box>
          <Typography variant="h4" sx={{ mt: 3 }}>{pkg.title}</Typography>
          <Chip label={pkg.destination} color="primary" variant="outlined" sx={{ mt: 1, mb: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {pkg.description || 'No description provided yet.'}
          </Typography>
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
