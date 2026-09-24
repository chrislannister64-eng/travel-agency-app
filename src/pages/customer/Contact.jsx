import { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, Alert, Grid, Box, Stack } from '@mui/material'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import Footer from '../../components/Footer'

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
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>WE ARE HERE TO HELP</Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1, mt: 1, mb: 2 }}>Let’s plan something good.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 650, fontSize: '1.1rem', lineHeight: 1.7, mb: 5 }}>
          Questions about a package, a destination, or a booking? Tell us what you are imagining and our travel experts will help shape the next step.
        </Typography>

        <Grid container spacing={5} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {[
                ['Email us', 'hello@voyagetravels.com', 'We usually reply within one business day.'],
                ['Call us', '+233 24 000 0000', 'Monday to Friday, 8:00 AM to 5:00 PM.'],
                ['Visit us', '12 Independence Avenue, Accra', 'Come by for a conversation about your next journey.'],
              ].map(([title, detail, text]) => (
                <Box key={title}>
                  <Typography variant="h5" sx={{ mb: 0.5 }}>{title}</Typography>
                  <Typography fontWeight={600}>{detail}</Typography>
                  <Typography color="text.secondary">{text}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
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
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}
