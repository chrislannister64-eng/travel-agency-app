import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'

const destinations = ['Alps', 'Central & Eastern Europe', 'Denmark', 'Finland', 'France', 'Greenland', 'Iceland', 'Ireland', 'Italy', 'Lapland', 'Norway', 'Scandinavia', 'Scotland', 'Svalbard', 'Sweden', 'Switzerland', 'United Kingdom']

const footerGroups = [
  { title: 'About', links: [['About us', 'about-us'], ['Our story', 'our-story'], ['Our team', 'our-team'], ['Why book with us', 'why-book-with-us'], ['Reviews', 'reviews'], ['Sustainability', 'sustainability'], ['Website terms', 'website-terms']] },
  { title: 'Support', links: [['Booking terms', 'booking-terms'], ['Travel updates', 'travel-updates'], ['Privacy policy', 'privacy-policy'], ['Cookie policy', 'cookie-policy'], ['Sitemap', 'sitemap'], ['Travel agencies', 'travel-agencies']] },
  { title: 'Contact', links: [['Email us', 'email-us'], ['Gift voucher', 'gift-voucher'], ['Call us', 'call-us'], ['Live chat', 'live-chat'], ['Careers', 'careers'], ['Media centre', 'media-centre']] },
]

function FooterLink({ children, to = '/contact' }) {
  return (
    <Link component={RouterLink} to={to} underline="none" color="inherit" sx={{ display: 'block', mb: 1.2, '&:hover': { color: 'secondary.dark' } }}>
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#FFF8EE', color: '#173C36', mt: 0, borderTop: '1px solid #F0E4D5' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ color: '#4C173E', mb: 0.5 }}>Connect with us</Typography>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Typography variant="h5" sx={{ color: '#4C173E', fontWeight: 700 }}>#VoyageTravels</Typography>
              <IconButton aria-label="VoyageTravels on Facebook" color="secondary" size="small"><FacebookIcon /></IconButton>
              <IconButton aria-label="VoyageTravels on Instagram" color="secondary" size="small"><InstagramIcon /></IconButton>
              <IconButton aria-label="VoyageTravels on Pinterest" color="secondary" size="small"><PinterestIcon /></IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" sx={{ mb: 0.5 }}>Read our latest travel story</Typography>
            <Link component={RouterLink} to="/destinations" color="inherit" sx={{ fontSize: { xs: '1.1rem', md: '1.35rem' }, fontWeight: 700, lineHeight: 1.2, textDecoration: 'underline' }}>
              The best places to make your next unforgettable memory
            </Link>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 5, md: 7 }, mb: { xs: 5, md: 7 } }}>
          <Typography variant="h5" sx={{ mb: 1.5 }}>Destinations</Typography>
          <Stack direction="row" flexWrap="wrap" columnGap={1} rowGap={0.5}>
            {destinations.map((destination, index) => (
              <Link key={destination} component={RouterLink} to="/destinations" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
                {destination}{index < destinations.length - 1 && '  •'}
              </Link>
            ))}
          </Stack>
        </Box>

        <Grid container spacing={{ xs: 4, md: 5 }}>
          {footerGroups.map((group) => (
            <Grid item xs={12} sm={4} key={group.title}>
              <Typography variant="h5" sx={{ mb: 2 }}>{group.title}</Typography>
              {group.links.map(([label, slug]) => <FooterLink key={slug} to={`/info/${slug}`}>{label}</FooterLink>)}
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2 }}>Head office</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.2 }}>Accra</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.2 }}>12 Independence Avenue</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.2 }}>+233 24 000 0000</Typography>
            <FooterLink to="/contact">View contact details</FooterLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2 }}>Regional offices</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.2 }}>Kumasi</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.2 }}>Cape Coast</Typography>
            <Typography color="text.secondary" sx={{ mb: 1.2 }}>Takoradi</Typography>
            <FooterLink to="/contact">See details</FooterLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: '#E9DCCB' }} />

        <Grid container spacing={4} alignItems="flex-end">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 2 }}>Licences</Typography>
            <Stack direction="row" spacing={1.5}>
              {[TravelExploreIcon, VerifiedUserOutlinedIcon, TravelExploreIcon, VerifiedUserOutlinedIcon].map((Icon, index) => (
                <Box key={index} sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#173C36', color: '#FFF8EE', display: 'grid', placeItems: 'center' }}>
                  <Icon fontSize="small" />
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 1 }}>Contact us</Typography>
            <FooterLink>Get in touch with our travel experts</FooterLink>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="body2" color="text.secondary">Secure payments</Typography>
              <Typography variant="h6" sx={{ color: '#173C36', fontWeight: 700 }}>Voyage trusted travel</Typography>
              <Typography variant="body2" color="text.secondary">Travel well. Go further.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}