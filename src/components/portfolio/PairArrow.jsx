import { Box } from '@mui/material';

/**
 * An Ogham-style arrow: a stem line with two carved notches and an arrowhead.
 * Points from source to target in the reading direction (flipped in RTL).
 * Animate it from a parent with `pairArrowHover` (see ./motion.js).
 */
const PairArrow = ({ width = 40, strokeWidth = 1.75, sx }) => (
  <Box
    component="span"
    aria-hidden
    className="pair-arrow"
    sx={{
      display: 'inline-flex',
      flexShrink: 0,
      transition: 'transform .5s cubic-bezier(0.22, 1, 0.36, 1)',
      ...sx,
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 40 14"
      focusable="false"
      sx={{
        width,
        height: 'auto',
        display: 'block',
        overflow: 'visible',
        '[dir="rtl"] &': { transform: 'scaleX(-1)' },
      }}
    >
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path className="pair-arrow__stem" d="M1 7 H37" />
        <path d="M11 3.5 V10.5 M16 3.5 V10.5" opacity="0.7" />
        <path d="M31.5 1.5 L37.5 7 L31.5 12.5" />
      </g>
    </Box>
  </Box>
);

export default PairArrow;
