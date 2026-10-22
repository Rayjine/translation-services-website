import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../contexts/DirectionContext';
import { Box, ButtonBase, Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../theme';

// Native language names, so every visitor can find their own language.
const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'rm', name: 'Rumantsch' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'uk', name: 'Українська' },
  { code: 'cs', name: 'Čeština' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
];

const LanguageSwitcher = ({ variant = 'icon' }) => {
  const { i18n, t } = useTranslation();
  const { isRtl } = useDirection();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setAnchorEl(null);
  };

  const currentCode = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
  const currentLanguage = languages.find((l) => l.code === currentCode) || languages[0];
  const compact = variant === 'icon';

  return (
    <Box>
      <ButtonBase
        id="language-button"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label={`${t('common.languageSelector')}: ${currentLanguage.name}`}
        sx={{
          gap: 0.75,
          px: compact ? 1 : 1.5,
          py: 0.75,
          borderRadius: 999,
          color: 'inherit',
          border: '1px solid rgba(255,255,255,0.22)',
          fontFamily: 'inherit',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'background-color .2s, border-color .2s',
          '&:hover, &.Mui-focusVisible': { bgcolor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.45)' },
        }}
      >
        <LanguageIcon sx={{ fontSize: 18 }} className="keep-direction" />
        {compact ? (
          <Box component="span" sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8rem' }}>
            {currentLanguage.code}
          </Box>
        ) : (
          <Box component="span">{currentLanguage.name}</Box>
        )}
        <KeyboardArrowDownIcon
          sx={{ fontSize: 18, transition: 'transform .25s', transform: open ? 'rotate(180deg)' : 'none' }}
          className="keep-direction"
        />
      </ButtonBase>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'language-button',
          sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 0.5, p: 1 },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: isRtl ? 'left' : 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: isRtl ? 'left' : 'right' }}
        slotProps={{ paper: { sx: { mt: 1.5, minWidth: { xs: 200, sm: 320 } } } }}
      >
        {languages.map((lang) => {
          const selected = currentCode === lang.code;
          return (
            <MenuItem
              key={lang.code}
              lang={lang.code}
              onClick={() => changeLanguage(lang.code)}
              selected={selected}
              sx={{
                borderRadius: 2,
                py: 1,
                gap: 1.5,
                '&.Mui-selected': { bgcolor: 'rgba(59,155,92,0.12)', '&:hover': { bgcolor: 'rgba(59,155,92,0.18)' } },
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: selected ? tokens.shamrockText : tokens.textMuted,
                  width: 22,
                }}
              >
                {lang.code}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: selected ? 700 : 500, flexGrow: 1 }}>
                {lang.name}
              </Typography>
              {selected && <CheckIcon sx={{ fontSize: 16, color: tokens.shamrock }} className="check-icon" />}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
