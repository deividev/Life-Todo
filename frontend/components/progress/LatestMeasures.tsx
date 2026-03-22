'use client';

import { UserRound, MoveHorizontal, ArrowLeftRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';
import type { WeeklyLog } from '@/types';

interface LatestMeasuresProps {
  data: WeeklyLog | undefined;
}

const measureConfig = [
  { key: 'weightKg' as const, label: 'kg', icon: UserRound, gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', color: '#2563eb' },
  { key: 'waistCm' as const, label: 'cintura (cm)', icon: MoveHorizontal, gradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', color: '#7c3aed' },
  { key: 'armCm' as const, label: 'brazo (cm)', icon: ArrowLeftRight, gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', color: '#db2777' },
];

export function LatestMeasures({ data }: LatestMeasuresProps) {
  if (!data) return null;

  const hasMeasures = data.weightKg || data.waistCm || data.armCm;
  if (!hasMeasures) return null;

  return (
    <Card>
      <WidgetHeader 
        icon={<UserRound className="w-5 h-5 sm:w-6 sm:h-6" />}
        title="Últimas medidas"
        subtitle="Semana más reciente"
      />
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {measureConfig.map((config) => {
          const value = data[config.key as keyof WeeklyLog];
          if (value === null || value === undefined) return null;
          
          const Icon = config.icon;
          return (
            <div key={config.key} className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50/80 rounded-xl">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                style={{ background: config.gradient }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: config.color }} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 font-medium">{config.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
