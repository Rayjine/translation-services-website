import { Box, Container, Typography, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SouthIcon from '@mui/icons-material/South';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CodeIcon from '@mui/icons-material/Code';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import GlyphField from '../components/ui/GlyphField';
import OghamMark from '../components/ui/OghamMark';
import Reveal from '../components/ui/Reveal';
import ServiceCategory from '../components/services/ServiceCategory';
import ProcessTimeline from '../components/services/ProcessTimeline';
import { tokens, easing } from '../theme';

// Category → sub-service keys, in display order. Every sub-service has three features.
const CATEGORIES = [
  { id: 'document', icon: DescriptionOutlinedIcon, ogham: 'Document', services: ['legal', 'business', 'technical', 'academic'] },
  { id: 'website', icon: LanguageIcon, ogham: 'Website', services: ['localization', 'ecommerce', 'cms', 'seo'] },
  { id: 'specialized', icon: BusinessCenterOutlinedIcon, ogham: 'Specialized', services: ['medical', 'financial', 'marketing', 'literary'] },
  { id: 'additional', icon: CodeIcon, ogham: 'Additional', services: ['content', 'software', 'subtitling'] },
];
const FEATURE_COUNT = 3;

const Services = () => {
  const { t } = useTranslation();

  const categories = CATEGORIES.map((category) => {
    const base = `services.categories.${category.id}`;
    return {
      ...category,
      title: t(`${base}.title`),
      description: t(`${base}.description`),
      services: category.services.map((key) => ({
        key,
        title: t(`${base}.services.${key}.title`),
        description: t(`${base}.services.${key}.description`),
        features: Array.from({ length: FEATURE_COUNT }, (_, i) => t(`${base}.services.${key}.features.${i}`)),
      })),
    };
  });

  const rawSteps = t('services.process.steps', { returnObjects: true });
  const steps = (Array.isArray(rawSteps) ? rawSteps : []).map((step, index) => ({
    number: step.step || index + 1,
    title: step.title,
    description: step.description,
  }));

  return (
    <Box>
      <PageHero
        eyebrow={t('common.footer.address')}
        title={t('services.pageTitle')}
        subtitle={t('services.pageSubtitle')}
        ogham="Services"
      >
        {/* Jump links to each category */}
        <Box
          component="nav"
          aria-label={t('services.categoriesNav', 'Service categories')}
          // Let the pills run past the hero's text column so they sit on one line on wide screens.
          sx={{ mt: { xs: 1, md: 2 }, width: { lg: 'min(1152px, calc(100vw - 48px))' } }}
        >
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
            {categories.map((category, i) => (
              <li key={category.id}>
                <Box
                  component="a"
                  href={`#${category.id}`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.25,
                    minHeight: 44,
                    paddingInline: '8px 18px',
                    borderRadius: 999,
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: '1px solid rgba(255,255,255,0.18)',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    transition: `transform .35s ${easing.out}, background-color .3s, border-color .3s`,
                    '& .pill-num': { transition: 'background-color .3s, color .3s' },
                    '& .pill-arrow': { opacity: 0.55, transition: `transform .35s ${easing.out}, opacity .3s` },
                    '&:hover, &:focus-visible': {
                      bgcolor: alpha(tokens.mint, 0.12),
                      borderColor: alpha(tokens.mint, 0.6),
                      transform: 'translateY(-2px)',
                    },
                    '&:hover .pill-num, &:focus-visible .pill-num': { bgcolor: tokens.mint, color: tokens.ink },
                    '&:hover .pill-arrow, &:focus-visible .pill-arrow': { opacity: 1, transform: 'translateY(2px)' },
                  }}
                >
                  <Box
                    component="span"
                    aria-hidden
                    className="pill-num"
                    sx={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: tokens.mint,
                      bgcolor: 'rgba(255,255,255,0.08)',
                      direction: 'ltr',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Box>
                  {category.title}
                  {/* Wrapped so the hover nudge isn't cancelled by the RTL icon rules. */}
                  <Box component="span" aria-hidden className="pill-arrow" sx={{ display: 'inline-flex' }}>
                    <SouthIcon className="keep-direction" sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </li>
            ))}
          </Box>
        </Box>
      </PageHero>

      {categories.map((category, i) => (
        <ServiceCategory
          key={category.id}
          id={category.id}
          number={i + 1}
          total={categories.length}
          title={category.title}
          description={category.description}
          icon={category.icon}
          ogham={category.ogham}
          services={category.services}
          tone={i % 2 === 1 ? 'deep' : 'paper'}
        />
      ))}

      {/* Translation process */}
      <Box
        component="section"
        className="grain"
        sx={{ position: 'relative', overflow: 'hidden', color: '#fff', background: tokens.heroBackground, py: { xs: 10, md: 15 } }}
      >
        <GlyphField opacity={0.05} density={0.5} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'flex-end' },
              justifyContent: 'space-between',
              gap: { xs: 0, md: 6 },
              mb: { xs: 2, md: 4 },
            }}
          >
            <SectionHeading
              eyebrow={t('services.process.eyebrow', 'How we work')}
              title={t('services.process.title')}
              subtitle={t('services.process.subtitle')}
              align="start"
              tone="dark"
              maxWidth={680}
            />
            <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' }, color: tokens.picton, opacity: 0.55, mb: 8, flexShrink: 0 }}>
              <OghamMark text="Process" strokeLength={22} strokeWidth={2} sx={{ height: 64, width: 'auto' }} />
            </Box>
          </Box>
          <ProcessTimeline steps={steps} />
        </Container>
      </Box>

      {/* Call to action */}
      <Box component="section" sx={{ bgcolor: tokens.paper, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Reveal variant="scale">
            <Box
              className="grain"
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: { xs: '24px', md: '32px' },
                background: tokens.heroBackground,
                color: '#fff',
                px: { xs: 3, sm: 5, md: 9 },
                py: { xs: 6, md: 9 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(0, 1fr)' },
                alignItems: 'center',
                gap: { xs: 4, md: 6 },
                boxShadow: '0 40px 80px -40px rgba(7,26,43,0.55)',
              }}
            >
              {/* Carved word running behind the panel */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  display: { xs: 'none', md: 'block' },
                  insetInlineEnd: '-3%',
                  top: -22,
                  width: '48%',
                  color: tokens.mint,
                  opacity: 0.14,
                  pointerEvents: 'none',
                }}
              >
                <OghamMark text="Translate" strokeLength={30} strokeWidth={2} stagger={50} sx={{ width: '100%', height: 'auto' }} />
              </Box>

              <Box sx={{ position: 'relative' }}>
                <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                  {t('home.cta.title')}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: '1.075rem', md: '1.2rem' }, maxWidth: 520 }}>
                  {t('home.cta.subtitle')}
                </Typography>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row', md: 'column', lg: 'row' },
                  justifyContent: { md: 'flex-end' },
                  alignItems: { xs: 'stretch', sm: 'center', md: 'stretch', lg: 'center' },
                  gap: 1.5,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {t('common.buttons.getQuote')}
                </Button>
                <Button
                  component={RouterLink}
                  to="/pricing"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.45)',
                    whiteSpace: 'nowrap',
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  {t('pricing.pageTitle')}
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;
