import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Reveal from '../components/ui/Reveal';
import OghamMark from '../components/ui/OghamMark';
import SectionHeading from '../components/ui/SectionHeading';
import GlyphField from '../components/ui/GlyphField';
import Marquee from '../components/ui/Marquee';
import CountUp from '../components/ui/CountUp';
import TranslationCard from '../components/home/TranslationCard';
import DocumentStack from '../components/home/DocumentStack';
import { tokens, fonts, easing } from '../theme';

// Language keys for translations, with ISO code and the language's own name.
const languages = [
  { key: 'english', code: 'EN', native: 'English' },
  { key: 'french', code: 'FR', native: 'Français' },
  { key: 'german', code: 'DE', native: 'Deutsch' },
  { key: 'italian', code: 'IT', native: 'Italiano' },
  { key: 'romansh', code: 'RM', native: 'Rumantsch' },
  { key: 'spanish', code: 'ES', native: 'Español' },
  { key: 'portuguese', code: 'PT', native: 'Português' },
  { key: 'russian', code: 'RU', native: 'Русский' },
  { key: 'ukrainian', code: 'UK', native: 'Українська' },
  { key: 'mandarin', code: 'ZH', native: '中文' },
  { key: 'japanese', code: 'JA', native: '日本語' },
  { key: 'arabic', code: 'AR', native: 'العربية' },
  { key: 'czech', code: 'CS', native: 'Čeština' },
  { key: 'turkish', code: 'TR', native: 'Türkçe' },
];
const languageKeys = languages.map((l) => l.key);

const TEAM_LEADS_FALLBACK = 10;
const FOUNDED = 2022;

const services = [
  {
    key: 'documentTranslation',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&auto=format&fit=crop&q=70',
  },
  {
    key: 'websiteLocalization',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&auto=format&fit=crop&q=70',
  },
  {
    key: 'technicalTranslation',
    image: 'https://images.unsplash.com/photo-1433840496881-cbd845929862?w=900&auto=format&fit=crop&q=70',
  },
];

// Splits "Bridging Languages, Preserving Cultures" after its first comma
// (Latin, Arabic or CJK) so the second half can carry the accent.
const splitTitle = (title) => {
  const m = title.match(/^(.+?[,،、，])\s*(.+)$/);
  return m ? [m[1], m[2]] : [title, ''];
};

const pad2 = (n) => String(n).padStart(2, '0');

// Three short notches, used as a list/marquee separator.
const Notch = ({ color = tokens.mint, size = 22 }) => (
  <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '4px', alignItems: 'center', height: size, flexShrink: 0 }}>
    {[1, 0.7, 0.45].map((o, i) => (
      <Box key={i} component="span" sx={{ width: 2, height: '100%', borderRadius: 2, bgcolor: color, opacity: o, transform: i === 1 ? 'scaleY(0.6)' : undefined }} />
    ))}
  </Box>
);

// Nudges the button's end icon wrapper (not the svg, which rtl.css mirrors with a transform).
const arrowNudge = {
  '& .MuiButton-endIcon': { transition: `transform .35s ${easing.out}` },
  '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
  '[dir="rtl"] &:hover .MuiButton-endIcon': { transform: 'translateX(-4px)' },
};

const Home = () => {
  const { t } = useTranslation();
  const [titleHead, titleTail] = splitTitle(t('home.hero.title'));
  // The lead-translator count follows the Team page so the stat never drifts from it.
  const teamMembers = t('team.members', { returnObjects: true });
  const teamLeads = Array.isArray(teamMembers) && teamMembers.length ? teamMembers.length : TEAM_LEADS_FALLBACK;

  const features = [
    { icon: LanguageIcon, key: 'multipleLanguages' },
    { icon: DescriptionOutlinedIcon, key: 'documentExpertise' },
    { icon: WorkspacePremiumOutlinedIcon, key: 'certifiedTranslators' },
  ];

  const stats = [
    { value: <CountUp end={languageKeys.length} />, label: t('home.stats.languages', 'Languages translated by native speakers') },
    { value: <CountUp end={teamLeads} />, label: t('home.stats.translators', 'Lead translators on the team') },
    { value: <CountUp end={2} duration={900} />, label: t('home.stats.experts', 'Experts on every text: one translates, one reviews') },
    { value: <span>{FOUNDED}</span>, label: t('home.stats.founded', 'Founded in Switzerland') },
  ];

  return (
    <Box sx={{ overflowX: 'clip' }}>
      {/* ───────────── Hero ───────────── */}
      <Box
        component="section"
        className="grain"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          background: tokens.heroBackground,
          pt: { xs: 7, md: 11 },
          pb: { xs: 16, md: 22 },
        }}
      >
        <GlyphField opacity={0.08} />
        {/* Big carved line running under the hero */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            insetInline: { xs: '-30%', md: '-4%' },
            bottom: { xs: 72, md: 110 },
            color: tokens.picton,
            opacity: 0.11,
            pointerEvents: 'none',
          }}
        >
          <OghamMark text="Bridging languages preserving cultures" strokeLength={30} strokeWidth={1.5} stagger={28} delay={600} sx={{ width: '100%', height: 'auto' }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container rowSpacing={6} columnSpacing={{ xs: 0, md: 6 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Reveal variant="fade">
                <Typography
                  variant="overline"
                  component="p"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: tokens.mint, mb: { xs: 2, md: 3 } }}
                >
                  <Notch size={12} />
                  {t('common.footer.address')}
                </Typography>
              </Reveal>
              <Reveal delay={80}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: 'clamp(2.4rem, 1.2rem + 6vw, 3.4rem)', md: 'clamp(3.4rem, 1.4rem + 3.6vw, 5.4rem)' },
                    lineHeight: 1.02,
                    mb: 3,
                    textWrap: 'balance',
                  }}
                >
                  {titleHead}
                  {titleTail && (
                    <>
                      {' '}
                      <Box
                        component="span"
                        className="motion-loop"
                        sx={{
                          display: { md: 'block' },
                          background: tokens.gradientText,
                          backgroundSize: '200% 100%',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          animation: 'gradient-pan 10s ease-in-out 2 both',
                          pb: '0.08em',
                        }}
                      >
                        {titleTail}
                      </Box>
                    </>
                  )}
                </Typography>
              </Reveal>
              <Reveal delay={180}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.78)',
                    maxWidth: 560,
                    mb: { xs: 4, md: 5 },
                  }}
                >
                  {t('home.hero.subtitle')}
                </Typography>
              </Reveal>
              <Reveal delay={260}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to="/contact"
                    endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                    sx={{ minHeight: 52, ...arrowNudge }}
                  >
                    {t('common.buttons.getQuote')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/services"
                    sx={{
                      minHeight: 52,
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.45)',
                      '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                    }}
                  >
                    {t('common.buttons.ourServices')}
                  </Button>
                </Box>
              </Reveal>
            </Grid>
            <Grid item xs={12} md={5}>
              <Reveal variant="scale" delay={220}>
                <TranslationCard />
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ───────────── Stats strip (overlaps the hero) ───────────── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: { xs: -10, md: -13 } }}>
        <Reveal variant="up">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
              bgcolor: '#fff',
              borderRadius: { xs: '22px', md: '28px' },
              border: `1px solid ${tokens.line}`,
              boxShadow: '0 2px 4px rgba(7,26,43,0.04), 0 40px 80px -40px rgba(7,26,43,0.35)',
              overflow: 'hidden',
            }}
          >
            {stats.map((s, i) => (
              <Box
                key={i}
                sx={{
                  position: 'relative',
                  p: { xs: 2.5, sm: 3.5, md: 4 },
                  borderInlineStart: { md: i > 0 ? `1px solid ${tokens.line}` : 'none', xs: i % 2 === 1 ? `1px solid ${tokens.line}` : 'none' },
                  borderTop: { xs: i > 1 ? `1px solid ${tokens.line}` : 'none', md: 'none' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    insetInlineStart: { xs: 20, sm: 28, md: 32 },
                    top: 0,
                    width: 28,
                    height: 3,
                    borderRadius: '0 0 3px 3px',
                    background: tokens.gradient,
                  },
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    fontSize: { xs: '2.4rem', md: '3.4rem' },
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: tokens.indigo,
                    fontVariantNumeric: 'tabular-nums',
                    mb: 1.25,
                  }}
                >
                  {s.value}
                </Typography>
                <Typography variant="body2" sx={{ color: tokens.textMuted, fontWeight: 600, lineHeight: 1.45, maxWidth: 220 }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Container>

      {/* ───────────── About + Why choose us ───────────── */}
      <Box component="section" sx={{ position: 'relative', py: { xs: 10, md: 16 } }}>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            insetInlineStart: 40,
            top: 120,
            bottom: 120,
            // Only where the container leaves a real margin; below that it would cut through the copy.
            display: 'none',
            '@media (min-width: 1360px)': { display: 'flex' },
            color: tokens.shamrock,
            opacity: 0.35,
          }}
        >
          <OghamMark text="Since twenty twenty two" orientation="vertical" strokeLength={14} strokeWidth={1.75} stagger={30} sx={{ height: '100%', width: 'auto', maxHeight: 560 }} />
        </Box>
        <Container maxWidth="lg">
          <Grid container rowSpacing={6} columnSpacing={{ xs: 0, md: 5, lg: 10 }} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <SectionHeading
                align="start"
                eyebrow={`${t('home.stats.founded', 'Founded in Switzerland')} · ${FOUNDED}`}
                title={t('home.about.title')}
                sx={{ mb: { xs: 3, md: 4 } }}
              />
              <Reveal delay={120}>
                <Typography
                  sx={{
                    fontFamily: fonts.display,
                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                    lineHeight: 1.55,
                    fontWeight: 400,
                    color: tokens.text,
                    mb: 3,
                  }}
                >
                  {t('home.about.paragraph1')}
                </Typography>
              </Reveal>
              <Reveal delay={180}>
                <Typography variant="body1" sx={{ color: tokens.textMuted, mb: 4 }}>
                  {t('home.about.paragraph2')}
                </Typography>
              </Reveal>
              <Reveal delay={240}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/team"
                  endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                  sx={{ minHeight: 48, ...arrowNudge }}
                >
                  {t('home.about.meetTeam')}
                </Button>
              </Reveal>
            </Grid>

            <Grid item xs={12} md={6}>
              <Reveal variant="end" delay={120}>
                <Box
                  sx={{
                    position: 'relative',
                    bgcolor: '#fff',
                    borderRadius: '28px',
                    border: `1px solid ${tokens.line}`,
                    boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 30px 60px -36px rgba(7,26,43,0.3)',
                    p: { xs: 3, md: 4, lg: 5 },
                    mt: { md: 2 },
                  }}
                >
                  <Typography variant="h3" component="h3" sx={{ mb: { xs: 2, md: 3 } }}>
                    {t('home.whyChooseUs.title')}
                  </Typography>
                  <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    {features.map((feature, i) => {
                      const Icon = feature.icon;
                      const { key } = feature;
                      return (
                      <Reveal
                        key={key}
                        component="li"
                        delay={200 + i * 90}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'auto 1fr auto',
                          alignItems: 'center',
                          gap: { xs: 2, md: 2.5 },
                          py: { xs: 2.25, md: 2.75 },
                          borderTop: i > 0 ? `1px solid ${tokens.line}` : 'none',
                          '& .feature-tile': { transition: `transform .5s ${easing.out}, box-shadow .5s ${easing.out}` },
                          '&:hover .feature-tile': { transform: 'rotate(-6deg) scale(1.06)', boxShadow: '0 14px 26px -12px rgba(59,155,92,0.7)' },
                          '& .feature-num': { transition: 'color .3s' },
                          '&:hover .feature-num': { color: tokens.shamrockText },
                        }}
                      >
                        <Box
                          className="feature-tile"
                          aria-hidden
                          sx={{
                            width: { xs: 52, md: 60 },
                            height: { xs: 52, md: 60 },
                            borderRadius: '18px',
                            display: 'grid',
                            placeItems: 'center',
                            background: tokens.gradient,
                            color: '#fff',
                            boxShadow: '0 10px 22px -14px rgba(59,155,92,0.8)',
                          }}
                        >
                          <Icon className="keep-direction" sx={{ fontSize: { xs: 26, md: 30 } }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h4" component="h4" sx={{ mb: 0.25 }}>
                            {t(`home.whyChooseUs.${key}.title`)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: tokens.textMuted }}>
                            {t(`home.whyChooseUs.${key}.description`)}
                          </Typography>
                        </Box>
                        <Typography
                          className="feature-num"
                          aria-hidden
                          sx={{ fontFamily: fonts.display, fontSize: { xs: '1.4rem', md: '1.9rem' }, fontWeight: 500, color: '#cdbf9f', lineHeight: 1 }}
                        >
                          {pad2(i + 1)}
                        </Typography>
                      </Reveal>
                      );
                    })}
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ───────────── Languages (ink) ───────────── */}
      <Box
        component="section"
        className="grain"
        sx={{ position: 'relative', overflow: 'hidden', color: '#fff', background: tokens.heroBackground, py: { xs: 10, md: 14 } }}
      >
        <GlyphField opacity={0.05} density={0.5} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <SectionHeading
            tone="dark"
            eyebrow={t('home.whyChooseUs.multipleLanguages.description')}
            title={t('home.languages.title')}
            subtitle={t('home.languages.subtitle')}
            maxWidth={680}
          />
        </Container>

        {/* Native names, decorative: the accessible list follows below. */}
        <Box aria-hidden sx={{ position: 'relative', display: 'grid', gap: { xs: 1, md: 2 }, mb: { xs: 6, md: 9 } }}>
          <Marquee duration={55} gap={36}>
            {languages.map((l) => (
              <Box key={l.key} component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: '36px' }}>
                <Box
                  component="span"
                  lang={l.code.toLowerCase()}
                  sx={{
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: { xs: '2.4rem', md: '4.5rem' },
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    transition: 'color .3s',
                    '&:hover': { color: tokens.mint },
                  }}
                >
                  {l.native}
                </Box>
                <Notch size={28} />
              </Box>
            ))}
          </Marquee>
          <Marquee duration={65} gap={36} reverse>
            {[...languages].reverse().map((l) => (
              <Box key={l.key} component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: '36px' }}>
                <Box
                  component="span"
                  lang={l.code.toLowerCase()}
                  sx={{
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: { xs: '2.4rem', md: '4.5rem' },
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(159,214,238,0.55)',
                    transition: 'color .3s',
                    '&:hover': { color: tokens.sky },
                  }}
                >
                  {l.native}
                </Box>
                <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: tokens.picton, opacity: 0.6 }} />
              </Box>
            ))}
          </Marquee>
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', md: 'repeat(5, minmax(0, 1fr))', lg: 'repeat(7, minmax(0, 1fr))' },
              gap: { xs: 1.25, md: 1.5 },
            }}
          >
            {languages.map((l, i) => {
              const name = t(`home.languages.list.${l.key}`);
              return (
                <Reveal key={l.key} component="li" variant="up" delay={(i % 7) * 50}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    boxSizing: 'border-box',
                    minHeight: { xs: 78, md: 92 },
                    p: { xs: 1.5, md: 2 },
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    overflow: 'hidden',
                    transition: `transform .45s ${easing.out}, border-color .3s, background-color .3s`,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      insetInline: 0,
                      bottom: 0,
                      height: 3,
                      background: tokens.gradient,
                      transform: 'scaleX(0)',
                      transformOrigin: 'var(--origin, left)',
                      transition: `transform .5s ${easing.out}`,
                    },
                    '[dir="rtl"] &::after': { '--origin': 'right' },
                    '&:hover': { borderColor: 'rgba(125,219,163,0.5)', bgcolor: 'rgba(255,255,255,0.07)', transform: 'translateY(-4px)' },
                    '&:hover::after': { transform: 'scaleX(1)' },
                  }}
                >
                  <Typography
                    component="span"
                    aria-hidden
                    sx={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', color: tokens.mint, mb: 0.75 }}
                  >
                    {l.code}
                  </Typography>
                  <Typography component="span" sx={{ display: 'block', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 }}>
                    {name}
                  </Typography>
                  {name !== l.native && (
                    <Typography
                      component="span"
                      lang={l.code.toLowerCase()}
                      sx={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.62)', mt: 0.25 }}
                    >
                      {l.native}
                    </Typography>
                  )}
                </Box>
                </Reveal>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ───────────── Services preview ───────────── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'flex-end' },
              justifyContent: 'space-between',
              gap: 3,
              mb: { xs: 5, md: 8 },
            }}
          >
            <SectionHeading
              align="start"
              eyebrow={t('home.whyChooseUs.documentExpertise.description')}
              title={t('home.services.title')}
              subtitle={t('home.services.subtitle')}
              maxWidth={600}
              sx={{ mb: 0 }}
            />
            <Reveal variant="fade" delay={200} sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component={RouterLink}
                to="/services"
                endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                sx={{ minHeight: 48, ...arrowNudge }}
              >
                {t('home.services.viewAllServices')}
              </Button>
            </Reveal>
          </Box>

          <Grid container rowSpacing={{ xs: 3, md: 4 }} columnSpacing={{ xs: 0, sm: 3, md: 4 }}>
            {services.map((s, i) => {
              const title = t(`home.services.${s.key}.title`);
              return (
                <Grid item xs={12} sm={6} md={4} key={s.key} sx={{ mt: { md: i === 1 ? 6 : 0 } }}>
                  <Reveal delay={i * 110} sx={{ height: '100%' }}>
                    <Box
                      component={RouterLink}
                      to="/services"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        bgcolor: '#fff',
                        borderRadius: '24px',
                        border: `1px solid ${tokens.line}`,
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 18px 40px -26px rgba(7,26,43,0.3)',
                        transition: `transform .5s ${easing.out}, box-shadow .5s ${easing.out}`,
                        '& img': { transition: `transform 1.1s ${easing.out}, filter .6s` },
                        '& .duotone': { transition: 'opacity .6s' },
                        '& .svc-arrow': { transition: `transform .45s ${easing.out}, background-color .3s, color .3s` },
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 2px 4px rgba(7,26,43,0.05), 0 36px 60px -30px rgba(7,26,43,0.45)' },
                        '&:hover img': { transform: 'scale(1.08)', filter: 'grayscale(0) contrast(1.05)' },
                        '&:hover .duotone': { opacity: 0.35 },
                        '&:hover .svc-arrow': { bgcolor: tokens.ink, color: '#fff', transform: 'translateX(4px)' },
                        '[dir="rtl"] &:hover .svc-arrow': { transform: 'translateX(-4px)' },
                      }}
                    >
                      <Box sx={{ position: 'relative', aspectRatio: { xs: '16 / 10', sm: '4 / 3' }, overflow: 'hidden', bgcolor: tokens.ink }}>
                        <Box
                          component="img"
                          src={s.image}
                          alt=""
                          loading="lazy"
                          width={900}
                          height={675}
                          sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.05) brightness(1.08)' }}
                        />
                        <Box
                          className="duotone"
                          aria-hidden
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(160deg, rgba(83,166,204,0.55), rgba(11,71,108,0.75))',
                            mixBlendMode: 'multiply',
                          }}
                        />
                        <Box
                          aria-hidden
                          sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,26,43,0.7), transparent 55%)' }}
                        />
                        <Typography
                          aria-hidden
                          sx={{
                            position: 'absolute',
                            insetInlineStart: 22,
                            bottom: 14,
                            fontFamily: fonts.display,
                            fontWeight: 500,
                            fontSize: { xs: '3rem', md: '3.6rem' },
                            lineHeight: 1,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                          }}
                        >
                          {pad2(i + 1)}
                        </Typography>
                        <Box aria-hidden sx={{ position: 'absolute', insetInlineEnd: 22, bottom: 22, color: tokens.mint }}>
                          <Notch size={18} />
                        </Box>
                      </Box>
                      <Box sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.4rem', md: '1.55rem' }, mb: 1.25 }}>
                          {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: tokens.textMuted, mb: 3, flexGrow: 1 }}>
                          {t(`home.services.${s.key}.description`)}
                        </Typography>
                        <Box
                          className="svc-arrow"
                          aria-hidden
                          sx={{
                            alignSelf: 'flex-start',
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            border: `1px solid ${tokens.line}`,
                            color: tokens.indigo,
                          }}
                        >
                          <ArrowForwardIcon className="flip-in-rtl" sx={{ fontSize: 20 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Reveal>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/services"
              endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
              sx={{ minHeight: 48 }}
            >
              {t('home.services.viewAllServices')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ───────────── Portfolio showcase ───────────── */}
      <Box component="section" sx={{ position: 'relative', bgcolor: tokens.paperDeep, py: { xs: 10, md: 14 }, overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid container rowSpacing={6} columnSpacing={{ xs: 0, md: 10 }} alignItems="center">
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Reveal variant="scale">
                <Box
                  component={RouterLink}
                  to="/portfolio"
                  tabIndex={-1}
                  aria-hidden
                  sx={{ display: 'block', textDecoration: 'none' }}
                >
                  <DocumentStack />
                </Box>
              </Reveal>
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              <SectionHeading
                align="start"
                eyebrow={t('common.menu.portfolio')}
                title={t('home.portfolioShowcase.title')}
                sx={{ mb: 3 }}
              />
              <Reveal delay={120}>
                <Typography variant="body1" sx={{ mb: 2, color: tokens.text }}>
                  {t('home.portfolioShowcase.paragraph1')}
                </Typography>
              </Reveal>
              <Reveal delay={180}>
                <Typography variant="body1" sx={{ mb: 4, color: tokens.textMuted }}>
                  {t('home.portfolioShowcase.paragraph2')}
                </Typography>
              </Reveal>
              <Reveal delay={240}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/portfolio"
                  endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                  sx={{ minHeight: 48, ...arrowNudge }}
                >
                  {t('home.portfolioShowcase.viewButton')}
                </Button>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ───────────── Final CTA ───────────── */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Reveal variant="scale">
            <Box
              className="grain"
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: { xs: '26px', md: '36px' },
                background: tokens.heroBackground,
                color: '#fff',
                textAlign: 'center',
                px: { xs: 3, md: 8 },
                py: { xs: 8, md: 12 },
              }}
            >
              <GlyphField opacity={0.06} density={0.5} />
              <Box aria-hidden sx={{ position: 'absolute', insetInline: '-6%', top: '50%', transform: 'translateY(-50%)', color: tokens.picton, opacity: 0.14 }}>
                <OghamMark text="Ready to get started" strokeLength={40} strokeWidth={1.75} stagger={40} sx={{ width: '100%', height: 'auto' }} />
              </Box>
              <Box sx={{ position: 'relative', maxWidth: 720, mx: 'auto' }}>
                <Box aria-hidden sx={{ display: 'flex', justifyContent: 'center', color: tokens.mint, mb: 3 }}>
                  <OghamMark text="Ogham" strokeLength={14} strokeWidth={2} delay={200} sx={{ width: 150, height: 'auto' }} />
                </Box>
                <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.6rem' }, mb: 2, textWrap: 'balance' }}>
                  {t('home.cta.title')}
                </Typography>
                <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.25rem' }, color: 'rgba(255,255,255,0.78)', mb: 5 }}>
                  {t('home.cta.subtitle')}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                  sx={{
                    minHeight: 54,
                    px: 4,
                    bgcolor: '#fff',
                    color: tokens.ink,
                    boxShadow: '0 18px 40px -18px rgba(0,0,0,0.6)',
                    '&:hover': { bgcolor: tokens.paper, boxShadow: '0 24px 48px -18px rgba(0,0,0,0.7)' },
                    ...arrowNudge,
                  }}
                >
                  {t('home.cta.button')}
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
