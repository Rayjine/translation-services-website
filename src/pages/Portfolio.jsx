import { useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TranslateIcon from '@mui/icons-material/Translate';

// Sample showcase items - these would be replaced with real examples
const showcaseItems = [
  {
    id: 1,
    title: "Legal Contract Translation",
    description: "English to French translation of a commercial lease agreement.",
    tags: ["Legal", "French", "English"],
    category: "legal",
    thumbnailSrc: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60",
    beforePdf: "/samples/contract-english.pdf",
    afterPdf: "/samples/contract-french.pdf",
    featured: true
  },
  {
    id: 2,
    title: "Medical Research Paper",
    description: "German to English translation of a scientific paper on cardiovascular health.",
    tags: ["Medical", "German", "English"],
    category: "medical",
    thumbnailSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60",
    beforePdf: "/samples/medical-german.pdf",
    afterPdf: "/samples/medical-english.pdf",
    featured: true
  },
  {
    id: 3,
    title: "Technical Manual",
    description: "Japanese to English translation of an industrial equipment operating manual.",
    tags: ["Technical", "Japanese", "English"],
    category: "technical",
    thumbnailSrc: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500&auto=format&fit=crop&q=60",
    beforePdf: "/samples/manual-japanese.pdf",
    afterPdf: "/samples/manual-english.pdf",
    featured: false
  },
  {
    id: 4,
    title: "Marketing Materials",
    description: "English to Mandarin translation of product marketing brochures.",
    tags: ["Marketing", "Mandarin", "English"],
    category: "marketing",
    thumbnailSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60",
    beforePdf: "/samples/marketing-english.pdf",
    afterPdf: "/samples/marketing-mandarin.pdf",
    featured: false
  },
  {
    id: 5,
    title: "Literary Translation",
    description: "Russian to English translation of a contemporary short story.",
    tags: ["Literary", "Russian", "English"],
    category: "creative",
    thumbnailSrc: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60",
    beforePdf: "/samples/story-russian.pdf",
    afterPdf: "/samples/story-english.pdf",
    featured: false
  }
];

const Portfolio = () => {
  const [category, setCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('comparison'); // 'comparison', 'before', 'after'

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

  // Simulate PDF viewing - in a real implementation, you would load actual PDFs
  const renderPdfPreview = (mode) => {
    if (!selectedItem) return null;
    
    // This is just a placeholder for demonstration - in reality you'd use a PDF viewer component
    return (
      <Box sx={{ 
        height: '65vh', 
        bgcolor: '#f5f5f5', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: 1
      }}>
        {mode === 'comparison' ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ height: '100%', p: 2, backgroundColor: 'rgba(3, 20, 42, 0.05)' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
                  Source Document
                </Typography>
                <Box 
                  sx={{ 
                    height: '55vh', 
                    bgcolor: 'white', 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TranslateIcon sx={{ fontSize: 80, color: 'rgba(3, 20, 42, 0.2)', mb: 2 }} />
                  <Typography variant="body2" color="textSecondary" align="center">
                    Source document would be displayed here.<br />
                    In a real implementation, this would show the actual PDF content.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />} 
                    sx={{ mt: 2 }}
                    disabled
                  >
                    Download Source
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ height: '100%', p: 2, backgroundColor: 'rgba(0, 168, 232, 0.05)' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
                  Translated Document
                </Typography>
                <Box 
                  sx={{ 
                    height: '55vh', 
                    bgcolor: 'white', 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TranslateIcon sx={{ fontSize: 80, color: 'rgba(0, 168, 232, 0.2)', mb: 2 }} />
                  <Typography variant="body2" color="textSecondary" align="center">
                    Translated document would be displayed here.<br />
                    In a real implementation, this would show the actual PDF content.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />} 
                    sx={{ mt: 2 }}
                    disabled
                  >
                    Download Translation
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ width: '100%', height: '100%', p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
              {mode === 'before' ? 'Source Document' : 'Translated Document'}
            </Typography>
            <Box 
              sx={{ 
                height: '55vh', 
                bgcolor: 'white', 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TranslateIcon sx={{ fontSize: 80, color: mode === 'before' ? 'rgba(3, 20, 42, 0.2)' : 'rgba(0, 168, 232, 0.2)', mb: 2 }} />
              <Typography variant="body2" color="textSecondary" align="center">
                {mode === 'before' ? 'Source' : 'Translated'} document would be displayed here.<br />
                In a real implementation, this would show the actual PDF content.
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<DownloadIcon />} 
                sx={{ mt: 2 }}
                disabled
              >
                Download {mode === 'before' ? 'Source' : 'Translation'}
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
            Translation Portfolio
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Explore our translation work across different industries and languages
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
            <Tab value="all" label="All" />
            <Tab value="featured" label="Featured" />
            <Tab value="legal" label="Legal" />
            <Tab value="medical" label="Medical" />
            <Tab value="technical" label="Technical" />
            <Tab value="marketing" label="Marketing" />
            <Tab value="creative" label="Creative" />
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
                          label="Featured" 
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
                Side by Side
              </Button>
              <Button
                variant={viewMode === 'before' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('before')}
                color="primary"
                size="small"
              >
                Source Only
              </Button>
              <Button
                variant={viewMode === 'after' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('after')}
                color="primary"
                size="small"
              >
                Translation Only
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
