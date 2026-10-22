import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Marquee from '../components/ui/Marquee';
import OghamMark from '../components/ui/OghamMark';
import GlyphField from '../components/ui/GlyphField';
import ProjectCard from '../components/portfolio/ProjectCard';
import ProjectDialog from '../components/portfolio/ProjectDialog';
import PairArrow from '../components/portfolio/PairArrow';
import { tokens, fonts, easing } from '../theme';

// Portfolio showcase items with translation keys
const getShowcaseItems = (t) => {
  // Get the array of showcase items from translations
  const showcaseItemsArray = t('portfolio.showcaseItems', { returnObjects: true });

  // Create the complete showcase items by adding additional properties
  return [
    {
      id: 1,
      title: showcaseItemsArray[0].title,
      description: showcaseItemsArray[0].description,
      category: 'legal',
      source: 'english',
      target: 'french',
      thumbnailSrc: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60',
      beforePdf: '/pdfs/contract-english.pdf',
      afterPdf: '/pdfs/contract-french.pdf',
      featured: true,
    },
    {
      id: 2,
      title: showcaseItemsArray[1].title,
      description: showcaseItemsArray[1].description,
      category: 'medical',
      source: 'german',
      target: 'english',
      thumbnailSrc: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60',
      beforePdf: '/pdfs/medical-german.pdf',
      afterPdf: '/pdfs/medical-english.pdf',
      featured: true,
    },
    {
      id: 3,
      title: showcaseItemsArray[2].title,
      description: showcaseItemsArray[2].description,
      category: 'technical',
      source: 'french',
      target: 'japanese',
      thumbnailSrc: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500&auto=format&fit=crop&q=60',
      beforePdf: '/pdfs/report-french.pdf',
      afterPdf: '/pdfs/report-japanese.pdf',
      featured: false,
    },
    {
      id: 4,
      title: showcaseItemsArray[3].title,
      description: showcaseItemsArray[3].description,
      category: 'marketing',
      source: 'english',
      target: 'mandarin',
      thumbnailSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60',
      beforePdf: '/pdfs/marketing-english.pdf',
      afterPdf: '/pdfs/marketing-mandarin.pdf',
      featured: false,
    },
    {
      id: 5,
      title: showcaseItemsArray[4].title,
      description: showcaseItemsArray[4].description,
      category: 'literary',
      source: 'russian',
      target: 'italian',
      thumbnailSrc: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60',
      beforePdf: '/pdfs/story-russian.pdf',
      afterPdf: '/pdfs/story-italian.pdf',
      featured: false,
    },
  ];
};

const CATEGORIES = ['all', 'featured', 'legal', 'medical', 'technical', 'marketing', 'literary'];

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const showcaseItems = getShowcaseItems(t);
  const [category, setCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('comparison'); // 'comparison', 'before', 'after'
  const [numPages, setNumPages] = useState({ before: null, after: null });
  const [pageNumber, setPageNumber] = useState({ before: 1, after: 1 });

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setPageNumber({ before: 1, after: 1 });
    setNumPages({ before: null, after: null });
    setViewMode('comparison');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredItems = category === 'all'
    ? showcaseItems
    : category === 'featured'
      ? showcaseItems.filter((item) => item.featured)
      : showcaseItems.filter((item) => item.category === category);

  // Function to handle success loading of PDF document
  const onDocumentLoadSuccess = (pdf, type) => {
    setNumPages((prev) => ({ ...prev, [type]: pdf.numPages }));
  };

  // Function to change page
  const changePage = (offset, type) => {
    setPageNumber((prev) => ({ ...prev, [type]: prev[type] + offset }));
  };

  const previousPage = (type) => changePage(-1, type);
  const nextPage = (type) => changePage(1, type);

  // Featured samples get the wide, cinematic treatment; a lone result does too.
  const isLarge = (item) => item.featured || filteredItems.length === 1;

  const steps = [
    t('portfolio.viewProject'),
    t('portfolio.viewModes.comparison'),
    t('portfolio.preview.downloadTranslation'),
  ];

  const pairs = showcaseItems.map((item) => [t(`portfolio.languages.${item.source}`), t(`portfolio.languages.${item.target}`)]);

  return (
    <Box>
      <PageHero
        eyebrow={t('common.menu.portfolio')}
        title={t('portfolio.pageTitle')}
        subtitle={t('portfolio.pageSubtitle')}
        ogham="Portfolio"
      />

      {/* Language-pair ticker */}
      <Box
        aria-hidden
        sx={{
          bgcolor: tokens.paperDeep,
          borderBottom: `1px solid ${tokens.line}`,
          py: { xs: 2, md: 2.5 },
        }}
      >
        <Marquee duration={38} gap={56}>
          {[...pairs, ...pairs].map(([from, to], i) => (
            <Box
              key={i}
              dir={i18n.dir()}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                whiteSpace: 'nowrap',
                fontFamily: fonts.display,
                fontStyle: 'italic',
                fontSize: { xs: '1.15rem', md: '1.45rem' },
                color: tokens.text,
              }}
            >
              <span>{from}</span>
              <PairArrow width={36} sx={{ color: tokens.shamrock }} />
              <span>{to}</span>
              <Box component="span" sx={{ display: 'inline-flex', gap: '3px', marginInlineStart: 4, color: tokens.picton }}>
                {[0, 1, 2, 3].map((n) => (
                  <Box key={n} component="span" sx={{ width: '2px', height: 16, bgcolor: 'currentColor', borderRadius: 1, opacity: 0.8 }} />
                ))}
              </Box>
            </Box>
          ))}
        </Marquee>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          {/* Editorial intro: what the samples are and how to read them */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
              gap: { xs: 5, md: 10 },
              alignItems: 'start',
              mb: { xs: 7, md: 10 },
            }}
          >
            <Box>
              <Reveal variant="fade">
                <Typography
                  variant="overline"
                  component="h2"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: 'secondary.dark', mb: 2 }}
                >
                  <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px' }}>
                    {[0, 1, 2].map((i) => (
                      <Box key={i} component="span" sx={{ width: '2px', height: 12, borderRadius: 1, bgcolor: 'currentColor', opacity: 1 - i * 0.25 }} />
                    ))}
                  </Box>
                  {t('portfolio.beforeAfter')}
                </Typography>
              </Reveal>
              <Reveal delay={80}>
                <Typography
                  sx={{
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: { xs: '1.45rem', md: '2rem' },
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                    color: tokens.text,
                    textWrap: 'pretty',
                  }}
                >
                  {t('home.portfolio.paragraph1')}
                </Typography>
              </Reveal>
              <Reveal delay={160}>
                <Typography variant="body1" sx={{ color: tokens.textMuted, mt: 2.5, maxWidth: 620 }}>
                  {t('home.portfolio.paragraph2')}
                </Typography>
              </Reveal>
            </Box>

            {/* Three carved steps on an Ogham stem */}
            <Box
              component="ol"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gap: 2,
                position: 'relative',
                mt: { md: 5 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  insetInlineStart: 35,
                  top: 28,
                  bottom: 28,
                  width: '2px',
                  background: `linear-gradient(to bottom, ${tokens.indigo}, ${tokens.shamrock})`,
                  opacity: 0.35,
                },
              }}
            >
              {steps.map((label, i) => (
                <Reveal key={label} component="li" variant="start" delay={120 + i * 110} sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      p: 1,
                      paddingInlineEnd: 2.5,
                      borderRadius: 999,
                      transition: `background-color .3s, transform .4s ${easing.out}`,
                      '&:hover': { bgcolor: '#fff', transform: 'translateX(4px)' },
                      '[dir="rtl"] &:hover': { transform: 'translateX(-4px)' },
                    }}
                  >
                    <Box
                      aria-hidden
                      sx={{
                        width: 40,
                        height: 40,
                        m: '0 8px',
                        flexShrink: 0,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        position: 'relative',
                        zIndex: 1,
                        bgcolor: i === 2 ? tokens.ink : '#fff',
                        color: i === 2 ? tokens.mint : tokens.indigo,
                        border: `1.5px solid ${i === 2 ? tokens.ink : tokens.line}`,
                        fontFamily: fonts.display,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: tokens.text }}>{label}</Typography>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>

          {/* Filter bar */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 2.5, md: 4 },
              mb: { xs: 4, md: 5 },
            }}
          >
            <Tabs
              value={category}
              onChange={handleCategoryChange}
              aria-label={t('portfolio.filterLabel', 'Filter projects by category')}
              variant="scrollable"
              scrollButtons={false}
              sx={{
                flex: { xs: '1 1 100%', md: '0 1 auto' },
                maxWidth: '100%',
                minHeight: 0,
                p: '5px',
                bgcolor: '#fff',
                border: `1px solid ${tokens.line}`,
                borderRadius: 999,
                boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 14px 30px -22px rgba(7,26,43,0.35)',
                '& .MuiTabs-scroller': { borderRadius: 999 },
                '& .MuiTabs-indicator': {
                  top: 0,
                  bottom: 0,
                  height: '100%',
                  borderRadius: 999,
                  bgcolor: tokens.ink,
                  zIndex: 0,
                  transition: `left .5s ${easing.out}, right .5s ${easing.out}, width .5s ${easing.out}`,
                },
                '& .MuiTabs-flexContainer': { gap: 0.25 },
                '& .MuiTab-root': {
                  zIndex: 1,
                  minHeight: 44,
                  minWidth: 0,
                  px: { xs: 2, md: 2.25 },
                  py: 1,
                  borderRadius: 999,
                  fontSize: '0.92rem',
                  color: tokens.textMuted,
                  transition: 'color .35s',
                  '&:hover': { color: tokens.text },
                  '&.Mui-selected': { color: '#fff' },
                  '&.Mui-focusVisible': { outline: `2px solid ${tokens.indigo}`, outlineOffset: -2 },
                  '&.Mui-selected.Mui-focusVisible': { outlineColor: tokens.picton },
                },
              }}
            >
              {CATEGORIES.map((value) => (
                <Tab key={value} value={value} label={t(`portfolio.categories.${value}`)} disableRipple />
              ))}
            </Tabs>

            <Box role="status" sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, color: tokens.text }}>
              <Box
                key={category}
                component="span"
                sx={{
                  fontFamily: fonts.display,
                  fontWeight: 500,
                  fontSize: { xs: '2.25rem', md: '2.75rem' },
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  animation: `page-enter .5s ${easing.out} both`,
                }}
              >
                {String(filteredItems.length).padStart(2, '0')}
              </Box>
              <Typography component="span" variant="overline" sx={{ color: tokens.textMuted }}>
                {t(`portfolio.categories.${category}`)}
              </Typography>
            </Box>
          </Box>

          {/* Showcase grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {filteredItems.map((item, i) => {
              const large = isLarge(item);
              return (
                <Reveal
                  key={`${category}-${item.id}`}
                  delay={i * 90}
                  sx={{
                    gridColumn: {
                      sm: large ? 'span 2' : 'span 1',
                      md: large ? 'span 6' : 'span 4',
                    },
                  }}
                >
                  <ProjectCard item={item} index={showcaseItems.indexOf(item)} large={large} onOpen={handleCardClick} />
                </Reveal>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Closing call to action */}
      <Box component="section" sx={{ pb: { xs: 8, md: 12 } }}>
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
                px: { xs: 3, sm: 6, md: 8 },
                py: { xs: 6, md: 8 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
                alignItems: 'center',
                gap: { xs: 4, md: 6 },
              }}
            >
              <GlyphField opacity={0.08} density={0.7} />
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  insetInlineStart: { xs: -40, md: '52%' },
                  insetInlineEnd: { xs: -40, md: 32 },
                  bottom: { xs: 12, md: 18 },
                  color: tokens.picton,
                  opacity: 0.22,
                  pointerEvents: 'none',
                }}
              >
                <OghamMark text="Translate" strokeLength={18} strokeWidth={1.75} stagger={50} sx={{ width: '100%', height: 'auto', maxHeight: 56 }} />
              </Box>
              <Box sx={{ position: 'relative', maxWidth: 640 }}>
                <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                  {t('home.cta.title')}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
                  {t('home.cta.subtitle')}
                </Typography>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                  sx={{ minHeight: 52, whiteSpace: 'nowrap' }}
                >
                  {t('home.cta.button')}
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <ProjectDialog
        item={selectedItem}
        open={open}
        onClose={handleClose}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        pageNumber={pageNumber}
        numPages={numPages}
        onLoadSuccess={onDocumentLoadSuccess}
        onPrev={previousPage}
        onNext={nextPage}
      />
    </Box>
  );
};

export default Portfolio;
