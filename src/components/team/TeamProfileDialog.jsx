import { useEffect, useRef } from 'react';
import { Box, Button, Dialog, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import OghamMark from '../ui/OghamMark';
import { ChipLabel, ExperienceBadge, TagList } from './TeamMemberCard';
import { splitEducation } from './useTeamMembers';
import { tokens, easing } from '../../theme';

/**
 * Full profile of one team leader: portrait, bio, languages, specialties and education.
 * Previous/next buttons (labelled with the neighbour's name) let visitors browse the team.
 */
const TeamProfileDialog = ({ members, index, onClose, onNavigate }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef(null);
  const open = index !== null && Boolean(members[index]);
  // Keep showing the last member while the dialog fades out.
  const lastIndex = useRef(0);
  if (open) lastIndex.current = index;
  const shown = lastIndex.current;
  const member = members[shown];
  const count = members.length;

  // Back to the top of the profile whenever another member is shown.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [index]);

  if (!member) return null;

  const prev = members[(shown - 1 + count) % count];
  const next = members[(shown + 1) % count];
  const education = splitEducation(member.education);
  const titleId = 'team-profile-title';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby={titleId}
      onKeyDown={(e) => {
        if (e.target.closest?.('button')) return;
        if (e.key === 'ArrowRight') onNavigate(theme.direction === 'rtl' ? -1 : 1);
        if (e.key === 'ArrowLeft') onNavigate(theme.direction === 'rtl' ? 1 : -1);
      }}
      slotProps={{
        paper: {
          ref: scrollRef,
          sx: {
            bgcolor: tokens.paper,
            borderRadius: { xs: 0, sm: '22px' },
            overflowX: 'hidden',
            backgroundImage: 'none',
            boxShadow: '0 40px 120px -30px rgba(7,26,43,0.65)',
          },
        },
        backdrop: { sx: { bgcolor: 'rgba(7,26,43,0.72)', backdropFilter: 'blur(4px)' } },
      }}
    >
      {/* Zero-height sticky rail keeps the close button reachable while the profile scrolls. */}
      <Box sx={{ position: 'sticky', top: 0, height: 0, zIndex: 3 }}>
      <IconButton
        onClick={onClose}
        aria-label={t('team.closeProfile', 'Close profile')}
        sx={{
          position: 'absolute',
          top: 12,
          insetInlineEnd: 12,
          zIndex: 3,
          width: 44,
          height: 44,
          color: '#fff',
          bgcolor: 'rgba(7,26,43,0.55)',
          border: '1px solid rgba(255,255,255,0.18)',
          transition: `transform .3s ${easing.out}, background-color .2s`,
          '&:hover': { bgcolor: tokens.ink, transform: 'rotate(90deg)' },
        }}
      >
        <CloseIcon className="keep-direction" />
      </IconButton>
      </Box>

      <Box
        key={member.id ?? shown}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          animation: `page-enter .5s ${easing.out} both`,
        }}
      >
        {/* Portrait column: the portrait keeps sane proportions (no over-zoomed face on tall
            desktop columns) and, with the carved first name beneath it, stays in view while a
            long profile scrolls. overflow: clip (not hidden) so position: sticky still works. */}
        <Box
          className="grain"
          sx={{
            position: 'relative',
            overflow: 'clip',
            bgcolor: tokens.ink,
            backgroundImage: 'radial-gradient(420px 260px at 0% 100%, rgba(59,155,92,0.28), transparent 70%)',
          }}
        >
          <Box sx={{ position: { xs: 'relative', md: 'sticky' }, top: 0 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 360, sm: 420, md: 'auto' },
                aspectRatio: { md: '3 / 4' },
                bgcolor: tokens.indigo,
              }}
            >
              <Box
                component="img"
                src={member.image}
                alt={member.name}
                width={500}
                height={500}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 18%',
                }}
              />
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: {
                    xs: 'linear-gradient(to top, rgba(7,26,43,0.85) 0%, rgba(7,26,43,0) 45%)',
                    md: `linear-gradient(to top, ${tokens.ink} 0%, rgba(7,26,43,0.55) 18%, rgba(7,26,43,0) 42%)`,
                  },
                }}
              />
              {member.ogham && (
                <Box
                  aria-hidden
                  sx={{ position: 'absolute', insetInlineStart: 22, bottom: 24, top: 68, display: { xs: 'block', md: 'none' }, color: tokens.mint, opacity: 0.8 }}
                >
                  <OghamMark text={member.ogham} orientation="vertical" strokeLength={14} strokeWidth={2.25} stagger={45} sx={{ width: 28, height: 'auto', maxHeight: '100%' }} />
                </Box>
              )}
            </Box>
            {member.ogham && (
              <Box
                aria-hidden
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  px: 3.5,
                  pt: 1,
                  pb: 4,
                  color: tokens.mint,
                  opacity: 0.75,
                }}
              >
                <OghamMark text={member.ogham} strokeLength={20} strokeWidth={2.5} stagger={45} delay={250} sx={{ height: 50, width: 'auto', maxWidth: '100%' }} />
              </Box>
            )}
            {member.experience && <ExperienceBadge value={member.experience} sx={{ position: 'absolute', top: 16, insetInlineStart: 16 }} />}
          </Box>
        </Box>

        {/* Details column */}
        <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, pt: { xs: 3.5, md: 6 }, minWidth: 0 }}>
          <Typography variant="overline" component="p" sx={{ color: tokens.shamrockText, display: 'block', mb: 1, lineHeight: 1.5 }}>
            {member.role}
          </Typography>
          <Typography id={titleId} variant="h2" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2.5 }}>
            {member.name}
          </Typography>
          <Typography variant="body1" sx={{ color: tokens.text, mb: 3.5 }}>
            {member.bio}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3.5 }}>
            <Box>
              <ChipLabel>{t('team.languages')}</ChipLabel>
              <TagList items={member.languages} tone="language" size="md" />
            </Box>
            <Box>
              <ChipLabel>{t('team.specialties')}</ChipLabel>
              <TagList items={member.specialties} tone="specialty" size="md" />
            </Box>
          </Box>

          {education.length > 0 && (
            <Box>
              <ChipLabel sx={{ mb: 1.5 }}>{t('team.educationExperience')}</ChipLabel>
              <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.25 }}>
                {education.map((entry) => (
                  <Box
                    component="li"
                    key={entry.degree + entry.place}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start',
                      p: 1.75,
                      borderRadius: '14px',
                      bgcolor: '#fff',
                      border: `1px solid ${tokens.line}`,
                    }}
                  >
                    <Box
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: tokens.paperDeep,
                        color: tokens.indigo,
                      }}
                    >
                      <SchoolOutlinedIcon className="keep-direction" fontSize="small" />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.45, color: tokens.text }}>
                        {entry.degree}
                      </Typography>
                      {entry.place && (
                        <Typography variant="body2" sx={{ color: tokens.textMuted, fontSize: '0.875rem', mt: 0.25 }}>
                          {entry.place}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {count > 1 && (
            <Box
              component="nav"
              aria-label={t('team.pageTitle')}
              sx={{
                mt: 4,
                pt: 2.5,
                borderTop: `1px solid ${tokens.line}`,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              <Button
                onClick={() => onNavigate(-1)}
                startIcon={<ArrowBackIcon className="flip-in-rtl" />}
                sx={{ minHeight: 44, color: tokens.indigo, px: 1.5 }}
              >
                {prev.name}
              </Button>
              <Button
                onClick={() => onNavigate(1)}
                endIcon={<ArrowForwardIcon className="flip-in-rtl" />}
                sx={{ minHeight: 44, color: tokens.indigo, px: 1.5, marginInlineStart: 'auto' }}
              >
                {next.name}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default TeamProfileDialog;
