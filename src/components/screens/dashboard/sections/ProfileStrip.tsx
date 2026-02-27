import { ACTIVITY_LEVEL_LABELS, GOAL_LABELS, SEX_LABELS } from '../../../../lib/constants/labels';
import { useDietForgeStore } from '../../../../store/useDietForgeStore';

export const ProfileStrip = () => {
  const formData = useDietForgeStore((state) => state.formData);
  const results = useDietForgeStore((state) => state.results);
  const stepsPerDay = formData.stepsPerDay ?? 0;
  const bodyFatValue = results?.bodyFatInfo.value;

  const goalLabel = GOAL_LABELS[formData.goal];
  const profileName = `Plano ${goalLabel}`;
  const profileMeta = [
    `${formData.weightKg}kg`,
    `${formData.heightCm}cm`,
    `${formData.age} anos`,
    SEX_LABELS[formData.sex],
    `BF ${bodyFatValue !== null && bodyFatValue !== undefined ? `${bodyFatValue.toFixed(1)}%` : 'N/A'}`,
    results?.bodyFatInfo.estimated ? 'estimado' : 'informado',
  ].join(' · ');

  const profileTags: Array<{
    id: string;
    label: string;
    tone: 'red' | 'orange' | 'cyan' | 'violet' | 'amber';
    title?: string;
  }> = [
    { id: 'freq', label: `${formData.trainingSessions}x semana`, tone: 'red' },
    {
      id: 'steps',
      label: `${stepsPerDay.toLocaleString('pt-BR')} passos`,
      tone: stepsPerDay <= 0 ? 'orange' : 'cyan',
    },
    { id: 'activity', label: ACTIVITY_LEVEL_LABELS[formData.activityLevel], tone: 'violet' },
    {
      id: 'precision',
      label: `${results?.precision.precisionPct ?? 0}% precisão`,
      tone: 'amber',
      title: 'Precisão estimada com base nos dados fornecidos. Adicione dados reais para melhorar.',
    },
  ];

  return (
    <div className="profile-strip">
      <div className="profile-avatar">DF</div>
      <div className="profile-info">
        <div className="profile-name">{profileName}</div>
        <div className="profile-meta">{profileMeta}</div>
      </div>
      <div className="profile-tags">
        {profileTags.map((tag) => (
          <span key={tag.id} className={`profile-tag badge-${tag.tone}`} title={tag.title}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};
