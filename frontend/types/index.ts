export interface DailyLog {
  id: string;
  date: string;
  breakfast: boolean;
  lunch: boolean;
  snack: boolean;
  dinner: boolean;
  activityType: ActivityType;
  energy: EnergyLevel;
  appetite: AppetiteLevel;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType = 'none' | 'walk' | 'exercise' | 'walk_and_exercise';
export type EnergyLevel = 'low' | 'medium' | 'high';
export type AppetiteLevel = 'low' | 'normal' | 'high';

export interface WeeklyLog {
  id: string;
  weekStart: string;
  weightKg?: number;
  waistCm?: number;
  armCm?: number;
  weeklyFeeling?: WeeklyFeeling;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export type WeeklyFeeling = 'worse' | 'same' | 'better';

export interface ProgressSummary {
  weightData: Array<{ week: string; weight: number }>;
  mealStats: {
    breakfast: number;
    lunch: number;
    snack: number;
    dinner: number;
  };
  activityStats: Record<string, number>;
  latestWeekly?: WeeklyLog;
}

export interface WeekOption {
  weekStart: string;
  label: string;
}
