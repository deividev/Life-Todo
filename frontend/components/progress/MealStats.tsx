'use client';

import { Sun, Coffee, Apple, Moon, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';

interface MealStatsProps {
  stats: {
    breakfast: number;
    lunch: number;
    snack: number;
    dinner: number;
  };
}

const mealConfig = [
  { key: 'breakfast' as const, label: 'Desayunos', icon: Sun, gradient: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', color: '#ca8a04' },
  { key: 'lunch' as const, label: 'Almuerzos', icon: Coffee, gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', color: '#ea580c' },
  { key: 'snack' as const, label: 'Meriendas', icon: Apple, gradient: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)', color: '#7c3aed' },
  { key: 'dinner' as const, label: 'Cenas', icon: Moon, gradient: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)', color: '#2563eb' },
];

export function MealStats({ stats }: MealStatsProps) {
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <WidgetHeader 
        icon={<Coffee className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Comidas registradas"
        subtitle="Últimos 30 días"
      />
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm text-slate-500 font-medium">Total: {total} comidas</span>
        {total > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] text-[#065f46] shadow-[0_2px_8px_rgba(16,185,129,0.2)]">
            <Check className="w-3 h-3" />
            {total} comidas
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {mealConfig.map((meal) => {
          const Icon = meal.icon;
          return (
            <div key={meal.key} className="bg-slate-50/80 rounded-xl p-4 sm:p-5 text-center transition-all duration-200 hover:bg-slate-100/80">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                style={{ background: meal.gradient }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: meal.color }} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stats[meal.key]}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{meal.label}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
