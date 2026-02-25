import { Check } from 'lucide-react';

import type { GoalOption } from '../../../../lib/types';
import { Badge } from '../../../ui/Badge';
import { Card } from '../../../ui/Card';

interface GoalOptionCardProps {
  option: GoalOption;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const GoalOptionCard = ({ option, selected, onSelect }: GoalOptionCardProps) => {
  return (
    <Card
      variant="goal"
      className={selected ? 'selected' : undefined}
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
      <div className="goal-card-check">
        <Check size={10} strokeWidth={3} />
      </div>
      <span className="goal-card-icon" aria-hidden>
        {option.icon}
      </span>
      <div className="goal-card-title">{option.title}</div>
      <div className="goal-card-desc">{option.description}</div>
      {option.badge ? <Badge tone={option.badge.tone}>{option.badge.label}</Badge> : null}
    </Card>
  );
};

