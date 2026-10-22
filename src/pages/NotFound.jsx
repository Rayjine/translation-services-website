import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TranslateIcon from '@mui/icons-material/Translate';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Reveal from '../components/ui/Reveal';
import OghamMark from '../components/ui/OghamMark';
import GlyphField from '../components/ui/GlyphField';
import { tokens, fonts, easing } from '../theme';

const srOnly = {
  position: 'absolute',
  width: 1,
  height: 1,
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const LinkCard = ({ icon, title, links, delay }) => (
  <Reveal delay={delay} sx={{ height: '100%' }}>
    <Box
      sx={{
        height: '100%',
        p: { xs: 3, md: 4 },
        bgcolor: '#fff',
        border: `1px solid ${tokens.line}`,
        borderRadius: '22px',
        boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 12px 32px -18px rgba(7,26,43,0.18)',
        transition: `transform .45s ${easing.out}, box-shadow .45s ${easing.out}`,
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 26px 48px -24px rgba(7,26,43,0.3)' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 2.5 }}>
        <Box
          aria-hidden
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            background: tokens.gradient,
            boxShadow: `0 10px 24px -12px ${tokens.shamrock}`,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' }, color: tokens.ink }}>
          {title}
        </Typography>
      </Box>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {links.map((link) => (
          <Box component="li" key={`${link.path}-${link.name}`} sx={{ borderTop: `1px solid ${tokens.line}` }}>
            <Box
              component={RouterLink}
              to={link.path}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                minHeight: 52,
                py: 1,
                color: tokens.text,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color .2s',
                '& .nf-arrow': { transition: `transform .35s ${easing.out}, color .2s`, color: tokens.textMuted },
                '&:hover, &:focus-visible': { color: tokens.indigo },
                '&:hover .nf-arrow, &:focus-visible .nf-arrow': { transform: 'translateX(6px)', color: tokens.shamrock },
                '[dir="rtl"] &:hover .nf-arrow, [dir="rtl"] &:focus-visible .nf-arrow': { transform: 'translateX(-6px)' },
              }}
            >
              <span>{link.name}</span>
              <Box component="span" className="nf-arrow" sx={{ display: 'inline-flex' }}>
                <ArrowForwardIcon fontSize="small" className="flip-in-rtl" />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Reveal>
);

const NotFound = () => {
  const { t } = useTranslation();

  // Popular service links
  const serviceLinks = [
    { name: t('notFound.links.documentTranslation'), path: '/services' },
    { name: t('notFound.links.websiteLocalization'), path: '/services' },
    { name: t('notFound.links.technicalTranslation'), path: '/services' },
  ];

  // Popular pages
  const pageLinks = [
    { name: t('common.menu.home'), path: '/' },
    { name: t('common.menu.services'), path: '/services' },
    { name: t('common.menu.team'), path: '/team' },
    { name: t('common.menu.contact'), path: '/contact' },
    { name: t('common.menu.pricing'), path: '/pricing' },
  ];

  const fullTitle = t('notFound.title');
  // The giant numerals already say "404"; show the rest of the title beneath them.
  const titleText = fullTitle.replace(/^\s*404\s*[-–—:]?\s*/, '') || fullTitle;

  return (
    <Box>
      <Box
        component="section"
        className="grain"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          background: tokens.heroBackground,
          minHeight: { md: 'calc(100vh - 78px)' },
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 8, md: 10 },
          pb: { xs: 10, md: 12 },
        }}
      >
        <GlyphField opacity={0.1} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) 300px' },
              gap: { xs: 6, md: 8 },
              alignItems: 'center',
            }}
          >
            <Box>
              <Reveal variant="fade">
                <Typography variant="overline" component="p" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: tokens.mint, mb: 1 }}>
                  <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px' }}>
                    {[0, 1, 2].map((i) => (
                      <Box key={i} component="span" sx={{ width: '2px', height: 12, borderRadius: 1, bgcolor: 'currentColor', opacity: 1 - i * 0.25 }} />
                    ))}
                  </Box>
                  {t('notFound.tagline', 'Lost in translation')}
                </Typography>
              </Reveal>

              <Reveal delay={80}>
                <Typography component="h1" sx={{ m: 0, mb: 3 }}>
                  {/* Screen readers get the full translated title; the visual split below is decorative. */}
                  <Box component="span" sx={srOnly}>{fullTitle}</Box>
                  <Box
                    component="span"
                    aria-hidden
                    sx={{
                      display: 'flex',
                      direction: 'ltr',
                      justifyContent: 'flex-start',
                      '[dir="rtl"] &': { justifyContent: 'flex-end' },
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: { xs: '8.5rem', sm: '11rem', md: '13rem', lg: '15rem' },
                      lineHeight: 0.86,
                      letterSpacing: '-0.05em',
                      mb: { xs: 1.5, md: 2 },
                    }}
                  >
                    {['4', '0', '4'].map((digit, i) => (
                      <Box
                        key={i}
                        component="span"
                        sx={{
                          display: 'inline-block',
                          pb: '0.06em',
                          background: tokens.gradientText,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          animation: `float-y ${6 + i * 0.7}s ease-in-out ${-i * 1.3}s infinite`,
                        }}
                      >
                        {digit}
                      </Box>
                    ))}
                  </Box>
                  <Box component="span" aria-hidden sx={{ display: 'block', typography: 'h2', color: '#fff' }}>
                    {titleText}
                  </Box>
                </Typography>
              </Reveal>

              <Reveal delay={180}>
                <Typography sx={{ fontSize: { xs: '1.08rem', md: '1.22rem' }, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', maxWidth: 580, mb: 4.5 }}>
                  {t('notFound.message')}
                </Typography>
              </Reveal>

              <Reveal delay={260}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to="/"
                    startIcon={<HomeIcon className="keep-direction" />}
                  >
                    {t('notFound.returnHome')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/contact"
                    startIcon={<ContactSupportIcon className="keep-direction" />}
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.06)' } }}
                  >
                    {t('notFound.contactUs')}
                  </Button>
                </Box>
              </Reveal>
            </Box>

            {/* A standing stone with "Lost" carved down its edge, as Ogham was. */}
            <Reveal variant="scale" delay={200} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box component="figure" sx={{ m: 0, display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', gap: { xs: 3, md: 2.5 } }}>
                <Box
                  aria-hidden
                  sx={{
                    position: 'relative',
                    width: { xs: 120, md: 180 },
                    height: { xs: 200, md: 360 },
                    borderRadius: { xs: '60px 60px 16px 16px', md: '90px 90px 22px 22px' },
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 80px -40px rgba(0,0,0,0.6)',
                    display: 'grid',
                    placeItems: 'center',
                    animation: 'float-y 9s ease-in-out infinite',
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ height: '78%', color: tokens.mint, display: 'flex', alignItems: 'center' }}>
                    <OghamMark text="Lost" orientation="vertical" strokeLength={30} strokeWidth={3} delay={500} stagger={110} sx={{ height: '100%', width: 'auto' }} />
                  </Box>
                </Box>
                <Box
                  component="figcaption"
                  dir="auto"
                  sx={{
                    maxWidth: { xs: 180, md: 220 },
                    textAlign: { xs: 'start', md: 'center' },
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                    fontFamily: fonts.display,
                  }}
                >
                  {t('notFound.oghamCaption', '“Lost”, carved in Ogham')}
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: tokens.paper, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 4 } }}>
            <LinkCard icon={<TranslateIcon className="keep-direction" />} title={t('notFound.popularServices')} links={serviceLinks} delay={0} />
            <LinkCard icon={<SearchIcon className="keep-direction" />} title={t('notFound.exploreSite')} links={pageLinks} delay={100} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default NotFound;
