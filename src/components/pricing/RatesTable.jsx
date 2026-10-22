import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { tokens } from '../../theme';

const TIERS = ['standard', 'professional', 'premium'];
const FEATURED = 'professional';

// "0.08-0.10" → "0.08–0.10" (typographic en dash for ranges).
const formatRange = (value) => String(value).replace(/(\d)\s*-\s*(\d)/g, '$1–$2');

const cellBase = {
  borderBottom: `1px solid ${tokens.line}`,
  py: 2.25,
  px: { xs: 1.75, md: 3 },
  fontVariantNumeric: 'tabular-nums lining-nums',
  transition: 'background-color .25s',
};

const stickyCell = {
  position: 'sticky',
  insetInlineStart: 0,
  zIndex: 1,
  textAlign: 'start',
};

// Soft shadow on the inline-end edge while more columns are hidden there.
const edgeFade = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  insetInlineEnd: 0,
  width: 44,
  zIndex: 3,
  pointerEvents: 'none',
  background: 'linear-gradient(to left, rgba(7,26,43,0.16), rgba(7,26,43,0))',
  '[dir="rtl"] &': { background: 'linear-gradient(to right, rgba(7,26,43,0.16), rgba(7,26,43,0))' },
  transition: 'opacity .3s',
};

const RatesTable = ({ rows, label, t }) => {
  const scrollRef = useRef(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  // Track whether the table is scrolled away from either edge (RTL scrollLeft is negative).
  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setEdges((prev) => {
      const next = { start: pos > 2, end: max - pos > 2 };
      return prev.start === next.start && prev.end === next.end ? prev : next;
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '22px',
        border: `1px solid ${tokens.line}`,
        bgcolor: '#fff',
        boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 30px 60px -36px rgba(7,26,43,0.3)',
      }}
    >
      <Box
        ref={scrollRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        className={edges.start ? 'is-scrolled' : undefined}
        sx={{
          position: 'relative',
          overflowX: 'auto',
          borderRadius: '21px',
          WebkitOverflowScrolling: 'touch',
          '&:focus-visible': { outline: `2px solid ${tokens.indigo}`, outlineOffset: -3 },
          '& .sticky-col': { transition: 'box-shadow .3s' },
          '&.is-scrolled .sticky-col': { boxShadow: '8px 0 14px -10px rgba(7,26,43,0.45)' },
          '[dir="rtl"] &.is-scrolled .sticky-col': { boxShadow: '-8px 0 14px -10px rgba(7,26,43,0.45)' },
        }}
      >
        <Table sx={{ minWidth: { xs: 560, md: 640 }, borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                scope="col"
                className="sticky-col"
                sx={{
                  ...cellBase,
                  ...stickyCell,
                  zIndex: 2,
                  bgcolor: tokens.ink,
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  borderBottom: 'none',
                  minWidth: { xs: 136, md: 240 },
                  // Arabic must not be letter-spaced, and needs a larger size to stay legible.
                  '[dir="rtl"] &': { letterSpacing: 0, fontSize: '0.9rem' },
                }}
              >
                {t('pricing.rates.headers.service')}
              </TableCell>
              {TIERS.map((tier) => {
                const featured = tier === FEATURED;
                return (
                  <TableCell
                    key={tier}
                    component="th"
                    scope="col"
                    sx={{
                      ...cellBase,
                      textAlign: 'center',
                      bgcolor: featured ? tokens.inkSoft : tokens.ink,
                      color: featured ? tokens.mint : '#fff',
                      fontFamily: (theme) => theme.typography.h3.fontFamily,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      borderBottom: 'none',
                      position: 'relative',
                      ...(featured && {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          insetInline: 0,
                          bottom: 0,
                          height: 3,
                          background: `linear-gradient(90deg, ${tokens.mint}, ${tokens.picton})`,
                        },
                      }),
                    }}
                  >
                    {t(`pricing.${tier}`)}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.service}
                sx={{
                  '& > *': { bgcolor: '#fff' },
                  '& > .is-featured': { bgcolor: alpha(tokens.shamrock, 0.05) },
                  '&:last-child > *': { borderBottom: 0 },
                  '&:hover > *': { bgcolor: tokens.paper },
                  '&:hover > .is-featured': { bgcolor: alpha(tokens.shamrock, 0.1) },
                  '&:hover .row-accent': { transform: 'scaleY(1)' },
                }}
              >
                <TableCell component="th" scope="row" className="sticky-col" sx={{ ...cellBase, ...stickyCell, color: tokens.text }}>
                  <Box
                    aria-hidden
                    className="row-accent"
                    sx={{
                      position: 'absolute',
                      insetInlineStart: 0,
                      top: 10,
                      bottom: 10,
                      width: 3,
                      borderRadius: 3,
                      bgcolor: tokens.shamrock,
                      transform: 'scaleY(0)',
                      transition: 'transform .3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                  <Typography component="span" sx={{ fontWeight: 700, fontSize: '0.98rem', display: 'block' }}>
                    {row.service}
                  </Typography>
                  {row.note && (
                    <Typography component="span" variant="caption" sx={{ display: 'block', color: tokens.textMuted, mt: 0.25 }}>
                      {row.note}
                    </Typography>
                  )}
                </TableCell>
                {TIERS.map((tier) => (
                  <TableCell
                    key={tier}
                    className={tier === FEATURED ? 'is-featured' : undefined}
                    sx={{ ...cellBase, textAlign: 'center', whiteSpace: 'nowrap', color: tokens.text }}
                  >
                    <Box component="span" sx={{ direction: 'ltr', unicodeBidi: 'isolate', display: 'inline-flex', alignItems: 'baseline', gap: 0.75 }}>
                      <Box component="span" sx={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: tokens.textMuted }}>
                        CHF
                      </Box>
                      <Box component="span" sx={{ fontWeight: tier === FEATURED ? 800 : 600, fontSize: '1rem' }}>
                        {formatRange(row[tier])}
                      </Box>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box aria-hidden sx={{ ...edgeFade, opacity: edges.end ? 1 : 0 }} />
    </Box>
  );
};

export default RatesTable;
