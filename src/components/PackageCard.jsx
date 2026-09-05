import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material'

export default function PackageCard({ pkg }) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/packages/${pkg.id}`)}>
        <CardMedia
          component="div"
          sx={{
            height: 180,
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          image={pkg.images?.[0] || undefined}
        >
          {!pkg.images?.[0] && (
            <Typography variant="body2" color="text.secondary">No image yet</Typography>
          )}
        </CardMedia>
        <CardContent>
          <Chip label={pkg.destination} size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
          <Typography variant="h6" component="div">{pkg.title}</Typography>
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
