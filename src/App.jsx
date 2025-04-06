import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CookieConsent from 'react-cookie-consent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DirectionProvider, useDirection } from './contexts/DirectionContext';

// Layout
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
// import Blog from './pages/Blog'; // Temporarily removed
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';

// NotFound component is now imported from ./pages/NotFound

const LocationAwareCookieConsent = () => {
  const location = useLocation();
  const isPrivacyPage = location.pathname === '/privacy';
  const { t } = useTranslation();
  
  return (
    <CookieConsent
      location="bottom"
      buttonText={t('common.buttons.accept')}
      cookieName="oghamTranslationsConsent"
      style={{ background: '#03142a', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}
      buttonStyle={{ background: '#20fc8f', color: '#03142a', fontSize: '13px', fontWeight: 'bold', borderRadius: '4px', padding: '8px 16px' }}
      expires={150}
      overlay={!isPrivacyPage}
    >
      {t('common.cookieConsent.message')}{" "}
      <Link to="/privacy" style={{ color: '#00a8e8', textDecoration: 'underline' }}>
        {t('common.footer.privacyPolicy')}
      </Link>{" "}
      {t('common.cookieConsent.moreInfo')}
    </CookieConsent>
  );
};

const AppWithTheme = () => {
  const { direction, isRtl } = useDirection();
  const { t } = useTranslation();
  
  // Create theme with direction
  const theme = createTheme({
    direction: direction,
    palette: {
      primary: {
        main: '#0b476c', // indigo-dye
        light: '#53a6cc', // picton-blue
        dark: '#092d44' // darker variant of indigo-dye
      },
      secondary: {
        main: '#3b9b5c', // shamrock-green
        light: '#5bb97c', // lighter shamrock-green
        dark: '#2a7043' // darker shamrock-green
      },
      error: {
        main: '#ebbab9', // tea-rose-red
        light: '#f1d0cf', // lighter tea-rose-red
        dark: '#c99796' // darker tea-rose-red
      },
      background: {
        default: '#fbfef9', // light-yellow
        paper: '#ffffff'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        '@media (min-width:600px)': {
          fontSize: '3.5rem',
        },
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        '@media (min-width:600px)': {
          fontSize: '2.5rem',
        },
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 500,
        '@media (min-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 500,
        '@media (min-width:600px)': {
          fontSize: '1.35rem',
        },
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <LocationAwareCookieConsent />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<Team />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          {/* Blog route temporarily removed */}
          <Route path="terms" element={<Terms />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

function App() {
  return (
    <DirectionProvider>
      <AppWithTheme />
    </DirectionProvider>
  );
}

export default App;
