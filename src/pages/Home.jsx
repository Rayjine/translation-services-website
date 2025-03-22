import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

// Language keys for translations
const languageKeys = [
  'english', 'french', 'german', 'italian',
  'romansh', 'spanish', 'portuguese', 'russian',
  'ukrainian', 'mandarin', 'japanese', 'arabic',
  'czech', 'turkish'
];

// Different scripts for "Ogham Translation Services"
const scriptExamples = [
  'Ogham Translation Services',                 // English
  'Огам Сервисы Переводов',                     // Cyrillic (Russian)
  'خدمات الترجمة أوغام',                            // Arabic
  '奥甘翻译服务',                                 // Mandarin
  'オーガム翻訳サービス',                          // Japanese
  'Services de Traduction Ogham',               // French
  'Ogham Übersetzungsdienste',                  // German
  'Servizi di Traduzione Ogham',                // Italian
  'Servicios de Traducción Ogham'               // Spanish
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  
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
                {t('home.hero.title')}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 300,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                {t('home.hero.subtitle')}
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
                {t('common.buttons.getQuote')}
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
                {t('common.buttons.ourServices')}
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
              {t('home.about.title')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('home.about.paragraph1')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('home.about.paragraph2')}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/team" 
              sx={{ mt: 2 }}
            >
              {t('home.about.meetTeam')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom align="center">
                {t('home.whyChooseUs.title')}
              </Typography>
              <Grid container spacing={2}>
                {[
                  { icon: <LanguageIcon color="primary" fontSize="large" />, title: t('home.whyChooseUs.multipleLanguages.title'), description: t('home.whyChooseUs.multipleLanguages.description') },
                  { icon: <DescriptionIcon color="primary" fontSize="large" />, title: t('home.whyChooseUs.documentExpertise.title'), description: t('home.whyChooseUs.documentExpertise.description') },
                  { icon: <TranslateIcon color="primary" fontSize="large" />, title: t('home.whyChooseUs.certifiedTranslators.title'), description: t('home.whyChooseUs.certifiedTranslators.description') }
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
            {t('home.languages.title')}
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6 }}>
            {t('home.languages.subtitle')}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {languageKeys.map((key) => (
              <Grid item key={key}>
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
                  <Typography variant="subtitle1">{t(`home.languages.list.${key}`)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Preview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {t('home.services.title')}
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6 }}>
          {t('home.services.subtitle')}
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: t('home.services.documentTranslation.title'),
              image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=500&auto=format&fit=crop&q=60',
              description: t('home.services.documentTranslation.description')
            },
            {
              title: t('home.services.websiteLocalization.title'),
              image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60',
              description: t('home.services.websiteLocalization.description')
            },
            {
              title: t('home.services.technicalTranslation.title'),
              image: 'https://images.unsplash.com/photo-1433840496881-cbd845929862?w=500&auto=format&fit=crop&q=60',
              description: t('home.services.technicalTranslation.description')
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
            {t('common.buttons.viewAll')}
          </Button>
        </Box>
      </Container>

      {/* Portfolio Showcase Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                {t('home.portfolioShowcase.title')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('home.portfolioShowcase.paragraph1')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('home.portfolioShowcase.paragraph2')}
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={RouterLink}
                to="/portfolio"
                sx={{ mt: 2 }}
              >
                {t('home.portfolioShowcase.viewButton')}
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
            {t('home.cta.title')}
          </Typography>
          <Typography variant="h6" align="center" paragraph sx={{ mb: 4 }}>
            {t('home.cta.subtitle')}
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
              {t('home.cta.button')}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
