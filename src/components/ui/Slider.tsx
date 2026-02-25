import type { ChangeEventHandler } from 'react';

interface SliderProps {
  id: string;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  value: number;
  step: number | undefined;
  ticks: string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Slider = ({
  id,
  label,
  valueLabel,
  min,
  max,
  value,
  step = 1,
  ticks,
  onChange,
}: SliderProps) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-item">
      <div className="slider-label-row">
        <span className="slider-label">{label}</span>
        <span className="slider-value-display" id={`${id}-value`}>
          {valueLabel}
        </span>
      </div>
      <div className="slider-track">
        <div className="slider-fill" style={{ width: `${percent}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
        id={id}
      />
      <div className="slider-ticks">
        {ticks.map((tick) => (
          <span key={tick} className="slider-tick">
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
};

