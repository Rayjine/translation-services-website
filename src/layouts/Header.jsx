import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  Container,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logoWebp from '../assets/images/logo-mark.webp';
import logoPng from '../assets/images/logo-mark.png';
import LanguageSwitcher from '../components/LanguageSwitcher';
import OghamMark from '../components/ui/OghamMark';
import { tokens, easing } from '../theme';

const getNavItems = (t) => [
  { name: t('common.menu.home'), path: '/' },
  { name: t('common.menu.services'), path: '/services' },
  { name: t('common.menu.team'), path: '/team' },
  { name: t('common.menu.portfolio'), path: '/portfolio' },
  { name: t('common.menu.pricing'), path: '/pricing' },
  { name: t('common.menu.contact'), path: '/contact' },
];

const Brand = () => (
  <Box
    component={RouterLink}
    to="/"
    aria-label="Ogham Translations"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.25,
      minWidth: 0,
      color: '#fff',
      textDecoration: 'none',
      '&:hover img': { transform: 'rotate(-12deg) scale(1.05)' },
    }}
  >
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt=""
        width="40"
        height="40"
        style={{ display: 'block', transition: `transform .6s ${easing.out}` }}
      />
    </picture>
    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <Typography
        component="span"
        sx={{ fontFamily: '"Literata Variable", serif', fontWeight: 600, fontSize: '1.35rem', letterSpacing: '0.02em', lineHeight: 1.1 }}
      >
        Ogham
      </Typography>
      <Typography
        component="span"
        sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.7 }}
      >
        Translations
      </Typography>
    </Box>
  </Box>
);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navItems = getNavItems(t);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setDrawerOpen(false), [pathname]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        color: '#fff',
        backgroundColor: scrolled ? 'rgba(7, 26, 43, 0.82)' : tokens.ink,
        backdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'rgba(255,255,255,0.08)' : 'transparent',
        boxShadow: scrolled ? '0 10px 30px -18px rgba(0,0,0,0.6)' : 'none',
        transition: 'background-color .35s, box-shadow .35s, border-color .35s',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 64, md: scrolled ? 64 : 78 }, transition: `min-height .35s ${easing.out}`, gap: { xs: 1, sm: 2 } }}
        >
          <Brand />

          {/* Desktop navigation */}
          <Box component="nav" aria-label={t('common.menu.mainNav')} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 0.5 }}>
            {navItems.map((item) => (
              <Box
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                sx={{
                  position: 'relative',
                  px: 1.5,
                  py: 1,
                  color: 'rgba(255,255,255,0.78)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  borderRadius: 999,
                  transition: 'color .2s',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    insetInline: 14,
                    bottom: 2,
                    height: 2,
                    borderRadius: 2,
                    background: tokens.gradient,
                    transform: 'scaleX(0)',
                    transformOrigin: 'center',
                    transition: `transform .35s ${easing.out}`,
                  },
                  '&:hover': { color: '#fff' },
                  '&:hover::after': { transform: 'scaleX(0.5)' },
                  '&.active': { color: '#fff' },
                  '&.active::after': { transform: 'scaleX(1)' },
                }}
              >
                {item.name}
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

          <LanguageSwitcher variant="icon" />

          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
            sx={{ display: { xs: 'none', lg: 'inline-flex' }, whiteSpace: 'nowrap' }}
          >
            {t('common.buttons.getQuote')}
          </Button>

          <IconButton
            size="large"
            edge="end"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            aria-label={t('common.menu.open', { defaultValue: 'Open navigation menu' })}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            color="inherit"
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 380 },
            color: '#fff',
            background: tokens.heroBackground,
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Brand />
          <IconButton onClick={() => setDrawerOpen(false)} color="inherit" aria-label={t('common.menu.close', { defaultValue: 'Close navigation menu' })}>
            <CloseIcon />
          </IconButton>
        </Box>
        <MenuList id="menu-appbar" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item, index) => {
            const active = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
            return (
              <MenuItem
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1.5,
                  px: 1,
                  borderRadius: 3,
                  fontFamily: '"Literata Variable", serif',
                  fontSize: '1.9rem',
                  fontWeight: 600,
                  color: active ? tokens.mint : '#fff',
                  opacity: 0,
                  animation: drawerOpen ? `page-enter .55s ${easing.out} ${120 + index * 55}ms forwards` : 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                }}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuList>
        <Box sx={{ mt: 'auto', pt: 4 }}>
          <Box sx={{ color: tokens.mint, opacity: 0.6, mb: 3, maxWidth: 220 }}>
            <OghamMark text="Ogham" strokeLength={16} strokeWidth={2} animate={drawerOpen} />
          </Box>
          <Button component={RouterLink} to="/contact" variant="contained" color="secondary" size="large" fullWidth>
            {t('common.buttons.getQuote')}
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
