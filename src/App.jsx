import { lazy, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CookieConsent from 'react-cookie-consent';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme, tokens, fonts } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { DirectionProvider, useDirection } from './contexts/DirectionContext';

// Layout
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';

// Pages
// Home ships in the main bundle; every other route is split into its own chunk.
import Home from './pages/Home';
const Services = lazy(() => import('./pages/Services'));
const Team = lazy(() => import('./pages/Team'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
// const Blog = lazy(() => import('./pages/Blog')); // Temporarily removed
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const NotFound = lazy(() => import('./pages/NotFound'));

// NotFound component is now imported from ./pages/NotFound

const LocationAwareCookieConsent = () => {
  const { t } = useTranslation();
  
  return (
    <CookieConsent
      location="bottom"
      buttonText={t('common.buttons.accept')}
      enableDeclineButton
      declineButtonText={t('common.buttons.decline', 'Decline')}
      onAccept={() => window.dispatchEvent(new Event('ogham-consent-change'))}
      onDecline={() => window.dispatchEvent(new Event('ogham-consent-change'))}
      cookieName="oghamTranslationsConsent"
      expires={150}
      overlay={false}
      disableStyles
      containerClasses="ogham-consent"
      contentClasses="ogham-consent__text"
      buttonWrapperClasses="ogham-consent__actions"
      buttonClasses="ogham-consent__accept"
      declineButtonClasses="ogham-consent__decline"
      style={{ fontFamily: fonts.body }}
    >
      {t('common.cookieConsent.message')}{" "}
      <Link to="/privacy" style={{ color: tokens.mint, textDecoration: 'underline' }}>
        {t('common.footer.privacyPolicy')}
      </Link>{" "}
      {t('common.cookieConsent.moreInfo')}
    </CookieConsent>
  );
};

const AppWithTheme = () => {
  const { direction } = useDirection();
  
  const theme = useMemo(() => createAppTheme(direction), [direction]);

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
