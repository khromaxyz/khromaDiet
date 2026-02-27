import { UserRound } from 'lucide-react';

import { ProfileAvatar } from './ProfileAvatar';

interface ProfileTriggerButtonProps {
  avatarId: number | null;
  onClick: () => void;
  ariaLabel?: string;
}

export const ProfileTriggerButton = ({
  avatarId,
  onClick,
  ariaLabel = 'Abrir perfis salvos',
}: ProfileTriggerButtonProps) => {
  return (
    <button type="button" className="df-profile-trigger" aria-label={ariaLabel} onClick={onClick}>
      {avatarId === null ? (
        <span className="df-profile-trigger-fallback" aria-hidden>
          <UserRound size={16} />
        </span>
      ) : (
        <ProfileAvatar avatarId={avatarId} size={28} />
      )}
    </button>
  );
};
