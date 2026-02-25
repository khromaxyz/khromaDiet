import { useCursorFx } from '../../hooks/useCursorFx';

export const CursorFx = () => {
  const { enabled, dotRef, ringRef } = useCursorFx();

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
};

