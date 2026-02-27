import { HORMONE_ICONS } from '../../../../lib/constants/icons';
import { HORMONE_LABELS } from '../../../../lib/constants/labels';
import { hormoneOptions } from '../../../../lib/constants/mockForm';
import type { CyclePhase, FormStepComponentProps, HormoneCompound, HormoneSelection } from '../../../../lib/types';
import { NumberField } from '../../../ui/NumberField';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

const phaseOptions: Array<{ id: CyclePhase; title: string }> = [
  { id: 'start', title: 'Início' },
  { id: 'middle', title: 'Meio' },
  { id: 'end', title: 'Fim' },
  { id: 'pct', title: 'PCT' },
];

const updateDose = (
  hormones: HormoneSelection[],
  compound: HormoneCompound,
  dose: number,
): HormoneSelection[] => {
  return hormones.map((hormone) =>
    hormone.compound === compound ? { ...hormone, dose } : hormone,
  );
};

const toggleCompound = (
  hormones: HormoneSelection[],
  compound: HormoneCompound,
  defaultDose: number,
): HormoneSelection[] => {
  const exists = hormones.some((hormone) => hormone.compound === compound);
  if (exists) {
    return hormones.filter((hormone) => hormone.compound !== compound);
  }

  return [...hormones, { compound, dose: defaultDose }];
};

export const HormonesStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-hormones">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Hormônios
      </div>
      <h2 className="question-title">
        Uso de hormônios <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">Esse bloco aplica modificadores metabólicos multiplicativos no TDEE.</p>

      <div className="goal-cards-grid goal-cards-grid-2">
        <GoalOptionCard
          option={{ id: 'yes', icon: '🟢', title: 'Sim', description: 'Usa compostos atualmente' }}
          selected={data.hormonesEnabled}
          onSelect={() => onPatch({ hormonesEnabled: true })}
        />
        <GoalOptionCard
          option={{ id: 'no', icon: '⚪', title: 'Não', description: 'Sem uso atual' }}
          selected={!data.hormonesEnabled}
          onSelect={() => onPatch({ hormonesEnabled: false, hormones: [] })}
        />
      </div>

      {data.hormonesEnabled ? (
        <>
          <div className="goal-cards-grid goal-cards-grid-3">
            {hormoneOptions.map((option) => (
              <GoalOptionCard
                key={option.id}
                option={{
                  id: option.id,
                  icon: HORMONE_ICONS[option.id],
                  title: option.title,
                  description: 'Toque para selecionar',
                }}
                selected={data.hormones.some((hormone) => hormone.compound === option.id)}
                onSelect={() =>
                  onPatch({
                    hormones: toggleCompound(data.hormones, option.id, option.defaultDose),
                  })
                }
              />
            ))}
          </div>

          {data.hormones.length > 0 ? (
            <div className={data.hormones.length > 1 ? 'number-inputs-grid hormones-dose-grid' : 'number-inputs-grid'}>
              {data.hormones.map((hormone) => (
                <NumberField
                  key={hormone.compound}
                  id={`hormone-dose-${hormone.compound}`}
                  label={`DOSE ${HORMONE_LABELS[hormone.compound]}`}
                  value={hormone.dose}
                  min={1}
                  max={2000}
                  step={1}
                  unit={hormone.compound === 'gh' ? 'UI/sem' : 'mg/sem'}
                  unitBadge={{ label: hormone.compound === 'gh' ? 'UI/sem' : 'mg/sem', active: true }}
                  contextText="Ajuste fino por composto"
                  showStepper
                  keyboardStep={{ base: 1, fast: 10 }}
                  onValueChange={(nextValue) => {
                    if (nextValue !== null) {
                      onPatch({
                        hormones: updateDose(data.hormones, hormone.compound, Math.max(1, Math.round(nextValue))),
                      });
                    }
                  }}
                />
              ))}
            </div>
          ) : null}

          <div className="goal-cards-grid goal-cards-grid-4">
            {phaseOptions.map((phase) => (
              <GoalOptionCard
                key={phase.id}
                option={{ id: phase.id, icon: '🗓️', title: phase.title, description: 'Fase do ciclo' }}
                selected={data.cyclePhase === phase.id}
                onSelect={(id) => onPatch({ cyclePhase: id as CyclePhase })}
              />
            ))}
          </div>
        </>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
