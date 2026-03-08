import { cn } from '@/lib/utils';
import { AVATAR_STYLES } from '@/features/profile/config/profileOptions';

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
    <div className={cn('df-avatar-grid', className)} role="group" aria-label={ariaLabel}>
      {AVATAR_STYLES.map((avatar) => (
        <button
          key={avatar.id}
          type="button"
          className={cn('df-avatar-choice', avatar.id === selectedId && 'is-selected')}
          aria-label={`Avatar ${avatar.role}`}
          aria-pressed={avatar.id === selectedId}
          onClick={() => onSelect(avatar.id)}
        >
          <ProfileAvatar avatarId={avatar.id} size={size} title={avatar.role} />
        </button>
      ))}
    </div>
  );
};

