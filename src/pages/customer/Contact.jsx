import { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, Alert, Grid } from '@mui/material'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const emptyForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...form,
        createdAt: serverTimestamp(),
      })
      setSent(true)
      setForm(emptyForm)
    } catch (err) {
      console.error(err)
      setError('Could not send your message — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Contact us</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Questions about a package or booking? Send us a message.
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        {sent && <Alert severity="success" sx={{ mb: 2 }}>Message sent — we'll get back to you soon.</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                fullWidth
                required
                multiline
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" fullWidth disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
