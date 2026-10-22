import { Box } from '@mui/material';

/**
 * Infinite horizontal ticker. Children are rendered twice so the loop is seamless;
 * the copy is hidden from assistive tech. Pauses on hover; static under reduced motion.
 */
const Marquee = ({ children, duration = 40, gap = 48, reverse = false, sx }) => (
  <Box
    sx={{
      overflow: 'hidden',
      direction: 'ltr',
      maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      '&:hover .marquee-track': { animationPlayState: 'paused' },
      ...sx,
    }}
  >
    <Box
      className="marquee-track motion-loop"
      sx={{
        display: 'flex',
        width: 'max-content',
        animation: `marquee ${duration}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      {[0, 1].map((copy) => (
        <Box
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          sx={{ display: 'flex', alignItems: 'center', gap: `${gap}px`, pr: `${gap}px`, flexShrink: 0 }}
        >
          {children}
        </Box>
      ))}
    </Box>
  </Box>
);

export default Marquee;
