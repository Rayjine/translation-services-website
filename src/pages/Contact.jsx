import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
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

// Languages and service types will be loaded from translation files
const getLanguages = (t) => [
  t('contact.languages.english'),
  t('contact.languages.french'),
  t('contact.languages.german'),
  t('contact.languages.italian'),
  t('contact.languages.romansh'),
  t('contact.languages.spanish'),
  t('contact.languages.portuguese'),
  t('contact.languages.russian'),
  t('contact.languages.ukrainian'),
  t('contact.languages.mandarin'),
  t('contact.languages.japanese'),
  t('contact.languages.arabic'),
  t('contact.languages.czech'),
  t('contact.languages.turkish')
];

const getServiceTypes = (t) => [
  t('contact.serviceTypes.documentTranslation'),
  t('contact.serviceTypes.websiteLocalization'),
  t('contact.serviceTypes.technicalTranslation'),
  t('contact.serviceTypes.legalTranslation'),
  t('contact.serviceTypes.medicalTranslation'),
  t('contact.serviceTypes.marketingMaterials'),
  t('contact.serviceTypes.subtitling'),
  t('contact.serviceTypes.contentCreation'),
  t('contact.serviceTypes.softwareLocalization'),
  t('contact.serviceTypes.other')
];

const Contact = () => {
  const { t } = useTranslation();
  
  // Get translated languages and service types
  const languages = getLanguages(t);
  const serviceTypes = getServiceTypes(t);
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
  
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    // Clear file upload error if it exists
    if (formErrors.fileUpload) {
      setFormErrors({
        ...formErrors,
        fileUpload: null
      });
    }
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const clearSelectedFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = t('contact.form.errors.firstNameRequired');
    if (!formData.lastName.trim()) errors.lastName = t('contact.form.errors.lastNameRequired');
    
    if (!formData.email.trim()) {
      errors.email = t('contact.form.errors.emailRequired');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = t('contact.form.errors.emailInvalid');
    }
    
    if (!formData.sourceLanguage) errors.sourceLanguage = t('contact.form.errors.sourceLanguageRequired');
    if (!formData.targetLanguage) errors.targetLanguage = t('contact.form.errors.targetLanguageRequired');
    if (!formData.serviceType) errors.serviceType = t('contact.form.errors.serviceTypeRequired');
    if (!formData.projectDetails.trim()) errors.projectDetails = t('contact.form.errors.projectDetailsRequired');
    if (!formData.agreeToTerms) errors.agreeToTerms = t('contact.form.errors.termsRequired');
    if (!captchaValue) errors.captcha = t('contact.form.errors.captchaRequired') || 'Please verify that you are not a robot';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setSnackbar({
        open: true,
        message: t('contact.form.errors.formHasErrors'),
        severity: 'error'
      });
      return;
    }
    
    // Show loading state
    setSnackbar({
      open: true,
      message: t('contact.form.sending') || 'Sending your message...',
      severity: 'info'
    });
    
    try {
      // Prepare the data to be sent
      const submissionData = {
        ...formData,
        recaptchaToken: captchaValue
      };
      
      // If we have a file, use FormData to handle multipart/form-data
      if (selectedFile) {
        const formDataToSubmit = new FormData();
        
        // Add the JSON data as a string
        formDataToSubmit.append('data', JSON.stringify(submissionData));
        
        // Add the file
        formDataToSubmit.append('file', selectedFile);
        
        // Send the form data with the file
        const response = await fetch('https://oghamtranslations.com/send-email.php', {
          method: 'POST',
          body: formDataToSubmit
        });
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to send message');
        }
      } else {
        // No file, just send JSON data
        const response = await fetch('https://oghamtranslations.com/send-email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to send message');
        }
      }
      
      // Show success message
      setSnackbar({
        open: true,
        message: t('contact.form.success'),
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
    
    // Reset captcha
    setCaptchaValue(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    
    // Reset file input
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({
        open: true,
        message: t('contact.form.error') || 'An error occurred. Please try again later.',
        severity: 'error'
      });
    }
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
            {t('contact.pageTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            {t('contact.pageSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Contact Form and Info */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {t('contact.form.title')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                {t('contact.form.subtitle')}
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Personal Information */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      {t('contact.form.sections.contactInfo')}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label={t('contact.form.fields.firstName')}
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
                      label={t('contact.form.fields.lastName')}
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
                      label={t('contact.form.fields.email')}
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
                      label={t('contact.form.fields.phone')}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.form.fields.company')}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Project Requirements */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      {t('contact.form.sections.projectDetails')}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      select
                      fullWidth
                      label={t('contact.form.fields.sourceLanguage')}
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
                      label={t('contact.form.fields.targetLanguage')}
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
                      label={t('contact.form.fields.serviceType')}
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
                      label={t('contact.form.fields.projectDetails')}
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholders.projectDetails')}
                      error={!!formErrors.projectDetails}
                      helperText={formErrors.projectDetails}
                    />
                  </Grid>
                  
                  {/* File Upload */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      {t('contact.form.fields.fileUpload')}
                    </Typography>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.odt,.rtf"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={handleFileButtonClick}
                        startIcon={<i className="fas fa-file-upload"></i>}
                      >
                        {t('contact.form.actions.chooseFile')}
                      </Button>
                      
                      {selectedFile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ mr: 1, flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                          </Typography>
                          <Button 
                            size="small" 
                            onClick={clearSelectedFile}
                            sx={{ minWidth: 'auto', p: 0.5 }}
                          >
                            ✕
                          </Button>
                        </Box>
                      )}
                    </Box>
                    {!selectedFile && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                        {t('contact.form.placeholders.fileUpload')}
                      </Typography>
                    )}
                    {formErrors.fileUpload && (
                      <Typography variant="caption" color="error">
                        {formErrors.fileUpload}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('contact.form.fields.deadline')}
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
                      label={t('contact.form.fields.budget')}
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholders.budget')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.form.fields.howDidYouHear')}
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
                      label={t('contact.form.termsAgreement')}
                    />
                    {formErrors.agreeToTerms && (
                      <Typography variant="caption" color="error">
                        {formErrors.agreeToTerms}
                      </Typography>
                    )}
                  </Grid>
                  
                  {/* reCAPTCHA */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(value) => {
                          setCaptchaValue(value);
                          // Clear error when captcha is verified
                          if (formErrors.captcha) {
                            setFormErrors({
                              ...formErrors,
                              captcha: null
                            });
                          }
                        }}
                        theme="light"
                      />
                    </Box>
                    {formErrors.captcha && (
                      <Typography variant="caption" color="error" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                        {formErrors.captcha}
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
                      {t('contact.form.submitRequest')}
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
                  {t('contact.contactInfo.title')}
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  {t('contact.contactInfo.reachOut')}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <EmailIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {t('common.footer.email')}
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
                          {t('contact.contactInfo.businessHours')}
                        </Typography>
                        <Typography variant="body1">
                          {t('contact.contactInfo.weekdays')}
                        </Typography>
                        <Typography variant="body1">
                          {t('contact.contactInfo.saturday')}
                        </Typography>
                        <Typography variant="body1">
                          {t('contact.contactInfo.sunday')}
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
                {t('contact.contactInfo.immediateAssistance')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('contact.contactInfo.urgentNeeds')}
              </Typography>
              <Typography variant="body1" paragraph>
                • <Link href="mailto:urgent@oghamtranslations.com" color="inherit" underline="hover">
                    {t('contact.contactInfo.urgentEmail')}
                  </Link>
              </Typography>
              <Typography variant="body1">
                {t('contact.contactInfo.responseTime')}
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
