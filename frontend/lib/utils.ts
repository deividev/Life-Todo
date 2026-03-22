import { format, startOfWeek, addWeeks, subWeeks, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import type { WeekOption } from '@/types';

const MADRID_TIMEZONE = 'Europe/Madrid';

export function getCurrentDateMadrid(): string {
  const now = new Date();
  return formatInMadrid(now, 'yyyy-MM-dd');
}

export function formatDateMadrid(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, "EEEE, d 'de' MMMM", { locale: es });
}

export function getWeekStartMadrid(date: Date = new Date()): string {
  const weekStart = startOfWeek(date, { weekStartsOn: 1, locale: es });
  return format(weekStart, 'yyyy-MM-dd');
}

export function formatWeekLabel(weekStart: string): string {
  const date = parseISO(weekStart);
  const weekEnd = addWeeks(date, 1);
  const startMonth = format(date, 'MMM', { locale: es });
  const endMonth = format(weekEnd, 'MMM', { locale: es });
  const startDay = format(date, 'd');
  const endDay = format(weekEnd, 'd');
  
  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth}`;
  }
  return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
}

export function getWeekOptions(weeks: number = 12): WeekOption[] {
  const options: WeekOption[] = [];
  const today = new Date();
  
  for (let i = 0; i < weeks; i++) {
    const weekStart = getWeekStartMadrid(subWeeks(today, i));
    options.push({
      weekStart,
      label: formatWeekLabel(weekStart),
    });
  }
  
  return options;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

export function getTodaySummary(log: { breakfast: boolean; lunch: boolean; snack: boolean; dinner: boolean } | null): string {
  if (!log) return 'Sin registrar todavía';
  
  const meals = ['breakfast', 'lunch', 'snack', 'dinner'].filter(m => (log as Record<string, boolean>)[m]);
  
  if (meals.length === 0) return 'Sin registrar todavía';
  if (meals.length === 4) return 'Día completo - ¡Excelente!';
  return `${meals.length} de 4 comidas registradas`;
}

function formatInMadrid(date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: es });
}
