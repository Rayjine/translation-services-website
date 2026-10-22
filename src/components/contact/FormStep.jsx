import { useId } from 'react';
import { Box, Typography } from '@mui/material';
import { tokens, fonts, easing } from '../../theme';

const STEM_X = 21; // centre of the 44px step marker
const GUTTER = 68; // inline space reserved for the stem on sm+

/**
 * One numbered block of the quote form. On tablet/desktop the blocks hang off a
 * vertical "stem" carved with Ogham-like notches; the marker and stem light up
 * while any field inside the block has focus. Purely presentational.
 */
const FormStep = ({ number, title, children, last = false }) => {
  const id = useId();
  return (
    <Box
      role="group"
      aria-labelledby={id}
      sx={{
        position: 'relative',
        pb: last ? 0 : { xs: 5, md: 6 },
        paddingInlineStart: { xs: 0, sm: `${GUTTER}px` },
        '&:focus-within .form-step__num': {
          bgcolor: tokens.ink,
          borderColor: tokens.ink,
          color: '#fff',
          transform: 'scale(1.06)',
          boxShadow: `0 0 0 6px rgba(125,219,163,0.22)`,
        },
        '&:focus-within .form-step__stem::after': { transform: 'scaleY(1)' },
      }}
    >
      {!last && (
        <Box
          aria-hidden
          className="form-step__stem"
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            insetInlineStart: `${STEM_X - 6}px`,
            top: 56,
            bottom: 12,
            width: 14,
            // Central stem plus short notches crossing it, like strokes on an Ogham stone.
            background: `linear-gradient(${tokens.line}, ${tokens.line}) center / 2px 100% no-repeat,
              repeating-linear-gradient(to bottom, transparent 0 22px, ${tokens.line} 22px 24px)`,
            '&::after': {
              content: '""',
              position: 'absolute',
              insetBlock: 0,
              insetInlineStart: 6,
              width: 2,
              borderRadius: 2,
              background: `linear-gradient(to bottom, ${tokens.shamrock}, ${tokens.picton})`,
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              transition: `transform 0.9s ${easing.out}`,
            },
          }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: { xs: 2.5, md: 3 },
          marginInlineStart: { xs: 0, sm: `-${GUTTER}px` },
        }}
      >
        <Box
          aria-hidden
          className="form-step__num"
          sx={{
            width: 44,
            height: 44,
            flex: '0 0 44px',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: '#fff',
            border: `1.5px solid ${tokens.line}`,
            color: tokens.indigo,
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: '1rem',
            fontVariantNumeric: 'lining-nums',
            transition: `background-color .3s, color .3s, border-color .3s, box-shadow .3s, transform .4s ${easing.out}`,
          }}
        >
          {number}
        </Box>
        <Typography
          id={id}
          component="h3"
          sx={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: { xs: '1.25rem', md: '1.4rem' },
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: tokens.text,
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default FormStep;
