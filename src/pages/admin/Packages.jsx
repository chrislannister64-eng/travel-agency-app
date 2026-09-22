import { useState } from 'react'
import { collection, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { db } from '../../lib/firebase'
import { useAllPackages } from '../../hooks/useAllPackages'
import { useAuth } from '../../context/AuthContext'

const emptyForm = {
  title: '',
  destination: '',
  description: '',
  price: '',
  currency: 'NGN',
  duration: '',
  image: '',
}

export default function Packages() {
  const { user } = useAuth()
  const { packages, loading } = useAllPackages()
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  async function handleCreate(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'packages'), {
  ...form,
  price: Number(form.price),
  status: 'active',
  createdBy: user.uid,
  createdAt: serverTimestamp(),
})
      setForm(emptyForm)
    } catch (err) {
      console.error(err)
      alert('Could not create package — check the console for details.')
    } finally {
      setSubmitting(false)
    }
  }

  async function toggleStatus(pkg) {
    const next = pkg.status === 'active' ? 'archived' : 'active'
    await updateDoc(doc(db, 'packages', pkg.id), { status: next })
  }

  async function handleDelete(pkg) {
    if (!confirm(`Delete "${pkg.title}"? This can't be undone.`)) return
    await deleteDoc(doc(db, 'packages', pkg.id))
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>CATALOG / EXPERIENCES</Typography>
        <Typography variant="h3" sx={{ mt: 0.5, mb: 1 }}>Manage packages</Typography>
        <Typography color="text.secondary">Create and curate the journeys customers can book.</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, mb: 5, borderTop: '4px solid', borderColor: 'primary.main' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <AddCircleOutlineIcon color="primary" />
          <Box><Typography variant="h5">Add a new package</Typography><Typography variant="body2" color="text.secondary">Add the details customers will see on the storefront.</Typography></Box>
        </Stack>
        <form onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destination"
                fullWidth
                required
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (e.g. 5 days / 4 nights)"
                fullWidth
                required
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                required
                inputProps={{ min: 0 }}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Currency"
                fullWidth
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
              >
                <MenuItem value="NGN">NGN</MenuItem>
                <MenuItem value="GHS">GHS</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image filename"
                placeholder="e.g. santorini.jpg"
                fullWidth
                required
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" fullWidth disabled={submitting}>
                {submitting ? 'Adding…' : 'Add package'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {loading && <CircularProgress />}

      <Typography variant="h5" sx={{ mb: 2 }}>Published packages</Typography>
      <Stack spacing={2}>
        {packages.map((pkg) => (
          <Paper key={pkg.id} elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderLeft: '4px solid', borderColor: pkg.status === 'active' ? 'primary.main' : 'grey.300' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <div>
                <Typography fontWeight={600}>{pkg.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {pkg.destination} · {pkg.currency} {Number(pkg.price).toLocaleString()}
                  </Typography>
                  <Chip
                    size="small"
                    label={pkg.status}
                    color={pkg.status === 'active' ? 'success' : 'default'}
                  />
                </Stack>
              </div>
              <Stack direction="row" spacing={1}>
                <Button size="small" onClick={() => toggleStatus(pkg)}>
                  {pkg.status === 'active' ? 'Archive' : 'Activate'}
                </Button>
                <IconButton size="small" color="error" onClick={() => handleDelete(pkg)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  )
}
