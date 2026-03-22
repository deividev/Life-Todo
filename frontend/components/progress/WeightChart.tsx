'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface WeightChartProps {
  data: Array<{ week: string; weight: number }>;
}

export function WeightChart({ data }: WeightChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-10 sm:py-14 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] font-medium">
            Registra tu peso semanalmente para ver la evolución
          </p>
        </div>
      </Card>
    );
  }

  const chartData = data.map(item => ({
    ...item,
    weekLabel: format(parseISO(item.week), 'd MMM', { locale: es }),
  }));

  return (
    <Card>
      <div className="h-[200px] sm:h-[240px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="weekLabel" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(0,0,0,0.04)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value} kg`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: 'none',
                borderRadius: 12,
                padding: 14,
              }}
              formatter={(value) => [`${value} kg`, 'Peso']}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#0d9488" 
              strokeWidth={3}
              dot={{ fill: '#ffffff', stroke: '#0d9488', strokeWidth: 3, r: 6 }}
              activeDot={{ fill: '#0d9488', stroke: '#ffffff', strokeWidth: 2, r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
