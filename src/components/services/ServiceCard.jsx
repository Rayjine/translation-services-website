import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { tokens, fonts, easing } from '../../theme';

/**
 * One sub-service: index label, serif title, description and a check list.
 * Lifts on hover while a gradient rule "carves" itself along the top edge.
 * `wide` lays the features out in columns when the card spans the whole row.
 */
const ServiceCard = ({ index, title, description, features, wide = false }) => (
  <Box
    component="article"
    sx={{
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: { xs: 3, md: 3.5 },
      borderRadius: '22px',
      bgcolor: '#fff',
      border: `1px solid ${tokens.line}`,
      boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 12px 32px -22px rgba(7,26,43,0.22)',
      overflow: 'hidden',
      isolation: 'isolate',
      transition: `transform .5s ${easing.out}, box-shadow .5s ${easing.out}, border-color .5s`,
      // Gradient rule along the top edge, drawn from the reading-start side on hover.
      '&::before': {
        content: '""',
        position: 'absolute',
        insetInline: 0,
        top: 0,
        height: 3,
        background: tokens.gradient,
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        transition: `transform .6s ${easing.out}`,
      },
      '[dir="rtl"] &::before': { transformOrigin: 'right center' },
      // Soft wash that blooms from the top corner.
      '&::after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        width: 260,
        height: 260,
        top: -130,
        insetInlineEnd: -110,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(tokens.mint, 0.28)}, transparent 70%)`,
        opacity: 0,
        transform: 'scale(.6)',
        transition: `opacity .6s ${easing.out}, transform .8s ${easing.out}`,
      },
      '@media (hover: hover)': {
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: alpha(tokens.picton, 0.35),
          boxShadow: '0 2px 4px rgba(7,26,43,0.04), 0 30px 60px -30px rgba(7,26,43,0.38)',
        },
        '&:hover::before': { transform: 'scaleX(1)' },
        '&:hover::after': { opacity: 1, transform: 'scale(1)' },
        '&:hover .service-card__index': { color: tokens.shamrock, borderColor: alpha(tokens.shamrock, 0.45) },
      },
    }}
  >
    <Box
      aria-hidden
      className="service-card__index"
      sx={{
        alignSelf: 'flex-start',
        mb: 2.5,
        px: 1.25,
        py: 0.25,
        borderRadius: 999,
        border: `1px solid ${tokens.line}`,
        color: tokens.textMuted,
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        fontVariantNumeric: 'tabular-nums',
        direction: 'ltr',
        transition: 'color .4s, border-color .4s',
      }}
    >
      {index}
    </Box>

    <Typography
      component="h3"
      sx={{
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: { xs: '1.3rem', md: '1.4rem' },
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        color: tokens.text,
        mb: 1.25,
        overflowWrap: 'anywhere',
        hyphens: 'auto',
      }}
    >
      {title}
    </Typography>

    <Typography variant="body2" sx={{ color: tokens.textMuted, mb: 2.5 }}>
      {description}
    </Typography>

    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        mt: 'auto',
        pt: 2.5,
        borderTop: `1px dashed ${tokens.line}`,
        display: 'grid',
        gap: 1.25,
        gridTemplateColumns: wide ? { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' } : '1fr',
        columnGap: 3,
      }}
    >
      {features.map((feature, i) => (
        <Box
          component="li"
          key={i}
          sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, fontSize: '0.95rem', lineHeight: 1.5, color: tokens.text }}
        >
          <Box
            aria-hidden
            sx={{
              flexShrink: 0,
              mt: '1px',
              width: 22,
              height: 22,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(tokens.mint, 0.3),
              color: '#2a7043',
            }}
          >
            <CheckIcon className="check-icon" sx={{ fontSize: 14 }} />
          </Box>
          <span>{feature}</span>
        </Box>
      ))}
    </Box>
  </Box>
);

export default ServiceCard;
