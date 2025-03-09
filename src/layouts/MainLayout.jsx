import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      margin: '0 auto'
    }}>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
