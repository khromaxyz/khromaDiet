import { StatBlock } from '@/components/design-system';
import { Slider } from '@/components/ui/primitives/slider';

interface FormSliderFieldProps {
  id: string;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  ticks: string[];
  onValueChange: (value: number) => void;
}

export const FormSliderField = ({
  id,
  label,
  valueLabel,
  min,
  max,
  value,
  step = 1,
  ticks,
  onValueChange,
}: FormSliderFieldProps) => {
  const range = max - min;
  const percent = range > 0 ? ((value - min) / range) * 100 : 0;
  const activeTickIndex = ticks.length > 1 ? Math.round((percent / 100) * (ticks.length - 1)) : 0;

  return (
    <div className="form-slider-field" aria-labelledby={`${id}-label`}>
      <div className="form-slider-header">
        <div>
          <div id={`${id}-label`} className="form-slider-label">
            {label}
          </div>
          <p className="form-slider-caption">Ajuste fino com feedback imediato do motor.</p>
        </div>

        <StatBlock
          value={valueLabel}
          label="Selecionado"
          size="sm"
          color="emerald"
          className="form-slider-stat min-w-[160px] px-[var(--space-4)] py-[var(--space-3)]"
        />
      </div>

      <div className="form-slider-control">
        <Slider
          id={id}
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(nextValue) => {
            const next = nextValue[0];
            if (typeof next === 'number') {
              onValueChange(next);
            }
          }}
          aria-labelledby={`${id}-label`}
        />
      </div>

      <div className="form-slider-ticks" aria-hidden="true">
        {ticks.map((tick, index) => (
          <span key={`${id}-${tick}`} className={index === activeTickIndex ? 'form-slider-tick is-active' : 'form-slider-tick'}>
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
};
