import type { ReactNode } from 'react';
import {
  FlaskConical,
  FlaskRound,
  Microscope,
  Plus,
  Stethoscope,
  Syringe,
  TestTubes,
  TrendingUp,
} from 'lucide-react';

import type { HormoneCompound } from '@/lib/types';

const ICON_SIZE = 18;
const ICON_STROKE = 1.5;

export const HORMONE_ICONS: Record<HormoneCompound, ReactNode> = {
  testosterone: <TestTubes size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  oxandrolone: <Syringe size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  deca: <FlaskConical size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  tren: <Microscope size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  boldenone: <FlaskRound size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  gh: <TrendingUp size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  semaglutide: <Stethoscope size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  other: <Plus size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
};
