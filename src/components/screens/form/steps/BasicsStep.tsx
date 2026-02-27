import { Clock3, Ruler, Scale } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ethnicityOptions } from '../../../../lib/constants/mockForm';
import type { Ethnicity, FormStepComponentProps } from '../../../../lib/types';
import { HeightDualInput } from '../../../ui/HeightDualInput';
import { NumberField } from '../../../ui/NumberField';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

const ethnicityIconMap: Record<Ethnicity, string> = {
  western: '\u{1F30D}',
  asian: '\u{1F30F}',
  african: '\u{1F30D}',
  latin: '\u{1F30E}',
  unspecified: '\u{1F310}',
};

const KG_TO_LBS = 2.2046226218;

const toLbs = (kg: number): number => Number((kg * KG_TO_LBS).toFixed(1));
const toKg = (lbs: number): number => Number((lbs / KG_TO_LBS).toFixed(1));

const getBmiCategory = (bmi: number): string => {
  if (bmi < 18.5) {
    return 'Baixo peso';
  }
  if (bmi < 25) {
    return 'Eutrófico';
  }
  if (bmi < 30) {
    return 'Sobrepeso';
  }
  if (bmi < 35) {
    return 'Obesidade I';
  }
  return 'Obesidade';
};

export const BasicsStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps, issues }: FormStepComponentProps) => {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'imperial'>('cm');

  const ageIssue = issues.find((issue) => issue.field === 'age');
  const weightOutOfRange = data.weightKg < 30 || data.weightKg > 300;
  const selectedEthnicity = data.ethnicity ?? 'unspecified';

  const bmiText = useMemo(() => {
    if (!data.heightCm || data.heightCm <= 0) {
      return 'IMC estimado indisponível';
    }
    const heightM = data.heightCm / 100;
    const bmi = data.weightKg / (heightM * heightM);
    return `IMC estimado: ${bmi.toFixed(1)} · ${getBmiCategory(bmi)}`;
  }, [data.heightCm, data.weightKg]);

  const weightDisplayValue = useMemo(() => {
    return weightUnit === 'kg' ? data.weightKg : toLbs(data.weightKg);
  }, [data.weightKg, weightUnit]);

  const weightMin = weightUnit === 'kg' ? 30 : toLbs(30);
  const weightMax = weightUnit === 'kg' ? 300 : toLbs(300);
  const weightContextProps = weightOutOfRange
    ? { warningText: 'Valor fora da faixa fisiológica (30–300 kg).' }
    : { contextText: bmiText };

  return (
    <div className="question-sub-panel active" id="qpanel-basics">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Dados básicos
      </div>
      <h2 className="question-title">Seus dados corporais</h2>
      <p className="question-description">Idade, peso e altura alimentam BMR e TDEE base.</p>

      <div className="number-inputs-grid number-inputs-grid-3">
        <NumberField
          id="age-input"
          label="IDADE"
          labelIcon={<Clock3 size={16} />}
          value={data.age}
          min={10}
          max={90}
          step={1}
          unit="anos"
          showUnitBadge={false}
          contextText="Afeta o multiplicador de atividade metabólica"
          keyboardStep={{ base: 1, fast: 10 }}
          showStepper
          staggerIndex={0}
          onValueChange={(nextValue) => {
            if (nextValue !== null) {
              onPatch({ age: Math.round(nextValue) });
            }
          }}
        />

        <NumberField
          id="weight-input"
          label="PESO"
          labelIcon={<Scale size={16} />}
          value={weightDisplayValue}
          min={weightMin}
          max={weightMax}
          step={0.1}
          unit={weightUnit === 'kg' ? 'kg' : 'lbs'}
          unitBadge={{
            label: weightUnit === 'kg' ? 'kg' : 'lbs',
            active: true,
            onClick: () => setWeightUnit((current) => (current === 'kg' ? 'lbs' : 'kg')),
            ariaLabel: 'Alternar unidade de peso',
          }}
          {...weightContextProps}
          keyboardStep={{ base: 1, fast: 10 }}
          showStepper
          staggerIndex={1}
          onValueChange={(nextValue) => {
            if (nextValue !== null) {
              const nextKg = weightUnit === 'kg' ? nextValue : toKg(nextValue);
              onPatch({ weightKg: Number(nextKg.toFixed(1)) });
            }
          }}
        />

        {heightUnit === 'cm' ? (
          <NumberField
            id="height-input"
            label="ALTURA"
            labelIcon={<Ruler size={16} />}
            value={data.heightCm}
            min={130}
            max={230}
            step={1}
            unit="cm"
            unitBadge={{
              label: 'cm',
              active: true,
              onClick: () => setHeightUnit('imperial'),
              ariaLabel: 'Alternar unidade de altura para pés e polegadas',
            }}
            keyboardStep={{ base: 1, fast: 10 }}
            showStepper
            staggerIndex={2}
            onValueChange={(nextValue) => {
              if (nextValue !== null) {
                onPatch({ heightCm: Math.round(nextValue) });
              }
            }}
          />
        ) : (
          <HeightDualInput
            id="height-imperial-input"
            label="ALTURA"
            valueCm={data.heightCm}
            minCm={130}
            maxCm={230}
            labelIcon={<Ruler size={16} />}
            unitBadge={{
              label: 'ft·in',
              active: true,
              onClick: () => setHeightUnit('cm'),
              ariaLabel: 'Alternar unidade de altura para centímetros',
            }}
            keyboardStep={{ base: 1, fast: 10 }}
            staggerIndex={2}
            onValueChange={(nextValueCm) => {
              onPatch({ heightCm: Math.round(nextValueCm) });
            }}
          />
        )}
      </div>

      <p className="question-description">ORIGEM ÉTNICA (para calibração da fórmula)</p>
      <div className="goal-cards-grid goal-cards-grid-3">
        {ethnicityOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: ethnicityIconMap[option.id] ?? option.icon,
              title: option.title,
              description: 'Opcional',
            }}
            selected={selectedEthnicity === option.id}
            onSelect={(id) => onPatch({ ethnicity: id as Ethnicity })}
          />
        ))}
      </div>

      {ageIssue ? (
        <div className="target-info-card">
          <div className="target-info-row">
            <span className="target-info-icon">!</span>
            <p className="target-info-text">{ageIssue.message}</p>
          </div>
        </div>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
