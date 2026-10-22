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
import { useTranslation } from 'react-i18next';
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
import salehAlOtaibiImg from '../assets/images/team/saleh_al-otaibi.png';

const Team = () => {
  const { t } = useTranslation();
  
  // Map team member data from translations with images
  const teamMembers = t('team.members', { returnObjects: true }).map((member, index) => ({
    ...member,
    image: [
      celiaBrodardImg,
      markusBrunnerImg,
      inesFerreiraImg,
      jianChenImg,
      alessandraContiImg,
      emikoShimizuImg,
      olenaKovalenkoImg,
      robertAinsworthImg,
      claudioCereghettiImg,
      salehAlOtaibiImg
    ][index]
  }));

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {t('team.pageTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            {t('team.pageSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Team Overview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {t('team.professionalTranslators')}
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
          {t('team.description')}
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
                      <LanguageIcon className="keep-direction" fontSize="small" sx={{ mr: 1 }} />
                      {t('team.languages')}
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
                      <WorkIcon className="keep-direction" fontSize="small" sx={{ mr: 1 }} />
                      {t('team.specialties')}
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
                      {t('team.experienceLabel')}:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.experience}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <SchoolIcon className="keep-direction" fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
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
            {t('team.philosophy.title')}
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            {t('team.philosophy.subtitle')}
          </Typography>

          <Grid container spacing={4}>
            {t('team.philosophy.values', { returnObjects: true }).map((value, index) => (
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
