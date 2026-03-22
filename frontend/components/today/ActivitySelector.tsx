'use client';

import { Minus, Footprints, Dumbbell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';
import type { ActivityType } from '@/types';

interface ActivitySelectorProps {
  value: ActivityType;
  onChange: (value: ActivityType) => void;
}

const activityOptions: Array<{ value: ActivityType; label: string; icon: typeof Minus; gradient: string; iconColor: string }> = [
  { value: 'none', label: 'Ninguna', icon: Minus, gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', iconColor: '#64748b' },
  { value: 'walk', label: 'Paseo', icon: Footprints, gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', iconColor: '#059669' },
  { value: 'exercise', label: 'Ejercicio', icon: Dumbbell, gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', iconColor: '#d97706' },
  { value: 'walk_and_exercise', label: 'Ambos', icon: Sparkles, gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', iconColor: '#4f46e5' },
];

export function ActivitySelector({ value, onChange }: ActivitySelectorProps) {
  return (
    <Card className="mb-5">
      <WidgetHeader 
        icon={<Footprints className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Actividad física"
        subtitle="¿Qué has hecho hoy?"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {activityOptions.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex flex-col items-center justify-center py-4 px-3 rounded-xl min-h-[80px] sm:min-h-[96px] transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              <div 
                className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-200',
                  isActive ? 'bg-white/20' : ''
                )}
                style={!isActive ? { background: option.gradient } : {}}
              >
                <option.icon 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={isActive ? { color: 'white' } : { color: option.iconColor }}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
