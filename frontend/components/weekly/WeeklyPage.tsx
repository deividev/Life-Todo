'use client';

import { useState, useEffect, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { WeekSelector } from './WeekSelector';
import { MeasuresCard } from './MeasuresCard';
import { FeelingSelector } from './FeelingSelector';
import { WeeklyNote } from './WeeklyNote';
import { Tag } from '@/components/ui/Tag';
import { getWeeklyLog, saveWeeklyLog } from '@/lib/api';
import { getWeekStartMadrid, getWeekOptions, formatWeekLabel } from '@/lib/utils';
import type { WeeklyFeeling } from '@/types';

export function WeeklyPage() {
  const weekOptions = getWeekOptions(12);
  const [selectedWeek, setSelectedWeek] = useState(getWeekStartMadrid());
  
  const [weight, setWeight] = useState<number | null>(null);
  const [waist, setWaist] = useState<number | null>(null);
  const [arm, setArm] = useState<number | null>(null);
  const [feeling, setFeeling] = useState<WeeklyFeeling | null>(null);
  const [note, setNote] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadWeekLog = useCallback(async () => {
    setLoading(true);
    const data = await getWeeklyLog(selectedWeek);
    if (data) {
      setWeight(data.weightKg ?? null);
      setWaist(data.waistCm ?? null);
      setArm(data.armCm ?? null);
      setFeeling(data.weeklyFeeling ?? null);
      setNote(data.note || '');
    } else {
      setWeight(null);
      setWaist(null);
      setArm(null);
      setFeeling(null);
      setNote('');
    }
    setLoading(false);
  }, [selectedWeek]);

  useEffect(() => {
    loadWeekLog();
  }, [loadWeekLog]);

  const saveLog = useCallback(async () => {
    setSaving(true);
    try {
      await saveWeeklyLog(selectedWeek, {
        weekStart: selectedWeek,
        weightKg: weight ?? undefined,
        waistCm: waist ?? undefined,
        armCm: arm ?? undefined,
        weeklyFeeling: feeling ?? undefined,
        note: note || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error saving:', err);
    }
    setSaving(false);
  }, [selectedWeek, weight, waist, arm, feeling, note]);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        saveLog();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [weight, waist, arm, feeling, note, loading, saveLog]);

  const selectedWeekLabel = formatWeekLabel(selectedWeek);

  return (
    <div className="animate-fade-in">
      <div className="mb-5 sm:mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Registro Semanal</h2>
          <p className="text-sm text-slate-500 mt-1">{selectedWeekLabel}</p>
        </div>
        <Tag variant={saving ? 'warn' : 'success'} visible={saving || saved}>
          {saving ? 'Guardando...' : saved ? 'Guardado' : ''}
        </Tag>
      </div>

      <div className="bg-gradient-to-br from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(59,130,246,0.35)]">
        <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex items-center gap-4 sm:gap-5 relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
            <SlidersHorizontal className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Medidas corporales</h3>
            <p className="text-sm sm:text-base text-white/80 mt-1">Registra tu progreso semanal</p>
          </div>
        </div>
      </div>

      <WeekSelector options={weekOptions} value={selectedWeek} onChange={setSelectedWeek} />

      <MeasuresCard
        measures={{ weight, waist, arm }}
        onChange={(field, value) => {
          if (field === 'weight') setWeight(value);
          else if (field === 'waist') setWaist(value);
          else setArm(value);
        }}
        onBlur={saveLog}
      />

      <FeelingSelector value={feeling} onChange={setFeeling} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WeeklyNote value={note} onChange={setNote} onBlur={saveLog} />
      </div>
    </div>
  );
}
