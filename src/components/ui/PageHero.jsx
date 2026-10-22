import { Box, Container, Typography } from '@mui/material';
import Reveal from './Reveal';
import OghamMark from './OghamMark';
import GlyphField from './GlyphField';
import { tokens } from '../../theme';

/**
 * Dark "ink" hero shared by the inner pages: eyebrow, serif title, lead text,
 * optional actions/children, and the page name carved in Ogham down the side.
 * `ogham` is the Latin word to carve (keep it short, e.g. the English page name).
 */
const PageHero = ({ eyebrow, title, subtitle, ogham, children, compact = false }) => (
  <Box
    component="section"
    className="grain"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      background: tokens.heroBackground,
      pt: compact ? { xs: 8, md: 10 } : { xs: 10, md: 14 },
      pb: compact ? { xs: 8, md: 10 } : { xs: 12, md: 16 },
    }}
  >
    <GlyphField opacity={0.07} density={0.6} />
    {ogham && (
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          insetInlineEnd: { xs: -8, md: '6%' },
          top: { xs: 24, md: 40 },
          bottom: { xs: 24, md: 40 },
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          color: tokens.mint,
          opacity: 0.55,
        }}
      >
        <OghamMark text={ogham} orientation="vertical" strokeLength={26} strokeWidth={2.5} delay={250} stagger={32} sx={{ width: { sm: 52, md: 62 }, height: 'auto', maxHeight: '100%' }} />
      </Box>
    )}
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Box sx={{ maxWidth: 820 }}>
        {eyebrow && (
          <Reveal variant="fade">
            <Typography variant="overline" component="p" sx={{ color: tokens.mint, mb: 2, display: 'block' }}>
              {eyebrow}
            </Typography>
          </Reveal>
        )}
        <Reveal delay={80}>
          <Typography variant="h1" component="h1" sx={{ mb: subtitle ? 3 : 0 }}>
            {title}
          </Typography>
        </Reveal>
        {subtitle && (
          <Reveal delay={180}>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', md: '1.3rem' }, lineHeight: 1.6, color: 'rgba(255,255,255,0.78)', maxWidth: 680 }}
            >
              {subtitle}
            </Typography>
          </Reveal>
        )}
        {children && (
          <Reveal delay={280}>
            <Box sx={{ mt: 4 }}>{children}</Box>
          </Reveal>
        )}
      </Box>
    </Container>
    {/* Soft fade into the paper background below. */}
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        insetInline: 0,
        bottom: -1,
        height: 56,
        background: `linear-gradient(to bottom, transparent, ${tokens.paper})`,
        opacity: 0.08,
      }}
    />
  </Box>
);

export default PageHero;
