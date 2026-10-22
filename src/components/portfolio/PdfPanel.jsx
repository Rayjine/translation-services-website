import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@mui/icons-material/Download';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TranslateIcon from '@mui/icons-material/Translate';
import OghamMark from '../ui/OghamMark';
import { tokens, fonts } from '../../theme';

// Tracks the inner width of the scrollable viewport so pages fit the panel.
const useContentWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
};

const State = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, py: 8, textAlign: 'center' }}>
    {children}
  </Box>
);

const pillSx = {
  minHeight: 44,
  minWidth: 0,
  px: 1.75,
  fontSize: '0.875rem',
  color: tokens.text,
  borderColor: tokens.line,
  bgcolor: '#fff',
  '&:hover': { borderColor: tokens.indigo, bgcolor: '#fff' },
};

/**
 * One side of the before/after viewer: header with role + language, the rendered
 * PDF page on a vellum "desk", and pill page controls with a download link.
 */
const PdfPanel = ({
  type,
  file,
  label,
  language,
  accent,
  pageNumber,
  numPages,
  onLoadSuccess,
  onPrev,
  onNext,
  maxPageWidth = 460,
}) => {
  const { t } = useTranslation();
  const [viewportRef, viewportWidth] = useContentWidth();
  const pageWidth = viewportWidth ? Math.max(200, Math.min(viewportWidth, maxPageWidth)) : 280;
  const downloadLabel = type === 'before' ? t('portfolio.preview.downloadSource') : t('portfolio.preview.downloadTranslation');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        bgcolor: '#fff',
        border: `1px solid ${tokens.line}`,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(7,26,43,0.04), 0 20px 40px -28px rgba(7,26,43,0.3)',
        // Lets the controls adapt to the panel (not the viewport): in a narrow
        // side-by-side panel the download button collapses to an icon pill so the
        // page controls and download stay on one row, visible without scrolling.
        containerType: 'inline-size',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          borderBottom: `1px solid ${tokens.line}`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: accent,
          },
        }}
      >
        <Typography component="h3" sx={{ fontFamily: fonts.display, fontWeight: 600, fontSize: '1.1rem', color: tokens.text }}>
          {label}
        </Typography>
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.25,
            py: 0.4,
            borderRadius: 999,
            fontSize: '0.8rem',
            fontWeight: 700,
            color: tokens.text,
            bgcolor: tokens.paperDeep,
            whiteSpace: 'nowrap',
          }}
        >
          <Box component="span" aria-hidden sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: accent }} />
          {language}
        </Box>
      </Box>

      {/* Viewport */}
      <Box
        sx={{
          // Leave room for the dialog header, mode toggle and controls so the page
          // buttons are reachable without scrolling (dvh tracks mobile browser chrome).
          height: { xs: 'max(300px, calc(100dvh - 440px))', sm: 'max(340px, calc(100vh - 470px))' },
          minHeight: 300,
          overflow: 'auto',
          bgcolor: tokens.paperDeep,
          backgroundImage: `radial-gradient(${tokens.line} 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Box ref={viewportRef} sx={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
          <Document
            file={file}
            onLoadSuccess={(pdf) => onLoadSuccess(pdf, type)}
            onLoadError={(error) => console.error('Error loading PDF:', error)}
            loading={
              <State>
                <Box sx={{ color: accent }}>
                  <OghamMark text="Ogham" strokeLength={14} strokeWidth={2} stagger={60} sx={{ width: 140, height: 'auto' }} />
                </Box>
                <Typography variant="body2" sx={{ color: tokens.textMuted }}>
                  {t('portfolio.preview.loading')}
                </Typography>
              </State>
            }
            noData={
              <State>
                <TranslateIcon className="keep-direction" sx={{ fontSize: 72, color: accent, opacity: 0.35 }} />
                <Typography variant="body2" sx={{ color: tokens.textMuted }}>
                  {t('portfolio.preview.noData')}
                </Typography>
              </State>
            }
            error={
              <State>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {t('portfolio.preview.errorLoading')}
                </Typography>
              </State>
            }
          >
            <Box
              sx={{
                borderRadius: '4px',
                overflow: 'hidden',
                bgcolor: '#fff',
                boxShadow: '0 1px 2px rgba(7,26,43,0.08), 0 24px 48px -24px rgba(7,26,43,0.45)',
                '& canvas': { display: 'block' },
              }}
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading={<Box sx={{ width: pageWidth, height: Math.round(pageWidth * 1.414), bgcolor: '#fff' }} />}
                error={
                  <State>
                    <Typography variant="body2" sx={{ color: 'error.main', px: 3 }}>
                      {t('portfolio.preview.errorLoading')}
                    </Typography>
                  </State>
                }
              />
            </Box>
          </Document>
        </Box>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          px: { xs: 1.5, sm: 2 },
          py: 1.5,
          borderTop: `1px solid ${tokens.line}`,
          '@container (max-width: 500px)': {
            '& .pdf-download': { minWidth: 44, width: 44, px: 0 },
            '& .pdf-download .MuiButton-startIcon': { m: 0 },
            '& .pdf-download-label': {
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              whiteSpace: 'nowrap',
            },
          },
        }}
      >
        {numPages ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              disabled={pageNumber <= 1}
              onClick={() => onPrev(type)}
              startIcon={<ChevronLeftIcon className="flip-in-rtl" />}
              sx={{ ...pillSx, '& .MuiButton-startIcon': { marginInlineEnd: 0.25, marginInlineStart: -0.5 } }}
            >
              {t('portfolio.preview.prevPage')}
            </Button>
            <Typography
              variant="body2"
              aria-live="polite"
              sx={{
                minWidth: 56,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: tokens.text,
                direction: 'ltr',
              }}
            >
              {pageNumber} / {numPages}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              disabled={pageNumber >= numPages}
              onClick={() => onNext(type)}
              endIcon={<ChevronRightIcon className="flip-in-rtl" />}
              sx={{ ...pillSx, '& .MuiButton-endIcon': { marginInlineStart: 0.25, marginInlineEnd: -0.5 } }}
            >
              {t('portfolio.preview.nextPage')}
            </Button>
          </Box>
        ) : (
          <span />
        )}
        <Button
          variant="contained"
          color="primary"
          className="pdf-download"
          startIcon={<DownloadIcon className="keep-direction" />}
          component="a"
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          title={downloadLabel}
          sx={{ minHeight: 44, textAlign: 'center', whiteSpace: 'normal', marginInlineStart: 'auto' }}
        >
          <span className="pdf-download-label">{downloadLabel}</span>
        </Button>
      </Box>
    </Box>
  );
};

export default PdfPanel;
