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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const pricingPlans = [
  {
    title: 'Standard',
    price: 0.08,
    unit: 'per word',
    description: 'For general content and basic documents',
    features: [
      { text: 'High-quality translation', included: true },
      { text: 'Full proofreading', included: true },
      { text: 'Standard delivery time', included: true },
      { text: 'Context-specific terminology', included: false },
      { text: 'Rush turnaround option', included: false },
      { text: 'Dedicated team', included: false },
    ],
    accent: false
  },
  {
    title: 'Professional',
    price: 0.12,
    unit: 'per word',
    description: 'For business and specialized content',
    features: [
      { text: 'High-quality translation', included: true },
      { text: 'Enhanced proofreading', included: true },
      { text: 'Faster delivery time', included: true },
      { text: 'Context-specific terminology', included: true },
      { text: 'Rush turnaround option', included: true },
      { text: 'Dedicated team', included: false },
    ],
    accent: true
  },
  {
    title: 'Premium',
    price: 0.16,
    unit: 'per word',
    description: 'For critical and high-visibility content',
    features: [
      { text: 'High-quality translation', included: true },
      { text: 'Multiple rounds of revision', included: true },
      { text: 'Priority delivery time', included: true },
      { text: 'Context-specific terminology', included: true },
      { text: 'Rush turnaround option', included: true },
      { text: 'Dedicated team', included: true },
    ],
    accent: false
  }
];

const serviceRates = [
  { service: 'Document Translation', standard: '0.08-0.10', professional: '0.12-0.14', premium: '0.16-0.20' },
  { service: 'Website Localization', standard: '0.10-0.12', professional: '0.14-0.16', premium: '0.18-0.22' },
  { service: 'Technical Translation', standard: '0.10-0.12', professional: '0.14-0.18', premium: '0.20-0.25' },
  { service: 'Legal Translation', standard: '0.12-0.14', professional: '0.16-0.20', premium: '0.22-0.28' },
  { service: 'Medical Translation', standard: '0.12-0.14', professional: '0.16-0.20', premium: '0.22-0.28' },
  { service: 'Marketing Content', standard: '0.09-0.11', professional: '0.13-0.15', premium: '0.17-0.22' },
  { service: 'Subtitling', standard: '6-8', professional: '9-12', premium: '14-18', note: 'Price per minute of video' },
];

const faqs = [
  {
    question: 'How do you calculate the cost of a translation project?',
    answer: 'We typically charge per word in the source text. The rates vary depending on the language pair, complexity of the content, required expertise, and turnaround time. For some services like subtitling, we charge per minute of video.'
  },
  {
    question: 'Are there any additional fees beyond the per-word rate?',
    answer: 'In most cases, the per-word rate covers the complete service. However, additional fees may apply for rush orders (typically +25-50%), specialized formatting requirements, or extra rounds of revision beyond what\'s included in your package.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept PayPal, bank transfers, and for corporate clients, we can arrange invoicing with payment terms.'
  },
  {
    question: 'Do you offer discounts for large projects?',
    answer: 'Yes, we offer volume discounts for large projects. The discount percentage increases with the size of the project, typically starting at 5% for projects over 10,000 words and up to 15% for projects over 50,000 words.'
  },
  {
    question: 'What is your policy on revisions?',
    answer: 'Our Standard package includes one round of revisions, the Professional package includes two rounds of revisions, and the Premium package includes unlimited revisions within a reasonable scope. Additional revision rounds can be purchased if needed.'
  },
  {
    question: 'How quickly can you deliver translations?',
    answer: 'Our standard delivery time is approximately 2,000-2,500 words per business day. Rush services are available at an additional cost, which can reduce turnaround time by 30-50%. For large urgent projects, we can assign multiple translators to meet tight deadlines.'
  }
];

const Pricing = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Transparent and flexible pricing options
          </Typography>
        </Container>
      </Box>

      {/* Pricing Plans */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Translation Packages
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Choose the right package for your translation needs. All prices are in CHF.
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
                    Get Started
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
            Detailed Service Rates
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Below are our rates for specific services (CHF per word unless otherwise noted).
            The exact price depends on language pair, complexity, and turnaround time.
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 4, overflow: 'hidden', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Service</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Standard</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Professional</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Premium</TableCell>
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
            <Typography variant="body2" color="text.secondary" gutterBottom>
              * Rates for Asian languages (Mandarin and Japanese) and rare languages (Romansh) may be higher.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ** Rush fees apply for expedited delivery: +25% for 24-hour turnaround, +50% for same-day delivery (when available).
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Custom Quote */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'white', textAlign: 'center', boxShadow: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Need a Personalized Quote?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Every project is unique. Contact us for a detailed quote tailored to your specific translation needs.
            We offer volume discounts and competitive rates for long-term contracts.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{ py: 1.5, px: 4 }}
          >
            Request a Custom Quote
          </Button>
        </Paper>
      </Container>

      {/* FAQs */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Find answers to common questions about our pricing and payment options.
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
              Our Satisfaction Guarantee
            </Typography>
            <Typography variant="body1" paragraph>
              We're committed to delivering high-quality translations that meet your expectations. 
              If you're not completely satisfied with our work, we'll revise it at no additional cost.
              
              If at any point you feel that the translation does not meet your expectations, you can request a cancellation, and we'll refund you — no questions asked.            </Typography>
            <Typography variant="body1" paragraph>
              For all projects, we provide:
            </Typography>
            <List>
              {[
                'Accurate and contextually appropriate translations',
                'On-time delivery as agreed in the project scope',
                'Consistent terminology throughout your documents',
                'Responsive customer service and project updates'
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
                Payment Terms
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                {[
                  { title: 'Small Projects', description: 'For projects under CHF 500, payment is required in full before work begins.' },
                  { title: 'Medium Projects', description: 'For projects between CHF 500-CHF 2,000, we require 50% upfront and 50% upon completion.' },
                  { title: 'Large Projects', description: 'For projects over CHF 2,000, we can arrange flexible payment terms with milestone payments.' },
                  { title: 'Corporate Clients', description: 'We offer Net-30 payment terms for established corporate clients with ongoing translation needs.' }
                ].map((term, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {term.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {term.description}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
