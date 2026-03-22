'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { WeightChart } from './WeightChart';
import { MealStats } from './MealStats';
import { LatestMeasures } from './LatestMeasures';
import { getProgressSummary } from '@/lib/api';
import type { ProgressSummary } from '@/types';

export function ProgressPage() {
  const [data, setData] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await getProgressSummary();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500">Cargando...</div>
      </div>
    );
  }

  const weightChange = data?.weightData && data.weightData.length >= 2
    ? Math.round((data.weightData[data.weightData.length - 1].weight - data.weightData[0].weight) * 10) / 10
    : null;

  return (
    <div className="animate-fade-in">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Tu Progreso</h2>
        <p className="text-sm text-slate-500 mt-1">Resumen de las últimas semanas</p>
      </div>

      <div className="bg-gradient-to-br from-[#059669] via-[#0d9488] to-[#14b8a6] rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(16,185,129,0.35)]">
        <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex items-start justify-between relative">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Evolución de peso</h3>
              <p className="text-sm sm:text-base text-white/80 mt-1">Últimas 12 semanas</p>
            </div>
          </div>
          {weightChange !== null && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-sm sm:text-base backdrop-blur-sm ${
              weightChange < 0 
                ? 'bg-emerald-400/30 text-emerald-200' 
                : weightChange > 0 
                  ? 'bg-red-400/30 text-red-200' 
                  : 'bg-white/20 text-white'
            }`}>
              {weightChange < 0 ? <ArrowDown className="w-4 h-4" /> : weightChange > 0 ? <ArrowUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              <span>{weightChange > 0 ? '+' : ''}{weightChange} kg</span>
            </div>
          )}
        </div>
      </div>

      <WeightChart data={data?.weightData || []} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <LatestMeasures data={data?.latestWeekly} />
        <div className="lg:col-span-2">
          <MealStats stats={data?.mealStats || { breakfast: 0, lunch: 0, snack: 0, dinner: 0 }} />
        </div>
      </div>
    </div>
  );
}
