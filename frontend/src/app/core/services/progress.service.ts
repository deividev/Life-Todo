import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/progress`;

  getSummary() {
    return this.http.get<any>(`${this.apiUrl}/summary`);
  }
}
