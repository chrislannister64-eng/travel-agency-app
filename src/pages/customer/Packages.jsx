import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
  InputAdornment,
  Box,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { usePackages } from '../../hooks/usePackages'
import PackageCard from '../../components/PackageCard'
import Footer from '../../components/Footer'

export default function Packages() {
  const { packages, loading } = usePackages()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const destinationFilter = searchParams.get('destination') || ''

  const destinationOptions = useMemo(() => {
    const set = new Set(packages.map((p) => p.destination).filter(Boolean))
    return Array.from(set)
  }, [packages])

  const filtered = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch =
        !search ||
        pkg.title?.toLowerCase().includes(search.toLowerCase()) ||
        pkg.destination?.toLowerCase().includes(search.toLowerCase())
      const matchesDestination = !destinationFilter || pkg.destination === destinationFilter
      return matchesSearch && matchesDestination
    })
  }, [packages, search, destinationFilter])

  function handleDestinationChange(value) {
    if (value) {
      setSearchParams({ destination: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <>
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>CURATED BY VOYAGE</Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1, mt: 1, mb: 2 }}>Journeys worth taking.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620, fontSize: '1.1rem', lineHeight: 1.7, mb: 5 }}>
          Browse ready-to-book escapes designed to give you more of what makes a destination special.
        </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <TextField
          placeholder="Search by name or destination…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260, flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Destination"
          value={destinationFilter}
          onChange={(e) => handleDestinationChange(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All destinations</MenuItem>
          {destinationOptions.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </TextField>
      </Box>

      {loading && <CircularProgress />}

      {!loading && filtered.length === 0 && (
        <Typography color="text.secondary">No packages match your search.</Typography>
      )}

        <Grid container spacing={3}>
          {filtered.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <PackageCard pkg={pkg} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 7, p: { xs: 3, md: 5 }, borderRadius: 2, bgcolor: 'primary.dark', color: 'white' }}>
          <Typography variant="h4" sx={{ mb: 1 }}>Not sure where to start?</Typography>
          <Typography sx={{ maxWidth: 650, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            Tell us how you want to travel and we will help you find the right destination, pace, and package.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
