import { Pencil } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

type UnitBadgeConfig = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

interface HeightDualInputProps {
  id?: string;
  label: string;
  valueCm: number;
  minCm?: number;
  maxCm?: number;
  labelIcon?: ReactNode;
  unitBadge?: UnitBadgeConfig;
  contextText?: string;
  warningText?: string;
  showEditIndicator?: boolean;
  keyboardStep?: { base: number; fast: number };
  staggerIndex?: number;
  onValueChange: (valueCm: number) => void;
}

const clamp = (value: number, min?: number, max?: number): number => {
  if (typeof min === 'number' && value < min) {
    return min;
  }
  if (typeof max === 'number' && value > max) {
    return max;
  }
  return value;
};

const cmToImperial = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Number((totalInches - feet * 12).toFixed(1));
  return { feet, inches };
};

const normalizeFeetInches = (feet: number, inches: number): { feet: number; inches: number } => {
  const totalInches = Math.max(0, feet * 12 + inches);
  const normalizedFeet = Math.floor(totalInches / 12);
  const normalizedInches = Number((totalInches - normalizedFeet * 12).toFixed(1));
  return { feet: normalizedFeet, inches: normalizedInches };
};

const imperialToCm = (feet: number, inches: number): number => {
  const normalized = normalizeFeetInches(feet, inches);
  return Number(((normalized.feet * 12 + normalized.inches) * 2.54).toFixed(1));
};

const parseRaw = (raw: string): number | null => {
  if (raw.trim() === '') {
    return null;
  }
  const parsed = Number(raw.replace(',', '.'));
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
};

const focusNextField = (current: HTMLInputElement) => {
  const scope = current.closest('.question-sub-panel') ?? document;
  const fields = Array.from(scope.querySelectorAll<HTMLInputElement>('[data-input-focusable="true"]:not([disabled])'));
  const currentIndex = fields.indexOf(current);
  if (currentIndex >= 0 && currentIndex < fields.length - 1) {
    const next = fields[currentIndex + 1];
    next?.focus();
    next?.select();
  }
};

export const HeightDualInput = ({
  id,
  label,
  valueCm,
  minCm,
  maxCm,
  labelIcon,
  unitBadge,
  contextText,
  warningText,
  showEditIndicator = true,
  keyboardStep = { base: 1, fast: 10 },
  staggerIndex = 0,
  onValueChange,
}: HeightDualInputProps) => {
  const generatedId = useMemo(() => id ?? 'height-dual', [id]);
  const feetId = `${generatedId}-ft`;
  const inchesId = `${generatedId}-in`;

  const initial = cmToImperial(valueCm);
  const [feetRaw, setFeetRaw] = useState(String(initial.feet));
  const [inchesRaw, setInchesRaw] = useState(String(initial.inches));
  const [isFocused, setIsFocused] = useState(false);
  const [isSavedPulseVisible, setIsSavedPulseVisible] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const feetRef = useRef<HTMLInputElement | null>(null);
  const inchesRef = useRef<HTMLInputElement | null>(null);
  const editingRef = useRef(false);
  const shakeTimeoutRef = useRef<number | null>(null);
  const savePulseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (editingRef.current) {
      return;
    }
    const next = cmToImperial(valueCm);
    setFeetRaw(String(next.feet));
    setInchesRaw(String(next.inches));
  }, [valueCm]);

  useEffect(() => {
    return () => {
      if (shakeTimeoutRef.current !== null) {
        window.clearTimeout(shakeTimeoutRef.current);
      }
      if (savePulseTimeoutRef.current !== null) {
        window.clearTimeout(savePulseTimeoutRef.current);
      }
    };
  }, []);

  const triggerShake = () => {
    setIsShaking(true);
    if (shakeTimeoutRef.current !== null) {
      window.clearTimeout(shakeTimeoutRef.current);
    }
    shakeTimeoutRef.current = window.setTimeout(() => setIsShaking(false), 200);
  };

  const applyImperialPatch = (nextFeetRaw: string, nextInchesRaw: string) => {
    const parsedFeet = parseRaw(nextFeetRaw);
    const parsedInches = parseRaw(nextInchesRaw);

    if (parsedFeet === null || parsedInches === null) {
      return;
    }

    const normalized = normalizeFeetInches(parsedFeet, parsedInches);
    const convertedCm = imperialToCm(normalized.feet, normalized.inches);
    const clampedCm = clamp(convertedCm, minCm, maxCm);

    if (clampedCm !== convertedCm) {
      triggerShake();
    }

    const clampedImperial = cmToImperial(clampedCm);
    setFeetRaw(String(clampedImperial.feet));
    setInchesRaw(String(clampedImperial.inches));
    onValueChange(clampedCm);
  };

  const applyDelta = (target: 'feet' | 'inches', direction: -1 | 1, amount: number) => {
    const parsedFeet = parseRaw(feetRaw) ?? 0;
    const parsedInches = parseRaw(inchesRaw) ?? 0;

    const nextFeet = target === 'feet' ? parsedFeet + direction * amount : parsedFeet;
    const nextInches = target === 'inches' ? parsedInches + direction * amount : parsedInches;

    const normalized = normalizeFeetInches(nextFeet, nextInches);
    applyImperialPatch(String(normalized.feet), String(normalized.inches));
  };

  const containerClassName = [
    'number-input-group',
    'number-input-group-enter',
    isFocused ? 'number-input-group-focused' : '',
    isSavedPulseVisible ? 'number-input-group-saved' : '',
    isShaking ? 'number-input-group-shake' : '',
    warningText ? 'number-input-group-warning' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const staggerStyle = {
    '--input-stagger': `${staggerIndex * 80}ms`,
  } as CSSProperties;

  return (
    <div className={containerClassName} role="group" aria-label={label} style={staggerStyle}>
      <div className="number-input-top">
        <label className="number-input-label" htmlFor={feetId}>
          <span className="number-input-label-dot" aria-hidden />
          {labelIcon ? <span className="number-input-label-icon">{labelIcon}</span> : null}
          <span className="number-input-label-text">{label}</span>
        </label>

        {unitBadge ? (
          <button
            type="button"
            className={unitBadge.active ? 'number-input-unit-badge number-input-unit-badge-active' : 'number-input-unit-badge'}
            onClick={(event) => {
              event.stopPropagation();
              unitBadge.onClick?.();
            }}
            aria-label={unitBadge.ariaLabel ?? 'Alterar unidade de altura'}
          >
            {unitBadge.label}
          </button>
        ) : (
          <span className="number-input-unit-badge number-input-unit-badge-static">ft·in</span>
        )}
      </div>

      <div className="height-dual-main">
        <div className="height-dual-field">
          <span className="height-dual-unit">ft</span>
          <input
            ref={feetRef}
            id={feetId}
            type="number"
            className="height-dual-input"
            value={feetRaw}
            inputMode="decimal"
            data-input-focusable="true"
            onFocus={(event) => {
              editingRef.current = true;
              setIsFocused(true);
              event.currentTarget.select();
            }}
            onBlur={() => {
              editingRef.current = false;
              setIsFocused(false);
              setIsSavedPulseVisible(true);
              if (savePulseTimeoutRef.current !== null) {
                window.clearTimeout(savePulseTimeoutRef.current);
              }
              savePulseTimeoutRef.current = window.setTimeout(() => setIsSavedPulseVisible(false), 800);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && feetRef.current) {
                event.preventDefault();
                focusNextField(feetRef.current);
                return;
              }

              if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
                const direction = event.key === 'ArrowUp' ? 1 : -1;
                const amount = event.shiftKey ? keyboardStep.fast : keyboardStep.base;
                applyDelta('feet', direction, amount);
              }
            }}
            onChange={(event) => {
              const nextRaw = event.target.value;
              setFeetRaw(nextRaw);
              applyImperialPatch(nextRaw, inchesRaw);
            }}
          />
        </div>

        <div className="height-dual-field">
          <span className="height-dual-unit">in</span>
          <input
            ref={inchesRef}
            id={inchesId}
            type="number"
            className="height-dual-input"
            value={inchesRaw}
            inputMode="decimal"
            data-input-focusable="true"
            onFocus={(event) => {
              editingRef.current = true;
              setIsFocused(true);
              event.currentTarget.select();
            }}
            onBlur={() => {
              editingRef.current = false;
              setIsFocused(false);
              setIsSavedPulseVisible(true);
              if (savePulseTimeoutRef.current !== null) {
                window.clearTimeout(savePulseTimeoutRef.current);
              }
              savePulseTimeoutRef.current = window.setTimeout(() => setIsSavedPulseVisible(false), 800);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && inchesRef.current) {
                event.preventDefault();
                focusNextField(inchesRef.current);
                return;
              }

              if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
                const direction = event.key === 'ArrowUp' ? 1 : -1;
                const amount = event.shiftKey ? keyboardStep.fast : keyboardStep.base;
                applyDelta('inches', direction, amount);
              }
            }}
            onChange={(event) => {
              const nextRaw = event.target.value;
              setInchesRaw(nextRaw);
              applyImperialPatch(feetRaw, nextRaw);
            }}
          />
        </div>
      </div>

      {showEditIndicator ? (
        <span className="number-input-edit-indicator" aria-hidden>
          <Pencil size={13} />
        </span>
      ) : null}

      <div className="number-input-footer">
        {warningText ? (
          <p className="number-input-context number-input-context-warning">{warningText}</p>
        ) : contextText ? (
          <p className="number-input-context number-input-context-focus-only">{contextText}</p>
        ) : null}
      </div>
    </div>
  );
};
