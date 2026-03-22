'use client';

import { Sun, Coffee, Apple, Moon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';

interface MealGridProps {
  meals: {
    breakfast: boolean;
    lunch: boolean;
    snack: boolean;
    dinner: boolean;
  };
  onToggle: (meal: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
}

const mealOptions = [
  { key: 'breakfast' as const, label: 'Desayuno', icon: Sun, gradient: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', iconColor: '#ca8a04' },
  { key: 'lunch' as const, label: 'Almuerzo', icon: Coffee, gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', iconColor: '#ea580c' },
  { key: 'snack' as const, label: 'Merienda', icon: Apple, gradient: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)', iconColor: '#7c3aed' },
  { key: 'dinner' as const, label: 'Cena', icon: Moon, gradient: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)', iconColor: '#2563eb' },
];

export function MealGrid({ meals, onToggle }: MealGridProps) {
  return (
    <Card className="mb-5">
      <WidgetHeader 
        icon={<Sun className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Comidas del día"
        subtitle="Toca para marcar las comidas tomadas"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {mealOptions.map((meal) => {
          const isActive = meals[meal.key];
          return (
            <button
              key={meal.key}
              onClick={() => onToggle(meal.key)}
              className={cn(
                'flex flex-col items-center justify-center py-4 px-3 rounded-xl min-h-[80px] sm:min-h-[96px] transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] scale-100' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent'
              )}
            >
              <div 
                className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-200',
                  isActive ? 'bg-white/20' : ''
                )}
                style={!isActive ? { background: meal.gradient } : {}}
              >
                <meal.icon 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={isActive ? { color: 'white' } : { color: meal.iconColor }}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold">{meal.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
