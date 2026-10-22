import { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import OghamMark from '../ui/OghamMark';
import { useInView, prefersReducedMotion } from '../../hooks/useInView';
import { tokens, fonts, easing } from '../../theme';

// "Ogham Translation Services" written in the scripts the team works with.
// `label` is the language's own name, so it is intentionally not translated.
const scriptExamples = [
  { text: 'Ogham Translation Services', code: 'EN', label: 'English', lang: 'en' },
  { text: 'Огам Сервисы Переводов', code: 'RU', label: 'Русский', lang: 'ru' },
  { text: 'خدمات الترجمة أوغام', code: 'AR', label: 'العربية', lang: 'ar', dir: 'rtl' },
  { text: '奥甘翻译服务', code: 'ZH', label: '中文', lang: 'zh' },
  { text: 'オーガム翻訳サービス', code: 'JA', label: '日本語', lang: 'ja' },
  { text: 'Services de Traduction Ogham', code: 'FR', label: 'Français', lang: 'fr' },
  { text: 'Ogham Übersetzungsdienste', code: 'DE', label: 'Deutsch', lang: 'de' },
  { text: 'Servizi di Traduzione Ogham', code: 'IT', label: 'Italiano', lang: 'it' },
  { text: 'Servicios de Traducción Ogham', code: 'ES', label: 'Español', lang: 'es' },
];

const HOLD = 2400;
const GAP = 320;

// Shared type style of the typed line, also used by the invisible sizers.
const lineSx = (dir) => ({
  m: 0,
  fontFamily: fonts.display,
  fontWeight: 500,
  fontSize: { xs: '1.9rem', sm: '2.5rem', md: '2.3rem', lg: '2.85rem' },
  lineHeight: 1.18,
  // Long compounds ("Übersetzungsdienste") must wrap inside the narrow md card.
  hyphens: 'auto',
  overflowWrap: 'anywhere',
  letterSpacing: dir === 'rtl' ? 0 : '-0.02em',
  textAlign: 'start',
});

const caretSx = {
  display: 'inline-block',
  width: '3px',
  height: '0.95em',
  marginInlineStart: '6px',
  verticalAlign: '-0.1em',
};

// Ideographic scripts have few characters, so they are typed a little slower.
const typeSpeed = (lang) => (lang === 'zh' || lang === 'ja' ? 150 : 70);

/**
 * Glassy "translation slip" for the home hero. Types the brand name in each script,
 * then erases it and moves on. Starts with the full English line so the brand name is
 * there on first paint. Pauses off-screen and on request (WCAG 2.2.2: the button also pauses
 * the page's other decorative loops via html[data-motion-paused]); static under reduced motion.
 */
const TranslationCard = () => {
  const [ref, inView] = useInView({ once: false, threshold: 0.15, rootMargin: '0px' });
  const [reduced] = useState(prefersReducedMotion);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(scriptExamples[0].text);
  const [phase, setPhase] = useState('hold'); // type | hold | erase
  const [paused, setPaused] = useState(false);
  const { t } = useTranslation();

  const current = scriptExamples[index];

  useEffect(() => {
    document.documentElement.toggleAttribute('data-motion-paused', paused);
    return () => document.documentElement.removeAttribute('data-motion-paused');
  }, [paused]);

  useEffect(() => {
    if (!inView || reduced || paused) return undefined;

    const full = current.text;
    let delay;
    let step;
    if (phase === 'type') {
      if (text.length >= full.length) {
        delay = 0;
        step = () => setPhase('hold');
      } else {
        delay = typeSpeed(current.lang);
        step = () => setText(full.slice(0, text.length + 1));
      }
    } else if (phase === 'hold') {
      delay = HOLD;
      step = () => setPhase('erase');
    } else if (text.length > 0) {
      delay = 32;
      step = () => setText(full.slice(0, text.length - 1));
    } else {
      delay = GAP;
      step = () => {
        setIndex((index + 1) % scriptExamples.length);
        setPhase('type');
      };
    }
    const id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [inView, reduced, paused, phase, text, index, current]);

  const next = scriptExamples[(index + 1) % scriptExamples.length];
  const total = scriptExamples.length;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        borderRadius: { xs: '22px', md: '28px' },
        p: { xs: 2.5, sm: 3.5, md: 4 },
        color: '#fff',
        background: 'linear-gradient(155deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03) 60%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 40px 90px -40px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.12)',
        // Hairline gradient border drawn with a masked pseudo-element.
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: 'linear-gradient(140deg, rgba(125,219,163,0.75), rgba(255,255,255,0.10) 40%, rgba(83,166,204,0.6))',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating language-pair tag */}
      <Box
        aria-hidden
        dir="ltr"
        className="motion-loop"
        sx={{
          position: 'absolute',
          top: { xs: -16, md: -20 },
          insetInlineEnd: { xs: 16, md: 28 },
          animation: 'float-y 6s ease-in-out infinite',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            bgcolor: tokens.mint,
            color: tokens.ink,
            fontWeight: 800,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            boxShadow: '0 12px 24px -12px rgba(0,0,0,0.6)',
          }}
        >
          <span>{current.code}</span>
          <Box component="span" sx={{ opacity: 0.6 }}>→</Box>
          <span>{next.code}</span>
        </Box>
      </Box>

      {/* Top row: current language + counter */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, height: 26, mb: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          <Box
            component="span"
            aria-hidden
            sx={{
              display: 'inline-grid',
              placeItems: 'center',
              minWidth: 38,
              height: 26,
              px: 0.75,
              borderRadius: '8px',
              border: '1px solid rgba(125,219,163,0.5)',
              color: tokens.mint,
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
            }}
          >
            {current.code}
          </Box>
          <Typography
            key={current.code}
            component="span"
            lang={current.lang}
            sx={{
              fontSize: '0.9rem',
              fontWeight: 600,
              lineHeight: '26px',
              color: 'rgba(255,255,255,0.78)',
              animation: `page-enter .5s ${easing.out} both`,
              whiteSpace: 'nowrap',
            }}
          >
            {current.label}
          </Typography>
        </Box>
        <Typography
          component="span"
          aria-hidden
          dir="ltr"
          sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Typography>
      </Box>

      {/* The typed line. Its accessible name is the stable brand name; the cycling scripts are visual. */}
      {/* Every script is stacked invisibly in the same grid cell, so the card always
          reserves the height of the longest line and never shifts the hero while typing. */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', alignItems: 'start' }}>
        {scriptExamples.map((s) => (
          <Box
            key={s.code}
            aria-hidden
            lang={s.lang}
            dir={s.dir || 'ltr'}
            sx={{ ...lineSx(s.dir), gridArea: '1 / 1', visibility: 'hidden' }}
          >
            {s.text}
            <Box component="span" sx={caretSx} />
          </Box>
        ))}
        <Typography
          component="h2"
          aria-label={scriptExamples[0].text}
          lang="en"
          dir={current.dir || 'ltr'}
          sx={{
            ...lineSx(current.dir),
            gridArea: '1 / 1',
          }}
        >
          <span aria-hidden lang={current.lang}>{text}</span>
          <Box
            component="span"
            aria-hidden
            className="motion-loop"
            sx={{
              ...caretSx,
              borderRadius: 2,
              background: `linear-gradient(${tokens.mint}, ${tokens.picton})`,
              animation: 'blink 1s steps(1) infinite',
            }}
          />
        </Typography>
      </Box>

      {/* Progress as notches on a stem line, like Ogham itself */}
      <Box aria-hidden sx={{ position: 'relative', mt: { xs: 2, md: 3 }, height: 28, direction: 'ltr' }}>
        <Box sx={{ position: 'absolute', insetInline: 0, top: '50%', height: '1px', bgcolor: 'rgba(255,255,255,0.22)' }} />
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', px: 1 }}>
          {scriptExamples.map((s, i) => (
            <Box
              key={s.code}
              sx={{
                width: 2,
                height: i === index ? 26 : 12,
                borderRadius: 2,
                bgcolor: i === index ? tokens.mint : 'rgba(255,255,255,0.35)',
                transition: `height .5s ${easing.out}, background-color .5s`,
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mt: { xs: 2, md: 2.5 } }}>
        <Box sx={{ color: tokens.mint, opacity: 0.85, width: { xs: 120, md: 150 } }}>
          <OghamMark text="Ogham" strokeLength={14} strokeWidth={2} delay={500} sx={{ width: '100%', height: 'auto' }} />
        </Box>
        {!reduced && (
          <IconButton
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? t('home.hero.playAnimation') : t('home.hero.pauseAnimation')}
            sx={{
              width: 44,
              height: 44,
              color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.22)',
              '&:hover': { color: '#fff', borderColor: 'rgba(255,255,255,0.5)', bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            {paused ? <PlayArrowIcon fontSize="small" className="keep-direction" /> : <PauseIcon fontSize="small" />}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TranslationCard;
