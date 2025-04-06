import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

const Services = () => {
  const { t } = useTranslation();
  
  const serviceCategories = [
    {
      id: 'document',
      title: t('services.categories.document.title'),
      icon: <DescriptionIcon sx={{ fontSize: 60 }} color="primary" />,
      description: t('services.categories.document.description'),
      services: [
        {
          title: t('services.categories.document.services.legal.title'),
          description: t('services.categories.document.services.legal.description'),
          features: [
            t('services.categories.document.services.legal.features.0'),
            t('services.categories.document.services.legal.features.1'),
            t('services.categories.document.services.legal.features.2')
          ]
        },
        {
          title: t('services.categories.document.services.business.title'),
          description: t('services.categories.document.services.business.description'),
          features: [
            t('services.categories.document.services.business.features.0'),
            t('services.categories.document.services.business.features.1'),
            t('services.categories.document.services.business.features.2')
          ]
        },
        {
          title: t('services.categories.document.services.technical.title'),
          description: t('services.categories.document.services.technical.description'),
          features: [
            t('services.categories.document.services.technical.features.0'),
            t('services.categories.document.services.technical.features.1'),
            t('services.categories.document.services.technical.features.2')
          ]
        },
        {
          title: t('services.categories.document.services.academic.title'),
          description: t('services.categories.document.services.academic.description'),
          features: [
            t('services.categories.document.services.academic.features.0'),
            t('services.categories.document.services.academic.features.1'),
            t('services.categories.document.services.academic.features.2')
          ]
        }
      ]
    },
    {
      id: 'website',
      title: t('services.categories.website.title'),
      icon: <LanguageIcon sx={{ fontSize: 60 }} color="primary" />,
      description: t('services.categories.website.description'),
      services: [
        {
          title: t('services.categories.website.services.localization.title'),
          description: t('services.categories.website.services.localization.description'),
          features: [
            t('services.categories.website.services.localization.features.0'),
            t('services.categories.website.services.localization.features.1'),
            t('services.categories.website.services.localization.features.2')
          ]
        },
        {
          title: t('services.categories.website.services.ecommerce.title'),
          description: t('services.categories.website.services.ecommerce.description'),
          features: [
            t('services.categories.website.services.ecommerce.features.0'),
            t('services.categories.website.services.ecommerce.features.1'),
            t('services.categories.website.services.ecommerce.features.2')
          ]
        },
        {
          title: t('services.categories.website.services.cms.title'),
          description: t('services.categories.website.services.cms.description'),
          features: [
            t('services.categories.website.services.cms.features.0'),
            t('services.categories.website.services.cms.features.1'),
            t('services.categories.website.services.cms.features.2')
          ]
        },
        {
          title: t('services.categories.website.services.seo.title'),
          description: t('services.categories.website.services.seo.description'),
          features: [
            t('services.categories.website.services.seo.features.0'),
            t('services.categories.website.services.seo.features.1'),
            t('services.categories.website.services.seo.features.2')
          ]
        }
    ]
  },
    {
      id: 'specialized',
      title: t('services.categories.specialized.title'),
      icon: <BusinessIcon sx={{ fontSize: 60 }} color="primary" />,
      description: t('services.categories.specialized.description'),
      services: [
        {
          title: t('services.categories.specialized.services.medical.title'),
          description: t('services.categories.specialized.services.medical.description'),
          features: [
            t('services.categories.specialized.services.medical.features.0'),
            t('services.categories.specialized.services.medical.features.1'),
            t('services.categories.specialized.services.medical.features.2')
          ]
        },
        {
          title: t('services.categories.specialized.services.financial.title'),
          description: t('services.categories.specialized.services.financial.description'),
          features: [
            t('services.categories.specialized.services.financial.features.0'),
            t('services.categories.specialized.services.financial.features.1'),
            t('services.categories.specialized.services.financial.features.2')
          ]
        },
        {
          title: t('services.categories.specialized.services.marketing.title'),
          description: t('services.categories.specialized.services.marketing.description'),
          features: [
            t('services.categories.specialized.services.marketing.features.0'),
            t('services.categories.specialized.services.marketing.features.1'),
            t('services.categories.specialized.services.marketing.features.2')
          ]
        },
        {
          title: t('services.categories.specialized.services.literary.title'),
          description: t('services.categories.specialized.services.literary.description'),
          features: [
            t('services.categories.specialized.services.literary.features.0'),
            t('services.categories.specialized.services.literary.features.1'),
            t('services.categories.specialized.services.literary.features.2')
          ]
        }
    ]
  },
    {
      id: 'additional',
      title: t('services.categories.additional.title'),
      icon: <CodeIcon sx={{ fontSize: 60 }} color="primary" />,
      description: t('services.categories.additional.description'),
      services: [
        {
          title: t('services.categories.additional.services.content.title'),
          description: t('services.categories.additional.services.content.description'),
          features: [
            t('services.categories.additional.services.content.features.0'),
            t('services.categories.additional.services.content.features.1'),
            t('services.categories.additional.services.content.features.2')
          ]
        },
        {
          title: t('services.categories.additional.services.software.title'),
          description: t('services.categories.additional.services.software.description'),
          features: [
            t('services.categories.additional.services.software.features.0'),
            t('services.categories.additional.services.software.features.1'),
            t('services.categories.additional.services.software.features.2')
          ]
        },
        {
          title: t('services.categories.additional.services.subtitling.title'),
          description: t('services.categories.additional.services.subtitling.description'),
          features: [
            t('services.categories.additional.services.subtitling.features.0'),
            t('services.categories.additional.services.subtitling.features.1'),
            t('services.categories.additional.services.subtitling.features.2')
          ]
        }
    ]
  }
];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('services.pageTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            {t('services.pageSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Services Overview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {serviceCategories.map((category, index) => (
            <Grid item xs={12} key={category.id}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  mb: 4,
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary">
                      {category.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                      {category.services.map((service) => (
                        <Grid item xs={12} sm={6} key={service.title}>
                          <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="h6" component="h3" gutterBottom>
                                {service.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {service.description}
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <List dense disablePadding>
                                {service.features.map((feature, idx) => (
                                  <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      <CheckCircleOutlineIcon className="check-icon" color="success" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={feature} />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Process Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {t('services.process.title')}
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            {t('services.process.subtitle')}
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {t('services.process.steps', { returnObjects: true }).map((process, index) => {
              // Ensure process.step exists, otherwise use index+1
              const stepNumber = process.step || index + 1;
              return (
                <Grid item xs={12} sm={6} md={4} key={`process-step-${stepNumber}`}>
                  <Box 
                    sx={{ 
                      bgcolor: 'white', 
                      p: 3, 
                      borderRadius: 2, 
                      boxShadow: 1,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '5px',
                        height: '100%',
                        bgcolor: 'primary.main',
                        borderTopLeftRadius: 2,
                        borderBottomLeftRadius: 2
                      }
                    }}
                  >
                    <Box 
                      key={`step-circle-${stepNumber}`}
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      {stepNumber}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {process.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {process.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {t('home.cta.title')}
          </Typography>
          <Typography variant="h6" align="center" paragraph sx={{ mb: 4 }}>
            {t('home.cta.subtitle')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                fontSize: '1.1rem', 
                py: 1.5, 
                px: 4,
                bgcolor: 'white',
                color: 'secondary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              {t('common.buttons.getQuote')}
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              component={RouterLink}
              to="/pricing"
              sx={{ 
                fontSize: '1.1rem', 
                py: 1.5, 
                px: 4,
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              {t('pricing.pageTitle')}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;
