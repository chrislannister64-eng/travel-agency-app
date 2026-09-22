import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, CircularProgress, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { usePackages } from '../../hooks/usePackages'
import PackageCard from '../../components/PackageCard'

export default function Home() {
  const { packages, loading } = usePackages()
  const featured = packages.slice(0, 3)

  return (
    <Box>
      <Box sx={{ minHeight: { xs: 560, md: 640 }, display: 'flex', alignItems: 'center', color: 'white', position: 'relative', overflow: 'hidden', backgroundImage: 'linear-gradient(90deg, rgba(9, 40, 40, 0.86) 0%, rgba(9, 40, 40, 0.48) 48%, rgba(9, 40, 40, 0.12) 100%), url(/images/dubai.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <Box sx={{ maxWidth: 620 }}>
            <Typography variant="overline" sx={{ letterSpacing: '0.2em', fontWeight: 700, color: 'secondary.light' }}>VOYAGE / TRAVEL WELL</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', md: '5.8rem' }, lineHeight: 0.98, mt: 2, mb: 3 }}>
              The world is waiting.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: 500, fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.86)' }}>
              Curated journeys, memorable places, and the freedom to make your next story somewhere new.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={RouterLink} to="/packages" variant="contained" color="secondary" size="large" endIcon={<ArrowForwardIcon />}>
                Explore packages
              </Button>
              <Button component={RouterLink} to="/destinations" variant="outlined" size="large" startIcon={<TravelExploreIcon />} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.55)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                View destinations
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-end' }} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>START HERE</Typography>
            <Typography variant="h3" sx={{ mt: 0.5 }}>Featured escapes</Typography>
          </Box>
          <Button component={RouterLink} to="/packages" endIcon={<ArrowForwardIcon />} sx={{ mt: { xs: 2, sm: 0 } }}>See all packages</Button>
        </Stack>

        {loading && <CircularProgress />}

        {!loading && featured.length === 0 && (
          <Typography color="text.secondary">
            No packages yet — check back soon.
          </Typography>
        )}

        <Grid container spacing={3}>
          {featured.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <PackageCard pkg={pkg} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
