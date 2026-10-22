import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PairArrow from './PairArrow';
import { pairArrowHover } from './motion';
import { LANGUAGE_CODES } from './languages';
import { tokens, fonts, easing } from '../../theme';

const notches = (
  <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '2px' }}>
    {[0, 1, 2].map((i) => (
      <Box key={i} component="span" sx={{ width: '2px', height: 10, borderRadius: 1, bgcolor: 'currentColor' }} />
    ))}
  </Box>
);

/**
 * One portfolio sample. The whole card is a CardActionArea (a single button) that
 * opens the before/after viewer, so everything inside is phrasing content.
 */
const ProjectCard = ({ item, index, large = false, onOpen }) => {
  const { t } = useTranslation();
  const number = String(index + 1).padStart(2, '0');
  const from = t(`portfolio.languages.${item.source}`);
  const to = t(`portfolio.languages.${item.target}`);

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        transition: `transform .55s ${easing.out}, box-shadow .55s ${easing.out}`,
        // Gradient hairline border that lights up on hover/focus.
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1.5px',
          background: tokens.gradient,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
          opacity: 0,
          transition: 'opacity .4s',
          pointerEvents: 'none',
        },
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 2px 4px rgba(7,26,43,0.04), 0 34px 60px -30px rgba(7,26,43,0.45)',
          },
        },
        '&:hover::after, &:focus-within::after': { opacity: 1 },
        '&:hover .pc-img, &:focus-within .pc-img': { transform: 'scale(1.07)' },
        '&:hover .pc-shade, &:focus-within .pc-shade': { opacity: 0.92 },
        '&:hover .pc-cta-icon, &:focus-within .pc-cta-icon': { bgcolor: tokens.ink, color: '#fff', borderColor: tokens.ink },
        '&:hover .pc-cta-shift, &:focus-within .pc-cta-shift': { transform: 'translateX(2px)' },
        '[dir="rtl"] &:hover .pc-cta-shift, [dir="rtl"] &:focus-within .pc-cta-shift': { transform: 'translateX(-2px)' },
        '&:hover, &:focus-within': pairArrowHover,
      }}
    >
      <CardActionArea
        onClick={() => onOpen(item)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          textAlign: 'start',
          '& .MuiCardActionArea-focusHighlight': { display: 'none' },
          '&.Mui-focusVisible': { outline: `3px solid ${tokens.picton}`, outlineOffset: -3, borderRadius: '22px' },
        }}
      >
        {/* Artwork */}
        <Box
          component="span"
          sx={{
            position: 'relative',
            display: 'block',
            overflow: 'hidden',
            bgcolor: tokens.ink,
            aspectRatio: large ? { xs: '4 / 3', sm: '16 / 9' } : '4 / 3',
          }}
        >
          <Box
            component="img"
            className="pc-img"
            src={item.thumbnailSrc}
            srcSet={`${item.thumbnailSrc} 500w, ${item.thumbnailSrc.replace('w=500', 'w=1000')} 1000w`}
            sizes={large ? '(min-width: 900px) 600px, 100vw' : '(min-width: 900px) 400px, (min-width: 600px) 50vw, 100vw'}
            alt={item.title}
            loading="lazy"
            decoding="async"
            width="500"
            height="375"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: `transform 1.2s ${easing.out}`,
            }}
          />
          <Box
            component="span"
            className="pc-shade"
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.8,
              transition: 'opacity .5s',
              background:
                'linear-gradient(to top, rgba(7,26,43,0.92) 0%, rgba(7,26,43,0.35) 45%, rgba(7,26,43,0.05) 70%),' +
                'linear-gradient(to bottom, rgba(7,26,43,0.45), transparent 35%)',
            }}
          />

          {/* Running number */}
          <Box
            component="span"
            aria-hidden
            sx={{
              position: 'absolute',
              top: 18,
              insetInlineStart: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              color: '#fff',
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: '1.05rem',
              letterSpacing: '0.04em',
            }}
          >
            {number}
            <Box component="span" sx={{ width: 28, height: '1px', bgcolor: 'rgba(255,255,255,0.6)' }} />
          </Box>

          {item.featured && (
            <Box
              component="span"
              sx={{
                position: 'absolute',
                top: 14,
                insetInlineEnd: 16,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: 999,
                bgcolor: tokens.mint,
                color: tokens.ink,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 20px -10px rgba(0,0,0,0.5)',
              }}
            >
              {notches}
              {t('portfolio.featuredChip')}
            </Box>
          )}

          {/* Language pair, set large in the artwork. */}
          <Box
            component="span"
            aria-hidden
            sx={{
              position: 'absolute',
              insetInline: 20,
              bottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: '#fff',
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: large ? { xs: '2rem', md: '2.6rem' } : '2rem',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            <span>{LANGUAGE_CODES[item.source]}</span>
            <PairArrow width={large ? 48 : 40} sx={{ color: tokens.mint }} />
            <span>{LANGUAGE_CODES[item.target]}</span>
          </Box>
        </Box>

        {/* Text */}
        <Box component="span" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: { xs: 2.5, md: 3 } }}>
          <Typography
            component="span"
            variant="overline"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'secondary.dark', mb: 1 }}
          >
            <Box component="span" aria-hidden sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: tokens.shamrock }} />
            {t(`portfolio.categories.${item.category}`)}
          </Typography>
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: large ? { xs: '1.4rem', md: '1.65rem' } : '1.35rem',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: tokens.text,
              mb: 1,
            }}
          >
            {item.title}
          </Typography>
          <Typography component="span" variant="body2" sx={{ display: 'block', color: tokens.textMuted, mb: 2.5 }}>
            {item.description}
          </Typography>

          <Box
            component="span"
            sx={{
              mt: 'auto',
              pt: 2,
              borderTop: `1px dashed ${tokens.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                // Room for the arrow's hover nudge so it never touches the target language.
                columnGap: 1.5,
                rowGap: 0.5,
                minWidth: 0,
                fontWeight: 700,
                fontSize: '0.9rem',
                color: tokens.indigo,
              }}
            >
              <span>{from}</span>
              <PairArrow width={26} sx={{ color: tokens.shamrock }} />
              <span>{to}</span>
            </Box>
            <Box
              component="span"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexShrink: 0, fontWeight: 700, fontSize: '0.85rem', color: tokens.text }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline', md: large ? 'inline' : 'none', lg: 'inline' } }}>
                {t('portfolio.viewProject')}
              </Box>
              <Box
                component="span"
                className="pc-cta-icon"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: `1.5px solid ${tokens.line}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color .3s, color .3s, border-color .3s',
                }}
              >
                <Box component="span" className="pc-cta-shift" sx={{ display: 'inline-flex', transition: `transform .4s ${easing.out}` }}>
                  <ArrowForwardIcon className="flip-in-rtl" sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
