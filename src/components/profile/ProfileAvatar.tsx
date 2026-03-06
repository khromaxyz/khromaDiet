import type { ReactNode } from 'react';

import { AVATAR_STYLES } from '../../lib/profiles/constants';

interface ProfileAvatarProps {
  avatarId: number;
  size?: number;
  className?: string;
  title?: string;
}

const DEFAULT_AVATAR = {
  id: 0,
  role: 'Avatar',
  primary: '#10b981',
  secondary: '#047857',
};

const getAvatarStyle = (avatarId: number) => {
  const safeIndex = Math.max(0, Math.min(AVATAR_STYLES.length - 1, avatarId));
  return AVATAR_STYLES[safeIndex] ?? DEFAULT_AVATAR;
};

const renderAccessory = (avatarId: number, primary: string, secondary: string): ReactNode => {
  switch (avatarId) {
    case 0:
      return <path d="M24 7 L30 13 L24 15 L18 13 Z" fill={secondary} />;
    case 1:
      return <rect x="14" y="14" width="20" height="4" rx="2" fill={secondary} />;
    case 2:
      return (
        <>
          <rect x="14" y="16" width="8" height="5" rx="2" fill={secondary} />
          <rect x="26" y="16" width="8" height="5" rx="2" fill={secondary} />
          <rect x="22" y="18" width="4" height="2" rx="1" fill={secondary} />
        </>
      );
    case 3:
      return (
        <>
          <rect x="12" y="11" width="24" height="3" rx="1.5" fill={secondary} />
          <rect x="18" y="7" width="12" height="5" rx="2" fill={secondary} />
        </>
      );
    case 4:
      return <rect x="13" y="17" width="22" height="6" rx="3" fill={secondary} />;
    case 5:
      return (
        <>
          <circle cx="24" cy="18" r="12" fill="none" stroke={secondary} strokeWidth="2" />
          <circle cx="24" cy="18" r="2" fill={secondary} />
        </>
      );
    case 6:
      return (
        <>
          <path d="M14 16 H34 L31 11 H17 Z" fill={secondary} />
          <rect x="20" y="11" width="8" height="2" rx="1" fill={primary} />
        </>
      );
    case 7:
      return (
        <>
          <circle cx="31" cy="14" r="2.6" fill={secondary} />
          <rect x="30" y="14" width="2" height="8" rx="1" fill={secondary} />
          <path d="M31 20 C33.8 19.2 35 20.2 35 22" fill="none" stroke={secondary} strokeWidth="1.8" />
        </>
      );
    case 8:
      return (
        <>
          <path d="M14 38 L20 28 L26 38 Z" fill={secondary} opacity="0.9" />
          <path d="M22 38 L28 26 L34 38 Z" fill={primary} opacity="0.9" />
        </>
      );
    case 9:
      return (
        <>
          <path d="M12 35 C16 32, 20 38, 24 35 C28 32, 32 38, 36 35" fill="none" stroke={secondary} strokeWidth="2" />
          <circle cx="31" cy="15" r="3" fill={secondary} />
        </>
      );
    case 10:
      return (
        <>
          <circle cx="16" cy="33" r="4" fill="none" stroke={secondary} strokeWidth="2" />
          <circle cx="32" cy="33" r="4" fill="none" stroke={secondary} strokeWidth="2" />
          <path d="M20 31 L26 24 L30 31" fill="none" stroke={secondary} strokeWidth="2" />
        </>
      );
    case 11:
      return <path d="M24 10 L27 16 L34 16 L28.5 20 L30.8 27 L24 22.8 L17.2 27 L19.5 20 L14 16 L21 16 Z" fill={secondary} />;
    default:
      return null;
  }
};

export const ProfileAvatar = ({ avatarId, size = 48, className, title }: ProfileAvatarProps) => {
  const avatar = getAvatarStyle(avatarId);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title ?? avatar.role}
    >
      <defs>
        <linearGradient id={`avatar-bg-${avatar.id}`} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,255,255,0.08)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="44" height="44" rx="22" fill="rgba(12,13,15,0.96)" stroke="rgba(255,255,255,0.1)" />
      <rect x="3" y="3" width="42" height="42" rx="21" fill={`url(#avatar-bg-${avatar.id})`} />
      <circle cx="24" cy="18" r="9" fill={avatar.primary} />
      <path d="M11 40 C13.4 30.5 19.2 27 24 27 C28.8 27 34.6 30.5 37 40" fill={avatar.secondary} />
      {renderAccessory(avatar.id, avatar.primary, avatar.secondary)}
      <circle cx="20.7" cy="18" r="1" fill="rgba(255,255,255,0.8)" />
      <circle cx="27.3" cy="18" r="1" fill="rgba(255,255,255,0.8)" />
      <path d="M20.5 22.2 C22 23.5 26 23.5 27.5 22.2" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};
