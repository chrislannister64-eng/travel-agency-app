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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Packages</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Browse and filter tour packages.
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
    </Container>
  )
}
