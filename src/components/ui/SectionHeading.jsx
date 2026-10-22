import { Box, Typography } from '@mui/material';
import Reveal from './Reveal';
import { tokens } from '../../theme';

/**
 * Eyebrow + serif title + optional lead paragraph, with a short animated
 * Ogham-style rule. `align` is 'center' or 'start'; `tone` is 'light' (on paper)
 * or 'dark' (on ink backgrounds).
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  component = 'h2',
  maxWidth = 760,
  sx,
}) => {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <Box
      sx={{
        textAlign: centered ? 'center' : 'start',
        maxWidth,
        mx: centered ? 'auto' : 0,
        mb: { xs: 5, md: 7 },
        ...sx,
      }}
    >
      {eyebrow && (
        <Reveal variant="fade">
          <Typography
            variant="overline"
            component="p"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              color: dark ? tokens.mint : tokens.shamrockText,
              mb: 1.5,
            }}
          >
            <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px' }}>
              {[0, 1, 2].map((i) => (
                <Box key={i} component="span" sx={{ width: '2px', height: 12, borderRadius: 1, bgcolor: 'currentColor', opacity: 1 - i * 0.25 }} />
              ))}
            </Box>
            {eyebrow}
          </Typography>
        </Reveal>
      )}
      <Reveal delay={60}>
        <Typography variant="h2" component={component} sx={{ color: dark ? '#fff' : tokens.text, mb: subtitle ? 2 : 0 }}>
          {title}
        </Typography>
      </Reveal>
      {subtitle && (
        <Reveal delay={140}>
          <Typography
            variant="body1"
            sx={{
              color: dark ? 'rgba(255,255,255,0.75)' : tokens.textMuted,
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              mx: centered ? 'auto' : 0,
            }}
          >
            {subtitle}
          </Typography>
        </Reveal>
      )}
    </Box>
  );
};

export default SectionHeading;
