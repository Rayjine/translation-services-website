import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: '#092d44', color: 'white', py: 6, mt: 'auto', width: '100%' }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              OGHAM TRANSLATIONS
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Professional translation services in multiple languages. Quality, accuracy, and timeliness guaranteed.
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
              Quick Links
            </Typography>
            <Box component="nav">
              <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Home
              </Link>
              <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Services
              </Link>
              <Link component={RouterLink} to="/team" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Our Team
              </Link>
              <Link component={RouterLink} to="/pricing" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Pricing
              </Link>
              <Link component={RouterLink} to="/portfolio" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Portfolio
              </Link>
              {/* Blog link temporarily removed */}
              <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Contact Us
              </Link>
              <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Terms & Conditions
              </Link>
              <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#53a6cc' } }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Geneva, Zurich, Lugano - Switzerland
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: <Link href="mailto:info@oghamtranslations.com" sx={{ color: 'inherit', '&:hover': { color: '#53a6cc' } }}>info@oghamtranslations.com</Link>
            </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="body2" align="center" sx={{ pt: 4, borderTop: '1px solid rgba(83, 166, 204, 0.3)', mt: 4 }}>
          © {currentYear} Ogham Translations. All rights reserved. <Link component={RouterLink} to="/terms" color="inherit" sx={{ '&:hover': { color: '#53a6cc' } }}>Terms & Conditions</Link> | <Link component={RouterLink} to="/privacy" color="inherit" sx={{ '&:hover': { color: '#53a6cc' } }}>Privacy Policy</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
