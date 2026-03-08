import { AnimatePresence, motion } from 'framer-motion';
import { Settings2, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { GOAL_TONE_BY_OBJECTIVE } from '@/features/profile/config/profileOptions';
import { GOAL_LABELS } from '@/lib/constants/labels';
import { PROFILE_MAX_COUNT } from '@/lib/profiles/constants';
import type { UserProfile } from '@/lib/profiles/types';

import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSettingsPanel } from './ProfileSettingsPanel';

interface ProfileDrawerProps {
  open: boolean;
  profiles: UserProfile[];
  activeProfileId: string | null;
  onClose: () => void;
  onCreateNewProfile: () => void;
  onLoadProfile: (profileId: string) => Promise<void>;
  onRenameProfile: (profileId: string, name: string) => void;
  onChangeAvatar: (profileId: string, avatarId: number) => void;
  onRecalculateProfile: (profileId: string) => void;
  onShareProfile: (profileId: string) => Promise<boolean>;
  onDeleteProfile: (profileId: string) => void;
}

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString('pt-BR');
};

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export const ProfileDrawer = ({
  open,
  profiles,
  activeProfileId,
  onClose,
  onCreateNewProfile,
  onLoadProfile,
  onRenameProfile,
  onChangeAvatar,
  onRecalculateProfile,
  onShareProfile,
  onDeleteProfile,
}: ProfileDrawerProps) => {
  const [settingsProfileId, setSettingsProfileId] = useState<string | null>(null);
  const [loadingProfileId, setLoadingProfileId] = useState<string | null>(null);

  const settingsProfile = useMemo(
    () => profiles.find((profile) => profile.id === settingsProfileId) ?? null,
    [profiles, settingsProfileId],
  );

  const handleLoadProfile = async (profileId: string) => {
    setLoadingProfileId(profileId);
    await wait(300);
    await onLoadProfile(profileId);
    setLoadingProfileId(null);
  };

  const handleDeleteProfile = (profileId: string) => {
    if (settingsProfileId === profileId) {
      setSettingsProfileId(null);
    }
    onDeleteProfile(profileId);
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="df-profile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            className="df-profile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            aria-label="Painel de perfis"
          >
            <div className={settingsProfile ? 'df-profile-drawer-track is-settings' : 'df-profile-drawer-track'}>
              <section className="df-profile-drawer-page">
                <header className="df-profile-drawer-header">
                  <div>
                    <h3>PERFIS SALVOS</h3>
                    <p>
                      {profiles.length} de {PROFILE_MAX_COUNT} perfis
                    </p>
                  </div>
                  <button type="button" className="df-profile-drawer-close" aria-label="Fechar" onClick={onClose}>
                    <X size={16} />
                  </button>
                </header>

                <button type="button" className="df-profile-new-btn" onClick={onCreateNewProfile}>
                  + Novo perfil
                </button>

                <div className="df-profile-cards">
                  <AnimatePresence initial={false}>
                    {profiles.map((profile, index) => {
                      const isActive = profile.id === activeProfileId;
                      const tone = GOAL_TONE_BY_OBJECTIVE[profile.objective];
                      const isLoading = loadingProfileId === profile.id;

                      return (
                        <motion.article
                          key={profile.id}
                          className={`df-profile-card df-profile-card-${tone}${isActive ? ' is-active' : ''}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.25, delay: index * 0.06 }}
                        >
                          <div className="df-profile-card-top">
                            <ProfileAvatar avatarId={profile.avatarId} size={48} className="df-profile-card-avatar" />
                            <div className="df-profile-card-info">
                              <p className="df-profile-card-name">{profile.name}</p>
                              <p className="df-profile-card-meta">
                                {GOAL_LABELS[profile.objective]} � {profile.formData.weightKg}kg � {profile.formData.heightCm}cm
                              </p>
                              <p className="df-profile-card-date">Criado em {formatDate(profile.createdAt)}</p>
                            </div>
                            {isActive ? <span className="df-profile-card-active">? ATIVO</span> : null}
                          </div>

                          <div className="df-profile-card-chips">
                            <span>{profile.summary.targetKcal.toLocaleString('pt-BR')} kcal</span>
                            <span>
                              P{profile.summary.protein} C{profile.summary.carb} G{profile.summary.fat}
                            </span>
                            <span>{profile.summary.precisionPct}% prec</span>
                          </div>

                          <div className="df-profile-card-actions">
                            <button
                              type="button"
                              className="df-profile-card-load"
                              disabled={isLoading}
                              onClick={() => handleLoadProfile(profile.id)}
                            >
                              {isLoading ? 'Carregando...' : 'Carregar'}
                            </button>
                            <button
                              type="button"
                              className="df-profile-card-settings"
                              onClick={() => setSettingsProfileId(profile.id)}
                            >
                              <Settings2 size={14} />
                              Configura��es
                            </button>
                          </div>
                        </motion.article>
                      );
                    })}
                  </AnimatePresence>

                  {profiles.length === 0 ? (
                    <div className="df-profile-empty">Nenhum perfil salvo ainda. Crie seu primeiro perfil ao finalizar o formul�rio.</div>
                  ) : null}
                </div>
              </section>

              <section className="df-profile-drawer-page df-profile-drawer-settings-page">
                {settingsProfile ? (
                  <ProfileSettingsPanel
                    profile={settingsProfile}
                    onBack={() => setSettingsProfileId(null)}
                    onRename={onRenameProfile}
                    onChangeAvatar={onChangeAvatar}
                    onRecalculate={onRecalculateProfile}
                    onShare={onShareProfile}
                    onDelete={handleDeleteProfile}
                  />
                ) : (
                  <div className="df-profile-settings-empty">Selecione um perfil para configurar.</div>
                )}
              </section>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
};

