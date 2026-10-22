import { Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import OghamMark from '../ui/OghamMark';
import { tokens, fonts, easing } from '../../theme';

// Decorative illustration: a source document and its translation, overlapping.
// Everything here is aria-hidden; the sample copy is set dressing, not content.

const Bar = ({ w, tone = 'rgba(15,38,56,0.12)', h = 7, mb = 1.1 }) => (
  <Box sx={{ width: w, height: h, borderRadius: 4, bgcolor: tone, mb }} />
);

const sheetSx = {
  position: 'absolute',
  width: { xs: '68%', sm: '60%' },
  aspectRatio: '0.74',
  borderRadius: '14px',
  bgcolor: '#fffdf8',
  border: `1px solid ${tokens.line}`,
  boxShadow: '0 2px 4px rgba(7,26,43,0.05), 0 40px 70px -36px rgba(7,26,43,0.45)',
  p: { xs: 2, sm: 3 },
  overflow: 'hidden',
  transition: `transform .8s ${easing.out}`,
};

const Tag = ({ children, dark }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      px: 1,
      py: 0.25,
      borderRadius: '6px',
      fontSize: '0.65rem',
      fontWeight: 800,
      letterSpacing: '0.14em',
      bgcolor: dark ? tokens.ink : tokens.paperDeep,
      color: dark ? '#fff' : tokens.textMuted,
    }}
  >
    {children}
  </Box>
);

const DocumentStack = () => (
  <Box
    aria-hidden
    dir="ltr"
    sx={{
      position: 'relative',
      // rtl.css right-aligns everything under [dir="rtl"]; this drawing is always laid out LTR.
      textAlign: 'left',
      width: '100%',
      maxWidth: 560,
      mx: 'auto',
      aspectRatio: { xs: '1 / 1', sm: '1.1 / 1' },
      '&:hover .doc-back': { transform: 'rotate(-10deg) translate3d(-18px, 6px, 0)' },
      '&:hover .doc-front': { transform: 'rotate(5deg) translate3d(14px, -10px, 0)' },
    }}
  >
    {/* Soft halo */}
    <Box
      sx={{
        position: 'absolute',
        inset: '10% 8%',
        borderRadius: '50%',
        background: `radial-gradient(closest-side, rgba(83,166,204,0.35), transparent), radial-gradient(closest-side at 70% 70%, rgba(59,155,92,0.28), transparent)`,
        filter: 'blur(20px)',
      }}
    />

    {/* Source sheet */}
    <Box className="motion-loop" sx={{ position: 'absolute', inset: 0, animation: 'float-y 8s ease-in-out infinite' }}>
      <Box className="doc-back" sx={{ ...sheetSx, left: { xs: '5%', sm: '2%' }, top: '4%', transform: 'rotate(-6deg)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tag>EN · SOURCE</Tag>
          <Box sx={{ width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${tokens.line}` }} />
        </Box>
        <Box lang="en" sx={{ fontFamily: fonts.display, color: tokens.text, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.35rem' }, mb: 1.25, lineHeight: 1.2 }}>
          Agreement
        </Box>
        <Box lang="en" sx={{ fontSize: { xs: '0.62rem', sm: '0.75rem' }, color: tokens.textMuted, lineHeight: 1.6, mb: 1.5 }}>
          This Agreement is entered into by and between the parties named below.
        </Box>
        <Bar w="92%" />
        <Bar w="84%" />
        <Bar w="88%" />
        <Bar w="60%" mb={2} />
        <Box sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, fontWeight: 800, color: tokens.text, mb: 1 }}>Article 1</Box>
        <Bar w="90%" />
        <Bar w="76%" />
        <Box sx={{ position: 'absolute', insetInline: '18px', bottom: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Box component="svg" viewBox="0 0 120 40" sx={{ width: { xs: 70, sm: 96 }, color: tokens.indigo }}>
            <path d="M4 30 C 18 4, 26 40, 38 20 S 58 6, 64 24 S 86 34, 96 14 L 116 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </Box>
          <Box sx={{ color: tokens.picton, opacity: 0.7, width: { xs: 54, sm: 70 } }}>
            <OghamMark text="Ogham" strokeLength={10} strokeWidth={1.6} stagger={40} sx={{ width: '100%', height: 'auto' }} />
          </Box>
        </Box>
      </Box>
    </Box>

    {/* Translated sheet */}
    <Box className="motion-loop" sx={{ position: 'absolute', inset: 0, animation: 'float-y 7s ease-in-out -2.5s infinite' }}>
      <Box className="doc-front" sx={{ ...sheetSx, right: { xs: '5%', sm: '2%' }, top: '14%', transform: 'rotate(3deg)' }}>
        <Box sx={{ position: 'absolute', insetInline: 0, top: 0, height: 4, background: tokens.gradient }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tag dark>JA · 翻訳</Tag>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: tokens.gradient,
              color: '#fff',
              boxShadow: '0 6px 14px -6px rgba(59,155,92,0.8)',
            }}
          >
            <CheckIcon className="check-icon" sx={{ fontSize: 16 }} />
          </Box>
        </Box>
        <Box lang="ja" sx={{ fontFamily: fonts.display, color: tokens.text, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.35rem' }, mb: 1.25, lineHeight: 1.2 }}>
          契約書
        </Box>
        <Box lang="ja" sx={{ fontSize: { xs: '0.62rem', sm: '0.75rem' }, color: tokens.textMuted, lineHeight: 1.7, mb: 1.5 }}>
          本契約は、以下に記載する当事者間で締結されるものとする。
        </Box>
        <Box sx={{ position: 'relative', mb: 1.1 }}>
          <Bar w="88%" mb={0} />
          <Box sx={{ position: 'absolute', top: -3, left: '30%', width: '42%', height: 13, borderRadius: 3, bgcolor: 'rgba(125,219,163,0.45)' }} />
        </Box>
        <Bar w="94%" />
        <Bar w="70%" mb={2} />
        <Box lang="ja" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' }, fontWeight: 800, color: tokens.text, mb: 1 }}>第1条</Box>
        <Bar w="86%" />
        <Bar w="64%" />
        <Box
          sx={{
            position: 'absolute',
            right: 18,
            bottom: 18,
            width: { xs: 44, sm: 56 },
            height: { xs: 44, sm: 56 },
            borderRadius: '50%',
            border: '2px solid rgba(179,38,30,0.55)',
            color: 'rgba(179,38,30,0.7)',
            display: 'grid',
            placeItems: 'center',
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            transform: 'rotate(-12deg)',
          }}
          lang="ja"
        >
          認証
        </Box>
      </Box>
    </Box>

    {/* Language pair pill */}
    <Box
      className="motion-loop"
      sx={{
        position: 'absolute',
        left: { xs: '30%', sm: '36%' },
        bottom: { xs: '2%', sm: '4%' },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: 999,
        bgcolor: tokens.ink,
        color: '#fff',
        fontWeight: 800,
        fontSize: '0.8rem',
        letterSpacing: '0.12em',
        boxShadow: '0 18px 30px -16px rgba(7,26,43,0.8)',
        animation: 'float-y 6s ease-in-out -1s infinite',
      }}
    >
      EN
      <Box component="span" sx={{ color: tokens.mint }}>→</Box>
      JA
    </Box>
  </Box>
);

export default DocumentStack;
