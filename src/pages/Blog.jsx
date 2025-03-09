import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Chip,
  Avatar,
  InputAdornment,
  TextField,
  Pagination
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const blogPosts = [
  {
    id: 1,
    title: 'The Importance of Cultural Context in Translation',
    excerpt: 'Understanding cultural nuances is critical for accurate translation. This article explores how cultural context impacts translation quality and effectiveness.',
    content: 'Full article content would go here...',
    author: 'Sophie Laurent',
    date: 'March 5, 2025',
    category: 'Translation Theory',
    image: 'https://source.unsplash.com/random/800x450/?culture'
  },
  {
    id: 2,
    title: 'Machine Translation vs. Human Translation: Pros and Cons',
    excerpt: 'As AI advances, machine translation improves, but it still has limitations. We compare machine and human translation approaches and discuss when to use each.',
    content: 'Full article content would go here...',
    author: 'Hans Mueller',
    date: 'February 20, 2025',
    category: 'Technology',
    image: 'https://source.unsplash.com/random/800x450/?technology'
  },
  {
    id: 3,
    title: 'Localization Best Practices for E-commerce Websites',
    excerpt: 'Translating your e-commerce website is about more than just language. Learn key strategies for effective localization that drives international sales.',
    content: 'Full article content would go here...',
    author: 'Maria Rodriguez',
    date: 'February 12, 2025',
    category: 'E-commerce',
    image: 'https://source.unsplash.com/random/800x450/?ecommerce'
  },
  {
    id: 4,
    title: 'Legal Translation Challenges and Solutions',
    excerpt: 'Legal translation requires precision and specialized knowledge. This article addresses common challenges and offers practical solutions for legal documents.',
    content: 'Full article content would go here...',
    author: 'Ahmed Al-Farsi',
    date: 'January 30, 2025',
    category: 'Legal',
    image: 'https://source.unsplash.com/random/800x450/?legal'
  },
  {
    id: 5,
    title: 'How to Choose the Right Translation Service for Your Business',
    excerpt: 'With many translation options available, how do you choose the right service? We provide a framework for selecting a translation partner that meets your needs.',
    content: 'Full article content would go here...',
    author: 'Wei Zhang',
    date: 'January 18, 2025',
    category: 'Business',
    image: 'https://source.unsplash.com/random/800x450/?business'
  },
  {
    id: 6,
    title: 'The Art of Literary Translation',
    excerpt: 'Literary translation is where science meets art. Explore how translators balance accuracy with creativity when translating literary works.',
    content: 'Full article content would go here...',
    author: 'Elena Petrov',
    date: 'January 5, 2025',
    category: 'Literary',
    image: 'https://source.unsplash.com/random/800x450/?books'
  }
];

const categories = [
  'Translation Theory',
  'Technology',
  'E-commerce',
  'Legal',
  'Business',
  'Literary',
  'Marketing',
  'Medical',
  'Technical'
];

const recentPosts = blogPosts.slice(0, 3);

const Blog = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Blog
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Insights on translation, language, and global communication
          </Typography>
        </Container>
      </Box>

      {/* Blog Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {blogPosts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <Card 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: { xs: '100%', sm: 200 },
                        height: { xs: 200, sm: 'auto' }
                      }}
                      image={post.image}
                      alt={post.title}
                    />
                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
                        <Chip 
                          label={post.category} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                      <Typography component="h2" variant="h5" gutterBottom>
                        {post.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {post.author}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {post.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" paragraph>
                        {post.excerpt}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Button 
                          component={RouterLink} 
                          to={`/blog/${post.id}`} 
                          variant="text" 
                          color="primary"
                        >
                          Read More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination count={3} color="primary" size="large" />
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Search Box */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Categories */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Categories
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <Chip 
                    key={category}
                    label={category}
                    component={RouterLink}
                    to={`/blog/category/${category.toLowerCase().replace(/ /g, '-')}`}
                    clickable
                    sx={{ 
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Recent Posts */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Recent Posts
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {recentPosts.map((post) => (
                <Box 
                  key={post.id} 
                  component={RouterLink} 
                  to={`/blog/${post.id}`}
                  sx={{ 
                    display: 'flex', 
                    mb: 2, 
                    textDecoration: 'none', 
                    color: 'inherit',
                    '&:hover': {
                      '& .MuiTypography-root': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <Avatar 
                    variant="rounded" 
                    src={post.image} 
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium', transition: 'color 0.3s' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Newsletter Signup */}
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Subscribe to Our Newsletter
              </Typography>
              <Typography variant="body2" paragraph>
                Stay updated with the latest insights and news in the translation industry.
              </Typography>
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
