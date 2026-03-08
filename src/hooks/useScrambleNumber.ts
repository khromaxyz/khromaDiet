import { useEffect, useMemo, useState } from 'react';

const randomDigit = (): string => String(Math.floor(Math.random() * 10));

const scrambleText = (targetText: string): string => {
  return targetText
    .split('')
    .map((char) => {
      if (/[0-9]/.test(char)) {
        return randomDigit();
      }
      return char;
    })
    .join('');
};

interface UseScrambleNumberInput {
  value: number;
  active: boolean;
  prefix?: string;
  durationMs?: number;
  delayMs?: number;
}

export const useScrambleNumber = ({
  value,
  active,
  prefix = '',
  durationMs = 800,
  delayMs = 0,
}: UseScrambleNumberInput): string => {
  const targetText = useMemo(() => `${prefix}${value.toLocaleString('pt-BR')}`, [prefix, value]);
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    if (!active) {
      setDisplayText(targetText);
      return;
    }

    let interval: number | null = null;
    const timeout = window.setTimeout(() => {
      const start = Date.now();
      interval = window.setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed >= durationMs) {
          if (interval !== null) {
            window.clearInterval(interval);
          }
          setDisplayText(targetText);
          return;
        }

        setDisplayText(scrambleText(targetText));
      }, 50);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== null) {
        window.clearInterval(interval);
      }
      setDisplayText(targetText);
    };
  }, [active, delayMs, durationMs, targetText]);

  return displayText;
};