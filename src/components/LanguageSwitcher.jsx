import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../contexts/DirectionContext';
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Language options with flags (using country codes for flags)
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'rm', name: 'Rumantsch', flag: '🇨🇭' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }

];

const LanguageSwitcher = ({ variant = 'icon' }) => {
  const { i18n, t } = useTranslation();
  const { isRtl } = useDirection();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    handleClose();
  };

  // Find current language
  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <Box>
      {variant === 'icon' ? (
        <Tooltip title={t('common.language')}>
          <IconButton
            onClick={handleClick}
            color="inherit"
            aria-controls={open ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            size="small"
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={handleClick}
        >
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: isRtl ? '0' : '4px', marginLeft: isRtl ? '4px' : '0' }}>{currentLanguage.flag}</span>
            {currentLanguage.name}
            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: isRtl ? 0 : 0.5, mr: isRtl ? 0.5 : 0 }} />
          </Typography>
        </Box>
      )}

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRtl ? 'left' : 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRtl ? 'left' : 'right'
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            bgcolor: 'background.paper',
            mt: 1,
            minWidth: 140
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)}
            selected={i18n.language === lang.code}
            sx={{ 
              py: 1,
              '&.Mui-selected': { 
                bgcolor: 'rgba(0, 168, 232, 0.1)',
                '&:hover': { bgcolor: 'rgba(0, 168, 232, 0.2)' } 
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
            </ListItemIcon>
            <Typography variant="body2">{lang.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
