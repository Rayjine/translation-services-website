import { Box } from '@mui/material';
import { useInView } from '../../hooks/useInView';

/**
 * Fades/slides its children in the first time they scroll into view.
 * variant: 'up' (default) | 'fade' | 'scale' | 'start' | 'end' (start/end follow text direction).
 * delay: ms, handy for staggering siblings (e.g. delay={index * 80}).
 * Motion is disabled by CSS when the user prefers reduced motion.
 */
const Reveal = ({ children, variant = 'up', delay = 0, component = 'div', className = '', sx, ...rest }) => {
  // threshold 0 + a bottom margin: tall blocks (e.g. the quote form at 400% zoom) can
  // never reach a ratio-based threshold, so reveal as soon as the top edge is well in view.
  const [ref, inView] = useInView({ threshold: 0, rootMargin: '0px 0px -12% 0px' });
  return (
    <Box
      ref={ref}
      component={component}
      className={`reveal${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      data-variant={variant}
      style={{ '--reveal-delay': `${delay}ms` }}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;
