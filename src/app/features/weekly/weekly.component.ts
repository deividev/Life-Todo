import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeeklyLogService } from '../../core/services/weekly-log.service';
import { AuthService } from '../../core/services/auth.service';
import { WeeklyLog, WeeklyFeeling } from '../../core/models/weekly-log.model';
import { getCurrentDateMadrid, getWeekStartMadrid, getWeekOptions, formatWeekRange } from '../../shared/utils/timezone';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">Registro Semanal</h2>
        @if (saving()) {
          <span class="text-sm text-text-muted">Guardando...</span>
        } @else if (saved()) {
          <span class="text-sm text-success">Guardado</span>
        }
      </div>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3">Semana</h3>
        <select
          [(ngModel)]="selectedWeek"
          (change)="onWeekChange()"
          class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none"
        >
          @for (option of weekOptions; track option.weekStart) {
            <option [value]="option.weekStart">{{ option.label }}</option>
          }
        </select>
      </section>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <span class="text-xl">⚖️</span> Medidas
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm text-text-muted mb-1">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              min="30"
              max="200"
              [(ngModel)]="weight"
              (blur)="save()"
              placeholder="70.0"
              class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm text-text-muted mb-1">Cintura (cm)</label>
            <input
              type="number"
              step="0.1"
              min="50"
              max="150"
              [(ngModel)]="waist"
              (blur)="save()"
              placeholder="80.0"
              class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm text-text-muted mb-1">Brazo (cm)</label>
            <input
              type="number"
              step="0.1"
              min="20"
              max="50"
              [(ngModel)]="arm"
              (blur)="save()"
              placeholder="30.0"
              class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
        </div>
      </section>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <span class="text-xl">😊</span> ¿Cómo te sientes?
        </h3>
        <div class="flex gap-3">
          @for (feeling of feelings; track feeling.value) {
            <button
              (click)="setFeeling(feeling.value)"
              [class]="feelingClasses(feeling.value)"
            >
              <span class="text-2xl mb-1">{{ feeling.icon }}</span>
              <span class="block text-sm">{{ feeling.label }}</span>
            </button>
          }
        </div>
      </section>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <span class="text-xl">📝</span> Nota semanal
        </h3>
        <textarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Qué tal fue esta semana? Logros, desafíos..."
          rows="4"
          class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
        ></textarea>
      </section>

      @if (weeklyLog()) {
        <section class="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 class="font-semibold mb-3">Resumen</h3>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">{{ weeklyLog()!.weight_kg || '-' }}</div>
              <div class="text-sm text-text-muted">kg</div>
            </div>
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">{{ weeklyLog()!.waist_cm || '-' }}</div>
              <div class="text-sm text-text-muted">cm cintura</div>
            </div>
          </div>
        </section>
      }
    </div>
  `
})
export class WeeklyComponent implements OnInit {
  private weeklyLogService = inject(WeeklyLogService);
  private authService = inject(AuthService);

  weekOptions = getWeekOptions(12);
  selectedWeek = getWeekStartMadrid();
  
  weight: number | null = null;
  waist: number | null = null;
  arm: number | null = null;
  feeling: WeeklyFeeling | null = null;
  note = '';
  
  weeklyLog = signal<WeeklyLog | null>(null);
  saving = signal(false);
  saved = signal(false);

  feelings: { value: WeeklyFeeling; label: string; icon: string }[] = [
    { value: 'worse', label: 'Peor', icon: '😔' },
    { value: 'same', label: 'Igual', icon: '😐' },
    { value: 'better', label: 'Mejor', icon: '😊' }
  ];

  ngOnInit() {
    this.loadWeekLog();
  }

  async loadWeekLog() {
    const user = this.authService.user();
    if (!user) return;

    const existing = await this.weeklyLogService.getByWeekStart(this.selectedWeek, user.id);
    if (existing) {
      this.weeklyLog.set(existing);
      this.weight = existing.weight_kg ?? null;
      this.waist = existing.waist_cm ?? null;
      this.arm = existing.arm_cm ?? null;
      this.feeling = existing.weekly_feeling ?? null;
      this.note = existing.note || '';
    } else {
      this.weeklyLog.set(null);
      this.weight = null;
      this.waist = null;
      this.arm = null;
      this.feeling = null;
      this.note = '';
    }
  }

  onWeekChange() {
    this.loadWeekLog();
  }

  setFeeling(value: WeeklyFeeling) {
    this.feeling = value;
    this.save();
  }

  saveNote() {
    this.save();
  }

  async save() {
    const user = this.authService.user();
    if (!user) return;

    this.saving.set(true);
    
    const logData: Partial<WeeklyLog> = {
      week_start: this.selectedWeek,
      weight_kg: this.weight ?? undefined,
      waist_cm: this.waist ?? undefined,
      arm_cm: this.arm ?? undefined,
      weekly_feeling: this.feeling ?? undefined,
      note: this.note || undefined
    };

    const saved = await this.weeklyLogService.save(logData, user.id);
    
    this.saving.set(false);
    if (saved) {
      this.weeklyLog.set(saved);
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2000);
    }
  }

  feelingClasses(value: string | undefined): string {
    if (!value) return '';
    const isActive = this.feeling === value;
    return `
      flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition
      ${isActive 
        ? 'border-primary bg-primary/10 text-primary' 
        : 'border-border bg-background text-text-muted hover:border-primary/50'}
    `;
  }
}
