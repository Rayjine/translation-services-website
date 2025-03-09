import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Checkbox,
  Alert,
  Snackbar,
  Divider,
  Card,
  CardContent,
  Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const languages = [
  'English', 'French', 'German', 'Italian', 'Romansh', 'Spanish', 'Portuguese',
  'Russian', 'Ukrainian', 'Mandarin', 'Japanese', 'Arabic'
];

const serviceTypes = [
  'Document Translation',
  'Website Localization',
  'Technical Translation',
  'Legal Translation',
  'Medical Translation',
  'Marketing Materials',
  'Subtitling',
  'Content Creation',
  'Software Localization',
  'Other'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    sourceLanguage: '',
    targetLanguage: '',
    serviceType: '',
    projectDetails: '',
    deadline: '',
    budget: '',
    howDidYouHear: '',
    agreeToTerms: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is modified
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formData.sourceLanguage) errors.sourceLanguage = 'Source language is required';
    if (!formData.targetLanguage) errors.targetLanguage = 'Target language is required';
    if (!formData.serviceType) errors.serviceType = 'Service type is required';
    if (!formData.projectDetails.trim()) errors.projectDetails = 'Project details are required';
    if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms';
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setSnackbar({
        open: true,
        message: 'Please correct the errors in the form',
        severity: 'error'
      });
      return;
    }
    
    // Here would be the code to submit the form to a backend API
    console.log('Form submitted:', formData);
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Your inquiry has been submitted successfully! We will contact you soon.',
      severity: 'success'
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      sourceLanguage: '',
      targetLanguage: '',
      serviceType: '',
      projectDetails: '',
      deadline: '',
      budget: '',
      howDidYouHear: '',
      agreeToTerms: false
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Get in touch for a quote or to discuss your translation needs
          </Typography>
        </Container>
      </Box>

      {/* Contact Form and Info */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Request a Quote
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Fill out the form below and we'll get back to you with a quote for your translation project.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Personal Information */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Contact Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company (if applicable)"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Project Requirements */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Project Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      select
                      fullWidth
                      label="Source Language"
                      name="sourceLanguage"
                      value={formData.sourceLanguage}
                      onChange={handleChange}
                      error={!!formErrors.sourceLanguage}
                      helperText={formErrors.sourceLanguage}
                    >
                      {languages.map((language) => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      select
                      fullWidth
                      label="Target Language"
                      name="targetLanguage"
                      value={formData.targetLanguage}
                      onChange={handleChange}
                      error={!!formErrors.targetLanguage}
                      helperText={formErrors.targetLanguage}
                    >
                      {languages.map((language) => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      select
                      fullWidth
                      label="Service Type"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      error={!!formErrors.serviceType}
                      helperText={formErrors.serviceType}
                    >
                      {serviceTypes.map((serviceType) => (
                        <MenuItem key={serviceType} value={serviceType}>
                          {serviceType}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Project Details"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Please describe your project in detail (word count, document type, subject matter, etc.)"
                      error={!!formErrors.projectDetails}
                      helperText={formErrors.projectDetails}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Deadline (if any)"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Budget (approximate)"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. $500-1000"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="How did you hear about us?"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Terms and Submit */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label={
                        <>
                          I agree to the <Link component={RouterLink} to="/terms" color="primary">Terms & Conditions</Link> and <Link component={RouterLink} to="/privacy" color="primary">Privacy Policy</Link>
                        </>
                      }
                    />
                    {formErrors.agreeToTerms && (
                      <Typography variant="caption" color="error">
                        {formErrors.agreeToTerms}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Submit Request
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  Feel free to reach out to us directly:
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <EmailIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Email
                        </Typography>
                        <Typography variant="body1">
                          <Link href="mailto:info@oghamtranslations.com" color="inherit" underline="hover">
                            info@oghamtranslations.com
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <AccessTimeIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Business Hours
                        </Typography>
                        <Typography variant="body1">
                          Monday - Friday: 8:00 AM - 6:00 PM
                        </Typography>
                        <Typography variant="body1">
                          Saturday: 10:00 AM - 2:00 PM
                        </Typography>
                        <Typography variant="body1">
                          Sunday: Closed
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* FAQ or Support Box */}
            <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'white', boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom>
                Need Immediate Assistance?
              </Typography>
              <Typography variant="body1" paragraph>
                For urgent translation needs or questions about our services:
              </Typography>
              <Typography variant="body1" paragraph>
                • <Link href="mailto:urgent@oghamtranslations.com" color="inherit" underline="hover">
                    Email: urgent@oghamtranslations.com
                  </Link>
              </Typography>
              <Typography variant="body1">
                We aim to respond to all inquiries within 2 business hours during our working hours.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for form submission feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
