import { Box, Button, Card, Typography } from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OghamMark from '../ui/OghamMark';
import { tokens, easing, fonts } from '../../theme';

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
  p: 0,
  m: '-1px',
};

// Light travelling around the featured card's border. Only `transform` animates.
const orbit = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const FeatureIcon = ({ included, dark }) => (
  <Box
    aria-hidden
    sx={{
      flexShrink: 0,
      width: 24,
      height: 24,
      mt: '2px',
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      ...(included
        ? {
            bgcolor: dark ? alpha(tokens.mint, 0.16) : alpha(tokens.shamrock, 0.12),
            color: dark ? tokens.mint : tokens.shamrock,
          }
        : {
            border: `1px dashed ${dark ? 'rgba(255,255,255,0.3)' : tokens.line}`,
            color: dark ? 'rgba(255,255,255,0.45)' : alpha(tokens.textMuted, 0.7),
          }),
    }}
  >
    {included ? (
      <CheckIcon className="check-icon" sx={{ fontSize: 15 }} />
    ) : (
      <RemoveIcon className="keep-direction" sx={{ fontSize: 14 }} />
    )}
  </Box>
);

/**
 * One pricing package. `featured` renders the dark, elevated card with an
 * orbiting gradient border and the "most popular" badge.
 */
const PlanCard = ({ plan, index, featured = false, t }) => {
  const dark = featured;
  const muted = dark ? 'rgba(255,255,255,0.72)' : tokens.textMuted;

  const card = (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 3.5, md: 3, lg: 4 },
        overflow: 'hidden',
        ...(dark
          ? {
              color: '#fff',
              background: tokens.heroBackground,
              border: 'none',
              borderRadius: '24px',
              boxShadow: 'none',
            }
          : {
              transition: `transform .5s ${easing.out}, box-shadow .5s ${easing.out}, border-color .3s`,
              '@media (hover: hover)': {
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: alpha(tokens.picton, 0.45),
                  boxShadow: '0 2px 4px rgba(7,26,43,0.04), 0 30px 60px -28px rgba(7,26,43,0.35)',
                },
                '&:hover .plan-ogham': { opacity: 1 },
              },
            }),
      }}
    >
      {dark && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            insetInlineEnd: -80,
            top: -80,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(tokens.mint, 0.22)}, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Plan index + the plan name carved in Ogham */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3, mt: featured ? 1 : 0 }}>
        <Typography
          component="span"
          aria-hidden
          sx={{ fontFamily: fonts.display, fontWeight: 600, fontSize: '0.95rem', color: dark ? tokens.mint : tokens.shamrockText, letterSpacing: '0.08em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </Typography>
        <Box
          className="plan-ogham"
          sx={{ color: dark ? tokens.mint : tokens.picton, opacity: dark ? 0.85 : 0.6, transition: 'opacity .4s', minWidth: 0 }}
        >
          <OghamMark text={plan.ogham} strokeLength={9} strokeWidth={1.75} stagger={40} delay={200 + index * 120} sx={{ height: 30, width: 'auto', maxWidth: 170 }} />
        </Box>
      </Box>

      <Typography variant="h3" component="h3" sx={{ mb: 1, color: dark ? '#fff' : tokens.text }}>
        {plan.title}
      </Typography>
      <Typography variant="body2" sx={{ color: muted, minHeight: { md: 48 } }}>
        {plan.description}
      </Typography>

      {/* Price */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          columnGap: 1,
          mt: 3.5,
          pb: 3.5,
          mb: 3,
          borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : tokens.line}`,
          direction: 'ltr',
          justifyContent: 'flex-start',
          '[dir="rtl"] &': { justifyContent: 'flex-end' },
        }}
      >
        <Typography component="span" sx={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em', mt: 1.25, color: dark ? tokens.mint : tokens.shamrockText }}>
          CHF
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: { xs: '3.5rem', md: '3rem', lg: '4rem' },
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums lining-nums',
            ...(dark && {
              background: tokens.gradientText,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }),
          }}
        >
          {plan.price}
        </Typography>
        <Typography component="span" sx={{ alignSelf: 'flex-end', mb: 0.75, color: muted, fontWeight: 600, fontSize: '0.95rem', direction: 'inherit' }}>
          / {plan.unit}
        </Typography>
      </Box>

      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, flexGrow: 1, display: 'grid', gap: 1.5, alignContent: 'start' }}>
        {plan.features.map((feature) => (
          <Box component="li" key={feature.text} sx={{ position: 'relative', display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            <FeatureIcon included={feature.included} dark={dark} />
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontSize: '0.975rem',
                color: feature.included ? (dark ? '#fff' : tokens.text) : muted,
                ...(!feature.included && {
                  textDecoration: 'line-through',
                  textDecorationColor: dark ? 'rgba(255,255,255,0.4)' : alpha(tokens.textMuted, 0.5),
                }),
              }}
            >
              {feature.text}
              <Box component="span" sx={visuallyHidden}>
                {` (${feature.included ? t('pricing.included', 'Included') : t('pricing.notIncluded', 'Not included')})`}
              </Box>
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        component={RouterLink}
        to="/contact"
        size="large"
        variant={featured ? 'contained' : 'outlined'}
        color={featured ? 'secondary' : 'primary'}
        fullWidth
        endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
        sx={{
          mt: 4,
          minHeight: 52,
          whiteSpace: 'nowrap',
          px: { md: 2, lg: 3 },
          fontSize: { md: '0.95rem', lg: '1.0625rem' },
          '& .MuiButton-endIcon': { transition: `transform .3s ${easing.out}` },
          '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
          '[dir="rtl"] &:hover .MuiButton-endIcon': { transform: 'translateX(-4px)' },
        }}
      >
        {t('pricing.cta.button')}
      </Button>
    </Card>
  );

  if (!featured) return <Box sx={{ height: '100%', pt: { md: 3 } }}>{card}</Box>;

  return (
    <Box sx={{ position: 'relative', height: '100%', pt: { xs: 2, md: 0 } }}>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 2, md: -14 },
          insetInline: 0,
          mx: 'auto',
          width: 'fit-content',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 0.75,
          borderRadius: 999,
          background: `linear-gradient(100deg, ${tokens.mint}, ${tokens.sky})`,
          color: tokens.ink,
          boxShadow: `0 10px 24px -10px ${alpha(tokens.mint, 0.9)}`,
          fontWeight: 800,
          fontSize: '0.72rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px' }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} component="span" sx={{ width: '2px', height: 10, borderRadius: 1, bgcolor: 'currentColor', opacity: 1 - i * 0.25 }} />
          ))}
        </Box>
        {t('pricing.mostPopular', 'Most popular')}
      </Box>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          p: '2px',
          borderRadius: '26px',
          overflow: 'hidden',
          isolation: 'isolate',
          bgcolor: alpha(tokens.picton, 0.35),
          boxShadow: `0 40px 80px -40px ${alpha(tokens.ink, 0.65)}, 0 20px 40px -30px ${alpha(tokens.shamrock, 0.5)}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '260%',
            aspectRatio: '1',
            zIndex: -1,
            background: `conic-gradient(from 0deg, transparent 0deg, ${tokens.mint} 40deg, ${tokens.picton} 80deg, transparent 130deg, transparent 180deg, ${tokens.shamrock} 220deg, ${tokens.sky} 260deg, transparent 310deg)`,
            transform: 'translate(-50%, -50%)',
            animation: `${orbit} 7s linear infinite`,
          },
        }}
      >
        {card}
      </Box>
    </Box>
  );
};

export default PlanCard;
