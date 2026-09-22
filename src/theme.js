import { createTheme } from '@mui/material/styles'

// One theme object, used everywhere via ThemeProvider in main.jsx.
// Change colors/fonts here and they propagate through every MUI component.
const theme = createTheme({
  palette: {
    primary: { main: '#176B67', dark: '#0E4E4B', light: '#D8EEEA' },
    secondary: { main: '#D86B42', dark: '#A94D2E', light: '#FBE2D6' },
    background: { default: '#F7F5F0', paper: '#FFFFFF' },
    text: { primary: '#172A2A', secondary: '#61706E' },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(14px)' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 20, minHeight: 44 },
        containedPrimary: { boxShadow: '0 8px 18px rgba(23, 107, 103, 0.2)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: '1px solid rgba(23, 42, 42, 0.08)', boxShadow: '0 12px 30px rgba(23, 42, 42, 0.06)' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { border: '1px solid rgba(23, 42, 42, 0.08)' },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
  },
})

export default theme
