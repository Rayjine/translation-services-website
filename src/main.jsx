import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/rtl.css'; // Import RTL styles
import App from './App.jsx';
import './i18n';
import { CircularProgress, Box } from '@mui/material';
import AnalyticsTracker from './components/AnalyticsTracker';

// Loading spinner component for Suspense fallback
const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    sx={{ bgcolor: '#03142a' }}
  >
    <CircularProgress color="secondary" size={60} />
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
