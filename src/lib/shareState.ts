import type { SharedProfileMeta } from './profiles/types';
import type { FormData, ViewMode } from './types';

interface SharePayloadV1Compat {
  version: 1;
  formData: FormData;
  currentStep: number;
  viewMode: ViewMode;
  sharedProfile?: SharedProfileMeta;
}

const toBase64Url = (value: string): string =>
  btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const fromBase64Url = (value: string): string => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  return atob(padded);
};

const encodeUtf8 = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return binary;
};

const decodeUtf8 = (binary: string): string => {
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const serializeShareState = (state: {
  formData: FormData;
  currentStep: number;
  viewMode: ViewMode;
  sharedProfile?: SharedProfileMeta;
}): string => {
  const payload: SharePayloadV1Compat = {
    version: 1,
    formData: state.formData,
    currentStep: state.currentStep,
    viewMode: state.viewMode,
    ...(state.sharedProfile ? { sharedProfile: state.sharedProfile } : {}),
  };

  const json = JSON.stringify(payload);
  return toBase64Url(encodeUtf8(json));
};

export const parseShareState = (raw: string): SharePayloadV1Compat | null => {
  try {
    const json = decodeUtf8(fromBase64Url(raw));
    const parsed = JSON.parse(json) as Partial<SharePayloadV1Compat>;

    if (parsed.version !== 1 || !parsed.formData || typeof parsed.currentStep !== 'number') {
      return null;
    }

    const viewMode: ViewMode = parsed.viewMode === 'simple' ? 'simple' : 'technical';

    const sharedProfile =
      parsed.sharedProfile &&
      (typeof parsed.sharedProfile.name === 'string' || typeof parsed.sharedProfile.avatarId === 'number')
        ? {
            ...(typeof parsed.sharedProfile.name === 'string'
              ? { name: parsed.sharedProfile.name.slice(0, 24) }
              : {}),
            ...(typeof parsed.sharedProfile.avatarId === 'number'
              ? { avatarId: Math.max(0, Math.min(11, Math.floor(parsed.sharedProfile.avatarId))) }
              : {}),
          }
        : undefined;

    return {
      version: 1,
      formData: parsed.formData,
      currentStep: parsed.currentStep,
      viewMode,
      ...(sharedProfile ? { sharedProfile } : {}),
    };
  } catch {
    return null;
  }
};
