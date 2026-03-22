export interface DailyLog {
  id?: string;
  date: string;
  breakfast: boolean;
  lunch: boolean;
  snack: boolean;
  dinner: boolean;
  activityType: 'none' | 'walk' | 'exercise' | 'walk_and_exercise';
  energy: 'low' | 'medium' | 'high';
  appetite: 'low' | 'normal' | 'high';
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ActivityType = DailyLog['activityType'];
export type EnergyLevel = DailyLog['energy'];
export type AppetiteLevel = DailyLog['appetite'];
