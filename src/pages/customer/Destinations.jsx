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
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { usePackages } from '../../hooks/usePackages'

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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Destinations</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Explore where our packages take you.
      </Typography>

      <TextField
        placeholder="Search destinations…"
        fullWidth
        sx={{ mb: 4, maxWidth: 400 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading && <CircularProgress />}

      {!loading && destinations.length === 0 && (
        <Typography color="text.secondary">No destinations match your search.</Typography>
      )}

      <Grid container spacing={3}>
        {destinations.map((d) => (
          <Grid item xs={12} sm={6} md={4} key={d.name}>
            <Card>
              <CardActionArea onClick={() => navigate(`/packages?destination=${encodeURIComponent(d.name)}`)}>
                <CardContent>
                  <Typography variant="h6">{d.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {d.count} package{d.count !== 1 ? 's' : ''} available
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
