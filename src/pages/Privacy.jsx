import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Breadcrumbs,
  Link,
  List,
  ListItem
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('privacy.pageTitle')}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {t('privacy.lastUpdated')}: {t('terms.date')}
          </Typography>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ color: 'white' }}
          >
            <Link component={RouterLink} to="/" sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}>
              {t('terms.breadcrumbs.home')}
            </Link>
            <Typography color="inherit">{t('privacy.pageTitle')}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.intro.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.intro.description1')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.intro.description2')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.collect.title')}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {t('privacy.content.collect.personal.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.collect.personal.intro')}
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            {t('privacy.content.collect.personal.list', { returnObjects: true }).map((item, index) => (
              <Typography key={index} component="li" variant="body1">{item}</Typography>
            ))}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.collect.personal.details')}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t('privacy.content.collect.nonPersonal.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.collect.nonPersonal.intro')}
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            {t('privacy.content.collect.nonPersonal.list', { returnObjects: true }).map((item, index) => (
              <Typography key={index} component="li" variant="body1">{item}</Typography>
            ))}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t('privacy.content.collect.translation.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.collect.translation.description')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.usage.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.usage.intro')}
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            {t('privacy.content.usage.list', { returnObjects: true }).map((item, index) => (
              <Typography key={index} component="li" variant="body1">{item}</Typography>
            ))}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.sharing.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.sharing.intro')}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t('privacy.content.sharing.providers.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.sharing.providers.description')}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t('privacy.content.sharing.transfers.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.sharing.transfers.description')}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t('privacy.content.sharing.legal.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.sharing.legal.description')}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t('privacy.content.sharing.consent.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.sharing.consent.description')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.security.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.security.measures')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.security.confidentiality')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.retention.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.retention.period')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.retention.translation')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.rights.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.rights.intro')}
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            {t('privacy.content.rights.list', { returnObjects: true }).map((item, index) => (
              <Typography key={index} component="li" variant="body1">{item}</Typography>
            ))}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.rights.exercise')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.cookies.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.cookies.description')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.cookies.types')}
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            {t('privacy.content.cookies.list', { returnObjects: true }).map((item, index) => (
              <Typography key={index} component="li" variant="body1" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.cookies.management')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.thirdParty.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.thirdParty.description')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.children.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.children.description')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.changes.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.changes.description')}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            {t('privacy.content.contact.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('privacy.content.contact.description')}
          </Typography>
          <List>
            <ListItem disablePadding>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1 }}>{t('privacy.content.contact.email')}</Typography>
                <Link component="a" href="mailto:info@oghamtranslations.com" underline="hover">
                  {t('privacy.content.contact.emailAddress')}
                </Link>
              </Box>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Privacy;
