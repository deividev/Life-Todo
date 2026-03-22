'use client';

import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';
import type { WeekOption } from '@/types';

interface WeekSelectorProps {
  options: WeekOption[];
  value: string;
  onChange: (weekStart: string) => void;
}

export function WeekSelector({ options, value, onChange }: WeekSelectorProps) {
  return (
    <Card className="mb-5">
      <WidgetHeader 
        icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Seleccionar semana"
        subtitle="Elige la semana que quieres registrar"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-medium transition-all duration-200 focus:outline-none focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.weekStart} value={option.weekStart}>
            {option.label}
          </option>
        ))}
      </select>
    </Card>
  );
}
