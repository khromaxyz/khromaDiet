import { AlertTriangle, ArrowLeft, ArrowRight, Bolt, CheckCircle2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { Button } from '@/components/ui/primitives/button';
import { Input } from '@/components/ui/primitives/input';
import { GOAL_LABELS } from '@/lib/constants/labels';
import { PROFILE_MAX_COUNT } from '@/lib/profiles/constants';
import { buildProfileSummary } from '@/lib/profiles/summary';
import type { UserProfile } from '@/lib/profiles/types';
import type { CalculationResults } from '@/lib/types/engine';
import type { FormData } from '@/lib/types/form';

import { ProfileAvatar } from './ProfileAvatar';
import { ProfileAvatarGrid } from './ProfileAvatarGrid';

interface ProfileCreationScreenProps {
  formData: FormData;
  results: CalculationResults | null;
  existingProfiles: UserProfile[];
  onSave: (payload: { name: string; avatarId: number; replaceOldest: boolean }) => void;
  onBack: () => void;
}

const getDefaultProfileName = (formData: FormData, existingCount: number): string => {
  const goalLabel = GOAL_LABELS[formData.goal] ?? 'Plano';
  const sequence = Math.max(1, Math.min(PROFILE_MAX_COUNT, existingCount + 1));
  return `${goalLabel} \u00b7 Plano ${sequence}`;
};

export const ProfileCreationScreen = ({
  formData,
  results,
  existingProfiles,
  onSave,
  onBack,
}: ProfileCreationScreenProps) => {
  const defaultName = useMemo(() => getDefaultProfileName(formData, existingProfiles.length), [existingProfiles.length, formData]);
  const [avatarId, setAvatarId] = useState(0);
  const [profileName, setProfileName] = useState(defaultName);
  const [replaceOldest, setReplaceOldest] = useState(false);

  const summary = results ? buildProfileSummary(formData, results) : null;
  const isAtLimit = existingProfiles.length >= PROFILE_MAX_COUNT;
  const displayName = profileName.trim().slice(0, 24) || defaultName;

  const handleSave = () => {
    if (isAtLimit && !replaceOldest) {
      setReplaceOldest(true);
      return;
    }

    onSave({
      name: displayName,
      avatarId,
      replaceOldest: isAtLimit,
    });
  };

  return (
    <SectionShell id="screen-profile-create" level="abyss" className="screen active min-h-screen py-[var(--space-24)]">
      <div className="profile-create-shell">
        <SectionHeader
          eyebrow={'Quase l\u00e1'}
          title={'Seu plano est\u00e1 pronto.'}
          subtitle={'D\u00ea um nome ao perfil, escolha um avatar e continue para o resumo completo.'}
          className="profile-create-header"
        />

        <div className="profile-create-layout">
          <DataCard glow="emerald" className="profile-create-main">
            <div className="profile-create-kicker">
              <span className="profile-create-kicker-dot" aria-hidden />
              Personalize seu perfil
            </div>

            <ProfileAvatarGrid
              selectedId={avatarId}
              onSelect={setAvatarId}
              className="df-avatar-grid-create"
              ariaLabel="Escolha o avatar do perfil"
            />

            <div className="profile-create-field">
              <div className="profile-create-field-top">
                <label htmlFor="profile-name-input" className="profile-create-label">
                  Nome do perfil
                </label>
                <span className="profile-create-counter">{profileName.length}/24</span>
              </div>

              <Input
                id="profile-name-input"
                value={profileName}
                maxLength={24}
                placeholder="Como quer ser chamado?"
                className="profile-create-input"
                onChange={(event) => setProfileName(event.target.value)}
              />
            </div>

            {isAtLimit ? (
              <DataCard className="profile-limit-warning">
                <div className="profile-limit-warning-row" role="alert">
                  <AlertTriangle size={14} />
                  <span>{'Voc\u00ea j\u00e1 possui 5 perfis. Salvar agora substitui o perfil mais antigo.'}</span>
                  {replaceOldest ? <CheckCircle2 size={14} className="profile-limit-confirm" /> : null}
                </div>
              </DataCard>
            ) : null}

            <div className="profile-create-actions">
              <Button variant="ghost" className="profile-create-action profile-create-action-back" onClick={onBack}>
                <ArrowLeft size={14} />
                {'Voltar ao formul\u00e1rio'}
              </Button>

              <Button variant="default" className="profile-create-action profile-create-action-save" onClick={handleSave}>
                <Bolt size={14} />
                {isAtLimit && replaceOldest ? 'Substituir mais antigo e continuar' : 'Salvar e ver meu plano'}
                <ArrowRight size={14} />
              </Button>
            </div>
          </DataCard>

          <DataCard className="profile-preview-card" hoverable glow="emerald" aria-live="polite">
            <div className="profile-preview-head">
              <ProfileAvatar avatarId={avatarId} size={64} className="profile-preview-avatar" />
              <div className="profile-preview-copy">
                <div className="profile-preview-name">{displayName}</div>
                <div className="profile-preview-meta">
                  {GOAL_LABELS[formData.goal]} {'\u00b7'} {formData.weightKg}kg {'\u00b7'} {formData.heightCm}cm
                </div>
              </div>
            </div>

            {summary ? (
              <>
                <div className="profile-preview-stats">
                  <StatBlock value={summary.targetKcal.toLocaleString('pt-BR')} unit="kcal" label="Meta" size="sm" color="emerald" />
                  <StatBlock value={summary.precisionPct} unit="%" label={'Precis\u00e3o'} size="sm" color="default" />
                  <StatBlock value={summary.estimatedWeeks ?? 'N/A'} unit="sem" label="Horizonte" size="sm" color="gold" />
                </div>

                <div className="profile-preview-chip-row">
                  <span>P{summary.protein}</span>
                  <span>C{summary.carb}</span>
                  <span>G{summary.fat}</span>
                  <span>{summary.bmrMethod.toUpperCase()}</span>
                </div>
              </>
            ) : (
              <p className="profile-preview-placeholder">{'Finalize o c\u00e1lculo para visualizar o resumo deste perfil.'}</p>
            )}
          </DataCard>
        </div>
      </div>
    </SectionShell>
  );
};

