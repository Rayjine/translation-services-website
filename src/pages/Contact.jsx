import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  FormControlLabel,
  MenuItem,
  Checkbox,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
  Link
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import OghamMark from '../components/ui/OghamMark';
import FormStep from '../components/contact/FormStep';
import ContactAside from '../components/contact/ContactAside';
import ContactFaq from '../components/contact/ContactFaq';
import { tokens, easing } from '../theme';

// Shared look for every input inside the quote card (presentation only).
const formFieldsSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fcfbf7',
    transition: 'background-color .25s, box-shadow .25s',
    '&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(tokens.indigo, 0.45),
    },
    '&.Mui-focused': { backgroundColor: '#fff' },
    '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': { borderColor: tokens.indigo },
  },
  '& .MuiInputLabel-root.Mui-focused:not(.Mui-error)': { color: tokens.indigo },
  '& .MuiFormHelperText-root.Mui-error': { fontWeight: 600 },
  // No RTL stylis plugin: move the select chevron to the inline end so it never covers the label in Arabic.
  '[dir="rtl"] & .MuiSelect-icon': { right: 'auto', left: 7 },
  '[dir="rtl"] & .MuiOutlinedInput-root .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    paddingRight: '14px',
    paddingLeft: '32px',
  },
  // MUI positions outlined labels from the left (translateX(+14px)); the global rtl.css
  // anchors them to the right, which pushed the first glyphs past the border. Anchor to the
  // inline end and translate inwards instead, and put the outline notch on the same side.
  '[dir="rtl"] & .MuiInputLabel-root.MuiInputLabel-outlined': {
    left: 'auto',
    right: 0,
    transformOrigin: 'top right',
    transform: 'translate(-14px, 16px) scale(1)',
  },
  '[dir="rtl"] & .MuiInputLabel-root.MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(-14px, -9px) scale(0.75)',
  },
  '[dir="rtl"] & .MuiOutlinedInput-notchedOutline': { textAlign: 'right' },
  '[dir="rtl"] & .MuiFormHelperText-root': { textAlign: 'right' },
};

// MUI Alert spacing is physical (icon margin-right, action margin-left); mirror it in RTL.
const alertLogicalSx = {
  '& .MuiAlert-icon': { mr: 0, marginInlineEnd: '12px' },
  '& .MuiAlert-action': { ml: 0, mr: 0, pl: 0, marginInlineStart: 'auto', marginInlineEnd: '-8px', paddingInlineStart: '16px' },
};

const heroPillSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  minHeight: 44,
  px: 2.25,
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.22)',
  bgcolor: 'rgba(255,255,255,0.06)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '0.95rem',
  maxWidth: '100%',
  '& svg': { fontSize: 19, color: tokens.mint, flex: '0 0 auto' },
};

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
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
  const recaptchaConfigured = Boolean(recaptchaSiteKey);
  
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
  const [submitting, setSubmitting] = useState(false);
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
    if (file && file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);
      setFormErrors((errors) => ({ ...errors, fileUpload: t('contact.form.errors.fileTooBig') }));
      e.target.value = '';
      return;
    }
    if (file && !/\.(pdf|doc|docx|txt|xls|xlsx|ppt|pptx|odt|rtf)$/i.test(file.name)) {
      setSelectedFile(null);
      setFormErrors((errors) => ({ ...errors, fileUpload: t('contact.form.errors.fileTypeInvalid') }));
      e.target.value = '';
      return;
    }
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

    if (!recaptchaConfigured) return;
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      const firstInvalid = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstInvalid}"]`)?.focus();
      setSnackbar({
        open: true,
        message: t('contact.form.errors.formHasErrors'),
        severity: 'error'
      });
      return;
    }
    
    setSubmitting(true);
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
        const response = await fetch('/send-email.php', {
          method: 'POST',
          body: formDataToSubmit
        });
        
        const result = await response.json();
        
        if (!response.ok || !result.success) {
          throw new Error(response.status === 429 ? 'rate-limit' : 'send-failed');
        }
      } else {
        // No file, just send JSON data
        const response = await fetch('/send-email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        
        if (!response.ok || !result.success) {
          throw new Error(response.status === 429 ? 'rate-limit' : 'send-failed');
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
        message: error.message === 'rate-limit'
          ? t('contact.form.rateLimited', { defaultValue: 'Too many requests. Please wait before trying again, or email us directly.' })
          : t('contact.form.error') || 'An error occurred. Please try again later.',
        severity: 'error'
      });
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
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
      <PageHero
        eyebrow={t('common.buttons.getQuote')}
        title={t('contact.pageTitle')}
        subtitle={t('contact.pageSubtitle')}
        ogham="Contact"
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          <Link
            href="mailto:info@oghamtranslations.com"
            underline="none"
            sx={{
              ...heroPillSx,
              transition: `background-color .25s, border-color .25s, transform .3s ${easing.out}`,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: tokens.mint, transform: 'translateY(-2px)' },
            }}
          >
            <MailOutlineIcon aria-hidden className="keep-direction" />
            <Box component="span" sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>info@oghamtranslations.com</Box>
          </Link>
          <Box sx={{ ...heroPillSx, color: 'rgba(255,255,255,0.86)', borderStyle: 'dashed', py: 1 }}>
            <PlaceOutlinedIcon aria-hidden className="keep-direction" />
            <span>{t('contact.contactInfo.address')}</span>
          </Box>
        </Box>
      </PageHero>

      {/* Quote form + contact details */}
      <Box component="section" sx={{ position: 'relative', pb: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg" sx={{ position: 'relative', mt: { xs: -5, md: -8 } }}>
          <Grid container rowSpacing={{ xs: 4, md: 5 }} columnSpacing={{ xs: 0, lg: 5 }}>
            {/* Side by side only from lg: at md the 7/12 column is too narrow for the two-up fields. */}
            <Grid item xs={12} lg={7}>
              <Reveal>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 1px 2px rgba(7,26,43,0.05), 0 40px 80px -40px rgba(7,26,43,0.45)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      insetInline: 0,
                      top: 0,
                      height: 4,
                      background: tokens.gradient,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', px: { xs: 2.5, sm: 4, md: 5 }, pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 } }}>
                    <Box
                      aria-hidden
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        position: 'absolute',
                        top: { sm: 36, md: 44 },
                        insetInlineEnd: { sm: 28, md: 40 },
                        width: 120,
                        color: tokens.picton,
                        opacity: 0.5,
                      }}
                    >
                      <OghamMark text="Quote" strokeLength={13} strokeWidth={2} stagger={60} delay={300} sx={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{ mb: 1.5, paddingInlineEnd: { sm: '150px' }, color: tokens.text }}
                    >
                      {t('contact.form.title')}
                    </Typography>
                    <Typography variant="body1" sx={{ color: tokens.textMuted, maxWidth: 560 }}>
                      {t('contact.form.subtitle')}
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit} noValidate>
                    <Box sx={{ px: { xs: 2.5, sm: 4, md: 5 }, pt: { xs: 2, md: 3 }, borderTop: `1px solid ${tokens.line}`, ...formFieldsSx }}>
                      {snackbar.open && snackbar.severity !== 'info' && (
                        <Alert severity={snackbar.severity} role="status" sx={{ mb: 3, borderRadius: '14px', ...alertLogicalSx }}>
                          {snackbar.message}
                        </Alert>
                      )}

                      <Box sx={{ pt: { xs: 2, md: 2.5 } }}>
                        {/* Personal Information */}
                        <FormStep number="01" title={t('contact.form.sections.contactInfo')}>
                          <Grid container spacing={2.5}>
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
                          </Grid>
                        </FormStep>

                        {/* Project Requirements */}
                        <FormStep number="02" title={t('contact.form.sections.projectDetails')}>
                          <Grid container spacing={2.5}>
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
                          </Grid>
                        </FormStep>

                        {/* Additional information */}
                        <FormStep number="03" title={t('contact.form.sections.additionalInfo')} last>
                          <Grid container spacing={2.5}>
                            {/* File Upload */}
                            <Grid item xs={12}>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.odt,.rtf"
                              />
                              <Box
                                sx={{
                                  position: 'relative',
                                  display: 'flex',
                                  flexDirection: { xs: 'column', md: 'row' },
                                  alignItems: { xs: 'stretch', md: 'center' },
                                  gap: 2,
                                  p: { xs: 2.25, sm: 2.5 },
                                  borderRadius: '16px',
                                  border: '1.5px dashed',
                                  borderColor: formErrors.fileUpload ? 'error.main' : selectedFile ? tokens.shamrock : alpha(tokens.indigo, 0.25),
                                  bgcolor: selectedFile ? alpha(tokens.mint, 0.12) : alpha(tokens.sky, 0.1),
                                  transition: 'border-color .25s, background-color .25s',
                                  '&:hover': { borderColor: formErrors.fileUpload ? 'error.main' : tokens.picton, bgcolor: alpha(tokens.sky, 0.18) },
                                  '&:hover .file-drop__icon': { transform: 'translateY(-3px)' },
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                                  <Box
                                    aria-hidden
                                    className="file-drop__icon"
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      flex: '0 0 48px',
                                      borderRadius: '14px',
                                      display: 'grid',
                                      placeItems: 'center',
                                      bgcolor: '#fff',
                                      color: selectedFile ? tokens.shamrock : tokens.indigo,
                                      border: `1px solid ${tokens.line}`,
                                      boxShadow: '0 8px 18px -12px rgba(7,26,43,0.35)',
                                      transition: `transform .4s ${easing.out}`,
                                    }}
                                  >
                                    {selectedFile
                                      ? <DescriptionOutlinedIcon className="keep-direction" />
                                      : <UploadFileOutlinedIcon className="keep-direction" />}
                                  </Box>
                                  <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography variant="subtitle1" component="p" sx={{ color: tokens.text, lineHeight: 1.4 }}>
                                      {t('contact.form.fields.fileUpload')}
                                    </Typography>
                                    {selectedFile ? (
                                      <Typography
                                        variant="body2"
                                        sx={{ color: tokens.text, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                      >
                                        {selectedFile.name}{' '}
                                        <Box component="span" sx={{ color: tokens.textMuted, fontWeight: 500 }}>
                                          ({Math.round(selectedFile.size / 1024)} KB)
                                        </Box>
                                      </Typography>
                                    ) : (
                                      <Typography variant="caption" sx={{ display: 'block', color: tokens.textMuted, lineHeight: 1.5, mt: 0.25 }}>
                                        {t('contact.form.placeholders.fileUpload')}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '0 0 auto' }}>
                                  {selectedFile && (
                                    <IconButton
                                      onClick={clearSelectedFile}
                                      aria-label={t('contact.form.actions.removeFile', 'Remove file')}
                                      sx={{ width: 44, height: 44, color: tokens.textMuted, '&:hover': { color: 'error.main', bgcolor: alpha('#b3261e', 0.08) } }}
                                    >
                                      <CloseIcon className="keep-direction" fontSize="small" />
                                    </IconButton>
                                  )}
                                  <Button
                                    variant="outlined"
                                    onClick={handleFileButtonClick}
                                    startIcon={<UploadFileOutlinedIcon className="keep-direction" />}
                                    sx={{ minHeight: 44, bgcolor: '#fff', flex: { xs: 1, md: '0 0 auto' }, whiteSpace: 'nowrap' }}
                                  >
                                    {t('contact.form.actions.chooseFile')}
                                  </Button>
                                </Box>
                              </Box>
                              {formErrors.fileUpload && (
                                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1, fontWeight: 600 }}>
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
                          </Grid>
                        </FormStep>
                      </Box>
                    </Box>

                    {/* Terms, CAPTCHA and Submit */}
                    <Box
                      sx={{
                        mt: { xs: 4, md: 5 },
                        px: { xs: 2.5, sm: 4, md: 5 },
                        py: { xs: 3, md: 4 },
                        bgcolor: tokens.paper,
                        borderTop: `1px solid ${tokens.line}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                      }}
                    >
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleChange}
                              color="primary"
                              sx={{ p: 1.25, mt: '-6px' }}
                            />
                          }
                          label={t('contact.form.termsAgreement')}
                          sx={{
                            alignItems: 'flex-start',
                            marginInlineStart: '-10px',
                            marginInlineEnd: 0,
                            '& .MuiFormControlLabel-label': { fontSize: '0.975rem', lineHeight: 1.55, color: tokens.text, pt: '4px' },
                          }}
                        />
                        {formErrors.agreeToTerms && (
                          <Typography variant="caption" color="error" sx={{ display: 'block', fontWeight: 600, paddingInlineStart: '34px' }}>
                            {formErrors.agreeToTerms}
                          </Typography>
                        )}
                      </Box>

                      {!recaptchaConfigured && (
                        <Alert
                          severity="info"
                          icon={<MailOutlineIcon className="keep-direction" fontSize="inherit" />}
                          sx={{
                            borderRadius: '14px',
                            border: `1px solid ${alpha(tokens.picton, 0.35)}`,
                            bgcolor: alpha(tokens.sky, 0.22),
                            color: tokens.text,
                            ...alertLogicalSx,
                            '& .MuiAlert-icon': { ...alertLogicalSx['& .MuiAlert-icon'], color: tokens.indigo },
                            '& a': { fontWeight: 700, color: tokens.indigo },
                          }}
                        >
                          {t('contact.form.unavailable', { defaultValue: 'The online form is temporarily unavailable. Please email us directly at' })}{' '}
                          <Link href="mailto:info@oghamtranslations.com" color="inherit" underline="always">
                            info@oghamtranslations.com
                          </Link>.
                        </Alert>
                      )}

                      {/* reCAPTCHA is only mounted when the public site key is configured. */}
                      {recaptchaConfigured && (
                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              '@media (max-width: 360px)': { transform: 'scale(0.86)', transformOrigin: 'center top', mb: '-12px' },
                            }}
                          >
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={recaptchaSiteKey}
                              onChange={(value) => {
                                setCaptchaValue(value);
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
                            <Typography variant="caption" color="error" sx={{ display: 'block', textAlign: 'center', mt: 1, fontWeight: 600 }}>
                              {formErrors.captcha}
                            </Typography>
                          )}
                        </Box>
                      )}

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={!recaptchaConfigured || submitting}
                        startIcon={submitting ? <CircularProgress size={18} thickness={5} color="inherit" /> : undefined}
                        endIcon={submitting ? undefined : <ArrowForwardIcon className="flip-in-rtl" />}
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          minHeight: 56,
                          py: 1.75,
                          fontSize: '1.05rem',
                          background: `linear-gradient(120deg, ${tokens.ink} 0%, ${tokens.indigo} 100%)`,
                          // A soft highlight sweeps across on hover, like light over a carved stone.
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                            transform: 'translateX(-100%)',
                            transition: `transform .8s ${easing.out}`,
                          },
                          '&:hover::after': { transform: 'translateX(100%)' },
                          '& .MuiButton-endIcon': { transition: `transform .35s ${easing.out}` },
                          '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
                          '[dir="rtl"] &:hover .MuiButton-endIcon': { transform: 'translateX(-4px)' },
                          '&.Mui-disabled': {
                            background: tokens.paperDeep,
                            color: tokens.textMuted,
                            border: `1px solid ${tokens.line}`,
                            boxShadow: 'none',
                          },
                        }}
                      >
                        {submitting ? t('contact.form.sending', 'Sending…') : t('contact.form.submitRequest')}
                      </Button>
                    </Box>
                  </form>
                </Card>
              </Reveal>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} lg={5}>
              <ContactAside />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ContactFaq />

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
          sx={{ width: '100%', borderRadius: '14px', fontWeight: 600, boxShadow: '0 20px 50px -20px rgba(7,26,43,0.6)', ...alertLogicalSx }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
