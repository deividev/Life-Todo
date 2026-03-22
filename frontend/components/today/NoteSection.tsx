'use client';

import { Pencil } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';

interface NoteSectionProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function NoteSection({ value, onChange, onBlur }: NoteSectionProps) {
  return (
    <Card>
      <WidgetHeader 
        icon={<Pencil className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Notas personales"
        subtitle="Reflexiones sobre tu día"
      />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="¿Cómo te sientes? ¿Qué has notado hoy? Escribe aquí tus observaciones..."
        className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-medium resize-none transition-all duration-200 focus:outline-none focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10"
        rows={4}
      />
    </Card>
  );
}
