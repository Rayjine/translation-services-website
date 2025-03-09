import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

const NotFound = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

// Theme configuration
const theme = createTheme({
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
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 500
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

const LocationAwareCookieConsent = () => {
  const location = useLocation();
  const isPrivacyPage = location.pathname === '/privacy';
  
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="oghamTranslationsConsent"
      style={{ background: '#03142a', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}
      buttonStyle={{ background: '#20fc8f', color: '#03142a', fontSize: '13px', fontWeight: 'bold', borderRadius: '4px', padding: '8px 16px' }}
      expires={150}
      overlay={!isPrivacyPage}
    >
      This website uses cookies to enhance the user experience. See our{" "}
      <Link to="/privacy" style={{ color: '#00a8e8', textDecoration: 'underline' }}>
        Privacy Policy
      </Link>{" "}
      for more information.
    </CookieConsent>
  );
};

function App() {
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
}

export default App;
