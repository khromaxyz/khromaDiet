import { deepClone } from '@/lib/utils';
import type { FormData } from '@/lib/types/form';

export interface DraftPayload {
  formData: FormData;
  currentStep: number;
  updatedAt: string;
}

export const DRAFT_STORAGE_KEY = 'dietforge_draft';

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

const isDraftPayload = (value: unknown): value is DraftPayload => {
  if (!isRecord(value)) {
    return false;
  }

  return isRecord(value.formData) && typeof value.currentStep === 'number' && typeof value.updatedAt === 'string';
};

export const loadDraft = (storageOverride?: Storage | null): DraftPayload | null => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return null;
  }

  const parsed = parseJson<unknown>(storage.getItem(DRAFT_STORAGE_KEY));
  if (!isDraftPayload(parsed)) {
    return null;
  }

  return deepClone(parsed);
};

export const saveDraft = (draft: DraftPayload, storageOverride?: Storage | null): boolean => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
};

export const clearDraft = (storageOverride?: Storage | null): boolean => {
  const storage = resolveStorage(storageOverride);
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(DRAFT_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};
