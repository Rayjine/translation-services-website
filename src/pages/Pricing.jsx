import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const getPricingPlans = (t) => [
  {
    title: t('pricing.standard'),
    price: 0.08,
    unit: t('pricing.perWord'),
    description: t('pricing.packages.plans.0.description'),
    features: [
      { text: t('pricing.packages.plans.0.features.0.text'), included: true },
      { text: t('pricing.packages.plans.0.features.1.text'), included: true },
      { text: t('pricing.packages.plans.0.features.2.text'), included: true },
      { text: t('pricing.packages.plans.0.features.3.text'), included: false },
      { text: t('pricing.packages.plans.0.features.4.text'), included: false },
      { text: t('pricing.packages.plans.0.features.5.text'), included: false },
    ],
    accent: false
  },
  {
    title: t('pricing.professional'),
    price: 0.12,
    unit: t('pricing.perWord'),
    description: t('pricing.packages.plans.1.description'),
    features: [
      { text: t('pricing.packages.plans.1.features.0.text'), included: true },
      { text: t('pricing.packages.plans.1.features.1.text'), included: true },
      { text: t('pricing.packages.plans.1.features.2.text'), included: true },
      { text: t('pricing.packages.plans.1.features.3.text'), included: true },
      { text: t('pricing.packages.plans.1.features.4.text'), included: true },
      { text: t('pricing.packages.plans.1.features.5.text'), included: false },
    ],
    accent: true
  },
  {
    title: t('pricing.premium'),
    price: 0.16,
    unit: t('pricing.perWord'),
    description: t('pricing.packages.plans.2.description'),
    features: [
      { text: t('pricing.packages.plans.2.features.0.text'), included: true },
      { text: t('pricing.packages.plans.2.features.1.text'), included: true },
      { text: t('pricing.packages.plans.2.features.2.text'), included: true },
      { text: t('pricing.packages.plans.2.features.3.text'), included: true },
      { text: t('pricing.packages.plans.2.features.4.text'), included: true },
      { text: t('pricing.packages.plans.2.features.5.text'), included: true },
    ],
    accent: false
  }
];

const getServiceRates = (t) => [
  { service: t('pricing.rates.services.0.service'), standard: t('pricing.rates.services.0.standard'), professional: t('pricing.rates.services.0.professional'), premium: t('pricing.rates.services.0.premium') },
  { service: t('pricing.rates.services.1.service'), standard: t('pricing.rates.services.1.standard'), professional: t('pricing.rates.services.1.professional'), premium: t('pricing.rates.services.1.premium') },
  { service: t('pricing.rates.services.2.service'), standard: t('pricing.rates.services.2.standard'), professional: t('pricing.rates.services.2.professional'), premium: t('pricing.rates.services.2.premium') },
  { service: t('pricing.rates.services.3.service'), standard: t('pricing.rates.services.3.standard'), professional: t('pricing.rates.services.3.professional'), premium: t('pricing.rates.services.3.premium') },
  { service: t('pricing.rates.services.4.service'), standard: t('pricing.rates.services.4.standard'), professional: t('pricing.rates.services.4.professional'), premium: t('pricing.rates.services.4.premium') },
  { service: t('pricing.rates.services.5.service'), standard: t('pricing.rates.services.5.standard'), professional: t('pricing.rates.services.5.professional'), premium: t('pricing.rates.services.5.premium') },
  { service: t('pricing.rates.services.6.service'), standard: t('pricing.rates.services.6.standard'), professional: t('pricing.rates.services.6.professional'), premium: t('pricing.rates.services.6.premium'), note: t('pricing.rates.services.6.note') },
];

const getFaqs = (t) => [
  {
    question: t('pricing.faqs.questions.0.question'),
    answer: t('pricing.faqs.questions.0.answer')
  },
  {
    question: t('pricing.faqs.questions.1.question'),
    answer: t('pricing.faqs.questions.1.answer')
  },
  {
    question: t('pricing.faqs.questions.2.question'),
    answer: t('pricing.faqs.questions.2.answer')
  },
  {
    question: t('pricing.faqs.questions.3.question'),
    answer: t('pricing.faqs.questions.3.answer')
  },
  {
    question: t('pricing.faqs.questions.4.question'),
    answer: t('pricing.faqs.questions.4.answer')
  }
];

const Pricing = () => {
  const { t } = useTranslation();
  const pricingPlans = getPricingPlans(t);
  const serviceRates = getServiceRates(t);
  const faqs = getFaqs(t);
  
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('pricing.pageTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            {t('pricing.pageSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Pricing Plans */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {t('pricing.packages.title')}
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          {t('pricing.packages.subtitle')}
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {pricingPlans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  ...(plan.accent && {
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    transform: 'scale(1.02)',
                    boxShadow: 4
                  })
                }}
              >
                <CardHeader
                  title={plan.title}
                  titleTypographyProps={{ align: 'center', variant: 'h5' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  sx={{
                    bgcolor: plan.accent ? 'secondary.main' : 'primary.main',
                    color: 'white',
                    pb: 1
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                    <Typography component="h2" variant="h3" color="text.primary">
                      CHF {plan.price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {plan.unit}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" align="center" sx={{ fontStyle: 'italic', mb: 3 }}>
                    {plan.description}
                  </Typography>
                  <List sx={{ flexGrow: 1 }}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature.text} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          {feature.included ? (
                            <CheckIcon sx={{ color: 'success.main' }} />
                          ) : (
                            <CloseIcon sx={{ color: 'text.disabled' }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={feature.text}
                          primaryTypographyProps={{
                            color: feature.included ? 'textPrimary' : 'textSecondary',
                            style: !feature.included ? { textDecoration: 'line-through' } : {}
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    variant={plan.accent ? 'contained' : 'outlined'}
                    color={plan.accent ? 'secondary' : 'primary'}
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    {t('pricing.cta.button')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Detailed Pricing Table */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {t('pricing.rates.title')}
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            {t('pricing.rates.subtitle')}
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 4, overflow: 'hidden', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('pricing.rates.headers.service')}</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>{t('pricing.standard')}</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>{t('pricing.professional')}</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>{t('pricing.premium')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceRates.map((row) => (
                  <TableRow
                    key={row.service}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.service}
                      {row.note && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          {row.note}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">CHF {row.standard}</TableCell>
                    <TableCell align="center">CHF {row.professional}</TableCell>
                    <TableCell align="center">CHF {row.premium}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('pricing.rates.note')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Custom Quote */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'white', textAlign: 'center', boxShadow: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('pricing.cta.title')}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            {t('pricing.cta.subtitle')}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{ py: 1.5, px: 4 }}
          >
            {t('pricing.cta.button')}
          </Button>
        </Paper>
      </Container>

      {/* FAQs */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {t('pricing.faqs.title')}
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            {t('pricing.faqs.subtitle')}
          </Typography>

          <Grid container spacing={2}>
            {faqs.map((faq, index) => (
              <Grid item xs={12} key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)' }}
                  >
                    <Typography variant="h6">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Satisfaction Guarantee */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              {t('pricing.guarantee.title')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('pricing.guarantee.description')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('pricing.guarantee.provisions')}
            </Typography>
            <List>
              {[
                t('pricing.guarantee.points.accurate'),
                t('pricing.guarantee.points.onTime'),
                t('pricing.guarantee.points.consistent'),
                t('pricing.guarantee.points.responsive')
              ].map((point, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <CheckIcon sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom>
                <InfoOutlinedIcon sx={{ verticalAlign: 'middle', mr: 1, color: 'primary.main' }} />
                {t('pricing.paymentTerms')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="body2" paragraph>
                {t('pricing.termsDescription')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
