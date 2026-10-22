import { useEffect, useState } from 'react';
import { useInView, prefersReducedMotion } from '../../hooks/useInView';

/** Counts from 0 to `end` once visible. Formats with the active locale. */
const CountUp = ({ end, duration = 1600, prefix = '', suffix = '', locale }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setValue(end);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(end * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString(locale)}
      {suffix}
    </span>
  );
};

export default CountUp;
