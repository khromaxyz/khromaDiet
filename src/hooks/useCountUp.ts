import { useEffect, useMemo, useRef, useState } from 'react';

export const useCountUp = (target: number, active: boolean, duration = 1200) => {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);
  const rafRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      hasAnimatedRef.current = false;
      valueRef.current = 0;
      setValue(0);
      return;
    }

    cancelAnimationFrame(rafRef.current);

    const startValue = hasAnimatedRef.current ? valueRef.current : 0;
    const endValue = Math.round(target);

    if (startValue === endValue) {
      hasAnimatedRef.current = true;
      valueRef.current = endValue;
      setValue(endValue);
      return;
    }

    const startedAt = performance.now();
    hasAnimatedRef.current = true;

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      const eased = 1 - (1 - progress) ** 4;
      const nextValue = Math.round(startValue + (endValue - startValue) * eased);

      valueRef.current = nextValue;
      setValue(nextValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, duration, target]);

  return useMemo(() => value, [value]);
};
