import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Breadcrumbs, Button, Container, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHero from '../ui/PageHero';
import Reveal from '../ui/Reveal';
import OghamMark from '../ui/OghamMark';
import GlyphField from '../ui/GlyphField';
import { tokens, fonts, easing } from '../../theme';

// Room left above a section heading when jumping to it (sticky header ~64-78px).
const SCROLL_OFFSET = 112;
// Fixed gutter so clause text lines up whether the badge reads "3.1" or "10.2".
const GUTTER = { xs: '48px minmax(0, 1fr)', sm: '72px minmax(0, 1fr)' };

/** Splits "3. Ordering" / "3.1. <strong>Quotes</strong>…" into a number and the rest. */
const splitNumber = (value = '') => {
  const match = /^\s*(\d+(?:\.\d+)*)\.?\s+([\s\S]*)$/.exec(value);
  return match ? { num: match[1], rest: match[2] } : { num: null, rest: value };
};

const pad = (n) => String(n).padStart(2, '0');

const bodyTextSx = {
  color: tokens.text,
  fontSize: { xs: '1.0625rem', md: '1.09rem' },
  lineHeight: 1.8,
  m: 0,
  '& strong': { color: tokens.ink, fontWeight: 700 },
};

/* ---------- Table of contents ---------- */

const TocLabel = ({ children, component = 'p' }) => (
  <Typography
    variant="overline"
    component={component}
    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: tokens.shamrockText, lineHeight: 1.4 }}
  >
    <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px' }}>
      {[0, 1, 2].map((i) => (
        <Box key={i} component="span" sx={{ width: '2px', height: 12, borderRadius: 1, bgcolor: 'currentColor', opacity: 1 - i * 0.25 }} />
      ))}
    </Box>
    {children}
  </Typography>
);

const TocList = ({ sections, active, onNavigate, stem = false, fillRef }) => (
  <Box sx={{ position: 'relative' }}>
    {stem && (
      <Box aria-hidden sx={{ position: 'absolute', insetInlineStart: 0, top: 6, bottom: 6, width: '2px', borderRadius: 2, bgcolor: tokens.line, overflow: 'hidden' }}>
        <Box
          ref={fillRef}
          sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${tokens.shamrock}, ${tokens.picton})`, transformOrigin: 'top', transform: 'scaleY(0)', willChange: 'transform' }}
        />
      </Box>
    )}
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {sections.map((section, i) => {
        const isActive = active === section.id;
        return (
          <Box component="li" key={section.id}>
            <Box
              component="a"
              href={`#${section.id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'location' : undefined}
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '28px minmax(0, 1fr)',
                alignItems: 'baseline',
                gap: 1,
                minHeight: 44,
                py: 1,
                paddingInlineStart: stem ? 2.75 : 0,
                paddingInlineEnd: 1,
                color: isActive ? tokens.text : tokens.textMuted,
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.92rem',
                lineHeight: 1.45,
                textDecoration: 'none',
                borderRadius: 1.5,
                transition: 'color .2s',
                '&:hover': { color: tokens.text },
                '&:hover .toc-num': { color: tokens.shamrockText },
                // Notch cut into the stem; it lengthens for the section being read.
                '&::before': stem
                  ? {
                      content: '""',
                      position: 'absolute',
                      insetInlineStart: 0,
                      top: '1.35em',
                      width: 14,
                      height: '2px',
                      borderRadius: 2,
                      bgcolor: isActive ? tokens.shamrock : tokens.line,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.5)',
                      transformOrigin: 'left',
                      transition: `transform .35s ${easing.out}, background-color .35s`,
                    }
                  : undefined,
                '[dir="rtl"] &::before': { transformOrigin: 'right' },
              }}
            >
              <Box
                component="span"
                className="toc-num"
                sx={{
                  fontFamily: fonts.display,
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: '0.85rem',
                  color: isActive ? tokens.shamrockText : tokens.textMuted,
                  transition: 'color .2s',
                }}
              >
                {pad(section.num ?? i + 1)}
              </Box>
              <span>{section.label}</span>
            </Box>
          </Box>
        );
      })}
    </Box>
  </Box>
);

/* ---------- Blocks ---------- */

const NumberBadge = ({ children }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      justifySelf: 'start',
      minWidth: 40,
      height: 26,
      px: 1,
      mt: '0.2em',
      borderRadius: 999,
      border: `1px solid ${tokens.line}`,
      bgcolor: '#fff',
      color: tokens.indigo,
      fontSize: '0.78rem',
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '0.02em',
      direction: 'ltr',
    }}
  >
    {children}
  </Box>
);

const Row = ({ gutter, children, sx }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: GUTTER, columnGap: { xs: 1.5, sm: 0 }, alignItems: 'start', ...sx }}>
    <Box sx={{ minWidth: 0 }}>{gutter}</Box>
    <Box sx={{ minWidth: 0, gridColumn: gutter ? 'auto' : { xs: '1 / -1', sm: '2' } }}>{children}</Box>
  </Box>
);

const Paragraph = ({ block, dropCap }) => {
  const { num, rest } = block.html ? splitNumber(block.text) : { num: null, rest: block.text };
  const content = block.html
    ? <Typography component="p" sx={bodyTextSx} dangerouslySetInnerHTML={{ __html: rest }} />
    : <Typography component="p" sx={bodyTextSx}>{rest}</Typography>;
  return (
    <Row gutter={num ? <NumberBadge>{num}</NumberBadge> : null}>
      <Box
        sx={dropCap ? {
          '& > p::first-letter': {
            float: 'left',
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: '3.6em',
            lineHeight: 0.82,
            color: tokens.indigo,
            paddingInlineEnd: '0.08em',
            marginTop: '0.08em',
            marginInlineEnd: '0.06em',
          },
        } : undefined}
      >
        {content}
      </Box>
    </Row>
  );
};

const Subheading = ({ block, id }) => {
  const { num, rest } = splitNumber(block.text);
  return (
    <Row gutter={num ? <NumberBadge>{num}</NumberBadge> : null} sx={{ mt: 2 }}>
      <Typography
        component="h3"
        id={id}
        sx={{ fontFamily: fonts.display, fontWeight: 600, fontSize: { xs: '1.2rem', md: '1.3rem' }, lineHeight: 1.35, color: tokens.ink, mt: '0.1em' }}
      >
        {rest}
      </Typography>
    </Row>
  );
};

const renderItem = (item, html) =>
  html ? <span dangerouslySetInnerHTML={{ __html: item }} /> : item;

const List = ({ block }) => {
  const items = Array.isArray(block.items) ? block.items : [];
  if (block.variant === 'cards') {
    return (
      <Row>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
          {items.map((item, i) => (
            <Box
              component="li"
              key={i}
              sx={{
                position: 'relative',
                p: 2.25,
                paddingInlineStart: 2.5,
                bgcolor: '#fff',
                border: `1px solid ${tokens.line}`,
                borderRadius: '16px',
                color: tokens.text,
                fontSize: '0.98rem',
                lineHeight: 1.6,
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                transition: `box-shadow .35s ${easing.out}, border-color .35s`,
                // Static content: acknowledge the pointer without implying it is clickable.
                '&:hover': { borderColor: tokens.sky, boxShadow: '0 18px 36px -24px rgba(7,26,43,0.35)' },
              }}
            >
              {/* Ogham-style tally: one notch per item number. */}
              <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px', mt: '5px', width: 34, flexShrink: 0, direction: 'ltr', '[dir="rtl"] &': { justifyContent: 'flex-end' } }}>
                {Array.from({ length: Math.min(i + 1, 7) }, (_, k) => (
                  <Box key={k} component="span" sx={{ width: '2px', height: 14, borderRadius: 1, bgcolor: k % 2 ? tokens.picton : tokens.shamrock }} />
                ))}
              </Box>
              <span>{renderItem(item, block.html)}</span>
            </Box>
          ))}
        </Box>
      </Row>
    );
  }
  if (block.variant === 'stack') {
    return (
      <Row>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1.5 }}>
          {items.map((item, i) => (
            <Box
              component="li"
              key={i}
              sx={{
                ...bodyTextSx,
                fontSize: '1rem',
                lineHeight: 1.7,
                p: { xs: 2, sm: 2.5 },
                bgcolor: '#fff',
                border: `1px solid ${tokens.line}`,
                borderInlineStart: `3px solid ${i % 2 ? tokens.picton : tokens.shamrock}`,
                borderRadius: '14px',
              }}
            >
              {renderItem(item, block.html)}
            </Box>
          ))}
        </Box>
      </Row>
    );
  }
  return (
    <Row>
      <Box
        component="ul"
        sx={{ listStyle: 'none', m: 0, p: 0, columnGap: 5, columns: block.columns ? { xs: 1, md: 2 } : 1 }}
      >
        {items.map((item, i) => (
          <Box
            component="li"
            key={i}
            sx={{
              ...bodyTextSx,
              fontSize: '1.02rem',
              lineHeight: 1.65,
              position: 'relative',
              paddingInlineStart: 3,
              py: 0.75,
              breakInside: 'avoid',
              // Diagonal notch, like a stroke of the Muine group.
              '&::before': {
                content: '""',
                position: 'absolute',
                insetInlineStart: 4,
                top: '1.05em',
                width: 12,
                height: '2px',
                borderRadius: 2,
                bgcolor: tokens.shamrock,
                transform: 'rotate(-55deg)',
              },
            }}
          >
            {renderItem(item, block.html)}
          </Box>
        ))}
      </Box>
    </Row>
  );
};

const ContactCard = ({ block }) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Box
        className="grain"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          mt: 1,
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: '24px',
          color: '#fff',
          background: tokens.heroBackground,
          boxShadow: '0 30px 60px -36px rgba(7,26,43,0.65)',
        }}
      >
        <GlyphField opacity={0.06} density={0.4} />
        <Box aria-hidden sx={{ position: 'absolute', display: { xs: 'none', sm: 'block' }, insetInlineEnd: 24, top: 24, color: tokens.mint, opacity: 0.35 }}>
          <OghamMark text="Ogham" strokeLength={16} strokeWidth={2} sx={{ width: 150, height: 'auto' }} />
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 480, mb: 2.5 }}>
            {block.description}
          </Typography>
          <Typography component="p" variant="overline" sx={{ color: tokens.mint, display: 'block', mb: 0.5 }}>
            {block.emailLabel}
          </Typography>
          <Link
            href={`mailto:${block.email}`}
            underline="none"
            sx={{
              position: 'relative',
              display: 'inline-block',
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.85rem' },
              lineHeight: 1.3,
              color: '#fff',
              wordBreak: 'break-word',
              direction: 'ltr',
              '&::after': {
                content: '""',
                position: 'absolute',
                insetInline: 0,
                bottom: -2,
                height: '2px',
                background: tokens.gradient,
                transform: 'scaleX(0.25)',
                transformOrigin: 'left',
                transition: `transform .5s ${easing.out}`,
              },
              '&:hover::after, &:focus-visible::after': { transform: 'scaleX(1)' },
            }}
          >
            {block.email}
          </Link>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
              sx={{ minHeight: 48 }}
            >
              {t('common.menu.contact')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Row>
  );
};

const Block = ({ block, id, dropCap }) => {
  switch (block.type) {
    case 'h3':
      return <Subheading block={block} id={id} />;
    case 'list':
      return <List block={block} />;
    case 'contact':
      return <ContactCard block={block} />;
    default:
      return <Paragraph block={block} dropCap={dropCap} />;
  }
};

/* ---------- Document ---------- */

/**
 * Editorial layout for legal pages: compact ink hero, sticky Ogham-stem table of
 * contents (desktop) / collapsible contents (mobile), and numbered sections.
 * `sections`: [{ id, title: "1. Introduction", blocks: [{ type: 'p'|'h3'|'list'|'contact', … }] }]
 */
const LegalDocument = ({ title, ogham, updatedLabel, date, homeLabel, currentLabel, sections: rawSections }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [active, setActive] = useState(rawSections[0]?.id);
  const articleRef = useRef(null);
  const fillRef = useRef(null);
  const detailsRef = useRef(null);

  const sections = rawSections.map((section) => {
    const { num, rest } = splitNumber(section.title);
    return { ...section, num: num ? Number(num) : null, label: rest };
  });
  const idKey = sections.map((s) => s.id).join('|');

  // Highlight the section being read and fill the stem as the article scrolls.
  useEffect(() => {
    const ids = idKey.split('|');
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - SCROLL_OFFSET - 40 <= 0) current = id;
      });
      const article = articleRef.current;
      if (article) {
        const rect = article.getBoundingClientRect();
        const span = Math.max(1, rect.height - window.innerHeight * 0.6);
        const progress = Math.min(1, Math.max(0, (SCROLL_OFFSET - rect.top) / span));
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
        if (rect.bottom <= window.innerHeight) current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [idKey]);

  // Sections render after the browser's own hash handling, so honour deep links (#cookies) on arrival.
  // Web fonts and images reflow the content above the target for a moment, so keep it aligned
  // while the page settles, and stop as soon as the reader scrolls away.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || typeof ResizeObserver === 'undefined') return undefined;
    let landedAt = null;
    let frame = 0;
    const jump = () => {
      frame = 0;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
      landedAt = window.scrollY;
    };
    const schedule = () => {
      if (landedAt !== null && Math.abs(window.scrollY - landedAt) > 2) return stop();
      if (!frame) frame = window.requestAnimationFrame(jump);
      return undefined;
    };
    const observer = new ResizeObserver(schedule);
    const timer = window.setTimeout(() => stop(), 2500);
    function stop() {
      observer.disconnect();
      window.clearTimeout(timer);
    }
    observer.observe(document.body);
    schedule();
    return () => {
      stop();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMobileToc = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const lang = (i18n.resolvedLanguage || i18n.language || '').slice(0, 2);
  const allowDropCap = theme.direction !== 'rtl' && !['zh', 'ja'].includes(lang);
  const tocLabel = t('legal.onThisPage', 'On this page');

  return (
    <Box>
      <PageHero compact eyebrow={`${updatedLabel}: ${date}`} title={title} ogham={ogham}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" className="flip-in-rtl" />}
          aria-label={t('common.breadcrumb')}
          sx={{ color: 'rgba(255,255,255,0.6)', '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}
        >
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ color: 'rgba(255,255,255,0.78)', display: 'inline-flex', alignItems: 'center', minHeight: 44, '&:hover': { color: tokens.mint } }}
          >
            {homeLabel}
          </Link>
          <Typography component="span" aria-current="page" sx={{ color: '#fff', fontWeight: 600 }}>
            {currentLabel || title}
          </Typography>
        </Breadcrumbs>
      </PageHero>

      <Box sx={{ bgcolor: tokens.paper, pt: { xs: 5, md: 10 }, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '250px minmax(0, 1fr)', lg: '270px minmax(0, 1fr)' },
              columnGap: { md: 7, lg: 10 },
              alignItems: 'start',
            }}
          >
            {/* Desktop: sticky contents along an Ogham stem. */}
            <Box
              component="nav"
              aria-label={tocLabel}
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'sticky',
                top: 104,
                maxHeight: 'calc(100vh - 128px)',
                overflowY: 'auto',
                pt: 0.5,
                pb: 2,
                scrollbarWidth: 'thin',
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <TocLabel>{tocLabel}</TocLabel>
              </Box>
              <TocList sections={sections} active={active} stem fillRef={fillRef} />
            </Box>

            {/* Mobile: collapsible contents above the article. */}
            <Box
              component="details"
              ref={detailsRef}
              sx={{
                display: { xs: 'block', md: 'none' },
                mb: 5,
                bgcolor: '#fff',
                border: `1px solid ${tokens.line}`,
                borderRadius: '18px',
                overflow: 'hidden',
                '&[open] .toc-chevron': { transform: 'rotate(180deg)' },
                '& summary::-webkit-details-marker': { display: 'none' },
              }}
            >
              <Box
                component="summary"
                sx={{
                  listStyle: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  minHeight: 56,
                  px: 2.5,
                }}
              >
                <TocLabel component="span">{tocLabel}</TocLabel>
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: tokens.textMuted, fontSize: '0.85rem', fontWeight: 600 }}>
                  <span>{pad(sections.length)}</span>
                  <ExpandMoreIcon className="toc-chevron keep-direction" sx={{ transition: `transform .3s ${easing.out}` }} />
                </Box>
              </Box>
              <Box component="nav" aria-label={tocLabel} sx={{ px: 2.5, pb: 1.5, borderTop: `1px solid ${tokens.line}`, pt: 1 }}>
                <TocList sections={sections} active={active} onNavigate={closeMobileToc} />
              </Box>
            </Box>

            <Box component="article" ref={articleRef} sx={{ maxWidth: 800, minWidth: 0 }}>
              {sections.map((section, sIndex) => {
                const headingId = `${section.id}-title`;
                return (
                  <Box
                    component="section"
                    key={section.id}
                    id={section.id}
                    aria-labelledby={headingId}
                    sx={{
                      scrollMarginTop: { xs: 0, md: SCROLL_OFFSET - 88 }, // html scroll-padding-top already clears the header
                      pt: sIndex === 0 ? 0 : { xs: 6, md: 7 },
                      pb: { xs: 6, md: 7 },
                      borderBottom: sIndex === sections.length - 1 ? 'none' : `1px solid ${tokens.line}`,
                    }}
                  >
                    <Reveal>
                      <Typography
                        variant="h3"
                        component="h2"
                        id={headingId}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', sm: '72px minmax(0, 1fr)' },
                          alignItems: 'baseline',
                          rowGap: 0.5,
                          mb: { xs: 2.5, md: 3.5 },
                          color: tokens.ink,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1.25,
                            fontSize: { xs: '1.6rem', sm: '2.4rem' },
                            fontWeight: 500,
                            lineHeight: 1,
                            color: tokens.shamrock,
                            fontVariantNumeric: 'lining-nums tabular-nums',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {pad(section.num ?? sIndex + 1)}
                          <Box component="span" aria-hidden sx={{ display: { xs: 'inline-block', sm: 'none' }, width: 28, height: '2px', bgcolor: tokens.line }} />
                        </Box>
                        <span>{section.label}</span>
                      </Typography>
                      <Box sx={{ display: 'grid', gap: 2.5 }}>
                        {section.blocks.map((block, bIndex) => (
                          <Block
                            key={bIndex}
                            block={block}
                            id={`${section.id}-${bIndex}`}
                            dropCap={allowDropCap && sIndex === 0 && bIndex === 0 && block.type === 'p'}
                          />
                        ))}
                      </Box>
                    </Reveal>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LegalDocument;
