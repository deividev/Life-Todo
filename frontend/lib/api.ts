const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

import type { DailyLog, WeeklyLog, ProgressSummary } from '@/types';

export async function getDailyLog(date: string): Promise<DailyLog | null> {
  try {
    const res = await fetch(`${API_BASE}/daily-logs/${date}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function saveDailyLog(date: string, data: Partial<DailyLog>): Promise<DailyLog> {
  const res = await fetch(`${API_BASE}/daily-logs/${date}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save daily log');
  return res.json();
}

export async function getWeeklyLog(weekStart: string): Promise<WeeklyLog | null> {
  try {
    const res = await fetch(`${API_BASE}/weekly-logs/${weekStart}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function saveWeeklyLog(weekStart: string, data: Partial<WeeklyLog>): Promise<WeeklyLog> {
  const res = await fetch(`${API_BASE}/weekly-logs/${weekStart}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save weekly log');
  return res.json();
}

export async function getProgressSummary(): Promise<ProgressSummary> {
  try {
    const res = await fetch(`${API_BASE}/progress/summary`);
    if (!res.ok) throw new Error('Failed to fetch progress');
    return res.json();
  } catch {
    return {
      weightData: [],
      mealStats: { breakfast: 0, lunch: 0, snack: 0, dinner: 0 },
      activityStats: {},
    };
  }
}
