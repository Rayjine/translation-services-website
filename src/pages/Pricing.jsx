import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import OghamMark from '../components/ui/OghamMark';
import GlyphField from '../components/ui/GlyphField';
import PlanCard from '../components/pricing/PlanCard';
import PricingProcess from '../components/pricing/PricingProcess';
import RatesTable from '../components/pricing/RatesTable';
import PricingFaq from '../components/pricing/PricingFaq';
import GuaranteeSeal from '../components/pricing/GuaranteeSeal';
import { tokens, easing, fonts } from '../theme';

const FEATURE_COUNT = 6;

// Which features each package includes (same order as the translation arrays).
const PLAN_INCLUDES = [
  [true, true, true, false, false, false],
  [true, true, true, true, true, false],
  [true, true, true, true, true, true],
];

const getPricingPlans = (t) => [
  { key: 'standard', ogham: 'Standard', price: '0.08' },
  { key: 'professional', ogham: 'Professional', price: '0.12', featured: true },
  { key: 'premium', ogham: 'Premium', price: '0.16' },
].map((plan, i) => ({
  ...plan,
  title: t(`pricing.${plan.key}`),
  unit: t('pricing.perWord'),
  description: t(`pricing.packages.plans.${i}.description`),
  features: Array.from({ length: FEATURE_COUNT }, (_, f) => ({
    text: t(`pricing.packages.plans.${i}.features.${f}.text`),
    included: PLAN_INCLUDES[i][f],
  })),
}));

const getServiceRates = (t) =>
  Array.from({ length: 7 }, (_, i) => ({
    service: t(`pricing.rates.services.${i}.service`),
    standard: t(`pricing.rates.services.${i}.standard`),
    professional: t(`pricing.rates.services.${i}.professional`),
    premium: t(`pricing.rates.services.${i}.premium`),
    ...(i === 6 && { note: t('pricing.rates.services.6.note') }),
  }));

const getProcessSteps = (t) =>
  Array.from({ length: 4 }, (_, i) => ({
    title: t(`pricing.process.steps.${i}.title`),
    description: t(`pricing.process.steps.${i}.description`),
  }));

const getFaqs = (t) =>
  Array.from({ length: 6 }, (_, i) => ({
    question: t(`pricing.faqs.questions.${i}.question`),
    answer: t(`pricing.faqs.questions.${i}.answer`),
  }));

const sectionPy = { py: { xs: 10, md: 14 } };

const Pricing = () => {
  const { t } = useTranslation();
  const pricingPlans = getPricingPlans(t);
  const serviceRates = getServiceRates(t);
  const processSteps = getProcessSteps(t);
  const faqs = getFaqs(t);
  const guaranteePoints = [
    t('pricing.guarantee.points.accurate'),
    t('pricing.guarantee.points.onTime'),
    t('pricing.guarantee.points.consistent'),
    t('pricing.guarantee.points.responsive'),
  ];

  return (
    <Box>
      {/* ---------- Hero ---------- */}
      <PageHero
        eyebrow={t('pricing.eyebrow', 'Transparent rates in Swiss francs')}
        title={t('pricing.pageTitle')}
        subtitle={t('pricing.pageSubtitle')}
        ogham="Pricing"
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
            >
              {t('pricing.cta.button')}
            </Button>
            <Button
              href="#rates"
              variant="outlined"
              size="large"
              endIcon={<ArrowDownwardIcon className="keep-direction" />}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.4)',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              {t('pricing.rates.title')}
            </Button>
          </Box>
          {/* "Starting at CHF 0.08 per word" */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              paddingInlineStart: { xs: 0, sm: 3 },
              borderInlineStart: { xs: 'none', sm: '1px solid rgba(255,255,255,0.2)' },
            }}
          >
            <Box>
              <Typography component="span" variant="overline" sx={{ display: 'block', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                {t('pricing.startingAt')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, flexWrap: 'wrap' }}>
                <Box component="span" sx={{ direction: 'ltr', unicodeBidi: 'isolate', fontFamily: fonts.display, fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.1 }}>
                  <Box component="span" sx={{ fontFamily: fonts.body, fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', color: tokens.mint, marginInlineEnd: '6px' }}>
                    CHF
                  </Box>
                  0.08
                </Box>
                <Typography component="span" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                  {t('pricing.perWord')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </PageHero>

      {/* ---------- 01 · Packages ---------- */}
      <Box component="section" sx={{ ...sectionPy, position: 'relative', overflow: 'hidden' }}>
        {/* Faint carved stem behind the cards */}
        <Box
          aria-hidden
          sx={{ position: 'absolute', insetInline: '-4%', top: { xs: '30%', md: '46%' }, color: tokens.picton, opacity: 0.1, pointerEvents: 'none' }}
        >
          <OghamMark text="Standard Professional Premium" strokeLength={46} strokeWidth={1.5} stagger={30} sx={{ width: '100%', height: 'auto' }} />
        </Box>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <SectionHeading eyebrow="01" title={t('pricing.packages.title')} subtitle={t('pricing.packages.subtitle')} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
              gap: { xs: 4, md: 3, lg: 4 },
              alignItems: 'stretch',
              maxWidth: { xs: 480, md: 'none' },
              mx: 'auto',
            }}
          >
            {pricingPlans.map((plan, i) => (
              <Reveal key={plan.key} delay={i * 110} sx={{ height: '100%', order: { xs: plan.featured ? -1 : i, md: i } }}>
                <PlanCard plan={plan} index={i} featured={plan.featured} t={t} />
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ---------- 02 · How pricing works ---------- */}
      <Box component="section" sx={{ ...sectionPy, bgcolor: tokens.paperDeep, borderBlock: `1px solid ${tokens.line}` }}>
        <Container maxWidth="lg">
          <SectionHeading eyebrow="02" title={t('pricing.process.title')} subtitle={t('pricing.process.subtitle')} align="start" />
          <PricingProcess steps={processSteps} />
        </Container>
      </Box>

      {/* ---------- 03 · Detailed rates ---------- */}
      <Box component="section" id="rates" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionHeading eyebrow="03" title={t('pricing.rates.title')} subtitle={t('pricing.rates.subtitle')} />
          <Reveal variant="scale">
            <RatesTable rows={serviceRates} label={t('pricing.rates.title')} t={t} />
          </Reveal>
          <Reveal delay={120}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3, color: tokens.textMuted }}>
              <InfoOutlinedIcon className="keep-direction" sx={{ fontSize: 18, color: tokens.picton }} />
              <Typography variant="body2">{t('pricing.rates.note')}</Typography>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ---------- CTA ---------- */}
      <Box component="section" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 10, md: 14 } }}>
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
                px: { xs: 3.5, sm: 6, md: 9 },
                py: { xs: 7, md: 10 },
                boxShadow: `0 50px 100px -50px ${alpha(tokens.ink, 0.7)}`,
              }}
            >
              <GlyphField opacity={0.06} density={0.5} />
              <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ position: 'relative' }}>
                <Grid item xs={12} lg={7}>
                  <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                    {t('pricing.cta.title')}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: '1.08rem', md: '1.2rem' }, lineHeight: 1.6, maxWidth: 520 }}>
                    {t('pricing.cta.subtitle')}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', lg: 'column' }, flexWrap: 'wrap', alignItems: { xs: 'flex-start', md: 'center', lg: 'flex-end' }, gap: { xs: 2.5, md: 4, lg: 2.5 } }}>
                    <Button
                      component={RouterLink}
                      to="/contact"
                      variant="contained"
                      color="secondary"
                      size="large"
                      endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                      sx={{ minHeight: 56, px: 4 }}
                    >
                      {t('pricing.cta.button')}
                    </Button>
                    <Link
                      href="mailto:info@oghamtranslations.com"
                      aria-label={`${t('common.footer.email')}: info@oghamtranslations.com`}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        minHeight: 44,
                        color: 'rgba(255,255,255,0.78)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        transition: 'color .2s',
                        overflowWrap: 'anywhere',
                        '&:hover': { color: tokens.mint },
                      }}
                    >
                      <MailOutlineIcon className="keep-direction" sx={{ fontSize: 20, color: tokens.picton }} />
                      info@oghamtranslations.com
                    </Link>
                  </Box>
                </Grid>
              </Grid>
              {/* "Request a quote", carved along the foot of the card */}
              <Box aria-hidden sx={{ position: 'relative', mt: { xs: 5, md: 7 }, mx: { xs: -1, md: 0 }, color: tokens.mint, opacity: 0.4 }}>
                <OghamMark text="Request a quote" strokeLength={13} strokeWidth={1.5} stagger={45} delay={300} sx={{ width: '100%', height: 'auto' }} />
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ---------- 04 · FAQs ---------- */}
      <Box component="section" sx={{ ...sectionPy, bgcolor: tokens.paperDeep, borderBlock: `1px solid ${tokens.line}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 8 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <SectionHeading eyebrow="04" title={t('pricing.faqs.title')} subtitle={t('pricing.faqs.subtitle')} align="start" sx={{ mb: { xs: 4, md: 5 } }} />
                <Reveal variant="fade" delay={200}>
                  <Box sx={{ display: { xs: 'none', md: 'block' }, color: tokens.shamrock, opacity: 0.55 }}>
                    <OghamMark text="Questions" strokeLength={18} strokeWidth={2} stagger={60} sx={{ width: 240, height: 'auto' }} />
                  </Box>
                </Reveal>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <PricingFaq faqs={faqs} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---------- 05 · Guarantee & payment terms ---------- */}
      <Box component="section" sx={{ ...sectionPy, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 10, lg: 8 }} alignItems="center">
            <Grid item xs={12} lg={7}>
              <SectionHeading eyebrow="05" title={t('pricing.guarantee.title')} align="start" sx={{ mb: { xs: 3, md: 4 } }} />
              <Reveal delay={100}>
                <Typography
                  sx={{
                    position: 'relative',
                    fontFamily: fonts.display,
                    fontSize: { xs: '1.15rem', md: '1.3rem' },
                    lineHeight: 1.65,
                    color: tokens.text,
                    paddingInlineStart: { xs: 2.5, md: 3.5 },
                    mb: 5,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      insetInlineStart: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      borderRadius: 3,
                      background: tokens.gradient,
                    },
                  }}
                >
                  {t('pricing.guarantee.description')}
                </Typography>
              </Reveal>
              <Reveal delay={160}>
                <Typography variant="overline" component="p" sx={{ display: 'block', color: tokens.textMuted, mb: 2 }}>
                  {t('pricing.guarantee.provisions')}
                </Typography>
              </Reveal>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                {guaranteePoints.map((point, i) => (
                  <Reveal key={point} component="li" delay={200 + i * 80}>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-start',
                        p: 2,
                        borderRadius: '16px',
                        border: `1px solid ${tokens.line}`,
                        bgcolor: '#fff',
                        transition: `transform .4s ${easing.out}, border-color .3s, box-shadow .4s`,
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          borderColor: alpha(tokens.shamrock, 0.4),
                          boxShadow: '0 18px 36px -26px rgba(7,26,43,0.35)',
                        },
                      }}
                    >
                      <Box
                        aria-hidden
                        sx={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: alpha(tokens.shamrock, 0.12), color: tokens.shamrock }}
                      >
                        <CheckIcon className="check-icon" sx={{ fontSize: 16 }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: tokens.text, fontSize: '0.975rem', fontWeight: 600 }}>
                        {point}
                      </Typography>
                    </Box>
                  </Reveal>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Reveal variant="end" delay={120}>
                <Box sx={{ position: 'relative', maxWidth: 440, mx: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, mb: '-84px' }}>
                    <GuaranteeSeal label={t('pricing.guarantee.title')} size={200} />
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '22px',
                      border: `1px solid ${tokens.line}`,
                      bgcolor: '#fff',
                      px: { xs: 3, md: 4 },
                      pt: '116px',
                      pb: { xs: 3.5, md: 4 },
                      boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 30px 60px -36px rgba(7,26,43,0.3)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Box
                        aria-hidden
                        sx={{ width: 44, height: 44, borderRadius: '12px', display: 'grid', placeItems: 'center', bgcolor: alpha(tokens.picton, 0.12), color: tokens.indigo, flexShrink: 0 }}
                      >
                        <AccountBalanceWalletOutlinedIcon className="keep-direction" />
                      </Box>
                      <Typography variant="h3" component="h3" sx={{ fontSize: '1.5rem' }}>
                        {t('pricing.paymentTerms')}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: tokens.textMuted, fontSize: '1rem' }}>
                      {t('pricing.termsDescription')}
                    </Typography>
                    <Box aria-hidden sx={{ mt: 3, pt: 2.5, borderTop: `1px dashed ${tokens.line}`, color: tokens.picton, opacity: 0.6 }}>
                      <OghamMark text="Payment" strokeLength={10} strokeWidth={1.75} stagger={50} sx={{ height: 30, width: 'auto', maxWidth: '100%' }} />
                    </Box>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Pricing;
