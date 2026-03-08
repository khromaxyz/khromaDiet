import { beforeEach, describe, expect, it } from 'vitest';

import { DRAFT_STORAGE_KEY, clearDraft, loadDraft, saveDraft } from '../features/form/storage/draftStorage';
import { ACTIVE_PROFILE_STORAGE_KEY, PROFILE_STORAGE_KEY } from '../lib/profiles/constants';
import {
  insertProfileWithLimit,
  isStorageAvailable,
  loadProfiles,
  saveProfiles,
} from '../lib/profiles/storage';
import type { UserProfile } from '../lib/profiles/types';

const makeProfile = (id: string, createdAt: string): UserProfile => ({
  id,
  name: `Perfil ${id}`,
  avatarId: 0,
  createdAt,
  lastUpdatedAt: createdAt,
  objective: 'mini_cut',
  formData: {
    goal: 'mini_cut',
  } as UserProfile['formData'],
  results: {} as UserProfile['results'],
  summary: {
    tdee: 2800,
    targetKcal: 2200,
    deficit: 600,
    protein: 190,
    carb: 240,
    fat: 62,
    precisionPct: 70,
    estimatedWeeks: 12,
    bmrMethod: 'mifflin',
  },
});

describe('profiles/storage helpers', () => {
  beforeEach(() => {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    window.localStorage.removeItem(ACTIVE_PROFILE_STORAGE_KEY);
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  });

  it('inserts profile when limit is not reached', () => {
    const current = [makeProfile('1', '2026-02-20T00:00:00.000Z')];
    const incoming = makeProfile('2', '2026-02-21T00:00:00.000Z');

    const result = insertProfileWithLimit(current, incoming, { allowReplaceOldest: false });

    expect(result.blockedByLimit).toBe(false);
    expect(result.profiles).toHaveLength(2);
    expect(result.profiles[0]?.id).toBe('2');
  });

  it('blocks insertion when limit is reached and replacement is disabled', () => {
    const full = Array.from({ length: 5 }, (_, index) =>
      makeProfile(String(index + 1), `2026-02-${String(index + 1).padStart(2, '0')}T00:00:00.000Z`),
    );

    const result = insertProfileWithLimit(full, makeProfile('6', '2026-03-01T00:00:00.000Z'), {
      allowReplaceOldest: false,
    });

    expect(result.blockedByLimit).toBe(true);
    expect(result.profiles).toHaveLength(5);
    expect(result.profiles.some((profile) => profile.id === '6')).toBe(false);
  });

  it('replaces the oldest profile when replacement is enabled', () => {
    const full = Array.from({ length: 5 }, (_, index) =>
      makeProfile(String(index + 1), `2026-02-${String(index + 1).padStart(2, '0')}T00:00:00.000Z`),
    );

    const result = insertProfileWithLimit(full, makeProfile('6', '2026-03-01T00:00:00.000Z'), {
      allowReplaceOldest: true,
    });

    expect(result.blockedByLimit).toBe(false);
    expect(result.replacedOldest).toBe(true);
    expect(result.profiles).toHaveLength(5);
    expect(result.profiles.some((profile) => profile.id === '1')).toBe(false);
    expect(result.profiles.some((profile) => profile.id === '6')).toBe(true);
  });

  it('persists and restores profiles in localStorage', () => {
    const profiles = [makeProfile('1', '2026-02-20T00:00:00.000Z')];

    expect(saveProfiles(profiles)).toBe(true);
    expect(loadProfiles()).toHaveLength(1);
    expect(loadProfiles()[0]?.id).toBe('1');
  });

  it('saves and clears draft payloads', () => {
    const draft = {
      formData: { goal: 'mini_cut' } as UserProfile['formData'],
      currentStep: 4,
      updatedAt: '2026-02-27T10:00:00.000Z',
    };

    expect(saveDraft(draft)).toBe(true);
    expect(loadDraft()?.currentStep).toBe(4);
    expect(clearDraft()).toBe(true);
    expect(loadDraft()).toBeNull();
  });

  it('returns false for unavailable storage when explicit null is provided', () => {
    expect(isStorageAvailable(null)).toBe(false);
  });
});
