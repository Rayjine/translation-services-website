import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import OghamMark from '../components/ui/OghamMark';
import GlyphField from '../components/ui/GlyphField';
import CountUp from '../components/ui/CountUp';
import TeamMemberCard from '../components/team/TeamMemberCard';
import TeamProfileDialog from '../components/team/TeamProfileDialog';
import useTeamMembers from '../components/team/useTeamMembers';
import { tokens, easing, fonts } from '../theme';

// Vowels carve 1–4 short notches across the stem: a quiet Ogham tally for 01–04.
const TALLY = ['a', 'o', 'u', 'e', 'i'];

/** Overlapping portraits in the hero; each opens that person's profile. */
const FaceStack = ({ members, onOpen }) => (
  <Box
    component="ul"
    sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: 1, paddingInlineStart: '12px' }}
  >
    {members.map((member, i) => (
      <Box component="li" key={member.id ?? i} sx={{ marginInlineStart: '-12px' }}>
        <Tooltip title={member.name} arrow>
          <Box
            component="button"
            type="button"
            onClick={() => onOpen(i)}
            aria-label={member.name}
            aria-haspopup="dialog"
            sx={{
              display: 'block',
              p: 0,
              width: { xs: 46, md: 54 },
              height: { xs: 46, md: 54 },
              borderRadius: '50%',
              border: `3px solid ${tokens.ink}`,
              bgcolor: tokens.indigo,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              animation: `page-enter .6s ${easing.out} ${300 + i * 60}ms both`,
              transition: `transform .35s ${easing.out}, box-shadow .35s`,
              '&:hover, &:focus-visible': {
                transform: 'translateY(-6px) scale(1.08)',
                zIndex: 2,
                boxShadow: `0 0 0 2px ${tokens.mint}, 0 12px 24px -10px rgba(0,0,0,0.6)`,
              },
              '&:focus-visible': { outline: 'none' },
            }}
          >
            <Box
              component="img"
              src={member.thumb}
              alt=""
              width={54}
              height={54}
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }}
            />
          </Box>
        </Tooltip>
      </Box>
    ))}
  </Box>
);

/**
 * Dark tile closing the grid: every language the team works in, set as a serif word
 * wall. Each leader's portrait sits beside their mother tongue.
 */
const LanguagesTile = ({ languages, members }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box
      className="grain"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        borderRadius: '22px',
        color: '#fff',
        background: tokens.heroBackground,
        p: { xs: 3.5, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 4, md: 5 },
      }}
    >
      <GlyphField opacity={0.06} density={0.6} />
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
        <Typography
          component="p"
          sx={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: { xs: '5rem', md: '7rem' },
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            background: tokens.gradientText,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          <CountUp end={languages.length} locale={i18n.language} />
        </Typography>
        <Typography variant="h3" component="p" sx={{ color: '#fff', pb: { xs: 0.5, md: 1 } }}>
          {t('team.languages')}
        </Typography>
      </Box>

      <Box
        component="ul"
        sx={{
          position: 'relative',
          listStyle: 'none',
          m: 0,
          p: 0,
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          alignContent: 'center',
          columnGap: { xs: 2.25, md: 3.5 },
          rowGap: { xs: 1.25, md: 1.75 },
        }}
      >
        {languages.map((lang, i) => {
          const leads = members.filter((m) => m.languages[0] === lang);
          return (
            <Reveal
              key={lang}
              component="li"
              variant="fade"
              delay={i * 60}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                fontFamily: fonts.display,
                fontWeight: 500,
                fontSize: { xs: '1.35rem', md: '1.9rem' },
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: leads.length ? '#fff' : 'rgba(255,255,255,0.55)',
                transition: 'color .25s',
                '&:hover': { color: tokens.mint },
                '&:hover img': { transform: 'translateY(-3px)' },
              }}
            >
              {leads.length > 0 && (
                <Box component="span" aria-hidden sx={{ display: 'inline-flex', paddingInlineStart: '8px' }}>
                  {leads.map((m) => (
                    <Box
                      key={m.id ?? m.name}
                      component="img"
                      src={m.thumb}
                      alt=""
                      width={34}
                      height={34}
                      loading="lazy"
                      sx={{
                        width: { xs: 28, md: 34 },
                        height: { xs: 28, md: 34 },
                        marginInlineStart: '-8px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: '50% 20%',
                        border: `2px solid ${alpha(tokens.mint, 0.7)}`,
                        bgcolor: tokens.indigo,
                        transition: `transform .35s ${easing.out}`,
                      }}
                    />
                  ))}
                </Box>
              )}
              {lang}
            </Reveal>
          );
        })}
      </Box>

      <Box aria-hidden sx={{ position: 'relative', mt: 'auto', color: tokens.picton, opacity: 0.3 }}>
        <OghamMark text="Languages" strokeLength={18} strokeWidth={2} stagger={45} sx={{ width: '100%', maxWidth: 640, height: 'auto' }} />
      </Box>
    </Box>
  );
};

const Team = () => {
  const { t } = useTranslation();
  const { members, languages } = useTeamMembers();
  const [active, setActive] = useState(null);
  const valuesRaw = t('team.philosophy.values', { returnObjects: true });
  const values = Array.isArray(valuesRaw) ? valuesRaw : [];

  const navigate = (step) =>
    setActive((current) => (current === null ? current : (current + step + members.length) % members.length));

  return (
    <Box>
      <PageHero eyebrow={t('common.footer.address')} title={t('team.pageTitle')} subtitle={t('team.pageSubtitle')} ogham="Team">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: 3, md: 4 } }}>
          <FaceStack members={members} onOpen={setActive} />
          <Button
            component="a"
            href="#members"
            variant="outlined"
            size="large"
            endIcon={<ArrowDownwardIcon className="keep-direction" />}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.4)',
              '&:hover': { borderColor: tokens.mint, color: tokens.mint, bgcolor: 'rgba(125,219,163,0.06)' },
            }}
          >
            {t('home.about.meetTeam')}
          </Button>
        </Box>
      </PageHero>

      {/* Intro + team grid */}
      <Box component="section" aria-labelledby="team-intro-title" sx={{ py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '5fr 7fr' },
              gap: { xs: 4, md: 8 },
              alignItems: 'start',
              mb: { xs: 7, md: 11 },
            }}
          >
            <Box>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <Reveal variant="fade">
                  <Typography
                    variant="overline"
                    component="p"
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: tokens.shamrockText, mb: 1.5 }}
                  >
                    <Box component="span" aria-hidden sx={{ display: 'inline-flex', gap: '3px' }}>
                      {[0, 1, 2].map((i) => (
                        <Box key={i} component="span" sx={{ width: '2px', height: 12, borderRadius: 1, bgcolor: 'currentColor', opacity: 1 - i * 0.25 }} />
                      ))}
                    </Box>
                    {t('team.ourTranslators')}
                  </Typography>
                </Reveal>
                <Reveal delay={60}>
                  <Typography id="team-intro-title" variant="h2" component="h2" sx={{ color: tokens.text }}>
                    {t('team.professionalTranslators')}
                  </Typography>
                </Reveal>
                <Reveal delay={160} variant="fade">
                  <Box aria-hidden sx={{ mt: 4, color: tokens.shamrock, width: { xs: 220, md: 260 } }}>
                    <OghamMark text="Two experts" strokeLength={16} strokeWidth={2} stagger={45} sx={{ width: '100%', height: 'auto' }} />
                  </Box>
                </Reveal>
              </Box>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Reveal delay={120}>
                <Box
                  component="figure"
                  sx={{
                    position: 'relative',
                    m: 0,
                    paddingInlineStart: { xs: 3, md: 5 },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      insetInlineStart: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      borderRadius: 3,
                      background: `linear-gradient(to bottom, ${tokens.shamrock}, ${tokens.picton})`,
                      transform: 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: `transform 1.4s ${easing.out} .35s`,
                    },
                    '.is-visible > &::before': { transform: 'scaleY(1)' },
                  }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      top: { xs: -44, md: -70 },
                      insetInlineStart: { xs: 12, md: 24 },
                      fontFamily: fonts.display,
                      fontSize: { xs: '6rem', md: '9rem' },
                      lineHeight: 1,
                      color: alpha(tokens.picton, 0.22),
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    &ldquo;
                  </Box>
                  <Typography
                    component="p"
                    sx={{
                      position: 'relative',
                      fontFamily: fonts.display,
                      fontWeight: 400,
                      fontSize: { xs: '1.2rem', md: '1.45rem' },
                      lineHeight: 1.65,
                      letterSpacing: '-0.005em',
                      color: tokens.text,
                    }}
                  >
                    {t('team.description')}
                  </Typography>
                </Box>
              </Reveal>
            </Box>
          </Box>

          <Box
            id="members"
            sx={{
              scrollMarginTop: 8,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
              gap: { xs: 3, md: 3.5 },
            }}
          >
            {members.map((member, i) => (
              <Reveal key={member.id ?? i} delay={(i % 3) * 90} sx={{ minWidth: 0 }}>
                <TeamMemberCard member={member} index={i} onOpen={setActive} />
              </Reveal>
            ))}
            {languages.length > 0 && (
              <Reveal variant="scale" sx={{ gridColumn: { sm: 'span 2' }, minWidth: 0 }}>
                <LanguagesTile languages={languages} members={members} />
              </Reveal>
            )}
          </Box>
        </Container>
      </Box>

      {/* Philosophy */}
      <Box
        component="section"
        className="grain"
        sx={{ position: 'relative', overflow: 'hidden', background: tokens.heroBackground, color: '#fff', py: { xs: 10, md: 14 } }}
      >
        <GlyphField opacity={0.05} density={0.5} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          {/* Sits in the empty band beside the heading, clear of the numbered values below. */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              insetInlineEnd: 40,
              top: 0,
              height: 230,
              display: { xs: 'none', lg: 'flex' },
              color: tokens.mint,
              opacity: 0.4,
            }}
          >
            <OghamMark text="Meaning" orientation="vertical" strokeLength={24} strokeWidth={2.25} delay={200} sx={{ height: '100%', width: 'auto' }} />
          </Box>
          <SectionHeading
            align="start"
            tone="dark"
            title={t('team.philosophy.title')}
            subtitle={t('team.philosophy.subtitle')}
            maxWidth={820}
          />
          <Box
            component="ol"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
              gap: { xs: 0, sm: 4, md: 4 },
            }}
          >
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                component="li"
                delay={i * 110}
                sx={{
                  position: 'relative',
                  pt: { xs: 3.5, md: 4 },
                  pb: { xs: 3.5, sm: 0 },
                  borderTop: '1px solid rgba(255,255,255,0.14)',
                  // The rule fills with the brand gradient once the item is revealed.
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -1,
                    insetInline: 0,
                    height: 2,
                    background: tokens.gradient,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: `transform 1.1s ${easing.out} ${200 + i * 140}ms`,
                  },
                  '[dir="rtl"] &::before': { transformOrigin: 'right' },
                  '&.is-visible::before': { transform: 'scaleX(1)' },
                  '&:hover .value-num': { transform: 'translateY(-4px)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
                  <Typography
                    className="value-num"
                    component="span"
                    aria-hidden
                    sx={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: { xs: '3rem', md: '3.5rem' },
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      background: tokens.gradientText,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      transition: `transform .5s ${easing.out}`,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Box aria-hidden sx={{ color: tokens.mint, opacity: 0.7, width: 44 + i * 9 }}>
                    <OghamMark text={TALLY[i % TALLY.length]} strokeLength={14} strokeWidth={2} delay={400 + i * 140} sx={{ width: '100%', height: 'auto' }} />
                  </Box>
                </Box>
                <Typography variant="h3" component="h3" sx={{ color: '#fff', fontSize: { xs: '1.4rem', md: '1.5rem' }, mb: 1.5 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.74)', fontSize: '0.98rem' }}>
                  {value.description}
                </Typography>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Closing call to action */}
      <Box component="section" sx={{ py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Reveal variant="scale">
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: { xs: '22px', md: '32px' },
                bgcolor: tokens.paperDeep,
                border: `1px solid ${tokens.line}`,
                px: { xs: 3, sm: 6, md: 10 },
                py: { xs: 6, md: 9 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
                gap: { xs: 4, md: 6 },
                alignItems: 'center',
              }}
            >
              <Box
                aria-hidden
                sx={{ position: 'absolute', insetInlineEnd: { xs: -40, md: 40 }, top: { xs: 20, md: 30 }, bottom: { xs: 20, md: 30 }, color: tokens.shamrock, opacity: 0.16, display: 'flex' }}
              >
                <OghamMark text="Contact" orientation="vertical" strokeLength={30} strokeWidth={2.5} sx={{ height: '100%', width: 'auto' }} />
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Typography variant="h2" component="h2" sx={{ color: tokens.text, mb: 2 }}>
                  {t('home.cta.title')}
                </Typography>
                <Typography variant="body1" sx={{ color: tokens.textMuted, fontSize: { xs: '1.05rem', md: '1.2rem' }, maxWidth: 520 }}>
                  {t('home.cta.subtitle')}
                </Typography>
              </Box>
              <Box sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                >
                  {t('common.buttons.getQuote')}
                </Button>
                <Button component={RouterLink} to="/services" variant="outlined" color="primary" size="large">
                  {t('common.buttons.ourServices')}
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <TeamProfileDialog members={members} index={active} onClose={() => setActive(null)} onNavigate={navigate} />
    </Box>
  );
};

export default Team;
