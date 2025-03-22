import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ bgcolor: '#092d44', color: 'white', py: 6, mt: 'auto', width: '100%' }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              OGHAM TRANSLATIONS
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('common.footer.about')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#53a6cc', '&:hover': { color: '#3b9b5c' } }} aria-label="Facebook" component="a" href="#" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#53a6cc', '&:hover': { color: '#3b9b5c' } }} aria-label="Twitter" component="a" href="#" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#53a6cc', '&:hover': { color: '#3b9b5c' } }} aria-label="LinkedIn" component="a" href="#" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton sx={{ color: '#53a6cc', '&:hover': { color: '#3b9b5c' } }} aria-label="Instagram" component="a" href="#" target="_blank">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('common.footer.quickLinks')}
            </Typography>
            <Box component="nav">
              <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.menu.home')}
              </Link>
              <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.menu.services')}
              </Link>
              <Link component={RouterLink} to="/team" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.menu.team')}
              </Link>
              <Link component={RouterLink} to="/pricing" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.menu.pricing')}
              </Link>
              <Link component={RouterLink} to="/portfolio" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.menu.portfolio')}
              </Link>
              {/* Blog link temporarily removed */}
              <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.menu.contact')}
              </Link>
              <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.footer.termsConditions')}
              </Link>
              <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                {t('common.footer.privacyPolicy')}
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('common.footer.contactUs')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t('common.footer.address')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t('common.footer.email')}: <Link href="mailto:info@oghamtranslations.com" sx={{ color: 'inherit', '&:hover': { color: '#53a6cc' } }}>info@oghamtranslations.com</Link>
            </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="body2" align="center" sx={{ pt: 4, borderTop: '1px solid rgba(83, 166, 204, 0.3)', mt: 4 }}>
          © {currentYear} Ogham Translations. {t('common.footer.allRightsReserved')}. <Link component={RouterLink} to="/terms" color="inherit" sx={{ '&:hover': { color: '#53a6cc' } }}>{t('common.footer.termsConditions')}</Link> | <Link component={RouterLink} to="/privacy" color="inherit" sx={{ '&:hover': { color: '#53a6cc' } }}>{t('common.footer.privacyPolicy')}</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
