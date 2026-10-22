import { keyframes } from '@mui/material/styles';

// The "ink" travelling along an arrow stem while its card is hovered.
const flow = keyframes`
  from { stroke-dashoffset: 12; }
  to { stroke-dashoffset: 0; }
`;

/** sx fragment for a hover/focus container that should nudge and animate its PairArrows. */
export const pairArrowHover = {
  '& .pair-arrow': { transform: 'translateX(5px)' },
  '[dir="rtl"] & .pair-arrow': { transform: 'translateX(-5px)' },
  '& .pair-arrow__stem': { strokeDasharray: '3 3', animation: `${flow} .9s linear infinite` },
};
