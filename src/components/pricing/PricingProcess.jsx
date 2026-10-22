import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Reveal from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { tokens, easing, fonts } from '../../theme';

// Notches cut across the stem: 1, 2, 3, 4 strokes, the way Ogham counts.
const Notches = ({ count, active }) => (
  <Box
    aria-hidden
    sx={{
      position: 'relative',
      zIndex: 1,
      flexShrink: 0,
      width: 44,
      height: 44,
      borderRadius: '12px',
      bgcolor: tokens.paperDeep,
      border: `1px solid ${tokens.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      transition: `border-color .4s, background-color .4s, box-shadow .4s`,
      '.process-step:hover &': {
        borderColor: tokens.shamrock,
        bgcolor: '#fff',
        boxShadow: `0 10px 24px -14px ${alpha(tokens.shamrock, 0.8)}`,
      },
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <Box
        key={i}
        component="span"
        sx={{
          width: '2.5px',
          height: 20,
          borderRadius: 2,
          bgcolor: tokens.shamrock,
          transformOrigin: 'center',
          transform: active ? 'scaleY(1)' : 'scaleY(0)',
          transition: `transform .6s ${easing.out} ${400 + count * 150 + i * 90}ms`,
        }}
      />
    ))}
  </Box>
);

const PricingProcess = ({ steps }) => {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <Box ref={ref} component="ol" sx={{ position: 'relative', listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 5, md: 4 } }}>
      {/* The stem line that the steps are cut into. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bgcolor: alpha(tokens.shamrock, 0.45),
          transition: `transform 1.4s ${easing.inOut} .2s`,
          // Horizontal on desktop, vertical on mobile.
          top: { xs: 22, md: 21.5 },
          bottom: { xs: 22, md: 'auto' },
          insetInlineStart: { xs: 21.5, md: 22 },
          insetInlineEnd: { xs: 'auto', md: 0 },
          width: { xs: '1px', md: 'auto' },
          height: { xs: 'auto', md: '1px' },
          transform: { xs: inView ? 'scaleY(1)' : 'scaleY(0)', md: inView ? 'scaleX(1)' : 'scaleX(0)' },
          transformOrigin: { xs: 'top center', md: 'left center' },
          '[dir="rtl"] &': { transformOrigin: { xs: 'top center', md: 'right center' } },
        }}
      />
      {steps.map((step, i) => (
        <Reveal key={step.title} component="li" delay={i * 110} className="process-step" sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: { xs: 2.5, md: 3 }, alignItems: 'flex-start' }}>
          <Notches count={i + 1} active={inView} />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="span"
              aria-hidden
              sx={{
                display: 'block',
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: { xs: '2.25rem', md: '3rem' },
                lineHeight: 1,
                mb: 1.5,
                color: 'transparent',
                WebkitTextStroke: `1px ${alpha(tokens.indigo, 0.45)}`,
                transition: 'color .4s',
                '.process-step:hover &': { color: alpha(tokens.shamrock, 0.9), WebkitTextStroke: `1px ${tokens.shamrock}` },
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </Typography>
            <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.35rem', md: '1.45rem' }, mb: 1 }}>
              {step.title}
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.textMuted, fontSize: '1rem' }}>
              {step.description}
            </Typography>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
};

export default PricingProcess;
