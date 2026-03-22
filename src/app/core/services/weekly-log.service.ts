import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { WeeklyLog } from '../models/weekly-log.model';

@Injectable({
  providedIn: 'root'
})
export class WeeklyLogService {
  private supabase = inject(SupabaseService).getClient();

  async getByWeekStart(weekStart: string, userId: string): Promise<WeeklyLog | null> {
    const { data, error } = await this.supabase
      .from('weekly_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', weekStart)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching weekly log:', error);
      return null;
    }
    
    return data;
  }

  async save(log: Partial<WeeklyLog>, userId: string): Promise<WeeklyLog | null> {
    const existing = await this.getByWeekStart(log.week_start!, userId);
    
    if (existing) {
      const { data, error } = await this.supabase
        .from('weekly_logs')
        .update({ ...log, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating weekly log:', error);
        return null;
      }
      return data;
    } else {
      const { data, error } = await this.supabase
        .from('weekly_logs')
        .insert({ ...log, user_id: userId })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating weekly log:', error);
        return null;
      }
      return data;
    }
  }

  async getAll(userId: string): Promise<WeeklyLog[]> {
    const { data, error } = await this.supabase
      .from('weekly_logs')
      .select('*')
      .eq('user_id', userId)
      .order('week_start', { ascending: false });
    
    if (error) {
      console.error('Error fetching weekly logs:', error);
      return [];
    }
    
    return data || [];
  }

  async getRecent(userId: string, weeks: number = 12): Promise<WeeklyLog[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - weeks * 7);
    
    const { data, error } = await this.supabase
      .from('weekly_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('week_start', startDate.toISOString().split('T')[0])
      .order('week_start', { ascending: true });
    
    if (error) {
      console.error('Error fetching recent weekly logs:', error);
      return [];
    }
    
    return data || [];
  }
}
