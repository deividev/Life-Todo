export interface DailyLog {
  id?: string;
  user_id: string;
  date: string;
  breakfast: boolean;
  lunch: boolean;
  snack: boolean;
  dinner: boolean;
  activity_type: 'none' | 'walk' | 'exercise' | 'walk_and_exercise';
  energy: 'low' | 'medium' | 'high';
  appetite: 'low' | 'normal' | 'high';
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export type ActivityType = DailyLog['activity_type'];
export type EnergyLevel = DailyLog['energy'];
export type AppetiteLevel = DailyLog['appetite'];
