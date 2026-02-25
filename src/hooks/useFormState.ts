import { useMemo, useState } from 'react';

import { initialFormState } from '../lib/constants/mockForm';
import { runDietEngine } from '../lib/engine/dietEngine';
import type { DietFormState, EngineOutput } from '../lib/types';

export const useFormState = () => {
  const [formData, setFormData] = useState<DietFormState>(initialFormState);

  const onPatch = (patch: Partial<DietFormState>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const reset = () => {
    setFormData(initialFormState);
  };

  const engineResult = useMemo<EngineOutput>(() => {
    return runDietEngine({ form: formData });
  }, [formData]);

  return {
    formData,
    onPatch,
    reset,
    engineResult,
  };
};

