import { Box, Typography, Link } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Reveal from '../ui/Reveal';
import OghamMark from '../ui/OghamMark';
import { tokens, fonts, easing } from '../../theme';

const IconTile = ({ children }) => (
  <Box
    aria-hidden
    className="info-row__icon"
    sx={{
      width: 44,
      height: 44,
      flex: '0 0 44px',
      borderRadius: '14px',
      display: 'grid',
      placeItems: 'center',
      color: tokens.mint,
      bgcolor: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      transition: `background-color .3s, border-color .3s, transform .4s ${easing.out}`,
      '& svg': { fontSize: 21 },
    }}
  >
    {children}
  </Box>
);

const rowSx = {
  display: 'flex',
  gap: 2,
  alignItems: 'flex-start',
  py: 2.25,
  borderTop: '1px solid rgba(255,255,255,0.1)',
  '&:hover .info-row__icon': {
    bgcolor: 'rgba(125,219,163,0.14)',
    borderColor: 'rgba(125,219,163,0.4)',
    transform: 'rotate(-6deg)',
  },
};

const labelSx = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.62)',
  mb: 0.5,
};

const InfoCard = () => {
  const { t } = useTranslation();
  const hours = [
    { key: 'weekdays', text: t('contact.contactInfo.weekdays') },
    { key: 'saturday', text: t('contact.contactInfo.saturday') },
    { key: 'sunday', text: t('contact.contactInfo.sunday'), muted: true },
  ];

  return (
    <Box
      className="grain"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
        borderRadius: '22px',
        color: '#fff',
        background: tokens.heroBackground,
        p: { xs: 3, md: 4 },
        boxShadow: '0 30px 60px -30px rgba(7,26,43,0.55)',
      }}
    >
      <Typography
        component="h2"
        sx={{ fontFamily: fonts.display, fontWeight: 600, fontSize: { xs: '1.6rem', md: '1.75rem' }, lineHeight: 1.2, mb: 1 }}
      >
        {t('contact.contactInfo.title')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.74)', mb: 2.5 }}>
        {t('contact.contactInfo.reachOut')}
      </Typography>
      <Box sx={{ color: tokens.mint, opacity: 0.85, mb: 1.5, width: 230, maxWidth: '100%' }}>
        <OghamMark text="Contact" strokeLength={14} strokeWidth={2} stagger={55} delay={200} sx={{ width: '100%', height: 'auto' }} />
      </Box>

      <Box sx={rowSx}>
        <IconTile><MailOutlineIcon className="keep-direction" /></IconTile>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" sx={labelSx}>{t('common.footer.email')}</Typography>
          <Link
            href="mailto:info@oghamtranslations.com"
            underline="none"
            sx={{
              color: '#fff',
              fontWeight: 600,
              wordBreak: 'break-word',
              backgroundImage: `linear-gradient(${tokens.mint}, ${tokens.mint})`,
              backgroundSize: '0% 1.5px',
              backgroundPosition: 'left bottom',
              backgroundRepeat: 'no-repeat',
              transition: `background-size .4s ${easing.out}, color .2s`,
              '[dir="rtl"] &': { backgroundPosition: 'right bottom' },
              '&:hover, &:focus-visible': { color: tokens.mint, backgroundSize: '100% 1.5px' },
            }}
          >
            info@oghamtranslations.com
          </Link>
        </Box>
      </Box>

      <Box sx={rowSx}>
        <IconTile><PlaceOutlinedIcon className="keep-direction" /></IconTile>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.86)', pt: 1.25 }}>
          {t('contact.contactInfo.address')}
        </Typography>
      </Box>

      <Box sx={{ ...rowSx, pb: 0 }}>
        <IconTile><AccessTimeIcon className="keep-direction" /></IconTile>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography component="h3" sx={labelSx}>{t('contact.contactInfo.businessHours')}</Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {hours.map((h) => (
              <Box
                component="li"
                key={h.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  py: 0.4,
                  fontSize: '0.95rem',
                  color: h.muted ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)',
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{ width: 10, height: 2, borderRadius: 2, flex: '0 0 auto', bgcolor: h.muted ? 'rgba(255,255,255,0.35)' : tokens.mint }}
                />
                {h.text}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const UrgentCard = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '22px',
        bgcolor: '#fff',
        border: `1px solid ${tokens.line}`,
        p: { xs: 2.75, sm: 3, md: 4 },
        boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 18px 40px -26px rgba(7,26,43,0.3)',
        '&::before': {
          content: '""',
          position: 'absolute',
          insetBlock: 0,
          insetInlineStart: 0,
          width: 4,
          background: `linear-gradient(to bottom, ${tokens.shamrock}, ${tokens.picton})`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box
          aria-hidden
          sx={{
            width: 40,
            height: 40,
            flex: '0 0 40px',
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            position: 'relative',
            color: tokens.shamrock,
            bgcolor: alpha(tokens.shamrock, 0.1),
            // Soft ring that breathes out from the icon (transform/opacity only).
            '@keyframes urgent-pulse': {
              '0%': { transform: 'scale(1)', opacity: 0.55 },
              '70%, 100%': { transform: 'scale(1.45)', opacity: 0 },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              border: `1.5px solid ${alpha(tokens.shamrock, 0.5)}`,
              animation: 'urgent-pulse 2.8s ease-out infinite',
            },
          }}
        >
          <BoltOutlinedIcon className="keep-direction" sx={{ fontSize: 22 }} />
        </Box>
        <Typography component="h2" sx={{ fontFamily: fonts.display, fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.25, color: tokens.text }}>
          {t('contact.contactInfo.immediateAssistance')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: tokens.textMuted, mb: 2 }}>
        {t('contact.contactInfo.urgentNeeds')}
      </Typography>
      <Link
        href="mailto:urgent@oghamtranslations.com"
        underline="none"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          minHeight: 48,
          mb: 2.5,
          px: { xs: 1.75, sm: 2 },
          py: 1,
          borderRadius: '14px',
          border: `1px solid ${alpha(tokens.indigo, 0.14)}`,
          bgcolor: alpha(tokens.sky, 0.22),
          color: tokens.indigo,
          fontWeight: 700,
          fontSize: { xs: '0.875rem', sm: '0.95rem' },
          overflowWrap: 'anywhere',
          transition: `background-color .25s, border-color .25s, transform .3s ${easing.out}`,
          '& .urgent-arrow': { marginInlineStart: 'auto', transition: `transform .3s ${easing.out}` },
          '&:hover': { bgcolor: alpha(tokens.sky, 0.4), borderColor: alpha(tokens.indigo, 0.3) },
          '&:hover .urgent-arrow': { transform: 'translateX(4px)' },
          '[dir="rtl"] &:hover .urgent-arrow': { transform: 'translateX(-4px)' },
        }}
      >
        <MailOutlineIcon aria-hidden className="keep-direction" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 20, flex: '0 0 auto' }} />
        <Box component="span" sx={{ minWidth: 0 }}>{t('contact.contactInfo.urgentEmail')}</Box>
        <Box component="span" className="urgent-arrow" aria-hidden sx={{ display: 'inline-flex', flex: '0 0 auto' }}>
          <ArrowForwardIcon className="flip-in-rtl" sx={{ fontSize: 18 }} />
        </Box>
      </Link>
      <Typography
        variant="body2"
        // Pinned to the bottom when the card is stretched beside the info card (tablet).
        sx={{ color: tokens.textMuted, mt: 'auto', pt: 2.5, borderTop: `1px dashed ${tokens.line}`, fontSize: '0.875rem' }}
      >
        {t('contact.contactInfo.responseTime')}
      </Typography>
    </Box>
  );
};

/** Sticky side column of the contact page: contact details + urgent help. */
const ContactAside = () => (
  <Box
    component="aside"
    sx={{
      position: { lg: 'sticky' },
      top: { lg: 100 },
      display: 'grid',
      // Stacked on phones, two-up under the form on tablets, single column beside the form on desktop.
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr' },
      gap: 3,
    }}
  >
    <Reveal delay={120} sx={{ height: '100%' }}>
      <InfoCard />
    </Reveal>
    <Reveal delay={220} sx={{ height: '100%' }}>
      <UrgentCard />
    </Reveal>
  </Box>
);

export default ContactAside;
