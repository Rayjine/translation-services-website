import { Box, Button, Card, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OghamMark from '../ui/OghamMark';
import { tokens, easing } from '../../theme';

export const ExperienceBadge = ({ value, sx }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0.75,
        px: 1.5,
        py: 0.6,
        borderRadius: 999,
        bgcolor: alpha(tokens.ink, 0.62),
        border: `1px solid ${alpha('#fff', 0.16)}`,
        color: '#fff',
        backdropFilter: 'blur(6px)',
        ...sx,
      }}
    >
      <Typography component="span" sx={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tokens.mint }}>
        {t('team.experienceLabel')}
      </Typography>
      <Typography component="span" sx={{ fontSize: '0.85rem', fontWeight: 800 }}>
        {value}
      </Typography>
    </Box>
  );
};

/** Small uppercase label used above chip groups. */
export const ChipLabel = ({ children, sx }) => (
  <Typography
    component="p"
    sx={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: tokens.textMuted, mb: 1, ...sx }}
  >
    {children}
  </Typography>
);

/** Languages (mother tongue first, emphasised) and specialties as lightweight tags. */
export const TagList = ({ items, tone = 'language', size = 'sm' }) => (
  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
    {items.map((item, i) => {
      const lead = tone === 'language' && i === 0;
      const colors =
        tone === 'language'
          ? lead
            ? { bgcolor: tokens.indigo, color: '#fff', borderColor: tokens.indigo }
            : { bgcolor: 'transparent', color: tokens.indigo, borderColor: alpha(tokens.indigo, 0.28) }
          : { bgcolor: alpha(tokens.shamrock, 0.1), color: '#22603a', borderColor: alpha(tokens.shamrock, 0.22) };
      return (
        <Box
          component="li"
          key={item}
          sx={{
            ...colors,
            border: '1px solid',
            borderRadius: 999,
            px: size === 'sm' ? 1.25 : 1.5,
            py: size === 'sm' ? 0.35 : 0.5,
            fontSize: size === 'sm' ? '0.8rem' : '0.875rem',
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {item}
        </Box>
      );
    })}
  </Box>
);

/**
 * Portrait card. The "Read more" button is a stretched link, so the whole card is
 * one click/tap target while keyboard users get a single, clearly focused stop.
 */
const TeamMemberCard = ({ member, index, onOpen }) => {
  const { t } = useTranslation();
  const nameId = `member-${member.id ?? index}-name`;

  return (
    <Card
      component="article"
      aria-labelledby={nameId}
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: `transform .5s ${easing.out}, box-shadow .5s ${easing.out}, border-color .3s`,
        '&:hover, &:focus-within': {
          transform: 'translateY(-6px)',
          borderColor: alpha(tokens.picton, 0.45),
          boxShadow: '0 2px 4px rgba(7,26,43,0.05), 0 30px 60px -28px rgba(7,26,43,0.45)',
        },
        '&:hover .member-portrait img, &:focus-within .member-portrait img': { transform: 'scale(1.06)' },
        '&:hover .member-rule, &:focus-within .member-rule': { transform: 'scaleX(1)' },
        '&:hover .member-arrow, &:focus-within .member-arrow': { transform: 'translateX(4px)' },
        '[dir="rtl"] &:hover .member-arrow, [dir="rtl"] &:focus-within .member-arrow': { transform: 'scaleX(-1) translateX(4px)' },
        '&:has(.member-cta:focus-visible)': { outline: `3px solid ${tokens.indigo}`, outlineOffset: 3 },
      }}
    >
      {/* Portrait */}
      <Box
        className="member-portrait"
        sx={{ position: 'relative', aspectRatio: { xs: '10 / 9', sm: '1 / 1' }, overflow: 'hidden', bgcolor: tokens.indigo }}
      >
        <Box
          component="img"
          src={member.image}
          alt={member.name}
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 20%',
            transition: `transform 1.2s ${easing.out}`,
            transformOrigin: '50% 30%',
          }}
        />
        {/* Ink wash so the name stays legible over any portrait. */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(7,26,43,0.94) 0%, rgba(7,26,43,0.62) 28%, rgba(7,26,43,0) 58%)',
          }}
        />
        {member.ogham && (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              insetInlineEnd: 14,
              top: 18,
              height: '48%',
              color: tokens.mint,
              opacity: 0.7,
            }}
          >
            {/* Fixed width keeps stroke size constant; the carving's length follows the name. */}
            <OghamMark
              text={member.ogham}
              orientation="vertical"
              strokeLength={12}
              strokeWidth={2.25}
              stagger={40}
              delay={200 + (index % 3) * 120}
              sx={{ width: 20, height: 'auto', maxHeight: '100%' }}
            />
          </Box>
        )}
        {member.experience && <ExperienceBadge value={member.experience} sx={{ position: 'absolute', top: 16, insetInlineStart: 16 }} />}
        <Box sx={{ position: 'absolute', insetInline: 0, bottom: 0, p: { xs: 2.5, md: 3 }, color: '#fff' }}>
          <Typography
            component="p"
            sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: tokens.mint, mb: 0.75 }}
          >
            {member.role}
          </Typography>
          <Typography id={nameId} variant="h3" component="h3" sx={{ fontSize: { xs: '1.6rem', md: '1.75rem' }, color: '#fff' }}>
            {member.name}
          </Typography>
        </Box>
      </Box>

      {/* Gradient rule that draws across on hover. */}
      <Box
        aria-hidden
        className="member-rule"
        sx={{
          height: 3,
          background: tokens.gradient,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          '[dir="rtl"] &': { transformOrigin: 'right' },
          transition: `transform .7s ${easing.out}`,
        }}
      />

      <Box sx={{ p: { xs: 2.5, md: 3 }, pt: { xs: 2.25, md: 2.5 }, display: 'flex', flexDirection: 'column', gap: 2.25, flexGrow: 1 }}>
        <Box>
          <ChipLabel>{t('team.languages')}</ChipLabel>
          <TagList items={member.languages} tone="language" />
        </Box>
        <Box>
          <ChipLabel>{t('team.specialties')}</ChipLabel>
          <TagList items={member.specialties} tone="specialty" />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: tokens.textMuted,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {member.bio}
        </Typography>
        <Box sx={{ mt: 'auto', pt: 0.5, borderTop: `1px solid ${tokens.line}` }}>
          <Button
            className="member-cta"
            onClick={() => onOpen(index)}
            aria-haspopup="dialog"
            aria-describedby={nameId}
            disableRipple
            endIcon={<ArrowForwardIcon className="member-arrow flip-in-rtl" sx={{ transition: `transform .35s ${easing.out}` }} />}
            sx={{
              // Static so the ::after overlay stretches over the whole card.
              position: 'static',
              mt: 1.5,
              minHeight: 44,
              px: 0,
              color: tokens.indigo,
              fontWeight: 800,
              '&:hover': { bgcolor: 'transparent', transform: 'none' },
              '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: 1, borderRadius: 'inherit' },
              '&.Mui-focusVisible': { outline: 'none' },
            }}
          >
            {t('common.buttons.readMore')}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default TeamMemberCard;
