import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/rtl.css'; // Import RTL styles
import App from './App.jsx';
import './i18n';
import { Box } from '@mui/material';
import OghamMark from './components/ui/OghamMark';
import AnalyticsTracker from './components/AnalyticsTracker';

// Branded loading screen while translations load: the logo name carved in Ogham.
const Loading = () => (
  <Box
    role="status"
    aria-label="Loading"
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    sx={{ bgcolor: '#071a2b', color: '#7ddba3' }}
  >
    <OghamMark text="Ogham" strokeLength={22} strokeWidth={2.5} stagger={90} sx={{ width: 220 }} />
  </Box>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <AnalyticsTracker />
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
