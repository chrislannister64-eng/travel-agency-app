import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, CircularProgress } from '@mui/material'
import { usePackages } from '../../hooks/usePackages'
import PackageCard from '../../components/PackageCard'

export default function Home() {
  const { packages, loading } = usePackages()
  const featured = packages.slice(0, 3)

  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            Find your next trip
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
            Curated tour packages, booked and paid for in minutes.
          </Typography>
          <Button
            component={RouterLink}
            to="/packages"
            variant="contained"
            size="large"
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Browse packages
          </Button>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Featured packages</Typography>

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
