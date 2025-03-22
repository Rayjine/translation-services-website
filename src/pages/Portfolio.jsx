import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Tabs,
  Tab,
  Button,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TranslateIcon from '@mui/icons-material/Translate';

// Portfolio showcase items with translation keys
const getShowcaseItems = (t) => {
  // Get the array of showcase items from translations
  const showcaseItemsArray = t('portfolio.showcaseItems', { returnObjects: true });
  
  // Create the complete showcase items by adding additional properties
  return [
    {
      id: 1,
      title: showcaseItemsArray[0].title,
      description: showcaseItemsArray[0].description,
      tags: [t('portfolio.categories.legal'), t('portfolio.languages.french'), t('portfolio.languages.english')],
      category: "legal",
      thumbnailSrc: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60",
      beforePdf: "/pdfs/contract-english.pdf",
      afterPdf: "/pdfs/contract-french.pdf",
      featured: true
    },
    {
      id: 2,
      title: showcaseItemsArray[1].title,
      description: showcaseItemsArray[1].description,
      tags: [t('portfolio.categories.medical'), t('portfolio.languages.german'), t('portfolio.languages.english')],
      category: "medical",
      thumbnailSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60",
      beforePdf: "/pdfs/medical-german.pdf",
      afterPdf: "/pdfs/medical-english.pdf",
      featured: true
    },
    {
      id: 3,
      title: showcaseItemsArray[2].title,
      description: showcaseItemsArray[2].description,
      tags: [t('portfolio.categories.technical'), t('portfolio.languages.french'), t('portfolio.languages.japanese')],
      category: "technical",
      thumbnailSrc: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500&auto=format&fit=crop&q=60",
      beforePdf: "/pdfs/report-french.pdf",
      afterPdf: "/pdfs/report-japanese.pdf",
      featured: false
    },
    {
      id: 4,
      title: showcaseItemsArray[3].title,
      description: showcaseItemsArray[3].description,
      tags: [t('portfolio.categories.marketing'), t('portfolio.languages.english'), t('portfolio.languages.mandarin')],
      category: "marketing",
      thumbnailSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60",
      beforePdf: "/pdfs/marketing-english.pdf",
      afterPdf: "/pdfs/marketing-mandarin.pdf",
      featured: false
    },
    {
      id: 5,
      title: showcaseItemsArray[4].title,
      description: showcaseItemsArray[4].description,
      tags: [t('portfolio.categories.literary'), t('portfolio.languages.russian'), t('portfolio.languages.italian')],
      category: "literary",
      thumbnailSrc: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60",
      beforePdf: "/pdfs/story-russian.pdf",
      afterPdf: "/pdfs/story-italian.pdf",
      featured: false
    }
  ];
};

const Portfolio = () => {
  const { t } = useTranslation();
  const showcaseItems = getShowcaseItems(t);
  const [category, setCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('comparison'); // 'comparison', 'before', 'after'
  const [numPages, setNumPages] = useState({
    before: null,
    after: null
  });
  const [pageNumber, setPageNumber] = useState({
    before: 1,
    after: 1
  });

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredItems = category === 'all' 
    ? showcaseItems 
    : category === 'featured'
      ? showcaseItems.filter(item => item.featured)
      : showcaseItems.filter(item => item.category === category);

  // Function to handle success loading of PDF document
  const onDocumentLoadSuccess = (pdf, type) => {
    setNumPages(prev => ({
      ...prev,
      [type]: pdf.numPages
    }));
  };

  // Function to change page
  const changePage = (offset, type) => {
    setPageNumber(prev => ({
      ...prev,
      [type]: prev[type] + offset
    }));
  };

  // Function to go to previous page
  const previousPage = (type) => {
    changePage(-1, type);
  };

  // Function to go to next page
  const nextPage = (type) => {
    changePage(1, type);
  };

  // Render actual PDFs using react-pdf
  const renderPdfPreview = (mode) => {
    if (!selectedItem) return null;
    
    return (
      <Box sx={{ 
        height: '65vh', 
        bgcolor: '#f5f5f5', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        overflow: 'hidden'
      }}>
        {mode === 'comparison' ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ height: '100%', p: 2, backgroundColor: 'rgba(3, 20, 42, 0.05)' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
                  {t('portfolio.preview.sourceDocument')}
                </Typography>
                <Box 
                  sx={{ 
                    height: '55vh', 
                    bgcolor: 'white', 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'auto'
                  }}
                >
                  <Document
                    file={selectedItem.beforePdf}
                    onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf, 'before')}
                    onLoadError={(error) => console.error('Error loading PDF:', error)}
                    loading={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="textSecondary" align="center">
                          {t('portfolio.preview.loading')}
                        </Typography>
                      </Box>
                    }
                    noData={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <TranslateIcon sx={{ fontSize: 80, color: 'rgba(3, 20, 42, 0.2)', mb: 2 }} />
                        <Typography variant="body2" color="textSecondary" align="center">
                          {t('portfolio.preview.noData')}
                        </Typography>
                      </Box>
                    }
                    error={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ color: 'error.main' }}>
                          {t('portfolio.preview.errorLoading')}
                        </Typography>
                      </Box>
                    }
                  >
                    <Page 
                      pageNumber={pageNumber.before} 
                      width={280}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>
                  
                  {numPages.before && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', bottom: 10 }}>
                      <Button 
                        size="small" 
                        disabled={pageNumber.before <= 1} 
                        onClick={() => previousPage('before')}
                        variant="outlined"
                      >
                        {t('portfolio.preview.prevPage')}
                      </Button>
                      <Typography variant="body2">
                        {pageNumber.before} / {numPages.before}
                      </Typography>
                      <Button 
                        size="small" 
                        disabled={pageNumber.before >= numPages.before} 
                        onClick={() => nextPage('before')}
                        variant="outlined"
                      >
                        {t('portfolio.preview.nextPage')}
                      </Button>
                    </Box>
                  )}
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />} 
                    sx={{ mt: 2, position: 'absolute', bottom: 10, right: 10 }}
                    component="a"
                    href={selectedItem?.beforePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('portfolio.preview.downloadSource')}
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ height: '100%', p: 2, backgroundColor: 'rgba(0, 168, 232, 0.05)' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
                  {t('portfolio.preview.translatedDocument')}
                </Typography>
                <Box 
                  sx={{ 
                    height: '55vh', 
                    bgcolor: 'white', 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'auto'
                  }}
                >
                  <Document
                    file={selectedItem.afterPdf}
                    onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf, 'after')}
                    onLoadError={(error) => console.error('Error loading PDF:', error)}
                    loading={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="textSecondary" align="center">
                          {t('portfolio.preview.loading')}
                        </Typography>
                      </Box>
                    }
                    noData={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <TranslateIcon sx={{ fontSize: 80, color: 'rgba(0, 168, 232, 0.2)', mb: 2 }} />
                        <Typography variant="body2" color="textSecondary" align="center">
                          {t('portfolio.preview.noData')}
                        </Typography>
                      </Box>
                    }
                    error={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ color: 'error.main' }}>
                          {t('portfolio.preview.errorLoading')}
                        </Typography>
                      </Box>
                    }
                  >
                    <Page 
                      pageNumber={pageNumber.after} 
                      width={280}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>
                  
                  {numPages.after && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', bottom: 10 }}>
                      <Button 
                        size="small" 
                        disabled={pageNumber.after <= 1} 
                        onClick={() => previousPage('after')}
                        variant="outlined"
                      >
                        {t('portfolio.preview.prevPage')}
                      </Button>
                      <Typography variant="body2">
                        {pageNumber.after} / {numPages.after}
                      </Typography>
                      <Button 
                        size="small" 
                        disabled={pageNumber.after >= numPages.after} 
                        onClick={() => nextPage('after')}
                        variant="outlined"
                      >
                        {t('portfolio.preview.nextPage')}
                      </Button>
                    </Box>
                  )}
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />} 
                    sx={{ mt: 2, position: 'absolute', bottom: 10, right: 10 }}
                    component="a"
                    href={selectedItem?.afterPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('portfolio.preview.downloadTranslation')}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ width: '100%', height: '100%', p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
              {mode === 'before' ? t('portfolio.preview.sourceDocument') : t('portfolio.preview.translatedDocument')}
            </Typography>
            <Box 
              sx={{ 
                height: '55vh', 
                bgcolor: 'white', 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'auto'
              }}
            >
              <Document
                file={mode === 'before' ? selectedItem.beforePdf : selectedItem.afterPdf}
                onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf, mode)}
                onLoadError={(error) => console.error('Error loading PDF:', error)}
                loading={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="textSecondary" align="center">
                      {t('portfolio.preview.loading')}
                    </Typography>
                  </Box>
                }
                noData={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <TranslateIcon sx={{ fontSize: 80, color: mode === 'before' ? 'rgba(3, 20, 42, 0.2)' : 'rgba(0, 168, 232, 0.2)', mb: 2 }} />
                    <Typography variant="body2" color="textSecondary" align="center">
                      {t('portfolio.preview.noData')}
                    </Typography>
                  </Box>
                }
                error={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ color: 'error.main' }}>
                      {t('portfolio.preview.errorLoading')}
                    </Typography>
                  </Box>
                }
              >
                <Page 
                  pageNumber={pageNumber[mode]} 
                  width={500}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
              
              {numPages[mode] && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', bottom: 10 }}>
                  <Button 
                    size="small" 
                    disabled={pageNumber[mode] <= 1} 
                    onClick={() => previousPage(mode)}
                    variant="outlined"
                  >
                    {t('portfolio.preview.prevPage')}
                  </Button>
                  <Typography variant="body2">
                    {pageNumber[mode]} / {numPages[mode]}
                  </Typography>
                  <Button 
                    size="small" 
                    disabled={pageNumber[mode] >= numPages[mode]} 
                    onClick={() => nextPage(mode)}
                    variant="outlined"
                  >
                    {t('portfolio.preview.nextPage')}
                  </Button>
                </Box>
              )}
              
              <Button 
                variant="outlined" 
                startIcon={<DownloadIcon />} 
                sx={{ mt: 2, position: 'absolute', bottom: 10, right: 10 }}
                component="a"
                href={mode === 'before' ? selectedItem?.beforePdf : selectedItem?.afterPdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                {mode === 'before' 
                  ? t('portfolio.preview.downloadSource')
                  : t('portfolio.preview.downloadTranslation')}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('portfolio.pageTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            {t('portfolio.pageSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={category} 
            onChange={handleCategoryChange} 
            aria-label="category tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab value="all" label={t('portfolio.categories.all')} />
            <Tab value="featured" label={t('portfolio.categories.featured')} />
            <Tab value="legal" label={t('portfolio.categories.legal')} />
            <Tab value="medical" label={t('portfolio.categories.medical')} />
            <Tab value="technical" label={t('portfolio.categories.technical')} />
            <Tab value="marketing" label={t('portfolio.categories.marketing')} />
            <Tab value="literary" label={t('portfolio.categories.literary')} />
          </Tabs>
        </Box>

        {/* Showcase Grid */}
        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8
                  }
                }}
              >
                <CardActionArea onClick={() => handleCardClick(item)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.thumbnailSrc}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                      {item.featured && (
                        <Chip 
                          label={t('portfolio.featuredChip')}
                          size="small" 
                          sx={{ 
                            ml: 1, 
                            bgcolor: '#20fc8f', 
                            color: '#03142a', 
                            fontWeight: 'bold',
                            fontSize: '0.6rem'
                          }} 
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {item.tags.map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          sx={{ 
                            bgcolor: 'rgba(0, 168, 232, 0.1)', 
                            color: 'primary.main',
                            fontSize: '0.7rem'
                          }} 
                        />
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Preview Dialog */}
      {selectedItem && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xl"
          fullWidth
          aria-labelledby="showcase-dialog-title"
        >
          <DialogTitle id="showcase-dialog-title" sx={{ pr: 8 }}>
            {selectedItem.title}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 12,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <Button
                variant={viewMode === 'comparison' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('comparison')}
                startIcon={<CompareArrowsIcon />}
                color="primary"
                size="small"
              >
                {t('portfolio.viewModes.comparison')}
              </Button>
              <Button
                variant={viewMode === 'before' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('before')}
                color="primary"
                size="small"
              >
                {t('portfolio.viewModes.before')}
              </Button>
              <Button
                variant={viewMode === 'after' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('after')}
                color="primary"
                size="small"
              >
                {t('portfolio.viewModes.after')}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
              {selectedItem.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {selectedItem.tags.map((tag) => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(0, 168, 232, 0.1)', 
                    color: 'primary.main'
                  }} 
                />
              ))}
            </Box>

            {/* PDF Preview Area */}
            {renderPdfPreview(viewMode)}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Portfolio;
