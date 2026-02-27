import { AVATAR_STYLES } from '../../lib/profiles/constants';

import { ProfileAvatar } from './ProfileAvatar';

interface ProfileAvatarGridProps {
  selectedId: number;
  onSelect: (avatarId: number) => void;
  className?: string;
  size?: number;
  ariaLabel?: string;
}

export const ProfileAvatarGrid = ({
  selectedId,
  onSelect,
  className,
  size = 48,
  ariaLabel = 'Selecionar avatar',
}: ProfileAvatarGridProps) => {
  return (
    <div className={className ?? 'df-avatar-grid'} role="group" aria-label={ariaLabel}>
      {AVATAR_STYLES.map((avatar) => (
        <button
          key={avatar.id}
          type="button"
          className={avatar.id === selectedId ? 'df-avatar-choice is-selected' : 'df-avatar-choice'}
          aria-label={`Avatar ${avatar.role}`}
          onClick={() => onSelect(avatar.id)}
        >
          <ProfileAvatar avatarId={avatar.id} size={size} title={avatar.role} />
        </button>
      ))}
    </div>
  );
};
