import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';

import celiaBrodardImg from '../assets/images/team/celia_brodard.png';
import markusBrunnerImg from '../assets/images/team/markus_brunner.png';
import alessandraContiImg from '../assets/images/team/alessandra_conti.png';
import claudioCereghettiImg from '../assets/images/team/claudio_cereghetti.png';
import robertAinsworthImg from '../assets/images/team/robert_ainsworth.png';
import olenaKovalenkoImg from '../assets/images/team/olena_kovalenko.png';
import inesFerreiraImg from '../assets/images/team/ines_ferreira.png';
import jianChenImg from '../assets/images/team/jian_chen.png';
import emikoShimizuImg from '../assets/images/team/emiko_shimizu.png';
import amineBenchekrounImg from '../assets/images/team/amine_benchekroun.png';

const teamMembers = [
  {
    id: 1,
    name: 'Célia Brodard',
    role: 'Senior Translator - French',
    bio: 'Born and raised in Geneva, Céline has a strong passion for languages and specializes in legal, financial, and business documents. An alumna of top Swiss institutions, she combines her academic background with years of professional translation experience. Her Swiss heritage and deep understanding of multicultural environments allow her to ensure precision and cultural sensitivity in every project.',
    languages: ['French', 'English', 'German'],
    specialties: ['Legal', 'Business', 'Financial'],
    experience: '8+ years',
    education: 'Bachelor’s in Multilingual Communication – University of Geneva, Switzerland; Master’s in Specialized Translation (Legal and Financial) – University of Geneva, Faculty of Translation and Interpreting (FTI), Switzerland',
    image: celiaBrodardImg
  },
  {
    id: 2,
    name: 'Markus Brunner',
    role: 'Senior Translator - German',
    bio: 'Based in Zurich, Markus has been translating technical and scientific documents for over a decade. With a background in engineering and linguistics, he brings interdisciplinary expertise to his translation work. His training at one of Switzerland’s top technical universities equips him with the ability to handle highly complex and technical translations with unmatched precision and clarity.',
    languages: ['German', 'English', 'French'],
    specialties: ['Technical', 'Scientific', 'Engineering'],
    experience: '12+ years',
    education: 'Bachelor’s in Mechanical Engineering – ETH Zurich, Switzerland; Master’s in Language and Communication – University of Zurich, Switzerland',
    image: markusBrunnerImg
  },
  {
    id: 3,
    name: 'Inês Ferreira',
    role: 'Senior Translator - Portuguese & Spanish',
    bio: 'Originally from Lisbon, Inês now calls Lugano home. She specializes in creative and marketing translations, with a deep passion for literature and storytelling. Her academic foundation in linguistics and literary studies from one of Portugal’s finest universities enables her to translate with cultural nuance and creative flair.',
    languages: ['Portuguese', 'Spanish', 'Italian', 'French'],
    specialties: ['Marketing', 'Creative', 'Literary'],
    experience: '7+ years',
    education: 'Bachelor’s in Linguistics – University of Lisbon, Portugal; Master’s in Translation, Interpreting and Intercultural Studies – Autonomous University of Barcelona (UAB), Spain',
    image: inesFerreiraImg
  },
  {
    id: 4,
    name: 'Jian Chen',
    role: 'Senior Translator - Mandarin',
    bio: 'Jian is an expert in Mandarin-English translations with a focus on business and technical documents. With formal training in translation and intercultural communication from a leading Chinese university and further studies in Switzerland, he bridges cultural and linguistic gaps for Swiss companies entering the Chinese market.',
    languages: ['Mandarin', 'English', 'French'],
    specialties: ['Business', 'Technical', 'E-commerce'],
    experience: '11+ years',
    education: 'Bachelor’s in English Language Studies – Fudan University, China; Master’s in Translation and Interpreting – University of Zurich, Switzerland',
    image: jianChenImg
  },
  {
    id: 5,
    name: 'Alessandra Conti',
    role: 'Senior Translator - Italian',
    bio: 'From Ticino, the Italian-speaking canton of Switzerland, Alessandra excels in translating documents related to art, culture, and tourism. Her deep knowledge of Italian literature and Swiss heritage makes her translations culturally rich and precise. Her academic background in intercultural studies and art history adds depth to her expertise.',
    languages: ['Italian', 'German', 'English'],
    specialties: ['Art', 'Culture', 'Tourism', 'Luxury Goods'],
    experience: '9+ years',
    education: 'Bachelor’s in Art History – University of Bologna, Italy; Master’s of Advanced Studies in Intercultural Communication– University of Lugano, Switzerland',
    image: alessandraContiImg
  },
  {
    id: 6,
    name: 'Emiko Shimizu',
    role: 'Senior Translator - Japanese',
    bio: 'Emiko has extensive experience in translating technical manuals, patents, and scientific literature for major Swiss pharmaceutical and watchmaking companies. Her rigorous academic training in Japan, combined with her experience in Switzerland, makes her an indispensable expert for highly specialized and technical translations across industries.',
    languages: ['Japanese', 'English', 'German'],
    specialties: ['Technical', 'Patents', 'Pharmaceutical', 'Medical'],
    experience: '10+ years',
    education: 'Bachelor’s in Pharmaceutical Sciences – University of Tokyo, Japan; Master’s in Technical Translation – Tokyo University of Foreign Studies (TUFS), Japan',
    image: emikoShimizuImg
  },
  {
    id: 7,
    name: 'Olena Kovalenko',
    role: 'Senior Translator - Ukrainian & Russian',
    bio: 'Originally from Kyiv, Olena specializes in literary, academic, and legal translations. With a background in philology and literary studies, she has translated numerous literary works and academic papers, ensuring authenticity and cultural richness in every translation.',
    languages: ['Ukrainian', 'Russian', 'English', 'German'],
    specialties: ['Literary', 'Academic', 'Legal'],
    experience: '8+ years',
    education: 'Bachelor’s in Philology – Taras Shevchenko National University of Kyiv, Ukraine; Master’s in Translation – University of Vienna, Austria',
    image: olenaKovalenkoImg
  },
  {
    id: 8,
    name: 'Robert Ainsworth',
    role: 'Senior Translator - English',
    bio: 'A native English speaker with exceptional writing skills, Robert ensures the highest quality for all English translations. With a background in journalism and translation, he crafts compelling and accurate content across a wide variety of industries, from business reports to academic research and marketing materials.',
    languages: ['English', 'French', 'German'],
    specialties: ['Business', 'Marketing', 'Journalism', 'Academic'],
    experience: '14+ years',
    education: 'Bachelor’s in English Language and Literature – University of Oxford, UK; Master’s in Translation and Interpreting – University of Westminster, UK',
    image: robertAinsworthImg
  },
  {
    id: 9,
    name: 'Claudio Cereghetti',
    role: 'Senior Translator - Romansh',
    bio: 'As one of the few professional Romansh translators, Claudio preserves and promotes this rare Swiss language through his translations. With a deep academic foundation in philology and linguistic heritage, he is a trusted expert for official Swiss documentation and cultural preservation projects.',
    languages: ['Romansh', 'German', 'Italian', 'French', 'English'],
    specialties: ['Official Documentation', 'Cultural', 'Heritage'],
    experience: '12+ years',
    education: 'Bachelor’s in Romansh Literature and Linguistics – University of Zurich, Switzerland; Master’s in Classical Philology – University of Fribourg, Switzerland',
    image: claudioCereghettiImg
  },
  {
    id: 10,
    name: 'Amine Benchekroun',
    role: 'Senior Translator - Arabic',
    bio: 'Amine specializes in Arabic translations for diplomatic, business, and legal contexts. With training in international relations and specialist translation studies, he bridges Arabic-speaking regions with Switzerland’s diverse business and diplomatic landscape, ensuring translations are both accurate and culturally sensitive.',
    languages: ['Arabic', 'French', 'English'],
    specialties: ['Diplomatic', 'Legal', 'International Relations'],
    experience: '9+ years',
    education: 'Bachelor’s in Translation Studies – Université Hassan II, Morocco; Master’s in International Relations – Graduate Institute Geneva (IHEID), Switzerland',
    image: amineBenchekrounImg
  }
];

const Team = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Our Team
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Meet our professional translators
          </Typography>
        </Container>
      </Box>

      {/* Team Overview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Professional Translators Based in Switzerland
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
          The professionals featured here are our team leaders, each one leading the work around one main language that is their mother tongue. We also have additional collaborators, ensuring that we have at least two experts to translate and then review any possible language combination. This dual-expert approach guarantees the highest quality and cultural accuracy in all our translations. Based in Switzerland, we leverage our multicultural environment to provide precise and culturally appropriate translations across multiple European and global languages.
        </Typography>

        <Grid container spacing={4}>
          {teamMembers.map((member) => (
            <Grid item key={member.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  },
                  boxShadow: 3
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {member.bio}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                      Languages
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {member.languages.map((lang) => (
                        <Chip 
                          key={lang} 
                          label={lang} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WorkIcon fontSize="small" sx={{ mr: 1 }} />
                      Specialties
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {member.specialties.map((specialty) => (
                        <Chip 
                          key={specialty} 
                          label={specialty} 
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1, fontWeight: 'bold' }}>
                      Experience:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.experience}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <SchoolIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {member.education}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Values */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Translation Philosophy
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            At Ogham Translations, we believe that effective translation goes beyond words - it's about conveying meaning, context, and cultural nuances. Based in Switzerland, a country with four official languages, we understand multilingualism at our core and bring this unique perspective to every project.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: 'Cultural Expertise',
                description: 'Our translators don\'t just know the languages they work with - they understand the cultures behind them, ensuring your message remains appropriate and effective.'
              },
              {
                title: 'Subject Matter Knowledge',
                description: 'We assign translators based on their expertise in your specific field, whether it\'s legal, medical, technical, or creative content.'
              },
              {
                title: 'Quality Assurance',
                description: 'Every translation undergoes a rigorous quality control process, including review by a second linguist to ensure accuracy and consistency.'
              },
              {
                title: 'Continuous Learning',
                description: 'Our translators regularly participate in professional development to stay updated with the latest terminology and translation techniques.'
              }
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    bgcolor: 'white', 
                    p: 3, 
                    borderRadius: 2, 
                    boxShadow: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6" component="h3" gutterBottom color="primary">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Team;
