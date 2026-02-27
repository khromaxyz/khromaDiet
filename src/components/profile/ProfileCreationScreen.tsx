import { AlertTriangle, ArrowLeft, ArrowRight, Bolt, CheckCircle2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { GOAL_LABELS } from '../../lib/constants/labels';
import { PROFILE_MAX_COUNT } from '../../lib/profiles/constants';
import { buildProfileSummary } from '../../lib/profiles/summary';
import type { UserProfile } from '../../lib/profiles/types';
import type { CalculationResults } from '../../lib/types/engine';
import type { FormData } from '../../lib/types/form';

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
  return `${goalLabel} · Plano ${sequence}`;
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
    <section className="screen active" id="screen-profile-create">
      <div className="df-profile-create-bg" aria-hidden />

      <div className="df-profile-create-shell">
        <div className="df-profile-create-kicker">- QUASE LÁ · PERSONALIZE SEU PERFIL -</div>
        <h1 className="df-profile-create-title">Seu plano está pronto.</h1>
        <p className="df-profile-create-subtitle">Dê um nome ao seu perfil para salvar e acessar depois.</p>

        <ProfileAvatarGrid
          selectedId={avatarId}
          onSelect={setAvatarId}
          className="df-avatar-grid df-avatar-grid-create"
          ariaLabel="Escolha o avatar do perfil"
        />

        <div className="df-profile-name-field">
          <div className="df-profile-name-top">
            <label htmlFor="profile-name-input" className="df-profile-name-label">
              Nome do perfil
            </label>
            <span className="df-profile-name-counter">{profileName.length}/24</span>
          </div>
          <input
            id="profile-name-input"
            className="df-profile-name-input"
            type="text"
            value={profileName}
            maxLength={24}
            placeholder="Como quer ser chamado?"
            onChange={(event) => setProfileName(event.target.value)}
          />
        </div>

        <article className="df-profile-preview-card" aria-live="polite">
          <div className="df-profile-preview-head">
            <ProfileAvatar avatarId={avatarId} size={56} />
            <div>
              <div className="df-profile-preview-name">{displayName}</div>
              <div className="df-profile-preview-meta">
                {GOAL_LABELS[formData.goal]} · {formData.weightKg}kg · {formData.heightCm}cm
              </div>
            </div>
          </div>

          {summary ? (
            <div className="df-profile-preview-chips">
              <span>{summary.targetKcal.toLocaleString('pt-BR')} kcal</span>
              <span>
                P{summary.protein} C{summary.carb} G{summary.fat}
              </span>
              <span>{summary.precisionPct}% precisao</span>
            </div>
          ) : (
            <p className="df-profile-preview-placeholder">Finalize o calculo para visualizar o resumo deste perfil.</p>
          )}
        </article>

        {isAtLimit ? (
          <div className="df-profile-limit-warning" role="alert">
            <AlertTriangle size={14} />
            <span>Você já possui 5 perfis. Salvar agora substitui o perfil mais antigo.</span>
            {replaceOldest ? <CheckCircle2 size={14} className="df-profile-limit-confirm" /> : null}
          </div>
        ) : null}

        <div className="df-profile-create-actions">
          <button type="button" className="df-profile-back-link" onClick={onBack}>
            <ArrowLeft size={14} />
            Voltar ao formulário
          </button>

          <button type="button" className="df-profile-save-btn" onClick={handleSave}>
            <Bolt size={14} />
            {isAtLimit && replaceOldest ? 'Substituir mais antigo e continuar' : 'Salvar e ver meu plano'}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
