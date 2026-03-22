import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeeklyLogService } from '../../core/services/weekly-log.service';
import { WeeklyLog, WeeklyFeeling } from '../../core/models/weekly-log.model';
import { getWeekStartMadrid, getWeekOptions } from '../../shared/utils/timezone';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="animate-fade-in space-y-5">
      <div class="page-header flex items-start justify-between">
        <div>
          <h2 class="page-title">Registro Semanal</h2>
          <p class="page-subtitle">{{ selectedWeekLabel }}</p>
        </div>
        <div class="flex items-center gap-2 mt-1">
          @if (saving()) {
            <div class="status-badge status-saving">
              <div class="w-3 h-3 border-2 border-warning/30 border-t-warning rounded-full animate-spin"></div>
              Guardando
            </div>
          } @else if (saved()) {
            <div class="status-badge status-saved">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Guardado
            </div>
          }
        </div>
      </div>

      <section class="card">
        <h3 class="card-header text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Semana
        </h3>
        <div class="relative">
          <select
            [(ngModel)]="selectedWeek"
            (change)="onWeekChange()"
            class="select-custom pr-10 cursor-pointer"
          >
          @for (option of weekOptions; track option.weekStart) {
            <option [value]="option.weekStart">{{ option.label }}</option>
          }
          </select>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>

      <section class="card">
        <h3 class="card-header text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2v20"></path>
            <path d="M18 2v20"></path>
            <path d="M6 12h12"></path>
            <path d="M6 7h12"></path>
            <path d="M6 17h12"></path>
          </svg>
          Medidas
        </h3>
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center">
            <label class="block text-xs text-text-muted font-medium mb-2">Peso</label>
            <div class="relative">
              <input
                type="number"
                step="0.1"
                min="30"
                max="200"
                [(ngModel)]="weight"
                (blur)="save()"
                placeholder="--"
                class="input-number"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-medium">kg</span>
            </div>
          </div>
          <div class="text-center">
            <label class="block text-xs text-text-muted font-medium mb-2">Cintura</label>
            <div class="relative">
              <input
                type="number"
                step="0.1"
                min="50"
                max="150"
                [(ngModel)]="waist"
                (blur)="save()"
                placeholder="--"
                class="input-number"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-medium">cm</span>
            </div>
          </div>
          <div class="text-center">
            <label class="block text-xs text-text-muted font-medium mb-2">Brazo</label>
            <div class="relative">
              <input
                type="number"
                step="0.1"
                min="20"
                max="50"
                [(ngModel)]="arm"
                (blur)="save()"
                placeholder="--"
                class="input-number"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-medium">cm</span>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h3 class="card-header text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          ¿Cómo te sientes?
        </h3>
        <div class="flex gap-3">
          @for (f of feelings; track f.value) {
            <button
              (click)="setFeeling(f.value)"
              [class]="feelingClasses(f.value)"
            >
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-200"
                   [class.bg-danger/10]="f.value === 'worse' && feeling === f.value"
                   [class.bg-text-muted/10]="f.value === 'same' && feeling === f.value"
                   [class.bg-success/10]="f.value === 'better' && feeling === f.value"
                   [class.bg-bg-warm]="feeling !== f.value">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     [class.text-danger]="f.value === 'worse' && feeling === f.value"
                     [class.text-text-muted]="f.value === 'same' && feeling === f.value"
                     [class.text-success]="f.value === 'better' && feeling === f.value"
                     [class.text-text-muted/50]="feeling !== f.value">
                  @switch (f.value) {
                    @case ('worse') {
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    }
                    @case ('same') {
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="15" x2="16" y2="15"></line>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    }
                    @case ('better') {
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    }
                  }
                </svg>
              </div>
              <span class="text-xs font-semibold" [class.text-danger]="f.value === 'worse' && feeling === f.value"
                    [class.text-success]="f.value === 'better' && feeling === f.value"
                    [class.text-text-muted]="feeling !== f.value">{{ f.label }}</span>
            </button>
          }
        </div>
      </section>

      <section class="card">
        <h3 class="card-header text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          Nota semanal
        </h3>
        <textarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Qué tal fue esta semana? Logros, desafíos, observaciones..."
          rows="4"
          class="textarea-custom"
        ></textarea>
      </section>

      @if (weeklyLog()) {
        <div class="section-divider"></div>
        
        <section class="card-elevated">
          <h3 class="card-header text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Resumen de la semana
          </h3>
          <div class="grid grid-cols-3 gap-3">
            <div class="metric-card">
              <div class="metric-value">{{ weeklyLog()!.weightKg || '--' }}</div>
              <div class="metric-label">kg</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">{{ weeklyLog()!.waistCm || '--' }}</div>
              <div class="metric-label">cintura</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">{{ weeklyLog()!.armCm || '--' }}</div>
              <div class="metric-label">brazo</div>
            </div>
          </div>
        </section>
      }
    </div>
  `
})
export class WeeklyComponent implements OnInit {
  private weeklyLogService = inject(WeeklyLogService);

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

  feelings: { value: WeeklyFeeling; label: string }[] = [
    { value: 'worse', label: 'Peor' },
    { value: 'same', label: 'Igual' },
    { value: 'better', label: 'Mejor' }
  ];

  get selectedWeekLabel(): string {
    const option = this.weekOptions.find(o => o.weekStart === this.selectedWeek);
    return option?.label || '';
  }

  ngOnInit() {
    this.loadWeekLog();
  }

  loadWeekLog() {
    this.weeklyLogService.getByWeekStart(this.selectedWeek).subscribe({
      next: (existing) => {
        if (existing) {
          this.weeklyLog.set(existing);
          this.weight = existing.weightKg ?? null;
          this.waist = existing.waistCm ?? null;
          this.arm = existing.armCm ?? null;
          this.feeling = existing.weeklyFeeling ?? null;
          this.note = existing.note || '';
        } else {
          this.weeklyLog.set(null);
          this.weight = null;
          this.waist = null;
          this.arm = null;
          this.feeling = null;
          this.note = '';
        }
      },
      error: (err) => console.error('Error loading weekly log:', err)
    });
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

  save() {
    this.saving.set(true);
    
    const logData: Partial<WeeklyLog> = {
      weekStart: this.selectedWeek,
      weightKg: this.weight ?? undefined,
      waistCm: this.waist ?? undefined,
      armCm: this.arm ?? undefined,
      weeklyFeeling: this.feeling ?? undefined,
      note: this.note || undefined
    };

    this.weeklyLogService.save(logData, this.selectedWeek).subscribe({
      next: (saved) => {
        this.saving.set(false);
        if (saved) {
          this.weeklyLog.set(saved);
          this.saved.set(true);
          setTimeout(() => this.saved.set(false), 2000);
        }
      },
      error: (err) => {
        console.error('Error saving:', err);
        this.saving.set(false);
      }
    });
  }

  feelingClasses(value: string | undefined): string {
    if (!value) return 'feeling-btn';
    const isActive = this.feeling === value;
    return isActive ? 'feeling-btn feeling-btn-active' : 'feeling-btn';
  }
}
