import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Reveal from '../ui/Reveal';
import { tokens, easing, fonts } from '../../theme';

// A "+" whose vertical bar folds away into a "−" when the panel opens.
const PlusMinus = ({ open }) => (
  <Box
    aria-hidden
    sx={{
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: `1px solid ${open ? tokens.ink : tokens.line}`,
      bgcolor: open ? tokens.ink : 'transparent',
      color: open ? '#fff' : tokens.indigo,
      transform: open ? 'rotate(180deg)' : 'none',
      transition: `transform .5s ${easing.out}, background-color .3s, border-color .3s, color .3s`,
      '.MuiAccordionSummary-root:hover &': { borderColor: open ? tokens.ink : tokens.shamrock },
      '& span': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 14,
        height: 2,
        mt: '-1px',
        ml: '-7px',
        borderRadius: 2,
        bgcolor: 'currentColor',
        transition: `transform .5s ${easing.out}`,
      },
    }}
  >
    <span />
    <Box component="span" sx={{ transform: open ? 'rotate(0deg) scaleX(0.001)' : 'rotate(90deg)' }} />
  </Box>
);

const PricingFaq = ({ faqs }) => {
  const [expanded, setExpanded] = useState(0);

  return (
    <Box>
      {faqs.map((faq, index) => {
        const open = expanded === index;
        return (
          <Reveal key={faq.question} delay={index * 70}>
            <Accordion
              expanded={open}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? index : false)}
              sx={{
                mb: 1.5,
                bgcolor: open ? '#fff' : alpha('#fff', 0.55),
                borderColor: open ? alpha(tokens.shamrock, 0.35) : tokens.line,
                boxShadow: open ? '0 24px 48px -32px rgba(7,26,43,0.35)' : 'none',
                transition: `background-color .3s, border-color .3s, box-shadow .4s ${easing.out}`,
                '&:hover': { borderColor: open ? alpha(tokens.shamrock, 0.35) : alpha(tokens.picton, 0.5) },
              }}
            >
              <AccordionSummary
                expandIcon={<PlusMinus open={open} />}
                aria-controls={`pricing-faq-${index}-content`}
                id={`pricing-faq-${index}-header`}
                sx={{
                  minHeight: 76,
                  px: { xs: 2.25, md: 3 },
                  borderRadius: '16px',
                  gap: 2,
                  '& .MuiAccordionSummary-content': { my: 2.25, gap: { xs: 1.75, md: 2.5 }, alignItems: 'baseline' },
                  '& .MuiAccordionSummary-expandIconWrapper, & .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'none' },
                  '&.Mui-focusVisible': { bgcolor: 'transparent', outline: `2px solid ${tokens.indigo}`, outlineOffset: 2 },
                }}
              >
                <Typography
                  component="span"
                  aria-hidden
                  sx={{ fontFamily: fonts.display, fontWeight: 600, fontSize: '0.95rem', color: tokens.shamrockText, flexShrink: 0, minWidth: 22 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography component="span" sx={{ fontWeight: 700, fontSize: { xs: '1.02rem', md: '1.12rem' }, lineHeight: 1.45, color: tokens.text }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ px: { xs: 2.25, md: 3 }, pt: 0, pb: 3, paddingInlineStart: { xs: 'calc(18px + 22px + 14px)', md: 'calc(24px + 22px + 20px)' } }}
              >
                <Typography variant="body1" sx={{ color: tokens.textMuted, maxWidth: 640 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Reveal>
        );
      })}
    </Box>
  );
};

export default PricingFaq;
