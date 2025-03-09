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
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

const serviceCategories = [
  {
    id: 'document',
    title: 'Document Translation',
    icon: <DescriptionIcon sx={{ fontSize: 60 }} color="primary" />,
    description: 'Professional translation of various document types with accuracy and attention to detail.',
    services: [
      {
        title: 'Legal Documents',
        description: 'Contracts, agreements, court documents, legal opinions, patents, and certifications.',
        features: ['Certified translations', 'Legal terminology expertise', 'Confidentiality guaranteed']
      },
      {
        title: 'Business Documents',
        description: 'Financial reports, business plans, marketing materials, and corporate communications.',
        features: ['Industry-specific terminology', 'Consistent branding', 'Format preservation']
      },
      {
        title: 'Technical Documents',
        description: 'User manuals, technical specifications, instruction guides, and technical reports.',
        features: ['Technical accuracy', 'Simplified language when needed', 'Subject matter experts']
      },
      {
        title: 'Academic Documents',
        description: 'Diplomas, transcripts, research papers, theses, and academic certifications.',
        features: ['Academic terminology expertise', 'Research-grade translation', 'Citation formatting']
      },
    ]
  },
  {
    id: 'website',
    title: 'Website Translation',
    icon: <LanguageIcon sx={{ fontSize: 60 }} color="primary" />,
    description: 'Comprehensive website localization services to help your business reach global audiences.',
    services: [
      {
        title: 'Website Localization',
        description: 'Complete translation and cultural adaptation of your website content for international markets.',
        features: ['Cultural adaptation', 'SEO optimization', 'User interface adjustment']
      },
      {
        title: 'E-commerce Translation',
        description: 'Product descriptions, categories, checkout processes, and customer support content.',
        features: ['Consistent product terminology', 'Payment method localization', 'Customer-centric language']
      },
      {
        title: 'CMS Integration',
        description: 'Integration with WordPress, Shopify, and other content management systems.',
        features: ['Plugin compatibility', 'Multi-language setup', 'Automatic content synchronization']
      },
      {
        title: 'Multilingual SEO',
        description: 'Keyword research and optimization for multiple target markets.',
        features: ['Local keyword research', 'Meta tag optimization', 'SEO-friendly URLs']
      }
    ]
  },
  {
    id: 'specialized',
    title: 'Specialized Translations',
    icon: <BusinessIcon sx={{ fontSize: 60 }} color="primary" />,
    description: 'Expert translations for specific industries requiring specialized knowledge and terminology.',
    services: [
      {
        title: 'Medical Translation',
        description: 'Medical records, pharmaceutical documents, clinical trials, and healthcare materials.',
        features: ['Medical terminology expertise', 'Regulatory compliance', 'Patient-friendly language']
      },
      {
        title: 'Financial Translation',
        description: 'Financial statements, investment reports, banking documents, and insurance materials.',
        features: ['Financial terminology accuracy', 'Numerical formatting', 'Regulatory compliance']
      },
      {
        title: 'Marketing Translation',
        description: 'Marketing campaigns, brochures, advertisements, and promotional materials.',
        features: ['Creative adaptation', 'Cultural relevance', 'Brand voice preservation']
      },
      {
        title: 'Literary Translation',
        description: 'Books, poetry, scripts, and creative works that maintain the author\'s style and intent.',
        features: ['Stylistic faithfulness', 'Cultural nuance', 'Creative adaptation']
      }
    ]
  },
  {
    id: 'additional',
    title: 'Additional Services',
    icon: <CodeIcon sx={{ fontSize: 60 }} color="primary" />,
    description: 'Complementary language services to meet your digital communication needs.',
    services: [
      {
        title: 'Content Creation',
        description: 'Original multilingual content creation tailored to your target markets.',
        features: ['Native-speaking copywriters', 'Market-specific content', 'SEO optimization']
      },
      {
        title: 'Software Localization',
        description: 'Translation and adaptation of software interfaces, apps, and games.',
        features: ['UI/UX consideration', 'String management', 'Testing and quality assurance']
      },
      {
        title: 'Subtitling',
        description: 'Multimedia translation services for videos and films requiring text translations.',
        features: ['Timing synchronization', 'Cultural adaptation', 'Multilingual support']
      }
    ]
  }
];

const Services = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Professional translation solutions for every need
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
                                      <CheckCircleOutlineIcon color="success" fontSize="small" />
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
            Our Translation Process
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            We follow a rigorous process to ensure the highest quality translations for your content:
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              { step: 1, title: 'Project Analysis', description: 'We analyze your content, requirements, and target audience to determine the best approach.' },
              { step: 2, title: 'Translation', description: 'Our native-speaking translators expertly convert your content to the target language.' },
              { step: 3, title: 'Editing & Review', description: 'A second linguist reviews the translation for accuracy, consistency, and style.' },
              { step: 4, title: 'Quality Assurance', description: 'Rigorous quality checks ensure your translation meets our high standards.' },
              { step: 5, title: 'Client Review', description: 'We implement your feedback and make any necessary adjustments.' },
              { step: 6, title: 'Delivery', description: 'Your finalized translation is delivered in your preferred format, on time and on budget.' }
            ].map((process) => (
              <Grid item xs={12} sm={6} md={4} key={process.step}>
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
                    {process.step}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {process.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {process.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Need a Translation?
          </Typography>
          <Typography variant="h6" align="center" paragraph sx={{ mb: 4 }}>
            Contact us today for a free quote on your translation project.
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
              Request a Quote
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
              View Pricing
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;
