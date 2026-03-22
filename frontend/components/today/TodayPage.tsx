'use client';

import { useState, useEffect, useCallback } from 'react';
import { HeroSection } from './HeroSection';
import { MealGrid } from './MealGrid';
import { ActivitySelector } from './ActivitySelector';
import { EnergyAppetite } from './EnergyAppetite';
import { NoteSection } from './NoteSection';
import { Tag } from '@/components/ui/Tag';
import { getDailyLog, saveDailyLog } from '@/lib/api';
import { getCurrentDateMadrid, formatDateMadrid, getGreeting, getTodaySummary } from '@/lib/utils';
import type { DailyLog, ActivityType, EnergyLevel, AppetiteLevel } from '@/types';

export function TodayPage() {
  const currentDate = getCurrentDateMadrid();
  const [log, setLog] = useState<DailyLog | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false,
  });
  const [activityType, setActivityType] = useState<ActivityType>('none');
  const [energy, setEnergy] = useState<EnergyLevel>('medium');
  const [appetite, setAppetite] = useState<AppetiteLevel>('normal');
  const [note, setNote] = useState('');

  const loadLog = useCallback(async () => {
    setLoading(true);
    const data = await getDailyLog(currentDate);
    if (data) {
      setLog(data);
      setMeals({
        breakfast: data.breakfast,
        lunch: data.lunch,
        snack: data.snack,
        dinner: data.dinner,
      });
      setActivityType(data.activityType);
      setEnergy(data.energy);
      setAppetite(data.appetite);
      setNote(data.note || '');
    }
    setLoading(false);
  }, [currentDate]);

  useEffect(() => {
    loadLog();
  }, [loadLog]);

  const saveLog = useCallback(async () => {
    setSaving(true);
    try {
      const data = await saveDailyLog(currentDate, {
        date: currentDate,
        breakfast: meals.breakfast,
        lunch: meals.lunch,
        snack: meals.snack,
        dinner: meals.dinner,
        activityType,
        energy,
        appetite,
        note,
      });
      setLog(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error saving:', err);
    }
    setSaving(false);
  }, [currentDate, meals, activityType, energy, appetite, note]);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        saveLog();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [meals, activityType, energy, appetite, note, loading, saveLog]);

  const toggleMeal = (meal: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    setMeals(prev => ({ ...prev, [meal]: !prev[meal] }));
  };

  const greeting = getGreeting();
  const formattedDate = formatDateMadrid(currentDate);
  const summary = getTodaySummary(log);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-5 sm:mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{greeting}</h2>
          <p className="text-sm text-slate-500 mt-1 capitalize">{formattedDate}</p>
        </div>
        <Tag variant={saving ? 'warn' : 'success'} visible={saving || saved}>
          {saving ? 'Guardando...' : saved ? 'Guardado' : ''}
        </Tag>
      </div>

      <HeroSection
        greeting={greeting}
        formattedDate={formattedDate}
        summary={summary}
        mealsActive={meals}
      />

      <MealGrid meals={meals} onToggle={toggleMeal} />

      <ActivitySelector value={activityType} onChange={setActivityType} />

      <EnergyAppetite
        energy={energy}
        appetite={appetite}
        onEnergyChange={setEnergy}
        onAppetiteChange={setAppetite}
      />

      <NoteSection
        value={note}
        onChange={setNote}
        onBlur={saveLog}
      />
    </div>
  );
}
