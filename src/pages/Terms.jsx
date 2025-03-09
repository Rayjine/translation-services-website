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

const Terms = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Last updated: March 9, 2025
          </Typography>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ color: 'white' }}
          >
            <Link component={RouterLink} to="/" sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}>
              Home
            </Link>
            <Typography color="inherit">Terms and Conditions</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Ogham Translation Services ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website located at www.oghamtranslations.com and services provided by Ogham Translation Services.
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing our website or using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you may not access the website or use our services.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            2. Services Description
          </Typography>
          <Typography variant="body1" paragraph>
            Ogham Translation Services provides professional translation services in over 10 languages. Our services include document translation, website localization, technical translation, and other language services as described on our website.
          </Typography>
          <Typography variant="body1" paragraph>
            All translations are performed by professional translators who are native speakers in their respective languages and subject matter experts in their fields. Each translation undergoes a review process by a second professional to ensure quality and accuracy.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            3. Service Ordering and Delivery
          </Typography>
          <Typography variant="body1" paragraph>
            3.1. <strong>Quotes:</strong> All quotes provided by Ogham Translation Services are valid for 30 days from the date of issuance unless otherwise specified. Quotes are based on the information provided by the client at the time of the request.
          </Typography>
          <Typography variant="body1" paragraph>
            3.2. <strong>Order Confirmation:</strong> Services will only commence after receipt of written confirmation from the client accepting the quote and these Terms and Conditions.
          </Typography>
          <Typography variant="body1" paragraph>
            3.3. <strong>Delivery:</strong> The delivery date will be agreed upon at the time of order confirmation. Ogham Translation Services will make every effort to meet agreed delivery deadlines but cannot guarantee delivery in the event of circumstances beyond our control.
          </Typography>
          <Typography variant="body1" paragraph>
            3.4. <strong>Delivery Format:</strong> Unless otherwise specified, translations will be delivered in the same format as the source text. Additional formatting services may incur extra charges.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            4. Pricing and Payment
          </Typography>
          <Typography variant="body1" paragraph>
            4.1. <strong>Pricing:</strong> Our pricing is based on word count, language pair, complexity, and turnaround time. Special services such as certified translations or technical subject matter may incur additional charges.
          </Typography>
          <Typography variant="body1" paragraph>
            4.2. <strong>Payment Terms:</strong> We accept PayPal and bank transfers. For corporate clients, we can arrange invoicing with payment terms. For large projects, we may require a percentage of the payment upfront.
          </Typography>
          <Typography variant="body1" paragraph>
            4.3. <strong>Late Payment:</strong> Late payments may be subject to interest charges at a rate of 2% per month on any outstanding balance.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            5. Revisions and Quality Assurance
          </Typography>
          <Typography variant="body1" paragraph>
            5.1. <strong>Quality Guarantee:</strong> We are committed to providing high-quality translations. If you are not satisfied with our work, you may request revisions within 14 days of delivery.
          </Typography>
          <Typography variant="body1" paragraph>
            5.2. <strong>Revision Scope:</strong> Free revisions are limited to corrections of translation errors or misinterpretations. Changes to the source text or stylistic preferences that were not specified in the original brief may incur additional charges.
          </Typography>
          <Typography variant="body1" paragraph>
            5.3. <strong>Refund Policy:</strong> If we are unable to satisfy your requirements after reasonable attempts at revision, you are eligible for a full refund.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            6. Confidentiality and Data Protection
          </Typography>
          <Typography variant="body1" paragraph>
            6.1. <strong>Confidentiality:</strong> We treat all client documents and information as strictly confidential. Our translators and staff are bound by confidentiality agreements.
          </Typography>
          <Typography variant="body1" paragraph>
            6.2. <strong>Data Protection:</strong> We process personal data in accordance with our Privacy Policy and applicable data protection laws.
          </Typography>
          <Typography variant="body1" paragraph>
            6.3. <strong>Data Security:</strong> We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            7. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            7.1. <strong>Ownership:</strong> The client retains all intellectual property rights to the source content. The translated content becomes the property of the client upon full payment.
          </Typography>
          <Typography variant="body1" paragraph>
            7.2. <strong>Translation Memory:</strong> Unless otherwise agreed, we may store translations in our translation memory for quality and consistency purposes in future projects for the same client.
          </Typography>
          <Typography variant="body1" paragraph>
            7.3. <strong>Reference:</strong> We may include the client's name in our client list unless the client requests otherwise.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            8. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            8.1. <strong>Service Liability:</strong> Our liability is limited to the amount paid for the translation services. We are not liable for any indirect, consequential, or incidental damages.
          </Typography>
          <Typography variant="body1" paragraph>
            8.2. <strong>Content Responsibility:</strong> The client is responsible for ensuring that they have the right to translate the source content. We are not liable for any copyright infringement or other legal issues related to the content of the translations.
          </Typography>
          <Typography variant="body1" paragraph>
            8.3. <strong>Time-Sensitive Material:</strong> For time-sensitive materials, the client should notify us in advance. We are not liable for losses resulting from delays in delivery unless expressly agreed in writing.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            9. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            9.1. <strong>By the Client:</strong> The client may terminate services at any time by providing written notice. The client will be responsible for payment for all work completed up to the point of termination.
          </Typography>
          <Typography variant="body1" paragraph>
            9.2. <strong>By Ogham Translation Services:</strong> We reserve the right to terminate services if the client breaches these Terms and Conditions, particularly regarding payment terms.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            10. Governing Law and Dispute Resolution
          </Typography>
          <Typography variant="body1" paragraph>
            10.1. <strong>Governing Law:</strong> These Terms and Conditions shall be governed by and construed in accordance with the laws of Switzerland.
          </Typography>
          <Typography variant="body1" paragraph>
            10.2. <strong>Dispute Resolution:</strong> Any dispute arising out of or in connection with these Terms and Conditions shall be resolved through negotiation in good faith. If the dispute cannot be resolved through negotiation, it shall be submitted to the exclusive jurisdiction of the courts of Zurich, Switzerland.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            11. Modifications to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to the website. It is your responsibility to review these Terms and Conditions periodically. Your continued use of our services following the posting of revised Terms and Conditions means that you accept and agree to the changes.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            12. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms and Conditions, please contact us at:
          </Typography>
          <List>
            <ListItem disablePadding>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1 }}>Email:</Typography>
                <Link component="a" href="mailto:info@oghamtranslations.com" underline="hover">
                  info@oghamtranslations.com
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
