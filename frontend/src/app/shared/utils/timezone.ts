const MADRID_TZ = 'Europe/Madrid';

export function getMadridDate(): Date {
  const now = new Date();
  return new Date(now.toLocaleString('en-US', { timeZone: MADRID_TZ }));
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getCurrentDateMadrid(): string {
  return formatDateISO(getMadridDate());
}

export function getWeekStartMadrid(date: Date = new Date()): string {
  const madridDate = new Date(date.toLocaleString('en-US', { timeZone: MADRID_TZ }));
  const day = madridDate.getDay();
  const diff = madridDate.getDate() - day + (day === 0 ? -6 : 1);
  madridDate.setDate(diff);
  return formatDateISO(madridDate);
}

export function parseWeekStart(weekStartStr: string): Date {
  const [year, month, day] = weekStartStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatWeekRange(weekStartStr: string): string {
  const start = parseWeekStart(weekStartStr);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  
  const formatShort = (d: Date) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  return `${formatShort(start)} - ${formatShort(end)}`;
}

export function getWeekOptions(count: number = 12): { weekStart: string; label: string }[] {
  const options: { weekStart: string; label: string }[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 7);
    const weekStart = getWeekStartMadrid(date);
    
    if (!options.find(o => o.weekStart === weekStart)) {
      options.push({
        weekStart,
        label: formatWeekRange(weekStart)
      });
    }
  }
  
  return options;
}
