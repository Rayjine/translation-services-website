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

const Privacy = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Privacy Policy
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
            <Typography color="inherit">Privacy Policy</Typography>
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
            Ogham Translation Services ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.oghamtranslations.com or use our translation services.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services. By accessing our website or using our translation services, you agree to this Privacy Policy.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography variant="h6" gutterBottom>
            2.1 Personal Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may collect personal information that you voluntarily provide to us when you:
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            <Typography component="li" variant="body1">Register on our website</Typography>
            <Typography component="li" variant="body1">Request a quote or place an order</Typography>
            <Typography component="li" variant="body1">Subscribe to our newsletter</Typography>
            <Typography component="li" variant="body1">Respond to a survey or fill out a form</Typography>
            <Typography component="li" variant="body1">Contact us with inquiries or feedback</Typography>
          </Typography>
          <Typography variant="body1" paragraph>
            Personal information may include your name, email address, postal address, phone number, company information, and payment details.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2.2 Non-Personal Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may automatically collect certain non-personal information when you visit our website, including:
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            <Typography component="li" variant="body1">IP address</Typography>
            <Typography component="li" variant="body1">Browser type</Typography>
            <Typography component="li" variant="body1">Operating system</Typography>
            <Typography component="li" variant="body1">Pages visited and time spent on our website</Typography>
            <Typography component="li" variant="body1">Referring website addresses</Typography>
          </Typography>

          <Typography variant="h6" gutterBottom>
            2.3 Content for Translation
          </Typography>
          <Typography variant="body1" paragraph>
            When you use our translation services, we necessarily collect and process the content you provide for translation. This may include personal data contained within the documents or materials you submit.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            3. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may use the information we collect for various purposes, including to:
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            <Typography component="li" variant="body1">Provide, operate, and maintain our services</Typography>
            <Typography component="li" variant="body1">Process and fulfill your translation requests</Typography>
            <Typography component="li" variant="body1">Improve, personalize, and expand our services</Typography>
            <Typography component="li" variant="body1">Understand and analyze how you use our website</Typography>
            <Typography component="li" variant="body1">Develop new products, services, features, and functionality</Typography>
            <Typography component="li" variant="body1">Communicate with you about our services, updates, and other information</Typography>
            <Typography component="li" variant="body1">Send you marketing and promotional communications (only with your consent)</Typography>
            <Typography component="li" variant="body1">Find and prevent fraud</Typography>
            <Typography component="li" variant="body1">For compliance, legal process, and law enforcement purposes</Typography>
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            4. How We Share Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may share your information in the following situations:
          </Typography>

          <Typography variant="h6" gutterBottom>
            4.1 Service Providers
          </Typography>
          <Typography variant="body1" paragraph>
            We may share your information with service providers and translators who perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service. These service providers are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4.2 Business Transfers
          </Typography>
          <Typography variant="body1" paragraph>
            If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4.3 Legal Requirements
          </Typography>
          <Typography variant="body1" paragraph>
            We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4.4 With Your Consent
          </Typography>
          <Typography variant="body1" paragraph>
            We may disclose your personal information for any other purpose with your consent.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            5. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
          </Typography>
          <Typography variant="body1" paragraph>
            For the translation process itself, we employ strict confidentiality measures. All our translators sign confidentiality agreements, and we use secure systems for document transfers.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            6. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.
          </Typography>
          <Typography variant="body1" paragraph>
            For translation content, we typically retain your documents for up to 3 months after project completion to address any potential follow-up questions or revision requests, after which they are securely deleted. If you require immediate deletion of your content after project completion, please let us know.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            7. Your Privacy Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Depending on your location, you may have certain rights regarding your personal information. These may include:
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            <Typography component="li" variant="body1">The right to access personal information we hold about you</Typography>
            <Typography component="li" variant="body1">The right to request correction of inaccurate personal information</Typography>
            <Typography component="li" variant="body1">The right to request deletion of your personal information</Typography>
            <Typography component="li" variant="body1">The right to object to processing of your personal information</Typography>
            <Typography component="li" variant="body1">The right to data portability</Typography>
            <Typography component="li" variant="body1">The right to withdraw consent</Typography>
          </Typography>
          <Typography variant="body1" paragraph>
            To exercise these rights, please contact us using the details provided in the "Contact Us" section below.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            8. Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
          </Typography>
          <Typography variant="body1" paragraph>
            We use the following types of cookies:
          </Typography>
          <Typography component="ul" sx={{ pl: 4, mb: 2 }}>
            <Typography component="li" variant="body1"><strong>Essential cookies:</strong> Necessary for the operation of our website. They enable basic functions like page navigation and access to secure areas of the website.</Typography>
            <Typography component="li" variant="body1"><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</Typography>
            <Typography component="li" variant="body1"><strong>Preference cookies:</strong> Enable our website to remember information that changes the way the website behaves or looks, like your preferred language.</Typography>
          </Typography>
          <Typography variant="body1" paragraph>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            9. Third-Party Websites
          </Typography>
          <Typography variant="body1" paragraph>
            Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            10. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our services are not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            11. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" component="h2" gutterBottom>
            12. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
