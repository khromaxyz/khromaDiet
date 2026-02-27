import { useDietForgeStore } from '../store/useDietForgeStore';

export const useFormState = () => {
  const formData = useDietForgeStore((state) => state.formData);
  const onPatch = useDietForgeStore((state) => state.patchFormData);
  const reset = useDietForgeStore((state) => state.resetAll);
  const engineResult = useDietForgeStore((state) => state.results);

  return {
    formData,
    onPatch,
    reset,
    engineResult,
  };
};
