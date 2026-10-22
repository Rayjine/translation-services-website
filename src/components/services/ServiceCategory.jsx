import { Box, Container, Typography } from '@mui/material';
import Reveal from '../ui/Reveal';
import OghamMark from '../ui/OghamMark';
import ServiceCard from './ServiceCard';
import { tokens, fonts, easing } from '../../theme';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Editorial block for one service category: a sticky intro column (big number,
 * icon tile, serif title, carved Ogham of the category) beside its service cards.
 */
const ServiceCategory = ({ id, number, total, title, description, icon, ogham, services, tone = 'paper' }) => {
  const Icon = icon;
  const odd = services.length % 2 === 1;
  const headingId = `${id}-title`;

  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={headingId}
      sx={{
        position: 'relative',
        bgcolor: tone === 'deep' ? tokens.paperDeep : tokens.paper,
        py: { xs: 9, md: 14 },
        borderTop: `1px solid ${tokens.line}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 4fr) minmax(0, 8fr)' },
            columnGap: { lg: 9 },
            rowGap: { xs: 5, md: 6, lg: 0 },
          }}
        >
          {/* Intro column: pinned beside the cards on wide screens, split in two on tablets. */}
          <Box>
            <Box
              sx={{
                position: { lg: 'sticky' },
                top: { lg: 112 },
                display: { md: 'grid', lg: 'block' },
                gridTemplateColumns: { md: 'minmax(0, 1fr) minmax(0, 1fr)' },
                columnGap: { md: 6 },
                alignItems: { md: 'end' },
              }}
            >
              <Box>
                <Reveal variant="fade">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: { xs: 2.5, md: 3.5 } }}>
                    {/* "01 / 04" reads left to right in every language, so keep the pair together. */}
                    <Box aria-hidden sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, direction: 'ltr' }}>
                      <Box
                        sx={{
                          fontFamily: fonts.display,
                          fontWeight: 500,
                          fontSize: { xs: '4.5rem', md: '6.5rem' },
                          lineHeight: 0.8,
                          letterSpacing: '-0.05em',
                          background: tokens.gradient,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          fontVariantNumeric: 'lining-nums',
                        }}
                      >
                        {pad(number)}
                      </Box>
                      <Box sx={{ pb: 0.5, color: tokens.textMuted, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
                        / {pad(total)}
                      </Box>
                    </Box>
                    <Box
                      aria-hidden
                      sx={{
                        marginInlineStart: 'auto',
                        width: { xs: 56, md: 64 },
                        height: { xs: 56, md: 64 },
                        flexShrink: 0,
                        borderRadius: '18px',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#fff',
                        background: `linear-gradient(140deg, ${tokens.indigo} 0%, ${tokens.inkSoft} 100%)`,
                        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 18px 34px -18px ${tokens.indigo}`,
                        position: 'relative',
                        transition: `transform .6s ${easing.out}`,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -5,
                          borderRadius: '22px',
                          border: `1.5px solid ${tokens.mint}`,
                          opacity: 0.45,
                        },
                        '& svg': { fontSize: { xs: 28, md: 32 }, color: tokens.mint },
                        '@media (hover: hover)': { '&:hover': { transform: 'rotate(-6deg) scale(1.04)' } },
                      }}
                    >
                      <Icon className="keep-direction" />
                    </Box>
                  </Box>
                </Reveal>

                <Reveal delay={80}>
                  <Typography
                    variant="h2"
                    id={headingId}
                    sx={{
                      fontSize: { xs: '2.1rem', md: '2.6rem', lg: '2.85rem' },
                      color: tokens.text,
                      mb: { xs: 2, md: 0, lg: 2 },
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                    }}
                  >
                    {title}
                  </Typography>
                </Reveal>
              </Box>

              <Box>
                <Reveal delay={160}>
                  <Typography variant="body1" sx={{ color: tokens.textMuted, maxWidth: 440 }}>
                    {description}
                  </Typography>
                </Reveal>
                <Box sx={{ mt: { xs: 3, md: 3.5, lg: 4.5 }, color: tokens.shamrock, opacity: 0.85 }}>
                  <OghamMark text={ogham} strokeLength={14} strokeWidth={2} delay={300} stagger={55} sx={{ height: 44, width: 'auto', maxWidth: '100%' }} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Service cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              gap: { xs: 2.5, md: 3 },
              alignContent: 'start',
            }}
          >
            {services.map((service, i) => {
              const wide = odd && i === services.length - 1;
              return (
                <Reveal
                  key={service.key}
                  delay={(i % 2) * 90 + Math.floor(i / 2) * 60}
                  sx={{ gridColumn: wide ? { sm: '1 / -1' } : undefined, minWidth: 0 }}
                >
                  <ServiceCard
                    index={`${pad(number)}.${i + 1}`}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    wide={wide}
                  />
                </Reveal>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceCategory;
