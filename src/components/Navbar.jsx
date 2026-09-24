import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Box,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/info/about-us' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'Plan my trip', to: '/my-trips' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/')
    setDrawerOpen(false)
  }

  const authLinks = user ? (
    <>
      <Button component={RouterLink} to="/my-bookings" color="inherit">
        My Bookings
      </Button>
      <Box
        component={isAdmin ? RouterLink : 'div'}
        to={isAdmin ? '/admin' : undefined}
        aria-label={isAdmin ? 'Open admin dashboard' : undefined}
        title={isAdmin ? 'Open admin dashboard' : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          ml: 1,
          color: 'inherit',
          textDecoration: 'none',
          borderRadius: 999,
          px: isAdmin ? 1 : 0,
          py: isAdmin ? 0.5 : 0,
          cursor: isAdmin ? 'pointer' : 'default',
          '&:hover': isAdmin ? { bgcolor: 'rgba(23, 107, 103, 0.08)' } : {},
        }}
      >
        <Avatar sx={{ width: 28, height: 28, fontSize: 14, bgcolor: 'primary.main' }}>
          {(user.displayName || user.email || '?').charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          {user.displayName || user.email}
        </Typography>
      </Box>
      <Button onClick={handleLogout} color="secondary">
        Log out
      </Button>
    </>
  ) : (
    <Button component={RouterLink} to="/login" color="inherit">
      Log in
    </Button>
  )

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(23, 42, 42, 0.08)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1440, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, py: 0.75 }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h5"
          sx={{ textDecoration: 'none', color: 'primary.dark', fontWeight: 700, letterSpacing: '-0.04em' }}
        >
          Voyage
        </Typography>

        {isMobile ? (
          <>
            <IconButton edge="end" onClick={() => setDrawerOpen(true)} aria-label="open menu">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 240 }} role="presentation">
                <List>
                  {navLinks.map((link) => (
                    <ListItemButton
                      key={link.to}
                      component={RouterLink}
                      to={link.to}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  ))}
                  {user && (
                    <ListItemButton
                      component={RouterLink}
                      to="/my-bookings"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary="My Bookings" />
                    </ListItemButton>
                  )}
                  {isAdmin && (
                    <ListItemButton
                      component={RouterLink}
                      to="/admin"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary="Admin dashboard" />
                    </ListItemButton>
                  )}
                  {user ? (
                    <ListItemButton onClick={handleLogout}>
                      <ListItemText primary="Log out" />
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      component={RouterLink}
                      to="/login"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary="Log in" />
                    </ListItemButton>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navLinks.map((link) => (
              <Button key={link.to} component={RouterLink} to={link.to} color="inherit">
                {link.label}
              </Button>
            ))}
            {authLinks}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
