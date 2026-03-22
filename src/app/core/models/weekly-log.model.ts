export interface WeeklyLog {
  id?: string;
  user_id: string;
  week_start: string;
  weight_kg?: number;
  waist_cm?: number;
  arm_cm?: number;
  weekly_feeling?: 'worse' | 'same' | 'better';
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export type WeeklyFeeling = WeeklyLog['weekly_feeling'];
