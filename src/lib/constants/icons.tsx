import type { ReactNode } from 'react';

import {
    BarChart3,
    Bike,
    Coffee,
    Dumbbell,
    Flame,
    FlaskConical,
    FlaskRound,
    Footprints,
    Microscope,
    Plus,
    RefreshCw,
    Scale,
    Scissors,
    Snowflake,
    Stethoscope,
    Syringe,
    Target,
    TestTubes,
    TrendingUp,
    Trophy,
    Zap,
} from 'lucide-react';

import type {
    CardioMode,
    GoalType,
    HormoneCompound,
    ThermogenicOption,
    TrainingType,
} from '../types';

const ICON_SIZE = 18;
const ICON_STROKE = 1.5;

export const GOAL_ICONS: Record<GoalType, ReactNode> = {
    hard_cut: <Flame size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    mini_cut: <Scissors size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    recomp: <Scale size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    maintenance: <Target size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    lean_bulk: <Dumbbell size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    dirty_bulk: <Trophy size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
};

export const TRAINING_ICONS: Record<TrainingType, ReactNode> = {
    strength: <Dumbbell size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    hiit: <Zap size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    endurance: <Bike size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
};

export const CARDIO_MODE_ICONS: Record<CardioMode, ReactNode> = {
    steps: <Footprints size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    structured: <BarChart3 size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    both: <RefreshCw size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
};

export const THERMOGENIC_ICONS: Record<ThermogenicOption, ReactNode> = {
    none: <Snowflake size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    caffeine: <Coffee size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
    eca: <Flame size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
};

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
