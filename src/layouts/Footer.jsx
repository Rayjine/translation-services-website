import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import logoWebp from '../assets/images/logo-mark.webp';
import logoPng from '../assets/images/logo-mark.png';
import OghamMark from '../components/ui/OghamMark';
import { tokens } from '../theme';

const linkSx = {
  color: 'rgba(255,255,255,0.72)',
  textDecoration: 'none',
  display: 'inline-block',
  py: 0.5,
  transition: 'color .2s, transform .25s',
  '&:hover': { color: tokens.mint, transform: 'translateX(3px)' },
  '[dir="rtl"] &:hover': { transform: 'translateX(-3px)' },
};

const headingSx = {
  fontSize: '0.75rem',
  fontWeight: 800,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: tokens.mint,
  mb: 2,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const explore = [
    { to: '/', label: t('common.menu.home') },
    { to: '/services', label: t('common.menu.services') },
    { to: '/team', label: t('common.menu.team') },
    { to: '/portfolio', label: t('common.menu.portfolio') },
    { to: '/pricing', label: t('common.menu.pricing') },
    { to: '/contact', label: t('common.menu.contact') },
  ];

  return (
    <Box
      component="footer"
      className="grain"
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: tokens.ink, color: '#fff', pt: { xs: 8, md: 10 }, pb: 4, mt: 'auto' }}
    >
      {/* Oversized carved "Ogham" running behind the footer. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          insetInline: { xs: '-10%', md: '-2%' },
          bottom: { xs: 72, md: 56 },
          color: tokens.picton,
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        <OghamMark text="Ogham Translations" strokeLength={34} strokeWidth={1.75} stagger={45} sx={{ width: '100%', height: 'auto' }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 5, md: 6 }}>
          <Grid item xs={12} md={5}>
            <Box component={RouterLink} to="/" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, color: '#fff', textDecoration: 'none', mb: 2.5 }}>
              <picture>
                <source srcSet={logoWebp} type="image/webp" />
                <img src={logoPng} alt="" width="48" height="48" style={{ display: 'block' }} loading="lazy" />
              </picture>
              <Typography component="span" sx={{ fontFamily: '"Literata Variable", serif', fontSize: '1.6rem', fontWeight: 600 }}>
                Ogham Translations
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 380, fontSize: '1rem' }}>
              {t('common.footer.about')}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography component="h2" sx={headingSx}>{t('common.footer.quickLinks')}</Typography>
            <Box component="nav" aria-label={t('common.footer.quickLinks')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {explore.map((item) => (
                <Link key={item.to} component={RouterLink} to={item.to} sx={linkSx}>
                  {item.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography component="h2" sx={headingSx}>{t('common.footer.contactUs')}</Typography>
            <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', mb: 2, color: 'rgba(255,255,255,0.72)' }}>
              <PlaceOutlinedIcon sx={{ fontSize: 20, mt: '3px', color: tokens.picton }} className="keep-direction" />
              <Typography variant="body2">{t('common.footer.address')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', color: 'rgba(255,255,255,0.72)' }}>
              <MailOutlineIcon sx={{ fontSize: 20, mt: '3px', color: tokens.picton }} className="keep-direction" />
              <Link
                href="mailto:info@oghamtranslations.com"
                aria-label={`${t('common.footer.email')}: info@oghamtranslations.com`}
                sx={{ ...linkSx, py: 0, wordBreak: 'break-word' }}
              >
                info@oghamtranslations.com
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 12, md: 14 },
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)' }}>
            &copy; {currentYear} Ogham Translations. {t('common.footer.allRightsReserved')}.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link component={RouterLink} to="/terms" sx={{ ...linkSx, py: 0, fontSize: '0.875rem' }}>
              {t('common.footer.termsConditions')}
            </Link>
            <Link component={RouterLink} to="/privacy" sx={{ ...linkSx, py: 0, fontSize: '0.875rem' }}>
              {t('common.footer.privacyPolicy')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
