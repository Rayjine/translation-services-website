import { Suspense } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 12,
          insetInlineStart: 12,
          zIndex: 1400,
          px: 2.5,
          py: 1.25,
          borderRadius: 999,
          bgcolor: '#fff',
          color: 'primary.main',
          fontWeight: 700,
          textDecoration: 'none',
          boxShadow: '0 12px 30px -12px rgba(7,26,43,0.5)',
          transform: 'translateY(-160%)',
          '&:focus-visible': { transform: 'none' },
        }}
      >
        {t('common.skipToContent')}
      </Box>
      <Header />
      {/* clip (not hidden) keeps sticky children working while slide-in reveals can't widen the page. */}
      <Box component="main" id="main" tabIndex={-1} sx={{ flexGrow: 1, width: '100%', overflowX: 'clip', '&:focus': { outline: 'none' } }}>
        {/* Re-keyed per route so each page fades in. */}
        <Box key={pathname} className="page-enter">
          {/* Lazy route chunks load here, keeping the header and footer on screen. */}
          <Suspense fallback={<Box sx={{ minHeight: '70vh' }} />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
