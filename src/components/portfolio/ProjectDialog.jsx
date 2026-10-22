import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PairArrow from './PairArrow';
import PdfPanel from './PdfPanel';
import GlyphField from '../ui/GlyphField';
import { tokens, fonts, easing } from '../../theme';

const MODES = ['comparison', 'before', 'after'];

/**
 * Before/after viewer. State (mode, page numbers, page counts) is owned by the
 * Portfolio page; this component only renders it.
 */
const ProjectDialog = ({
  item,
  open,
  onClose,
  viewMode,
  onViewModeChange,
  pageNumber,
  numPages,
  onLoadSuccess,
  onPrev,
  onNext,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!item) return null;

  const from = t(`portfolio.languages.${item.source}`);
  const to = t(`portfolio.languages.${item.target}`);

  const panel = (type, maxPageWidth) => (
    <PdfPanel
      key={type}
      type={type}
      file={type === 'before' ? item.beforePdf : item.afterPdf}
      label={type === 'before' ? t('portfolio.preview.sourceDocument') : t('portfolio.preview.translatedDocument')}
      language={type === 'before' ? from : to}
      accent={type === 'before' ? tokens.indigo : tokens.shamrock}
      pageNumber={pageNumber[type]}
      numPages={numPages[type]}
      onLoadSuccess={onLoadSuccess}
      onPrev={onPrev}
      onNext={onNext}
      maxPageWidth={maxPageWidth}
    />
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      fullScreen={fullScreen}
      aria-labelledby="showcase-dialog-title"
      slotProps={{ backdrop: { sx: { bgcolor: 'rgba(7,26,43,0.72)', backdropFilter: 'blur(3px)' } } }}
      PaperProps={{
        sx: {
          bgcolor: tokens.paper,
          borderRadius: fullScreen ? 0 : '26px',
          overflow: 'hidden',
          boxShadow: '0 40px 120px -40px rgba(0,0,0,0.6)',
          animation: `page-enter .55s ${easing.out} both`,
        },
      }}
    >
      {/* Ink header */}
      <Box
        className="grain"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          color: '#fff',
          background: tokens.heroBackground,
          paddingInlineStart: { xs: 2.5, sm: 4, md: 5 },
          paddingInlineEnd: { xs: 9, sm: 11 },
          pt: { xs: 3, md: 4 },
          pb: { xs: 3, md: 3.5 },
        }}
      >
        <GlyphField opacity={0.06} density={0.5} />
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 1.25 }}>
            <Typography variant="overline" component="p" sx={{ color: tokens.mint }}>
              {t(`portfolio.categories.${item.category}`)}
            </Typography>
            {item.featured && (
              <Box
                component="span"
                sx={{
                  px: 1.1,
                  py: 0.25,
                  borderRadius: 999,
                  bgcolor: tokens.mint,
                  color: tokens.ink,
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {t('portfolio.featuredChip')}
              </Box>
            )}
          </Box>
          <DialogTitle
            id="showcase-dialog-title"
            sx={{
              p: 0,
              mb: 1,
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
            }}
          >
            {item.title}
          </DialogTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 3, rowGap: 1 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              <span>{from}</span>
              <PairArrow width={34} sx={{ color: tokens.mint }} />
              <span>{to}</span>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>
              {item.description}
            </Typography>
          </Box>
        </Box>
        <IconButton
          aria-label={t('portfolio.preview.close', 'Close')}
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: { xs: 14, md: 20 },
            insetInlineEnd: { xs: 12, md: 20 },
            width: 48,
            height: 48,
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.25)',
            transition: `transform .4s ${easing.out}, background-color .3s`,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', transform: 'rotate(90deg)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: { xs: 1.5, sm: 3, md: 4 }, py: { xs: 2, md: 3 } }}>
        {/* View modes */}
        <Box
          role="group"
          aria-label={t('portfolio.preview.title')}
          sx={{
            display: { xs: 'grid', sm: 'inline-flex' },
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0.5,
            p: 0.5,
            mb: { xs: 2, md: 3 },
            bgcolor: '#fff',
            border: `1px solid ${tokens.line}`,
            borderRadius: { xs: '18px', sm: 999 },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {MODES.map((mode) => {
            const active = viewMode === mode;
            return (
              <Button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                aria-pressed={active}
                startIcon={mode === 'comparison' ? <CompareArrowsIcon className="keep-direction" /> : undefined}
                sx={{
                  minHeight: 44,
                  px: { xs: 1, sm: 2.25 },
                  borderRadius: { xs: '14px', sm: 999 },
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  lineHeight: 1.25,
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  color: active ? '#fff' : tokens.textMuted,
                  bgcolor: active ? tokens.ink : 'transparent',
                  '&:hover': { bgcolor: active ? tokens.ink : tokens.paperDeep, color: active ? '#fff' : tokens.text, transform: 'none' },
                  '& .MuiButton-startIcon': { display: { xs: 'none', sm: 'inherit' } },
                }}
              >
                {t(`portfolio.viewModes.${mode}`)}
              </Button>
            );
          })}
        </Box>

        {/* PDF preview area */}
        <Box key={viewMode} sx={{ animation: `page-enter .5s ${easing.out} both` }}>
          {viewMode === 'comparison' ? (
            <Box
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2, md: 3 },
              }}
            >
              {panel('before', 460)}
              {panel('after', 460)}
              <Box
                aria-hidden
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  position: 'absolute',
                  left: '50%',
                  top: 4,
                  transform: 'translateX(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: tokens.ink,
                  color: tokens.mint,
                  border: `4px solid ${tokens.paper}`,
                  boxSizing: 'content-box',
                  zIndex: 1,
                }}
              >
                <CompareArrowsIcon className="keep-direction" sx={{ fontSize: 22 }} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>{panel(viewMode, 720)}</Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
