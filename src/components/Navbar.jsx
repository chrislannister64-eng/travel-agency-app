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
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
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
      {isAdmin && (
        <Button component={RouterLink} to="/admin" color="inherit">
          Admin
        </Button>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
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
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h5"
          sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 600 }}
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
                      <ListItemText primary="Admin" />
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
