'use client';

import { Zap, Heart } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { WidgetHeader } from '@/components/ui/WidgetHeader';
import type { EnergyLevel, AppetiteLevel } from '@/types';

interface EnergyAppetiteProps {
  energy: EnergyLevel;
  appetite: AppetiteLevel;
  onEnergyChange: (value: EnergyLevel) => void;
  onAppetiteChange: (value: AppetiteLevel) => void;
}

const energyOptions: Array<{ value: EnergyLevel; label: string }> = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
];

const appetiteOptions: Array<{ value: AppetiteLevel; label: string }> = [
  { value: 'low', label: 'Bajo' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Alto' },
];

export function EnergyAppetite({ energy, appetite, onEnergyChange, onAppetiteChange }: EnergyAppetiteProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
      <Card>
        <WidgetHeader 
          icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Nivel de energía"
          subtitle="¿Cómo te sientes hoy?"
        />
        <div className="flex gap-2 sm:gap-3">
          {energyOptions.map((option) => {
            const isActive = energy === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onEnergyChange(option.value)}
                className={cn(
                  'flex-1 py-3 sm:py-4 px-2 rounded-xl font-semibold text-sm transition-all duration-200',
                  isActive 
                    ? 'bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white shadow-[0_4px_12px_rgba(13,148,136,0.3)]' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <WidgetHeader 
          icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#db2777' }} />}
          title="Apetito"
          subtitle="¿Cómo ha sido tu hambre hoy?"
          gradient="linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
          iconColor="#db2777"
        />
        <div className="flex gap-2 sm:gap-3">
          {appetiteOptions.map((option) => {
            const isActive = appetite === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onAppetiteChange(option.value)}
                className={cn(
                  'flex-1 py-3 sm:py-4 px-2 rounded-xl font-semibold text-sm transition-all duration-200',
                  isActive 
                    ? 'bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white shadow-[0_4px_12px_rgba(13,148,136,0.3)]' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
