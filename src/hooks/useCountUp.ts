import { useEffect, useMemo, useState } from 'react';

export const useCountUp = (target: number, active: boolean, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const startedAt = performance.now();
    let raf = 0;

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      const eased = 1 - (1 - progress) ** 4;
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [active, duration, target]);

  return useMemo(() => value, [value]);
};

