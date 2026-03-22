'use client';

import { Sun, Coffee, Apple, Moon, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/cn';

interface HeroSectionProps {
  greeting: string;
  formattedDate: string;
  summary: string;
  mealsActive: {
    breakfast: boolean;
    lunch: boolean;
    snack: boolean;
    dinner: boolean;
  };
}

const mealIcons = {
  breakfast: Sun,
  lunch: Coffee,
  snack: Apple,
  dinner: Moon,
};

const mealGradients = {
  breakfast: 'from-[#fef9c3] to-[#fef08a]',
  lunch: 'from-[#fed7aa] to-[#fdba74]',
  snack: 'from-[#e9d5ff] to-[#c4b5fd]',
  dinner: 'from-[#bfdbfe] to-[#93c5fd]',
};

const mealIconColors = {
  breakfast: '#ca8a04',
  lunch: '#ea580c',
  snack: '#7c3aed',
  dinner: '#2563eb',
};

export function HeroSection({ greeting, formattedDate, summary, mealsActive }: HeroSectionProps) {
  const activeMeals = Object.entries(mealsActive).filter(([, active]) => active);

  return (
    <div className="bg-gradient-to-br from-[#0d9488] via-[#0d9488] to-[#059669] rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(13,148,136,0.35)]">
      <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="flex items-start justify-between relative">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
            <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{greeting}</h3>
            <p className="text-sm sm:text-base text-white/80 mt-1 capitalize">{formattedDate}</p>
            <p className="text-sm sm:text-base text-white/80 mt-1">{summary}</p>
          </div>
        </div>
        
        {activeMeals.length > 0 && (
          <div className="hidden sm:flex gap-2 sm:gap-3">
            {activeMeals.map(([meal]) => {
              const Icon = mealIcons[meal as keyof typeof mealIcons];
              return (
                <div
                  key={meal}
                  className={cn(
                    'w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
                    mealGradients[meal as keyof typeof mealGradients]
                  )}
                >
                  <Icon className="w-full h-full p-2.5 sm:p-3" style={{ color: mealIconColors[meal as keyof typeof mealIconColors] }} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
