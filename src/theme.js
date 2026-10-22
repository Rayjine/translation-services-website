import { createTheme, alpha } from '@mui/material/styles';

// Brand tokens. Colours come from the logo (indigo knot, green/blue ring) set on
// a warm "vellum" paper, a nod to the manuscripts and stones Ogham was cut into.
export const tokens = {
  ink: '#071a2b',
  inkSoft: '#0b2f48',
  indigo: '#0b476c',
  picton: '#53a6cc',
  shamrock: '#3b9b5c',
  // Shamrock darkened for small text and filled buttons on light surfaces (>= 4.9:1 on paper/white).
  shamrockText: '#2a7043',
  mint: '#7ddba3',
  sky: '#9fd6ee',
  paper: '#f7f4ec',
  paperDeep: '#efe9da',
  line: '#e2dac6',
  text: '#0f2638',
  textMuted: '#4f6272',
  rose: '#ebbab9',
  gradient: 'linear-gradient(120deg, #3b9b5c 0%, #53a6cc 100%)',
  gradientText: 'linear-gradient(100deg, #7ddba3 0%, #9fd6ee 55%, #53a6cc 100%)',
  heroBackground:
    'radial-gradient(1200px 600px at 85% -10%, rgba(83,166,204,0.35), transparent 60%),' +
    'radial-gradient(900px 500px at -10% 110%, rgba(59,155,92,0.30), transparent 60%),' +
    'linear-gradient(160deg, #071a2b 0%, #0b2f48 55%, #0b476c 100%)',
};

export const fonts = {
  display: '"Literata Variable", "IBM Plex Sans Arabic", Georgia, "Times New Roman", serif',
  body: '"Manrope Variable", "IBM Plex Sans Arabic", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
};

export const easing = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export const createAppTheme = (direction = 'ltr') => {
  const theme = createTheme({
    direction,
    palette: {
      primary: { main: tokens.indigo, light: tokens.picton, dark: '#092d44', contrastText: '#ffffff' },
      secondary: { main: tokens.shamrock, light: '#5bb97c', dark: tokens.shamrockText, contrastText: '#ffffff' },
      info: { main: tokens.picton },
      success: { main: tokens.shamrock },
      // Errors must stay legible on paper: the old tea-rose was decorative, not an alert colour.
      error: { main: '#b3261e', light: tokens.rose, dark: '#8c1d18' },
      background: { default: tokens.paper, paper: '#ffffff' },
      text: { primary: tokens.text, secondary: tokens.textMuted },
      divider: tokens.line,
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: fonts.body,
      h1: {
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: 'clamp(2.5rem, 1.6rem + 3.6vw, 4.75rem)',
        lineHeight: 1.04,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: 'clamp(2rem, 1.45rem + 2.2vw, 3.25rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: 'clamp(1.45rem, 1.2rem + 1vw, 2rem)',
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
      },
      h4: { fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
      h5: { fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.35 },
      h6: { fontWeight: 700, fontSize: '1rem', lineHeight: 1.4 },
      subtitle1: { fontWeight: 600 },
      body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
      overline: { fontWeight: 700, letterSpacing: '0.18em', fontSize: '0.75rem', lineHeight: 1.6 },
      button: { fontWeight: 700, textTransform: 'none', letterSpacing: '0.005em' },
    },
  });

  return createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: tokens.paper, color: tokens.text },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 22,
            transition: `transform .25s ${easing.out}, box-shadow .25s ${easing.out}, background-color .25s, border-color .25s, color .25s`,
            '&:hover': { transform: 'translateY(-2px)' },
            '&:active': { transform: 'translateY(0)' },
            '&.Mui-disabled': { transform: 'none' },
          },
          sizeLarge: { padding: '13px 28px', fontSize: '1.0625rem' },
          // White on shamrock is only 3.5:1, so filled green buttons use the darker shade (6:1).
          containedSecondary: {
            backgroundColor: tokens.shamrockText,
            boxShadow: `0 10px 30px -10px ${alpha(tokens.shamrock, 0.7)}`,
            '&:hover': { backgroundColor: '#215a36', boxShadow: `0 16px 36px -12px ${alpha(tokens.shamrock, 0.8)}` },
          },
          containedPrimary: {
            boxShadow: `0 10px 30px -12px ${alpha(tokens.indigo, 0.7)}`,
            '&:hover': { boxShadow: `0 16px 36px -12px ${alpha(tokens.indigo, 0.8)}` },
          },
          outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 22,
            border: `1px solid ${tokens.line}`,
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 12px 32px -18px rgba(7,26,43,0.18)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: { rounded: { borderRadius: 18 } },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 600 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: '#ffffff',
            transition: 'box-shadow .2s',
            '&.Mui-focused': { boxShadow: `0 0 0 4px ${alpha(tokens.picton, 0.18)}` },
          },
          notchedOutline: { borderColor: tokens.line },
        },
      },
      MuiTab: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 700, fontSize: '0.975rem' } },
      },
      MuiAccordion: {
        defaultProps: { disableGutters: true, elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${tokens.line}`,
            '&:before': { display: 'none' },
            '&:first-of-type': { borderRadius: 16 },
            '&:last-of-type': { borderRadius: 16 },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: { tooltip: { backgroundColor: tokens.ink, fontSize: '0.8rem', borderRadius: 8 } },
      },
      MuiMenu: {
        styleOverrides: {
          paper: { borderRadius: 16, border: `1px solid ${tokens.line}`, boxShadow: '0 24px 60px -24px rgba(7,26,43,0.35)' },
        },
      },
    },
  });
};
