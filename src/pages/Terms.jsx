import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('terms.pageTitle')}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {t('terms.lastUpdated')}: {t('terms.date')}
          </Typography>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ color: 'white' }}
          >
            <Link component={RouterLink} to="/" sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}>
              {t('terms.breadcrumbs.home')}
            </Link>
            <Typography color="inherit">{t('terms.breadcrumbs.terms')}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.intro.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('terms.content.intro.welcome')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('terms.content.intro.agreement')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.services.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('terms.content.services.description')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('terms.content.services.translators')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.ordering.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.ordering.quotes') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.ordering.confirmation') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.ordering.delivery') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.ordering.format') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.payment.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.payment.pricing') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.payment.terms') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.payment.latePayment') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.revisions.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.revisions.guarantee') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.revisions.scope') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.revisions.refund') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.confidentiality.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.confidentiality.confidentiality') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.confidentiality.dataProtection') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.confidentiality.security') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.intellectual.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.intellectual.ownership') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.intellectual.memory') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.intellectual.reference') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.liability.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.liability.service') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.liability.content') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.liability.timeSensitive') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.termination.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.termination.byClient') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.termination.byCompany') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.governing.title')}
          </Typography>
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.governing.law') }} />
          <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: t('terms.content.governing.resolution') }} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.modifications.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('terms.content.modifications.description')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('terms.content.contact.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('terms.content.contact.description')}
          </Typography>
          <List>
            <ListItem disablePadding>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1 }}>{t('terms.content.contact.email')}</Typography>
                <Link component="a" href="mailto:info@oghamtranslations.com" underline="hover">
                  {t('terms.content.contact.emailAddress')}
                </Link>
              </Box>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Terms;
