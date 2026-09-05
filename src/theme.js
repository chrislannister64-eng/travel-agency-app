import { createTheme } from '@mui/material/styles'

// One theme object, used everywhere via ThemeProvider in main.jsx.
// Change colors/fonts here and they propagate through every MUI component.
const theme = createTheme({
  palette: {
    primary: { main: '#2A6F77' },   // teal — buttons, links, active states
    secondary: { main: '#C1502E' }, // rust — destructive actions, accents
    background: { default: '#F6F1E7', paper: '#FFFFFF' },
    text: { primary: '#1B2430' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontFamily: '"Fraunces", serif' },
    h2: { fontFamily: '"Fraunces", serif' },
    h3: { fontFamily: '"Fraunces", serif' },
    h4: { fontFamily: '"Fraunces", serif' },
  },
  shape: { borderRadius: 8 },
})

export default theme
