'use client';

import { Pencil } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';

interface WeeklyNoteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function WeeklyNote({ value, onChange, onBlur }: WeeklyNoteProps) {
  return (
    <Card>
      <WidgetHeader 
        icon={<Pencil className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Nota semanal"
        subtitle="Reflexiones sobre tu semana"
      />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="¿Qué tal fue esta semana? Logros, retos, observaciones..."
        className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-medium resize-none transition-all duration-200 focus:outline-none focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10"
        rows={5}
      />
    </Card>
  );
}
