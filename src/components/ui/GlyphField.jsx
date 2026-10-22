import { Box } from '@mui/material';

// Letters from the scripts the team works in, drifting slowly behind dark heroes.
const GLYPHS = [
  { c: 'Ü', x: 6, y: 18, s: 64, d: 0 },
  { c: 'Ж', x: 18, y: 72, s: 46, d: 2 },
  { c: 'あ', x: 30, y: 30, s: 38, d: 5 },
  { c: 'ß', x: 44, y: 82, s: 34, d: 1 },
  { c: 'ع', x: 56, y: 14, s: 54, d: 3 },
  { c: '文', x: 68, y: 64, s: 58, d: 6 },
  { c: 'Ç', x: 80, y: 24, s: 40, d: 4 },
  { c: 'ї', x: 90, y: 78, s: 44, d: 2.5 },
  { c: 'ã', x: 96, y: 42, s: 60, d: 1.5 },
  { c: 'ñ', x: 36, y: 56, s: 30, d: 7 },
  { c: 'ř', x: 74, y: 90, s: 32, d: 3.5 },
  { c: 'ğ', x: 12, y: 46, s: 30, d: 4.5 },
];

/** Decorative floating glyph layer. Place inside a `position: relative` container. */
const GlyphField = ({ opacity = 0.12, color = '#ffffff', density = 1, sx }) => (
  <Box
    aria-hidden
    sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', direction: 'ltr', ...sx }}
  >
    {GLYPHS.slice(0, Math.max(4, Math.round(GLYPHS.length * density))).map((g) => (
      <Box
        key={g.c}
        component="span"
        className="motion-loop"
        sx={{
          position: 'absolute',
          left: `${g.x}%`,
          top: `${g.y}%`,
          // System serif: Literata would pull its Cyrillic subset just for a decorative 'Ж'.
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: { xs: g.s * 0.7, md: g.s },
          lineHeight: 1,
          color,
          opacity,
          animation: `drift ${14 + g.d * 2}s ease-in-out ${-g.d * 2}s infinite`,
          userSelect: 'none',
        }}
      >
        {g.c}
      </Box>
    ))}
  </Box>
);

export default GlyphField;
