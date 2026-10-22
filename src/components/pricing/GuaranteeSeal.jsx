import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../../theme';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const R_TEXT = 82; // radius of the circular legend
const CIRC = 2 * Math.PI * R_TEXT;
const TICKS = 72;
// Cursive scripts must not be letter-spaced (it breaks the joins).
const CURSIVE = /[\u0590-\u08FF\uFB1D-\uFEFC]/;
const WIDE = /[\u3000-\u9FFF\uAC00-\uD7AF\uFF00-\uFFEF]/;

// Repeat the legend as many times as fits around the ring.
const buildLegend = (label) => {
  const cursive = CURSIVE.test(label);
  const unit = `${label} • `;
  const perChar = WIDE.test(label) ? 14 : 10.2;
  const repeats = Math.max(1, Math.floor(CIRC / (unit.length * perChar)));
  return { text: unit.repeat(repeats), cursive };
};

/**
 * A wax-seal / coin-like badge: the guarantee's name runs around a slowly
 * turning ring, with carved notches and a check at the centre. Decorative.
 */
const GuaranteeSeal = ({ label, size = 220, sx }) => {
  const legend = buildLegend(label);
  return (
  <Box aria-hidden sx={{ position: 'relative', width: size, height: size, flexShrink: 0, ...sx }}>
    {/* Soft halo */}
    <Box
      sx={{
        position: 'absolute',
        inset: '-18%',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(125,219,163,0.35), transparent 65%)`,
      }}
    />
    <Box
      component="svg"
      viewBox="0 0 200 200"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        // Keep the legend starting at the top of the ring in RTL too.
        direction: 'ltr',
        filter: 'drop-shadow(0 22px 30px rgba(7,26,43,0.28))',
      }}
    >
      <defs>
        <linearGradient id="seal-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tokens.inkSoft} />
          <stop offset="1" stopColor={tokens.ink} />
        </linearGradient>
        <linearGradient id="seal-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tokens.shamrock} />
          <stop offset="1" stopColor={tokens.picton} />
        </linearGradient>
        <path id="seal-text-path" d={`M100 ${100 - R_TEXT} a${R_TEXT} ${R_TEXT} 0 1 1 -0.01 0`} />
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#seal-fill)" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      {/* Rotating ring: legend + carved ticks */}
      <Box component="g" sx={{ transformOrigin: '100px 100px', transformBox: 'view-box', animation: `${spin} 36s linear infinite` }}>
        {legend.cursive ? (
          // Arabic/Hebrew do not survive being bent letter by letter, so the ring
          // is carved as an Ogham stem with notch groups instead.
          <g stroke={tokens.mint} strokeLinecap="round" fill="none">
            <circle cx="100" cy="100" r={R_TEXT} strokeWidth="1.2" />
            {Array.from({ length: 20 }).flatMap((_, g) =>
              Array.from({ length: (g % 5) + 1 }).map((__, k) => {
                const a = ((g * 18 + k * 2.6) * Math.PI) / 180;
                const inner = g % 2 ? R_TEXT - 7 : R_TEXT - 4;
                const outer = g % 2 ? R_TEXT + 4 : R_TEXT + 7;
                return (
                  <line
                    key={`${g}-${k}`}
                    strokeWidth="1.6"
                    x1={100 + Math.cos(a) * inner}
                    y1={100 + Math.sin(a) * inner}
                    x2={100 + Math.cos(a) * outer}
                    y2={100 + Math.sin(a) * outer}
                  />
                );
              }),
            )}
          </g>
        ) : (
          <text fill={tokens.mint} fontSize="11.5" fontWeight="800" letterSpacing="2.4" style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}>
            <textPath href="#seal-text-path" textLength={CIRC - 4} lengthAdjust="spacing">
              {legend.text}
            </textPath>
          </text>
        )}
      </Box>
      <g stroke="rgba(255,255,255,0.32)" strokeWidth="1.2" strokeLinecap="round">
        {Array.from({ length: TICKS }).map((_, i) => {
          const a = (i / TICKS) * Math.PI * 2;
          const r1 = 66;
          const r2 = i % 6 === 0 ? 60 : 63;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
            />
          );
        })}
      </g>
      <circle cx="100" cy="100" r="52" fill="url(#seal-core)" />
      <circle cx="100" cy="100" r="46" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="2 4" />
    </Box>
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
      }}
    >
      <CheckIcon className="check-icon" sx={{ fontSize: size * 0.22, filter: 'drop-shadow(0 4px 8px rgba(7,26,43,0.3))' }} />
    </Box>
  </Box>
  );
};

export default GuaranteeSeal;
