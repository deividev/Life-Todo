import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailyLogService } from '../../core/services/daily-log.service';
import { DailyLog, ActivityType, EnergyLevel, AppetiteLevel } from '../../core/models/daily-log.model';
import { getCurrentDateMadrid } from '../../shared/utils/timezone';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="animate-fade-in space-y-5">
      <div class="page-header flex items-start justify-between">
        <div>
          <h2 class="page-title">{{ formattedDate() }}</h2>
          <p class="page-subtitle">{{ greeting() }}</p>
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
        <h3 class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
            <path d="M7 2v20"></path>
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
          </svg>
          Comidas
        </h3>
        <div class="grid grid-cols-4 gap-2.5">
          @for (meal of meals; track meal.key) {
            <button
              (click)="toggleMeal(meal.key)"
              [class]="mealClasses(meal.key)"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-200"
                   [class.bg-primary-light]="isMealActive(meal.key)"
                   [class.bg-bg-warm]="!isMealActive(meal.key)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" [class.text-primary]="isMealActive(meal.key)" [class.text-text-muted]="!isMealActive(meal.key)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  @switch (meal.key) {
                    @case ('breakfast') {
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    }
                    @case ('lunch') {
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    }
                    @case ('snack') {
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                      <path d="M8.5 8.5v.01"></path>
                      <path d="M16 15.5v.01"></path>
                      <path d="M12 12v.01"></path>
                      <path d="M11 17v.01"></path>
                      <path d="M7 14v.01"></path>
                    }
                    @case ('dinner') {
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    }
                  }
                </svg>
              </div>
              <span class="text-xs font-semibold" [class.text-primary]="isMealActive(meal.key)" [class.text-text-muted]="!isMealActive(meal.key)">{{ meal.label }}</span>
            </button>
          }
        </div>
      </section>

      <section class="card">
        <h3 class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 16 4-4-4-4"></path>
            <path d="m6 8-4 4 4 4"></path>
            <path d="m14.5 4-5 16"></path>
          </svg>
          Actividad
        </h3>
        <div class="grid grid-cols-4 gap-2.5">
          @for (activity of activities; track activity.value) {
            <button
              (click)="setActivity(activity.value)"
              [class]="activityClasses(activity.value)"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-200"
                   [class.bg-primary-light]="isActivityActive(activity.value)"
                   [class.bg-bg-warm]="!isActivityActive(activity.value)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" [class.text-primary]="isActivityActive(activity.value)" [class.text-text-muted]="!isActivityActive(activity.value)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  @switch (activity.value) {
                    @case ('none') {
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    }
                    @case ('walk') {
                      <circle cx="12" cy="5" r="1"></circle>
                      <path d="m9 20 3-6 3 6"></path>
                      <path d="m6 8 6 2 6-2"></path>
                      <path d="M12 10v4"></path>
                    }
                    @case ('exercise') {
                      <path d="m18 16 4-4-4-4"></path>
                      <path d="m6 8-4 4 4 4"></path>
                      <path d="M14.5 4h-5l-1 16"></path>
                    }
                    @case ('walk_and_exercise') {
                      <path d="m18 16 4-4-4-4"></path>
                      <path d="m6 8-4 4 4 4"></path>
                      <path d="m14.5 4-1 7h3l-1 5"></path>
                      <path d="M10 12h4"></path>
                    }
                  }
                </svg>
              </div>
              <span class="text-xs font-semibold" [class.text-primary]="isActivityActive(activity.value)" [class.text-text-muted]="!isActivityActive(activity.value)">{{ activity.label }}</span>
            </button>
          }
        </div>
      </section>

      <div class="grid grid-cols-2 gap-4">
        <section class="card py-4">
          <h3 class="card-header text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Energía
          </h3>
          <div class="flex gap-1.5">
            @for (level of energyLevels; track level.value) {
              <button
                (click)="setEnergy(level.value)"
                [class]="selectorClasses('energy', level.value)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-auto mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  @switch (level.value) {
                    @case ('low') {
                      <path d="M18.364 5.636a9 9 0 1 1-12.728 0"></path>
                    }
                    @case ('medium') {
                      <path d="M18.364 5.636a9 9 0 1 1-12.728 0"></path>
                      <path d="M12 12v.01"></path>
                    }
                    @case ('high') {
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    }
                  }
                </svg>
                {{ level.shortLabel }}
              </button>
            }
          </div>
        </section>

        <section class="card py-4">
          <h3 class="card-header text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12h6"></path>
              <path d="M22 12h-6"></path>
              <path d="M12 2v6"></path>
              <path d="M12 22v-6"></path>
            </svg>
            Apetito
          </h3>
          <div class="flex gap-1.5">
            @for (level of appetiteLevels; track level.value) {
              <button
                (click)="setAppetite(level.value)"
                [class]="selectorClasses('appetite', level.value)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-auto mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  @switch (level.value) {
                    @case ('low') {
                      <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
                      <path d="M12 2a10 10 0 0 1 10 10"></path>
                      <path d="M12 12v4"></path>
                    }
                    @case ('normal') {
                      <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
                      <path d="M12 12v4"></path>
                      <path d="M12 16h.01"></path>
                    }
                    @case ('high') {
                      <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
                      <path d="M12 12v4"></path>
                      <path d="M8 16h8"></path>
                    }
                  }
                </svg>
                {{ level.shortLabel }}
              </button>
            }
          </div>
        </section>
      </div>

      <section class="card">
        <h3 class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          Nota
        </h3>
        <textarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Cómo te sientes hoy? ¿Algo relevante que recordar?"
          rows="3"
          class="textarea-custom"
        ></textarea>
      </section>
    </div>
  `
})
export class TodayComponent {
  private dailyLogService = inject(DailyLogService);

  currentDate = getCurrentDateMadrid();
  note = '';
  saving = signal(false);
  saved = signal(false);

  log = signal<Partial<DailyLog>>({
    date: this.currentDate,
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false,
    activityType: 'none',
    energy: 'medium',
    appetite: 'normal'
  });

  meals = [
    { key: 'breakfast' as const, label: 'Desayuno', icon: 'sun' },
    { key: 'lunch' as const, label: 'Almuerzo', icon: 'cup' },
    { key: 'snack' as const, label: 'Merienda', icon: 'cookie' },
    { key: 'dinner' as const, label: 'Cena', icon: 'moon' }
  ];

  activities: { value: ActivityType; label: string }[] = [
    { value: 'none', label: 'Ninguna' },
    { value: 'walk', label: 'Paseo' },
    { value: 'exercise', label: 'Ejercicio' },
    { value: 'walk_and_exercise', label: 'Ambos' }
  ];

  energyLevels: { value: EnergyLevel; label: string; shortLabel: string }[] = [
    { value: 'low', label: 'Baja', shortLabel: 'B' },
    { value: 'medium', label: 'Media', shortLabel: 'M' },
    { value: 'high', label: 'Alta', shortLabel: 'A' }
  ];

  appetiteLevels: { value: AppetiteLevel; label: string; shortLabel: string }[] = [
    { value: 'low', label: 'Bajo', shortLabel: 'B' },
    { value: 'normal', label: 'Normal', shortLabel: 'N' },
    { value: 'high', label: 'Alto', shortLabel: 'A' }
  ];

  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  });

  formattedDate = computed(() => {
    const date = new Date(this.currentDate + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  });

  constructor() {
    this.loadTodayLog();
    
    effect(() => {
      const currentLog = this.log();
      this.autoSave(currentLog);
    });
  }

  loadTodayLog() {
    this.dailyLogService.getByDate(this.currentDate).subscribe({
      next: (existing) => {
        if (existing) {
          this.log.set(existing);
          this.note = existing.note || '';
        }
      },
      error: (err) => console.error('Error loading daily log:', err)
    });
  }

  toggleMeal(key: 'breakfast' | 'lunch' | 'snack' | 'dinner') {
    const current = this.log();
    this.log.set({ ...current, [key]: !current[key] });
  }

  setActivity(value: ActivityType) {
    const current = this.log();
    this.log.set({ ...current, activityType: value });
  }

  setEnergy(value: EnergyLevel) {
    const current = this.log();
    this.log.set({ ...current, energy: value });
  }

  setAppetite(value: AppetiteLevel) {
    const current = this.log();
    this.log.set({ ...current, appetite: value });
  }

  saveNote() {
    const current = this.log();
    this.log.set({ ...current, note: this.note });
  }

  autoSave(currentLog: Partial<DailyLog>) {
    this.saving.set(true);
    this.dailyLogService.save({ ...currentLog, date: this.currentDate }, this.currentDate).subscribe({
      next: () => {
        this.saving.set(false);
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 2000);
      },
      error: (err) => {
        console.error('Error saving:', err);
        this.saving.set(false);
      }
    });
  }

  mealClasses(key: string): string {
    return 'btn-option py-3';
  }

  activityClasses(value: string): string {
    return 'btn-option py-3';
  }

  selectorClasses(type: 'energy' | 'appetite', value: string): string {
    const currentValue = type === 'energy' ? this.log().energy : this.log().appetite;
    return currentValue === value ? 'btn-selector btn-selector-active' : 'btn-selector';
  }

  isMealActive(key: string): boolean {
    return !!(this.log() as any)[key];
  }

  isActivityActive(value: string): boolean {
    return this.log().activityType === value;
  }
}
