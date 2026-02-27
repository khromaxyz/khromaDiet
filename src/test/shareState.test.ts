import { describe, expect, it } from 'vitest';

import { initialFormData } from '../lib/constants/mockForm';
import { parseShareState, serializeShareState } from '../lib/shareState';

describe('shareState payload compatibility', () => {
  it('serializes and parses payload without shared profile metadata', () => {
    const raw = serializeShareState({
      formData: initialFormData,
      currentStep: 14,
      viewMode: 'technical',
    });

    const parsed = parseShareState(raw);

    expect(parsed).not.toBeNull();
    expect(parsed?.currentStep).toBe(14);
    expect(parsed?.sharedProfile).toBeUndefined();
  });

  it('serializes and parses payload with shared profile metadata', () => {
    const raw = serializeShareState({
      formData: initialFormData,
      currentStep: 14,
      viewMode: 'simple',
      sharedProfile: {
        name: 'Mini Cut Plano',
        avatarId: 7,
      },
    });

    const parsed = parseShareState(raw);

    expect(parsed).not.toBeNull();
    expect(parsed?.viewMode).toBe('simple');
    expect(parsed?.sharedProfile?.name).toBe('Mini Cut Plano');
    expect(parsed?.sharedProfile?.avatarId).toBe(7);
  });

  it('returns null for invalid payloads', () => {
    expect(parseShareState('invalido')).toBeNull();
  });
});
