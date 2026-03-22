import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { DailyLog } from '../models/daily-log.model';

@Injectable({
  providedIn: 'root'
})
export class DailyLogService {
  private supabase = inject(SupabaseService).getClient();

  async getByDate(date: string, userId: string): Promise<DailyLog | null> {
    const { data, error } = await this.supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching daily log:', error);
      return null;
    }
    
    return data;
  }

  async save(log: Partial<DailyLog>, userId: string): Promise<DailyLog | null> {
    const existing = await this.getByDate(log.date!, userId);
    
    if (existing) {
      const { data, error } = await this.supabase
        .from('daily_logs')
        .update({ ...log, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating daily log:', error);
        return null;
      }
      return data;
    } else {
      const { data, error } = await this.supabase
        .from('daily_logs')
        .insert({ ...log, user_id: userId })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating daily log:', error);
        return null;
      }
      return data;
    }
  }

  async getHistory(userId: string, days: number = 30): Promise<DailyLog[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data, error } = await this.supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching history:', error);
      return [];
    }
    
    return data || [];
  }
}
