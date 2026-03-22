import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DailyLog } from '../models/daily-log.model';

@Injectable({
  providedIn: 'root'
})
export class DailyLogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/daily-logs`;

  getByDate(date: string) {
    return this.http.get<DailyLog | null>(`${this.apiUrl}/${date}`);
  }

  save(log: Partial<DailyLog>, date: string) {
    return this.http.put<DailyLog>(`${this.apiUrl}/${date}`, log);
  }

  getHistory(days: number = 30) {
    return this.http.get<DailyLog[]>(`${this.apiUrl}/history?days=${days}`);
  }
}
