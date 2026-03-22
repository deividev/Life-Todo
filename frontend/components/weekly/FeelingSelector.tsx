'use client';

import { ThumbsDown, Minus, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';
import type { WeeklyFeeling } from '@/types';

interface FeelingSelectorProps {
  value: WeeklyFeeling | null;
  onChange: (value: WeeklyFeeling) => void;
}

const feelingOptions: Array<{ value: WeeklyFeeling; label: string; icon: typeof ThumbsDown; gradient: string; activeGradient: string }> = [
  { value: 'worse', label: 'Peor', icon: ThumbsDown, gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', activeGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
  { value: 'same', label: 'Igual', icon: Minus, gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', activeGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { value: 'better', label: 'Mejor', icon: ThumbsUp, gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', activeGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
];

export function FeelingSelector({ value, onChange }: FeelingSelectorProps) {
  return (
    <Card className="mb-5">
      <WidgetHeader 
        icon={<ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#d97706' }} />}
        title="¿Cómo te sientes?"
        subtitle="Compara con la semana anterior"
        gradient="linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
        iconColor="#d97706"
      />
      <div className="flex gap-3 sm:gap-4">
        {feelingOptions.map((option) => {
          const isActive = value === option.value;
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-4 sm:py-5 px-3 min-h-[88px] sm:min-h-[100px] rounded-xl transition-all duration-200',
                isActive 
                  ? 'text-white shadow-lg scale-100' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
              style={isActive ? { background: option.activeGradient } : {}}
            >
              <Icon 
                className="w-7 h-7 sm:w-8 sm:h-8 mb-2" 
              />
              <span className="text-xs sm:text-sm font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
