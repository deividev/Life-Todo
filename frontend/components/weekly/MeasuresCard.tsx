'use client';

import { UserRound, MoveHorizontal, ArrowLeftRight } from 'lucide-react';

interface MeasuresCardProps {
  measures: {
    weight: number | null;
    waist: number | null;
    arm: number | null;
  };
  onChange: (field: 'weight' | 'waist' | 'arm', value: number | null) => void;
  onBlur: () => void;
}

const measureConfig = [
  { key: 'weight' as const, label: 'Peso', icon: UserRound, unit: 'kg', min: 30, max: 200, color: '#2563eb', gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
  { key: 'waist' as const, label: 'Cintura', icon: MoveHorizontal, unit: 'cm', min: 50, max: 150, color: '#7c3aed', gradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' },
  { key: 'arm' as const, label: 'Brazo', icon: ArrowLeftRight, unit: 'cm', min: 20, max: 50, color: '#db2777', gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
];

export function MeasuresCard({ measures, onChange, onBlur }: MeasuresCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-5">
      {measureConfig.map((config) => {
        const Icon = config.icon;
        return (
          <div 
            key={config.key}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-teal-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-1"
          >
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              style={{ background: config.gradient }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: config.color }} />
            </div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 block">
              {config.label}
            </label>
            <div className="relative">
              <input
                type="number"
                value={measures[config.key] ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(config.key, val ? parseFloat(val) : null);
                }}
                onBlur={onBlur}
                placeholder="--"
                min={config.min}
                max={config.max}
                step="0.1"
                className="w-full text-center font-semibold text-2xl sm:text-3xl text-slate-900 bg-transparent border-2 border-slate-200 rounded-xl py-3 px-2 transition-all duration-200 focus:outline-none focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">
                {config.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
