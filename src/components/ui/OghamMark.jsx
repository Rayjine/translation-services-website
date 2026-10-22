import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useInView } from '../../hooks/useInView';

// Latin → Ogham. Each letter is [aicme, strokeCount]:
//   b = below the stem (Aicme Beithe), h = above (Aicme hÚatha),
//   m = diagonal across (Aicme Muine), v = short notch across (vowels, Aicme Ailme).
const LETTERS = {
  b: ['b', 1], l: ['b', 2], f: ['b', 3], v: ['b', 3], w: ['b', 3], s: ['b', 4], n: ['b', 5], p: ['b', 1],
  h: ['h', 1], d: ['h', 2], t: ['h', 3], c: ['h', 4], k: ['h', 4], q: ['h', 5],
  m: ['m', 1], g: ['m', 2], z: ['m', 4], r: ['m', 5],
  a: ['v', 1], o: ['v', 2], u: ['v', 3], e: ['v', 4], i: ['v', 5], j: ['v', 5], y: ['v', 5],
};

const STEP = 9; // distance between strokes of one letter
const GAP = 15; // distance between letters
const WORD_GAP = 26;
const FEATHER = 14;

const tokenize = (text) => {
  const out = [];
  const s = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i];
    if (ch === 'n' && s[i + 1] === 'g') { out.push(['m', 3]); i += 1; continue; }
    if (ch === 'x') { out.push(LETTERS.c, LETTERS.s); continue; }
    if (/\s/.test(ch)) { out.push(['space', 0]); continue; }
    if (LETTERS[ch]) out.push(LETTERS[ch]);
  }
  return out;
};

// Build stroke segments along a horizontal stem at y=0, reading left to right.
const layout = (text, len) => {
  const strokes = [];
  let x = FEATHER + 10;
  tokenize(text).forEach(([kind, count]) => {
    if (kind === 'space') { x += WORD_GAP - GAP; return; }
    for (let k = 0; k < count; k += 1) {
      const sx = x + k * STEP;
      if (kind === 'b') strokes.push([sx, 0, sx, len]);
      else if (kind === 'h') strokes.push([sx, -len, sx, 0]);
      else if (kind === 'm') strokes.push([sx - len * 0.42, len, sx + len * 0.42, -len]);
      else strokes.push([sx, -len * 0.32, sx, len * 0.32]);
    }
    x += (count - 1) * STEP + GAP;
  });
  const end = x - GAP + 10 + FEATHER;
  return { strokes, end };
};

/**
 * Renders a word in the Ogham alphabet as an SVG that "carves" itself stroke by stroke.
 * Decorative by default (aria-hidden); pass `title` to expose it to assistive tech.
 */
const OghamMark = ({
  text = 'Ogham',
  orientation = 'horizontal',
  strokeLength = 20,
  strokeWidth = 2.5,
  color = 'currentColor',
  animate = true,
  delay = 0,
  stagger = 70,
  title,
  sx,
  ...rest
}) => {
  const [ref, inView] = useInView();
  const { strokes, end } = useMemo(() => layout(text, strokeLength), [text, strokeLength]);
  const pad = strokeLength + strokeWidth * 2;
  const w = end;
  const h = pad * 2;
  const vertical = orientation === 'vertical';
  const drawing = animate && inView;
  const hidden = animate && !inView;

  const seg = (d, i, key) => (
    <path
      key={key}
      d={d}
      pathLength="1"
      className="ogham-stroke"
      style={{ '--d': `${delay + i}ms`, visibility: hidden ? 'hidden' : undefined }}
    />
  );

  const featherStart = `M${FEATHER + 2} 0 L2 ${-strokeLength * 0.55} M${FEATHER + 2} 0 L2 ${strokeLength * 0.55}`;
  const featherEnd = `M${end - FEATHER - 2} 0 L${end - 2} ${-strokeLength * 0.55} M${end - FEATHER - 2} 0 L${end - 2} ${strokeLength * 0.55}`;

  return (
    <Box
      ref={ref}
      component="svg"
      viewBox={vertical ? `${-pad} 0 ${h} ${w}` : `0 ${-pad} ${w} ${h}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={drawing ? 'ogham-draw' : undefined}
      sx={{ display: 'block', overflow: 'visible', direction: 'ltr', ...sx }}
      {...rest}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        // Vertical Ogham is read bottom-to-top with Beithe strokes on the right.
        transform={vertical ? `translate(0 ${w}) rotate(-90)` : undefined}
      >
        {seg(featherStart, 0, 'fs')}
        {seg(`M${FEATHER + 2} 0 L${end - FEATHER - 2} 0`, 120, 'stem')}
        {strokes.map(([x1, y1, x2, y2], i) => seg(`M${x1} ${y1} L${x2} ${y2}`, 380 + i * stagger, i))}
        {seg(featherEnd, 380 + strokes.length * stagger, 'fe')}
      </g>
    </Box>
  );
};

export default OghamMark;
