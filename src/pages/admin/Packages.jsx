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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
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
        images: [],
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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Manage packages</Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 5 }}>
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
              <Button type="submit" variant="contained" size="large" fullWidth disabled={submitting}>
                {submitting ? 'Adding…' : 'Add package'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {loading && <CircularProgress />}

      <Stack spacing={2}>
        {packages.map((pkg) => (
          <Paper key={pkg.id} sx={{ p: 2 }}>
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
