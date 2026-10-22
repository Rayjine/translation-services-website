import { Box, Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import OghamMark from '../ui/OghamMark';
import { tokens, fonts, easing } from '../../theme';

/** Short FAQ under the quote form (content from contact.faq). */
const ContactFaq = () => {
  const { t } = useTranslation();
  const raw = t('contact.faq.questions', { returnObjects: true });
  const questions = Array.isArray(raw) ? raw.filter((q) => q && q.question) : [];
  if (questions.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: tokens.paperDeep,
        borderTop: `1px solid ${tokens.line}`,
        py: { xs: 9, md: 13 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, md: 8 }}>
          <Grid item xs={12} md={4}>
            <SectionHeading align="start" title={t('contact.faq.title')} sx={{ mb: { xs: 3, md: 4 } }} />
            <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' }, color: tokens.shamrock, opacity: 0.5, width: 220 }}>
              <OghamMark text="Questions" strokeLength={16} strokeWidth={2} stagger={50} sx={{ width: '100%', height: 'auto' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {questions.map((q, i) => (
                <Reveal key={q.question} delay={i * 90}>
                  <Accordion
                    sx={{
                      bgcolor: '#fff',
                      transition: `box-shadow .35s ${easing.out}, border-color .35s`,
                      '&:hover': { borderColor: tokens.picton },
                      '&.Mui-expanded': { boxShadow: '0 22px 44px -30px rgba(7,26,43,0.45)', borderColor: tokens.picton },
                    }}
                  >
                    <AccordionSummary
                      id={`contact-faq-${i}-header`}
                      aria-controls={`contact-faq-${i}-content`}
                      expandIcon={<AddIcon className="keep-direction" />}
                      sx={{
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        minHeight: 64,
                        '& .MuiAccordionSummary-content': { alignItems: 'baseline', gap: { xs: 1.5, sm: 2.5 }, my: 1.5 },
                        '& .MuiAccordionSummary-expandIconWrapper': {
                          color: tokens.indigo,
                          transition: `transform .4s ${easing.out}`,
                        },
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' },
                      }}
                    >
                      <Box
                        component="span"
                        aria-hidden
                        sx={{ fontFamily: fonts.display, fontWeight: 600, color: tokens.shamrockText, fontSize: '0.95rem', flex: '0 0 auto' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Box>
                      <Typography component="span" sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.075rem' }, color: tokens.text }}>
                        {q.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: { xs: 2, sm: 3 }, pb: 3, pt: 0, paddingInlineStart: { xs: 2, sm: 'calc(24px + 20px + 1.5ch)' } }}>
                      <Typography variant="body1" sx={{ color: tokens.textMuted }}>
                        {q.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Reveal>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactFaq;
