import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useInView } from '../../hooks/useInView';
import { tokens, fonts, easing } from '../../theme';

const STEP_DELAY = 230; // ms between steps as the stem is carved
const NODE = 48; // node diameter in px

/*
 * Layout. Mobile: a vertical list; each step's rail (node + stem segment) runs
 * down the inline-start side. Desktop (lg+): a 7-track grid where steps sit
 * alternately above (odd) and below (even) a horizontal stem, each spanning two
 * tracks, so the cards zig-zag while the nodes are evenly spaced along the stem.
 * Each step draws its own stem segment up to the next node, with Ogham-style
 * notches (one per step number) cut across it.
 */
const ProcessTimeline = ({ steps }) => {
  const [ref, drawn] = useInView({ threshold: 0.18 });
  const count = steps.length;

  return (
    <Box
      ref={ref}
      component="ol"
      className={drawn ? 'is-drawn' : undefined}
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: { lg: `repeat(${count + 1}, minmax(0, 1fr))` },
        gridTemplateRows: { lg: `auto ${NODE + 8}px auto` },
      }}
    >
      {steps.map((step, i) => {
        const top = i % 2 === 0;
        const last = i === count - 1;
        const delay = i * STEP_DELAY;
        return (
          <Box
            component="li"
            key={`process-step-${step.number}`}
            style={{ '--d': `${delay}ms` }}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'row', lg: top ? 'column-reverse' : 'column' },
              gap: { xs: 2.5, lg: 0 },
              gridColumn: { lg: `${i + 1} / span 2` },
              gridRow: { lg: top ? '1 / span 2' : '2 / span 2' },
              minWidth: 0,
              '@media (hover: hover)': {
                '&:hover .timeline-node': { bgcolor: tokens.mint, color: tokens.ink },
              },
            }}
          >
            {/* Rail: numbered node + the stem segment leading to the next step */}
            <Box
              aria-hidden
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                flexShrink: 0,
                width: { xs: NODE, lg: '100%' },
                height: { lg: NODE + 8 },
              }}
            >
              <Box
                className="timeline-node"
                sx={{
                  flexShrink: 0,
                  width: NODE,
                  height: NODE,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  position: 'relative',
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  color: tokens.mint,
                  bgcolor: tokens.ink,
                  border: `1.5px solid ${alpha(tokens.mint, 0.55)}`,
                  boxShadow: `0 0 0 6px ${alpha(tokens.ink, 0.6)}`,
                  direction: 'ltr',
                  opacity: 0,
                  transform: 'scale(.5)',
                  transition: `opacity .6s ${easing.out} var(--d), transform .7s ${easing.out} var(--d), background-color .35s, color .35s`,
                  '.is-drawn &': { opacity: 1, transform: 'none' },
                  // Halo pulse once the node lands.
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -8,
                    borderRadius: '50%',
                    border: `1px solid ${alpha(tokens.mint, 0.5)}`,
                    opacity: 0,
                    transform: 'scale(.7)',
                    transition: `opacity 1s ${easing.out} calc(var(--d) + 250ms), transform 1s ${easing.out} calc(var(--d) + 250ms)`,
                  },
                  '.is-drawn &::after': { opacity: 1, transform: 'none' },
                }}
              >
                {String(step.number).padStart(2, '0')}
              </Box>

              {/* Stem segment to the next node (or a closing feather on the last step) */}
              <Box
                sx={{
                  position: 'relative',
                  flex: last ? { xs: '0 0 0px', lg: '0 0 72px' } : { xs: '1 1 auto', lg: `0 0 calc(50% - ${NODE}px)` },
                  alignSelf: 'stretch',
                  minHeight: { xs: last ? 0 : 40 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {last && (
                  // Closing "feather", the mark that ends an Ogham inscription.
                  <Box
                    sx={{
                      display: { xs: 'none', lg: 'block' },
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      transition: `opacity .6s ${easing.out} calc(var(--d) + 300ms)`,
                      '.is-drawn &': { opacity: 1 },
                      '& span': { position: 'absolute', bgcolor: alpha(tokens.mint, 0.85), borderRadius: 2 },
                      '[dir="rtl"] &': { transform: 'scaleX(-1)' },
                    }}
                  >
                    <Box component="span" sx={{ left: 0, right: 14, top: 'calc(50% - 1px)', height: 2 }} />
                    <Box component="span" sx={{ right: 2, width: 18, top: 'calc(50% - 7px)', height: 2, transform: 'rotate(-35deg)', transformOrigin: '0 50%' }} />
                    <Box component="span" sx={{ right: 2, width: 18, top: 'calc(50% + 5px)', height: 2, transform: 'rotate(35deg)', transformOrigin: '0 50%' }} />
                  </Box>
                )}
                {!last && (
                  <>
                    <Box
                      sx={{
                        position: 'absolute',
                        background: `linear-gradient(var(--stem-dir, 180deg), ${alpha(tokens.mint, 0.85)}, ${alpha(tokens.picton, 0.85)})`,
                        insetInline: { xs: `calc(50% - 1px)`, lg: 0 },
                        top: { xs: 0, lg: 'calc(50% - 1px)' },
                        bottom: { xs: 0, lg: 'calc(50% - 1px)' },
                        '--stem-dir': { lg: '90deg' },
                        transform: { xs: 'scaleY(0)', lg: 'scaleX(0)' },
                        transformOrigin: { xs: '50% 0', lg: '0 50%' },
                        '[dir="rtl"] &': { transformOrigin: { xs: '50% 0', lg: '100% 50%' }, '--stem-dir': { lg: '270deg' } },
                        transition: `transform ${STEP_DELAY + 80}ms linear calc(var(--d) + 260ms)`,
                        '.is-drawn &': { transform: 'none' },
                      }}
                    />
                    {/* Notches: step n carries n strokes, like an Ogham vowel group */}
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: '5px',
                      }}
                    >
                      {Array.from({ length: Math.min(step.number, 5) }, (_, k) => (
                        <Box
                          key={k}
                          sx={{
                            width: { xs: 18, lg: 2 },
                            height: { xs: 2, lg: 18 },
                            borderRadius: 2,
                            bgcolor: tokens.mint,
                            opacity: 0,
                            transform: { xs: 'scaleX(0)', lg: 'scaleY(0)' },
                            transition: `opacity .4s ${easing.out}, transform .5s ${easing.out}`,
                            transitionDelay: `calc(var(--d) + ${420 + k * 60}ms)`,
                            '.is-drawn &': { opacity: 0.9, transform: 'none' },
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Box>

            {/* Step copy */}
            <Box
              sx={{
                minWidth: 0,
                pb: { xs: last ? 0 : 5, lg: top ? 3 : 0 },
                pt: { xs: 1, lg: top ? 0 : 3 },
                // Connector from node to copy on desktop.
                marginInlineStart: { lg: `${NODE / 2 - 1}px` },
                paddingInlineStart: { lg: 2.5 },
                paddingInlineEnd: { lg: 2 },
                borderInlineStart: { lg: `2px solid ${alpha('#ffffff', 0.12)}` },
                opacity: 0,
                transform: { xs: 'translate3d(0, 16px, 0)', lg: `translate3d(0, ${top ? 16 : -16}px, 0)` },
                transition: `opacity .8s ${easing.out} calc(var(--d) + 120ms), transform .8s ${easing.out} calc(var(--d) + 120ms)`,
                '.is-drawn &': { opacity: 1, transform: 'none' },
              }}
            >
              <Typography
                component="h3"
                sx={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: { xs: '1.3rem', lg: '1.35rem' },
                  lineHeight: 1.25,
                  color: '#fff',
                  mb: 1,
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)', maxWidth: { xs: 520, lg: 340 } }}>
                {step.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProcessTimeline;
