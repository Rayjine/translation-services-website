import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TranslateIcon from '@mui/icons-material/Translate';

const NotFound = () => {
  const { t } = useTranslation();

  // Popular service links
  const serviceLinks = [
    { name: t('notFound.links.documentTranslation'), path: '/services' },
    { name: t('notFound.links.websiteLocalization'), path: '/services' },
    { name: t('notFound.links.technicalTranslation'), path: '/services' }
  ];

  // Popular pages
  const pageLinks = [
    { name: t('common.menu.home'), path: '/' },
    { name: t('common.menu.services'), path: '/services' },
    { name: t('common.menu.team'), path: '/team' },
    { name: t('common.menu.contact'), path: '/contact' },
    { name: t('common.menu.pricing'), path: '/pricing' }
  ];

  return (
    <Box
      sx={{
        py: 8,
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Visual elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: 'primary.light',
              opacity: 0.1,
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: 'secondary.light',
              opacity: 0.1,
              zIndex: 0
            }}
          />

          {/* Main content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '4rem', md: '6rem' },
                color: 'primary.main',
                mb: 2,
                textAlign: 'center'
              }}
            >
              404
            </Typography>
            
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                mb: 3,
                color: 'text.primary',
                fontWeight: 500 
              }}
            >
              {t('notFound.title')}
            </Typography>
            
            <Typography 
              variant="h5" 
              component="h3"
              sx={{ 
                mb: 5,
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('notFound.message')}
            </Typography>

            {/* Action buttons */}
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/"
                  startIcon={<HomeIcon />}
                >
                  {t('notFound.returnHome')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  startIcon={<ContactSupportIcon />}
                >
                  {t('notFound.contactUs')}
                </Button>
              </Grid>
            </Grid>

            {/* Helpful links sections */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="h3" sx={{ mb: 2, textAlign: 'left' }}>
                  <TranslateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {t('notFound.popularServices')}
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  {serviceLinks.map((link, index) => (
                    <Typography 
                      key={index} 
                      component={RouterLink}
                      to={link.path}
                      sx={{ 
                        display: 'block', 
                        mb: 1.5, 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      • {link.name}
                    </Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="h3" sx={{ mb: 2, textAlign: 'left' }}>
                  <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {t('notFound.exploreSite')}
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  {pageLinks.map((link, index) => (
                    <Typography 
                      key={index} 
                      component={RouterLink}
                      to={link.path}
                      sx={{ 
                        display: 'block', 
                        mb: 1.5, 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      • {link.name}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
