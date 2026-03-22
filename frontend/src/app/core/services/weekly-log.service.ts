import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WeeklyLog } from '../models/weekly-log.model';

@Injectable({
  providedIn: 'root'
})
export class WeeklyLogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/weekly-logs`;

  getByWeekStart(weekStart: string) {
    return this.http.get<WeeklyLog | null>(`${this.apiUrl}/${weekStart}`);
  }

  save(log: Partial<WeeklyLog>, weekStart: string) {
    return this.http.put<WeeklyLog>(`${this.apiUrl}/${weekStart}`, log);
  }

  getRecent(weeks: number = 12) {
    return this.http.get<WeeklyLog[]>(`${this.apiUrl}/recent?weeks=${weeks}`);
  }
}
