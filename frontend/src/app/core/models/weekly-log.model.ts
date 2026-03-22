export interface WeeklyLog {
  id?: string;
  weekStart: string;
  weightKg?: number;
  waistCm?: number;
  armCm?: number;
  weeklyFeeling?: 'worse' | 'same' | 'better';
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type WeeklyFeeling = WeeklyLog['weeklyFeeling'];
