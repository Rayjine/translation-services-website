import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Import logo images
import logoWebp from '../assets/images/logo.webp';
import logoPng from '../assets/images/logo.png';
// Import language switcher
import LanguageSwitcher from '../components/LanguageSwitcher';

// Navigation items defined with translation keys
const getNavItems = (t) => [
  { name: t('common.menu.home'), path: '/' },
  { name: t('common.menu.services'), path: '/services' },
  { name: t('common.menu.team'), path: '/team' },
  { name: t('common.menu.portfolio'), path: '/portfolio' },
  { name: t('common.menu.pricing'), path: '/pricing' },
  { name: t('common.menu.contact'), path: '/contact' }
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  
  // Get navigation items with translations
  const navItems = getNavItems(t);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        width: '100%', 
        backgroundColor: 'primary.main',
        boxShadow: '0 4px 8px rgba(11, 71, 108, 0.15)'
      }}
    >
      <Container maxWidth="xl" sx={{ width: '100%', maxWidth: '100%' }}>
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Box
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              alignItems: 'center'
            }}
          >
            <picture>
              <source srcSet={logoWebp} type="image/webp" />
              <img 
                src={logoPng} 
                alt="Ogham Translations Logo"
                style={{ height: '40px', width: 'auto' }}
              />
            </picture>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            OGHAM
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.name} onClick={handleCloseNavMenu} component={RouterLink} to={item.path}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, alignItems: 'center' }}>
            <picture>
              <source srcSet={logoWebp} type="image/webp" />
              <img 
                src={logoPng} 
                alt="Ogham Translations Logo"
                style={{ height: '32px', width: 'auto' }}
              />
            </picture>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            OGHAM
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(83, 166, 204, 0.2)' // picton-blue with transparency
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Language Switcher */}
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            <LanguageSwitcher variant={isMobile ? 'icon' : 'text'} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
