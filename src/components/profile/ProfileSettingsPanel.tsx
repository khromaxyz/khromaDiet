import { ArrowLeft, Download, Link2, PencilLine, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { UserProfile } from '../../lib/profiles/types';

import { ProfileAvatarGrid } from './ProfileAvatarGrid';

interface ProfileSettingsPanelProps {
  profile: UserProfile;
  onBack: () => void;
  onRename: (profileId: string, name: string) => void;
  onChangeAvatar: (profileId: string, avatarId: number) => void;
  onRecalculate: (profileId: string) => void;
  onShare: (profileId: string) => Promise<boolean>;
  onDelete: (profileId: string) => void;
}

export const ProfileSettingsPanel = ({
  profile,
  onBack,
  onRename,
  onChangeAvatar,
  onRecalculate,
  onShare,
  onDelete,
}: ProfileSettingsPanelProps) => {
  const [name, setName] = useState(profile.name);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    setName(profile.name);
    setIsDeleting(false);
    setShareStatus('');
  }, [profile]);

  const commitName = () => {
    const normalized = name.trim().slice(0, 24);
    if (!normalized || normalized === profile.name) {
      setName(profile.name);
      return;
    }

    onRename(profile.id, normalized);
    setName(normalized);
  };

  const handleShare = async () => {
    const ok = await onShare(profile.id);
    setShareStatus(ok ? 'Link copiado' : 'Falha ao copiar');
    window.setTimeout(() => setShareStatus(''), 2200);
  };

  return (
    <div className="df-profile-settings-panel">
      <button type="button" className="df-profile-settings-back" onClick={onBack}>
        <ArrowLeft size={14} />
        Voltar
      </button>

      <h3 className="df-profile-settings-title">Configurações do perfil</h3>

      <label className="df-profile-settings-label" htmlFor="profile-settings-name">
        Renomear
      </label>
      <div className="df-profile-settings-input-wrap">
        <PencilLine size={14} />
        <input
          id="profile-settings-name"
          className="df-profile-settings-input"
          type="text"
          value={name}
          maxLength={24}
          onChange={(event) => setName(event.target.value)}
          onBlur={commitName}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commitName();
            }
          }}
        />
      </div>

      <p className="df-profile-settings-label">Trocar avatar</p>
      <ProfileAvatarGrid
        selectedId={profile.avatarId}
        onSelect={(avatarId) => onChangeAvatar(profile.id, avatarId)}
        className="df-avatar-grid-settings"
        size={42}
        ariaLabel="Escolher avatar do perfil"
      />

      <div className="df-profile-settings-actions">
        <button type="button" className="df-profile-settings-action" onClick={() => onRecalculate(profile.id)}>
          Recalcular plano
        </button>
        <button type="button" className="df-profile-settings-action" onClick={() => window.print()}>
          <Download size={14} />
          Exportar PDF
        </button>
        <button type="button" className="df-profile-settings-action" onClick={handleShare}>
          <Link2 size={14} />
          Compartilhar link
        </button>
      </div>

      {shareStatus ? <div className="df-profile-settings-status">{shareStatus}</div> : null}

      <div className="df-profile-settings-danger">
        {isDeleting ? (
          <div className="df-profile-delete-confirm">
            <p>Tem certeza? Esta ação não pode ser desfeita.</p>
            <div className="df-profile-delete-actions">
              <button type="button" className="df-profile-delete-cancel" onClick={() => setIsDeleting(false)}>
                Cancelar
              </button>
              <button type="button" className="df-profile-delete-confirm-btn" onClick={() => onDelete(profile.id)}>
                Excluir
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="df-profile-delete-trigger" onClick={() => setIsDeleting(true)}>
            <Trash2 size={14} />
            Excluir perfil
          </button>
        )}
      </div>
    </div>
  );
};
