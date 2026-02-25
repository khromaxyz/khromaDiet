import type { ChangeEventHandler } from 'react';

interface NumberFieldProps {
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  optionalLabel?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const NumberField = ({
  label,
  value,
  unit,
  min,
  max,
  step,
  optionalLabel,
  onChange,
}: NumberFieldProps) => {
  return (
    <div className="number-input-group">
      <label className="number-input-label">
        {label}
        {optionalLabel ? <span className="optional-badge">{optionalLabel}</span> : null}
      </label>
      <div className="number-input-wrapper">
        <input
          type="number"
          className="number-input-field"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
        />
        <span className="number-input-unit">{unit}</span>
      </div>
    </div>
  );
};

