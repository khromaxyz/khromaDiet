import { deepClone } from '@/lib/utils';

import { ACTIVE_PROFILE_STORAGE_KEY, PROFILE_MAX_COUNT, PROFILE_STORAGE_KEY } from './constants';
import type { UserProfile } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const resolveStorage = (override?: Storage | null): Storage | null => {
  if (override !== undefined) {
    return override;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const parseJson = <T,>(raw: string | null): T | null => {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const isUserProfile = (value: unknown): value is UserProfile => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.avatarId === 'number' &&
    typeof value.createdAt === 'string' &&
    typeof value.lastUpdatedAt === 'string' &&
    typeof value.objective === 'string' &&
    isRecord(value.formData) &&
    isRecord(value.results) &&
    isRecord(value.summary)
  );
};

const sortProfiles = (profiles: UserProfile[]): UserProfile[] =>
  [...profiles].sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));

export const isStorageAvailable = (storageOverride?: Storage | null): boolean => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return false;
  }

  try {
    const testKey = '__dietforge_storage_probe__';
    storage.setItem(testKey, 'ok');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const loadProfiles = (storageOverride?: Storage | null): UserProfile[] => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return [];
  }

  const parsed = parseJson<unknown>(storage.getItem(PROFILE_STORAGE_KEY));
  if (!Array.isArray(parsed)) {
    return [];
  }

  return sortProfiles(parsed.filter((item) => isUserProfile(item)).map((item) => deepClone(item)));
};

export const saveProfiles = (profiles: UserProfile[], storageOverride?: Storage | null): boolean => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(sortProfiles(profiles)));
    return true;
  } catch {
    return false;
  }
};

export const loadActiveProfileId = (storageOverride?: Storage | null): string | null => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return null;
  }

  const value = storage.getItem(ACTIVE_PROFILE_STORAGE_KEY);
  return value && value.length > 0 ? value : null;
};

export const saveActiveProfileId = (id: string | null, storageOverride?: Storage | null): boolean => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return false;
  }

  try {
    if (!id) {
      storage.removeItem(ACTIVE_PROFILE_STORAGE_KEY);
      return true;
    }

    storage.setItem(ACTIVE_PROFILE_STORAGE_KEY, id);
    return true;
  } catch {
    return false;
  }
};

export const generateProfileId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `profile_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
};

interface InsertProfileOptions {
  allowReplaceOldest: boolean;
}

export interface InsertProfileResult {
  profiles: UserProfile[];
  replacedOldest: boolean;
  blockedByLimit: boolean;
}

export const insertProfileWithLimit = (
  profiles: UserProfile[],
  profile: UserProfile,
  options: InsertProfileOptions,
): InsertProfileResult => {
  if (profiles.length < PROFILE_MAX_COUNT) {
    return {
      profiles: sortProfiles([profile, ...profiles]),
      replacedOldest: false,
      blockedByLimit: false,
    };
  }

  if (!options.allowReplaceOldest) {
    return {
      profiles,
      replacedOldest: false,
      blockedByLimit: true,
    };
  }

  let oldest = profiles[0];
  for (const candidate of profiles) {
    if (!oldest || Date.parse(candidate.createdAt) < Date.parse(oldest.createdAt)) {
      oldest = candidate;
    }
  }

  const withoutOldest = oldest ? profiles.filter((item) => item.id !== oldest.id) : [...profiles];

  return {
    profiles: sortProfiles([profile, ...withoutOldest]),
    replacedOldest: true,
    blockedByLimit: false,
  };
};

export const cloneProfile = (profile: UserProfile): UserProfile => deepClone(profile);
