import { useEffect, useRef, useState } from 'react';

const ease = 0.12;

export const useCursorFx = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number>();
  const positionRef = useRef({ mouseX: -100, mouseY: -100, ringX: -100, ringY: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    setEnabled(media.matches);

    const onMedia = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener('change', onMedia);

    return () => {
      media.removeEventListener('change', onMedia);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return;
    }

    const animate = () => {
      const pos = positionRef.current;
      pos.ringX += (pos.mouseX - pos.ringX) * ease;
      pos.ringY += (pos.mouseY - pos.ringY) * ease;
      ring.style.left = `${pos.ringX}px`;
      ring.style.top = `${pos.ringY}px`;
      frameRef.current = requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      const pos = positionRef.current;
      pos.mouseX = event.clientX;
      pos.mouseY = event.clientY;
      dot.style.left = `${pos.mouseX}px`;
      dot.style.top = `${pos.mouseY}px`;
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onDown = () => {
      dot.style.width = '12px';
      dot.style.height = '12px';
    };

    const onUp = () => {
      dot.style.width = '8px';
      dot.style.height = '8px';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = undefined;
    };
  }, [enabled]);

  return {
    enabled,
    dotRef,
    ringRef,
  };
};

