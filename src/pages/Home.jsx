import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import TranslateIcon from '@mui/icons-material/Translate';
import PublicIcon from '@mui/icons-material/Public';

const languages = [
  'English', 'French', 'German', 'Italian',
  'Romansh', 'Spanish', 'Portuguese', 'Russian',
  'Ukrainian', 'Mandarin', 'Japanese', 'Arabic'
];

// Different scripts for "Ogham Translation Services"
const scriptExamples = [
  'Ogham Translation Services',                        // English
  'Огам Сервисы Переводов',  // Cyrillic (Russian)
  'خدمات الترجمة أوغام',              // Arabic
  '奥甘翻译服务',                                        // Mandarin
  'オーガム翻訳サービス',                          // Japanese
  'Services de Traduction Ogham',                     // French
  'Ogham Übersetzungsdienste',                     // German
  'Servizi di Traduzione Ogham',                     // Italian
  'Servicios de Traducción Ogham'                   // Spanish
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, scriptIndex]);

  const handleTyping = () => {
    // Current full text to type
    const fullText = scriptExamples[scriptIndex];
    
    // If deleting
    if (isDeleting) {
      // Remove one character
      setText(fullText.substring(0, text.length - 1));
      // Speed up deletion
      setSpeed(50);
      
      // When deletion is complete
      if (text.length === 0) {
        setIsDeleting(false);
        // Move to next script
        setScriptIndex((scriptIndex + 1) % scriptExamples.length);
      }
    } 
    // If typing
    else {
      // Add one character
      setText(fullText.substring(0, text.length + 1));
      // Slow down typing
      setSpeed(100);
      
      // When typing is complete
      if (text.length === fullText.length) {
        // Pause at the end
        setSpeed(1500);
        setIsDeleting(true);
      }
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Bridging Languages, Preserving Cultures
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 300,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Accurate, culturally attuned translation services tailored to your needs — in over 10 languages.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{ 
                  mr: 2,
                  mb: { xs: 2, sm: 0 }, 
                  fontSize: '1.1rem', 
                  py: 1.5, 
                  px: 3 
                }}
              >
                Get a Quote
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                component={RouterLink}
                to="/services"
                sx={{ 
                  fontSize: '1.1rem', 
                  py: 1.5, 
                  px: 3,
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Our Services
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: '400px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Animated text showing Ogham Translation Services in different scripts */}
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    minHeight: '120px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {text}
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: '4px',
                      height: '1.2em',
                      backgroundColor: 'white',
                      marginLeft: '4px',
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%': { opacity: '1' },
                        '50%': { opacity: '0' },
                        '100%': { opacity: '1' }
                      }
                    }}
                  />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              About Ogham Translations
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2022, Ogham Translations is a boutique translation company committed to delivering exceptional language solutions with meticulous attention to detail.
              We provide personalized, high-quality translation services for businesses and individuals worldwide.
            </Typography>
            <Typography variant="body1" paragraph>
              Our team of professional translators are native speakers with expertise in their respective fields,
              ensuring accurate and culturally appropriate translations for all your needs.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/team" 
              sx={{ mt: 2 }}
            >
              Meet Our Team
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom align="center">
                Why Choose Us?
              </Typography>
              <Grid container spacing={2}>
                {[
                  { icon: <LanguageIcon color="primary" fontSize="large" />, title: 'Multiple Languages', description: 'Over 10 languages available' },
                  { icon: <DescriptionIcon color="primary" fontSize="large" />, title: 'Document Expertise', description: 'Technical, legal, medical & more' },
                  { icon: <TranslateIcon color="primary" fontSize="large" />, title: 'Certified Translators', description: 'Professional and qualified team' }
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 2 }}>{item.icon}</Box>
                      <Box>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Languages Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Languages We Offer
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6 }}>
            Our team of professional translators covers a wide range of languages from around the world.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {languages.map((language) => (
              <Grid item key={language}>
                <Box 
                  sx={{ 
                    px: 3, 
                    py: 2, 
                    border: '1px solid', 
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Typography variant="subtitle1">{language}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Preview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our Services
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6 }}>
          We offer a comprehensive range of translation services to meet all your needs.
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Document Translation',
              image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=500&auto=format&fit=crop&q=60',
              description: 'Professional translation of legal documents, contracts, certificates, and more.'
            },
            {
              title: 'Website Localization',
              image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60',
              description: 'Adapt your website content for different regions and languages to reach a global audience.'
            },
            {
              title: 'Technical Translation',
              image: 'https://images.unsplash.com/photo-1433840496881-cbd845929862?w=500&auto=format&fit=crop&q=60',
              description: 'Accurate translation of technical manuals, guides, and specifications.'
            }
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={RouterLink}
            to="/services"
          >
            View All Services
          </Button>
        </Box>
      </Container>

      {/* Portfolio Showcase Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                Our Translation Portfolio
              </Typography>
              <Typography variant="body1" paragraph>
                Explore our showcase of translation work across various industries and language pairs. See firsthand the quality and attention to detail that sets Ogham Translation Services apart.
              </Typography>
              <Typography variant="body1" paragraph>
                Our portfolio features samples of legal documents, technical manuals, marketing materials, and creative content translated with meticulous precision and cultural sensitivity.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={RouterLink}
                to="/portfolio"
                sx={{ mt: 2 }}
              >
                View Our Portfolio
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?w=500&auto=format&fit=crop&q=60"
                  alt="Translation Portfolio"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    borderRadius: 2,
                    boxShadow: 6,
                    transform: 'rotate(2deg)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" align="center" paragraph sx={{ mb: 4 }}>
            Contact us today for a free quote on your translation project.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
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
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
