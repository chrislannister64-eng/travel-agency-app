import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Box, Card, CardActionArea, CardMedia, Container, Typography, Button, Grid, CircularProgress, Stack, Rating, Chip } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { usePackages } from '../../hooks/usePackages'
import PackageCard from '../../components/PackageCard'
import Footer from '../../components/Footer'

const reviewSources = [
  { label: 'All reviews', rating: '4.9', value: 'all' },
  { label: 'Tripadvisor', rating: '4.9', value: 'Tripadvisor' },
  { label: 'Google', rating: '4.8', value: 'Google' },
  { label: 'Facebook', rating: '4.9', value: 'Facebook' },
]

const reviews = [
  {
    name: 'Andrea M.', source: 'Tripadvisor', location: 'Scotland', initials: 'AM', color: '#D86B42',
    title: 'Beautiful Scotland!', text: 'We really enjoyed our 10 day trip around Scotland. We got to see beautiful towns, Highlands, and castles. Everything was thoughtful and easy from start to finish.',
  },
  {
    name: 'Suzanne C.', source: 'Tripadvisor', location: 'Scotland', initials: 'SC', color: '#176B67',
    title: 'An enjoyable experience', text: 'Our guide was very knowledgeable and considerate of everybody\'s requirements. The small group format made the whole journey feel genuinely personal.',
  },
  {
    name: 'Lama K.', source: 'Google', location: 'Norway', initials: 'LK', color: '#D19A3A',
    title: 'Absolutely wonderful trip', text: 'The fjords were unbelievable and the organisation was excellent. All vouchers and instructions were given super clearly. We loved every day.',
  },
]

const featuredDestinations = [
  { name: 'Iceland', image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=900&q=85' },
  { name: 'Scandinavia', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=85', multiCountry: true },
  { name: 'Norway', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85' },
  { name: 'Scotland', image: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=900&q=85' },
  { name: 'Ireland', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85' },
  { name: 'The Alps', image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85', multiCountry: true },
]

export default function Home() {
  const { packages, loading } = usePackages()
  const featured = packages.slice(0, 3)
  const [activeSource, setActiveSource] = useState('all')
  const visibleReviews = activeSource === 'all' ? reviews : reviews.filter((review) => review.source === activeSource)

  return (
    <Box>
      <Box sx={{ minHeight: { xs: 560, md: 640 }, display: 'flex', alignItems: 'center', color: 'white', position: 'relative', overflow: 'hidden', backgroundImage: 'linear-gradient(90deg, rgba(9, 40, 40, 0.86) 0%, rgba(9, 40, 40, 0.48) 48%, rgba(9, 40, 40, 0.12) 100%), url(/images/dubai.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <Box sx={{ maxWidth: 620 }}>
            <Typography variant="overline" sx={{ letterSpacing: '0.2em', fontWeight: 700, color: 'secondary.light' }}>VOYAGE / TRAVEL WELL</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', md: '5.8rem' }, lineHeight: 0.98, mt: 2, mb: 3 }}>
              Journeys made for you.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: 500, fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.86)' }}>
              Thoughtfully planned trips, handpicked stays and local insight — so you can spend less time planning and more time being there.
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

      <Box sx={{ bgcolor: 'primary.dark', color: 'white' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {[
              [HotelIcon, 'Handpicked stays', 'Hotels chosen by people who know the destination'],
              [MapIcon, 'A plan that flows', 'Transport, activities and free time in balance'],
              [SupportAgentIcon, 'Here when you need us', 'Local support before and during your trip'],
            ].map(([Icon, title, text]) => (
              <Grid item xs={12} md={4} key={title}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Icon sx={{ color: 'secondary.light', fontSize: 30 }} />
                  <Box>
                    <Typography fontWeight={700}>{title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>{text}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-end' }} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>START HERE</Typography>
            <Typography variant="h3" sx={{ mt: 0.5 }}>Journeys worth taking</Typography>
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

        <Box component="section" aria-labelledby="destinations-heading" sx={{ mt: { xs: 9, md: 12 }, py: { xs: 6, md: 8 }, mx: { xs: -2, md: -3 }, px: { xs: 2, md: 3 }, bgcolor: '#FFF9F0' }}>
          <Typography id="destinations-heading" variant="h2" align="center" sx={{ color: 'primary.dark', mb: 1 }}>Where to?</Typography>
          <Typography align="center" sx={{ fontFamily: 'Georgia, serif', fontSize: { xs: '1.2rem', md: '1.45rem' }, mb: 5 }}>
            Adventure starts here. Take your pick.
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            {featuredDestinations.map((destination) => (
              <Grid item xs={12} sm={6} md={2} key={destination.name}>
                <Card sx={{ height: '100%', overflow: 'visible', position: 'relative', borderRadius: 2, boxShadow: '0 8px 14px rgba(23, 42, 42, 0.18)' }}>
                  <CardActionArea component={RouterLink} to={`/packages?destination=${encodeURIComponent(destination.name.replace('The ', ''))}`} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden', textDecoration: 'none' }}>
                    <CardMedia component="img" image={destination.image} alt={`${destination.name} travel destination`} sx={{ height: { xs: 220, sm: 180, md: 155 }, objectFit: 'cover' }} />
                    <Typography align="center" sx={{ py: 2, bgcolor: 'white', color: 'text.primary', fontSize: { xs: '1.15rem', md: '1.05rem' }, fontWeight: 600 }}>
                      {destination.name}
                    </Typography>
                  </CardActionArea>
                  {destination.multiCountry && (
                    <Chip label="✈ Multi-country" size="small" color="secondary" sx={{ position: 'absolute', top: -12, right: 10, fontWeight: 700 }} />
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button component={RouterLink} to="/destinations" variant="contained" size="large" sx={{ display: 'flex', mx: 'auto', mt: 5 }}>
            Show all destinations
          </Button>
        </Box>

        <Box component="section" aria-labelledby="reviews-heading" sx={{ mt: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
            TRAVELLER STORIES
          </Typography>
          <Typography id="reviews-heading" variant="h3" sx={{ mt: 0.5, mb: 1 }}>
            Loved by curious travellers
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', mb: 4 }}>
            The best part of the journey is hearing what it meant to the people who took it.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" sx={{ borderBottom: '1px solid rgba(23, 42, 42, 0.12)', mb: 5 }}>
            {reviewSources.map((source) => (
              <Button
                key={source.value}
                onClick={() => setActiveSource(source.value)}
                sx={{
                  borderRadius: 0,
                  px: { xs: 2, sm: 3 },
                  py: 1.5,
                  color: activeSource === source.value ? 'text.primary' : 'text.secondary',
                  borderBottom: activeSource === source.value ? '2px solid' : '2px solid transparent',
                  borderColor: 'text.primary',
                }}
              >
                {source.label} <Box component="span" sx={{ ml: 1, fontWeight: 700 }}>{source.rating}</Box>
              </Button>
            ))}
          </Stack>

          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Overall rating</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h4">4.9</Typography>
              <Rating value={4.9} precision={0.1} readOnly sx={{ color: '#F4C84A' }} />
              <Typography variant="body2" color="text.secondary">(3,583 reviews)</Typography>
            </Stack>
          </Stack>

          <Grid container spacing={3} sx={{ textAlign: 'left' }}>
            {visibleReviews.map((review) => (
              <Grid item xs={12} md={4} key={review.name}>
                <Box sx={{ height: '100%', p: { xs: 3, md: 4 }, borderRadius: 2, bgcolor: '#FFF9F0', border: '1px solid #EEDFCB', display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                    <Avatar sx={{ bgcolor: review.color, width: 46, height: 46 }}>{review.initials}</Avatar>
                    <Box>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography fontWeight={700}>{review.name}</Typography>
                        <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">2 days ago on {review.source}</Typography>
                    </Box>
                  </Stack>
                  <Rating value={5} readOnly sx={{ color: '#F4C84A', mb: 1.5 }} />
                  <Typography variant="h6" sx={{ fontSize: '1.05rem', mb: 0.75 }}>{review.title}</Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.65, flexGrow: 1 }}>{review.text}</Typography>
                  <Typography variant="body2" color="primary.main" fontWeight={700} sx={{ mt: 2 }}>Read full story</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button component={RouterLink} to="/contact" variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ mt: 5 }}>
            Plan your own story
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
