import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

import type { GoalOption } from '../../../../lib/types';
import { Badge } from '../../../ui/Badge';
import { Card } from '../../../ui/Card';

interface GoalOptionCardProps {
  option: GoalOption;
  selected: boolean;
  onSelect: (id: string) => void;
}

const resolveCardIcon = (icon: ReactNode): ReactNode => {
  if (typeof icon !== 'string') {
    return icon ?? '\u2728';
  }

  const value = icon.trim();
  if (!value) {
    return '\u2728';
  }

  const isPlaceholder =
    value === '.' || value === '\u2022' || value === '-' || value === '_' || /^[A-Za-z]{1,3}$/.test(value);

  if (isPlaceholder) {
    return '\u2728';
  }

  // Defensive fallback for common mojibake sequences (broken emoji encoding).
  if (/[ÃÂâðï]/.test(value)) {
    return '\u2728';
  }

  return value;
};

export const GoalOptionCard = ({ option, selected, onSelect }: GoalOptionCardProps) => {
  const accentClass = option.accent ? `goal-card-accent-${option.accent}` : '';
  const cardIcon = resolveCardIcon(option.icon);

  return (
    <Card
      variant="goal"
      className={[selected ? 'selected' : '', accentClass].filter(Boolean).join(' ')}
      onClick={() => onSelect(option.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(option.id);
        }
      }}
    >
      <div className={selected ? 'goal-card-check goal-card-check-selected' : 'goal-card-check'} aria-hidden>
        {selected ? <Check size={11} strokeWidth={3} /> : null}
      </div>
      <span className="goal-card-icon" aria-hidden>
        {cardIcon}
      </span>
      <div className="goal-card-title">{option.title}</div>
      <div className="goal-card-desc">{option.description}</div>
      {option.badge ? <Badge tone={option.badge.tone}>{option.badge.label}</Badge> : null}
    </Card>
  );
};
