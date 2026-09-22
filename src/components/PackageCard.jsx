import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material'

export default function PackageCard({ pkg }) {
  const navigate = useNavigate()

  return (
    <Card sx={{ height: '100%', overflow: 'hidden', transition: 'transform 180ms ease, box-shadow 180ms ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 18px 36px rgba(23, 42, 42, 0.12)' } }}>
      <CardActionArea onClick={() => navigate(`/packages/${pkg.id}`)}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            bgcolor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          image={pkg.image ? `/images/${pkg.image}` : undefined}
          title={pkg.title}
        >
          {!pkg.image && (
            <Typography variant="body2" color="text.secondary">No image yet</Typography>
          )}
        </CardMedia>
        <CardContent>
          <Chip label={pkg.destination} size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>{pkg.title}</Typography>
          <Typography variant="body2" color="text.secondary">{pkg.duration}</Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {pkg.currency} {Number(pkg.price).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
