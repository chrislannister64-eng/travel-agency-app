import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Box,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { usePackages } from '../../hooks/usePackages'
import Footer from '../../components/Footer'

export default function Destinations() {
  const { packages, loading } = usePackages()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // Destinations aren't their own Firestore collection — we derive the
  // unique list straight from active packages, along with a count of how
  // many packages go there. One less collection to keep in sync.
  const destinations = useMemo(() => {
    const map = new Map()
    for (const pkg of packages) {
      if (!pkg.destination) continue
      map.set(pkg.destination, (map.get(pkg.destination) || 0) + 1)
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
  }, [packages, search])

  return (
    <>
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>FIND YOUR NEXT HORIZON</Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1, mt: 1, mb: 2 }}>Where will you go?</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620, fontSize: '1.1rem', lineHeight: 1.7, mb: 5 }}>
          From city energy to wide-open landscapes, explore destinations selected for the feeling they leave you with.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 6 }}>
          {[
            ['Slow escapes', 'Unhurried days, local flavours, and room to breathe.'],
            ['Big adventures', 'Wild places and experiences that stay with you.'],
            ['Made for you', 'Flexible journeys shaped around your way of travelling.'],
          ].map(([title, text]) => (
            <Grid item xs={12} md={4} key={title}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#FFF9F0', height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
                <Typography color="text.secondary">{text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ mb: 0.5 }}>Explore destinations</Typography>
            <Typography color="text.secondary">Choose a place and see the journeys waiting there.</Typography>
          </Box>
          <TextField
            placeholder="Search destinations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', sm: 280 } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          />
        </Box>

        {loading && <CircularProgress />}
        {!loading && destinations.length === 0 && <Typography color="text.secondary">No destinations match your search.</Typography>}

        <Grid container spacing={3}>
          {destinations.map((d) => (
            <Grid item xs={12} sm={6} md={4} key={d.name}>
              <Card>
                <CardActionArea onClick={() => navigate(`/packages?destination=${encodeURIComponent(d.name)}`)}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{d.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{d.count} package{d.count !== 1 ? 's' : ''} available</Typography>
                    <Typography color="primary.main" fontWeight={700}>Explore trips <ArrowForwardIcon sx={{ fontSize: 16, verticalAlign: 'middle' }} /></Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}
