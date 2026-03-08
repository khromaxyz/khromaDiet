import { Pencil } from 'lucide-react';
import type { CSSProperties, ChangeEventHandler, ReactNode } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

type UnitBadgeConfig = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

interface NumberFieldProps {
  id?: string;
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  optionalLabel?: string;
  icon?: string;
  labelIcon?: ReactNode;
  hint?: string;
  status?: 'default' | 'warning' | 'success';
  unitBadge?: UnitBadgeConfig;
  showUnitBadge?: boolean;
  valueFormatter?: (value: number) => string;
  contextText?: string;
  warningText?: string;
  showEditIndicator?: boolean;
  showStepper?: boolean;
  keyboardStep?: { base: number; fast: number };
  enterBehavior?: 'next-field' | 'default';
  staggerIndex?: number;
  benchmarkSlot?: ReactNode;
  classificationSlot?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: number | null, rawValue: string) => void;
}

const toDisplay = (value: number): string => {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return String(value);
};

const clamp = (value: number, min?: number, max?: number): number => {
  if (typeof min === 'number' && value < min) {
    return min;
  }
  if (typeof max === 'number' && value > max) {
    return max;
  }
  return value;
};

const getStepPrecision = (step?: number): number => {
  if (!step || Number.isInteger(step)) {
    return 0;
  }
  const stepAsText = String(step);
  const dotIndex = stepAsText.indexOf('.');
  return dotIndex >= 0 ? stepAsText.length - dotIndex - 1 : 0;
};

const roundToStep = (value: number, step?: number): number => {
  if (!step || step <= 0) {
    return value;
  }
  const precision = getStepPrecision(step);
  const rounded = Math.round(value / step) * step;
  return Number(rounded.toFixed(precision));
};

const parseRawToNumber = (rawValue: string): number | null => {
  if (rawValue.trim() === '') {
    return null;
  }
  const normalized = rawValue.replace(',', '.');
  const parsed = Number(normalized);
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

export const NumberField = ({
  id,
  label,
  value,
  unit,
  min,
  max,
  step,
  optionalLabel,
  icon,
  labelIcon,
  hint,
  status = 'default',
  unitBadge,
  showUnitBadge = true,
  valueFormatter,
  contextText,
  warningText,
  showEditIndicator = true,
  showStepper = true,
  keyboardStep = { base: 1, fast: 10 },
  enterBehavior = 'next-field',
  staggerIndex = 0,
  benchmarkSlot,
  classificationSlot,
  onChange,
  onValueChange,
}: NumberFieldProps) => {
  const generatedId = useId();
  const inputId = useMemo(() => id ?? `number-field-${generatedId}`, [generatedId, id]);

  const [rawValue, setRawValue] = useState(() => toDisplay(value));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isEditingRef = useRef(false);
  const holdTimeoutRef = useRef<number | null>(null);
  const savePulseTimeoutRef = useRef<number | null>(null);
  const shakeTimeoutRef = useRef<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isSavedPulseVisible, setIsSavedPulseVisible] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!isEditingRef.current) {
      setRawValue(toDisplay(value));
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current !== null) {
        window.clearTimeout(holdTimeoutRef.current);
      }
      if (savePulseTimeoutRef.current !== null) {
        window.clearTimeout(savePulseTimeoutRef.current);
      }
      if (shakeTimeoutRef.current !== null) {
        window.clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, []);

  const emitParsedValue = (nextRaw: string) => {
    const parsed = parseRawToNumber(nextRaw);
    if (parsed === null) {
      onValueChange?.(null, nextRaw);
      return;
    }
    onValueChange?.(parsed, nextRaw);
  };

  const triggerShake = () => {
    setIsShaking(true);
    if (shakeTimeoutRef.current !== null) {
      window.clearTimeout(shakeTimeoutRef.current);
    }
    shakeTimeoutRef.current = window.setTimeout(() => setIsShaking(false), 200);
  };

  const emitSteppedValue = (nextValue: number) => {
    const clamped = clamp(roundToStep(nextValue, step), min, max);
    const display = toDisplay(clamped);
    setRawValue(display);
    onValueChange?.(clamped, display);
  };

  const applyDelta = (direction: -1 | 1, stepAmount: number) => {
    const baseValue = parseRawToNumber(rawValue) ?? value;
    const target = baseValue + direction * stepAmount;
    const clamped = clamp(target, min, max);

    if (clamped !== target) {
      triggerShake();
      return;
    }

    emitSteppedValue(clamped);
  };

  const stopStepperHold = () => {
    if (holdTimeoutRef.current !== null) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const startStepperHold = (direction: -1 | 1) => {
    if (!showStepper) {
      return;
    }

    stopStepperHold();
    applyDelta(direction, keyboardStep.base);

    let tickDelay = 220;
    const scheduleNextTick = () => {
      holdTimeoutRef.current = window.setTimeout(() => {
        applyDelta(direction, keyboardStep.base);
        tickDelay = Math.max(70, tickDelay - 25);
        scheduleNextTick();
      }, tickDelay);
    };

    holdTimeoutRef.current = window.setTimeout(scheduleNextTick, 260);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextRaw = event.target.value;
    setRawValue(nextRaw);
    emitParsedValue(nextRaw);
    onChange?.(event);
  };

  const containerClassName = [
    'number-input-group',
    'number-input-group-enter',
    status === 'warning' ? 'number-input-group-warning' : '',
    status === 'success' ? 'number-input-group-success' : '',
    isFocused ? 'number-input-group-focused' : '',
    isSavedPulseVisible ? 'number-input-group-saved' : '',
    isShaking ? 'number-input-group-shake' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const hasWarning = Boolean(warningText) || status === 'warning';
  const footerText = warningText ?? contextText ?? hint;
  const footerClassName = [
    'number-input-context',
    hasWarning ? 'number-input-context-warning' : '',
    !hasWarning && contextText ? 'number-input-context-focus-only' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const staggerStyle = {
    '--input-stagger': `${staggerIndex * 80}ms`,
  } as CSSProperties;

  const hasFormattedValue = typeof valueFormatter === 'function';
  const parsedRawValue = parseRawToNumber(rawValue);
  const formattedDisplayValue = hasFormattedValue
    ? parsedRawValue === null
      ? rawValue.trim() === ''
        ? ''
        : rawValue
      : valueFormatter(parsedRawValue)
    : null;
  const showFormattedOverlay = hasFormattedValue && !isFocused;
  const mainClassName = showStepper ? 'number-input-main number-input-main-with-stepper' : 'number-input-main';
  const inputClassName = [
    'number-input-field',
    showFormattedOverlay ? 'number-input-field-formatted' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClassName}
      onClick={() => inputRef.current?.focus()}
      role="group"
      aria-label={label}
      data-status={status}
      style={staggerStyle}
    >
      <div className="number-input-top">
        <label className="number-input-label" htmlFor={inputId}>
          <span className="number-input-label-dot" aria-hidden />
          {labelIcon ? (
            <span className="number-input-label-icon">{labelIcon}</span>
          ) : icon ? (
            <span className="number-input-label-icon">{icon}</span>
          ) : null}
          <span className="number-input-label-text">{label}</span>
          {optionalLabel ? <span className="optional-badge">{optionalLabel}</span> : null}
        </label>

        {showUnitBadge
          ? unitBadge ? (
              <button
                type="button"
                className={unitBadge.active ? 'number-input-unit-badge number-input-unit-badge-active' : 'number-input-unit-badge'}
                onClick={(event) => {
                  event.stopPropagation();
                  unitBadge.onClick?.();
                }}
                aria-label={unitBadge.ariaLabel ?? `Alterar unidade de ${label}`}
              >
                {unitBadge.label}
              </button>
            ) : (
              <span className="number-input-unit-badge number-input-unit-badge-static">{unit}</span>
            )
          : null}
      </div>

      <div className={mainClassName}>
        {showStepper ? (
          <div className="number-input-stepper number-input-stepper-left">
            <button
              type="button"
              className="number-input-stepper-btn"
              onMouseDown={(event) => {
                event.preventDefault();
                startStepperHold(-1);
              }}
              onMouseUp={stopStepperHold}
              onMouseLeave={stopStepperHold}
              onTouchStart={(event) => {
                event.preventDefault();
                startStepperHold(-1);
              }}
              onTouchEnd={stopStepperHold}
              aria-label={`Reduzir ${label}`}
            >
              -
            </button>
          </div>
        ) : null}

        <div className="number-input-wrapper">
          <div className="number-input-value-stack">
            {showFormattedOverlay ? <span className="number-input-value-display" aria-hidden>{formattedDisplayValue}</span> : null}
          <input
            ref={inputRef}
            id={inputId}
            type="number"
            className={inputClassName}
            value={rawValue}
            min={min}
            max={max}
            step={step}
            inputMode="decimal"
            data-input-focusable="true"
            onFocus={(event) => {
              isEditingRef.current = true;
              setIsFocused(true);
              event.currentTarget.select();
            }}
            onBlur={() => {
              isEditingRef.current = false;
              setIsFocused(false);

              const parsed = parseRawToNumber(rawValue);
              if (parsed === null) {
                setRawValue(toDisplay(value));
                return;
              }

              const withinMin = typeof min !== 'number' || parsed >= min;
              const withinMax = typeof max !== 'number' || parsed <= max;
              if (!withinMin || !withinMax) {
                triggerShake();
                return;
              }

              if (withinMin && withinMax) {
                setIsSavedPulseVisible(true);
                if (savePulseTimeoutRef.current !== null) {
                  window.clearTimeout(savePulseTimeoutRef.current);
                }
                savePulseTimeoutRef.current = window.setTimeout(() => setIsSavedPulseVisible(false), 800);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && enterBehavior === 'next-field' && inputRef.current) {
                event.preventDefault();
                focusNextField(inputRef.current);
                return;
              }

              if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
                const direction = event.key === 'ArrowUp' ? 1 : -1;
                const amount = event.shiftKey ? keyboardStep.fast : keyboardStep.base;
                applyDelta(direction, amount);
              }
            }}
            onChange={handleChange}
          />
          </div>
          <span className="number-input-unit">{unit}</span>
        </div>

        {showStepper ? (
          <div className="number-input-stepper number-input-stepper-right">
            <button
              type="button"
              className="number-input-stepper-btn"
              onMouseDown={(event) => {
                event.preventDefault();
                startStepperHold(1);
              }}
              onMouseUp={stopStepperHold}
              onMouseLeave={stopStepperHold}
              onTouchStart={(event) => {
                event.preventDefault();
                startStepperHold(1);
              }}
              onTouchEnd={stopStepperHold}
              aria-label={`Aumentar ${label}`}
            >
              +
            </button>
          </div>
        ) : null}
      </div>

      {showEditIndicator ? (
        <span className="number-input-edit-indicator" aria-hidden>
          <Pencil size={13} />
        </span>
      ) : null}

      <div className="number-input-footer">
        {footerText ? <p className={footerClassName}>{footerText}</p> : null}
        {classificationSlot ? <div className="number-input-classification">{classificationSlot}</div> : null}
        {benchmarkSlot ? <div className="number-input-benchmark">{benchmarkSlot}</div> : null}
      </div>
    </div>
  );
};
