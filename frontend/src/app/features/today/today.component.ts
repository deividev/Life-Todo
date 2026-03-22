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
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-text">{{ formattedDate() }}</h2>
          <p class="text-sm text-text-muted mt-0.5">{{ greeting() }}</p>
        </div>
        <div class="flex items-center gap-2">
          @if (saving()) {
            <div class="flex items-center gap-2 text-text-muted text-sm">
              <div class="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              Guardando
            </div>
          } @else if (saved()) {
            <div class="flex items-center gap-1.5 text-success text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          Comidas del día
        </h3>
        <div class="grid grid-cols-2 gap-3">
          @for (meal of meals; track meal.key) {
            <button
              (click)="toggleMeal(meal.key)"
              [class]="mealClasses(meal.key)"
            >
              <span class="text-3xl mb-1.5 block">{{ meal.icon }}</span>
              <span class="block text-sm font-medium">{{ meal.label }}</span>
              @if (isMealActive(meal.key)) {
                <span class="mt-1.5 w-2 h-2 rounded-full bg-primary block mx-auto"></span>
              }
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
          Actividad física
        </h3>
        <div class="grid grid-cols-2 gap-2">
          @for (activity of activities; track activity.value) {
            <button
              (click)="setActivity(activity.value)"
              [class]="activityClasses(activity.value)"
            >
              <span class="text-xl mb-0.5 block">{{ activity.icon }}</span>
              <span class="text-sm font-medium">{{ activity.label }}</span>
            </button>
          }
        </div>
      </section>

      <div class="grid grid-cols-2 gap-4">
        <section class="card">
          <h3 class="card-header text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                {{ level.label }}
              </button>
            }
          </div>
        </section>

        <section class="card">
          <h3 class="card-header text-xs">
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
                {{ level.label }}
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
          Notas
        </h3>
        <textarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Cómo te sientes hoy? ¿Algo relevante que recordar?"
          rows="3"
          class="input-field resize-none"
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
    { key: 'breakfast' as const, label: 'Desayuno', icon: '🌅' },
    { key: 'lunch' as const, label: 'Almuerzo', icon: '☀️' },
    { key: 'snack' as const, label: 'Merienda', icon: '🍪' },
    { key: 'dinner' as const, label: 'Cena', icon: '🌙' }
  ];

  activities: { value: ActivityType; label: string; icon: string }[] = [
    { value: 'none', label: 'Ninguna', icon: '🚫' },
    { value: 'walk', label: 'Paseo', icon: '🚶' },
    { value: 'exercise', label: 'Ejercicio', icon: '🏋️' },
    { value: 'walk_and_exercise', label: 'Ambos', icon: '💪' }
  ];

  energyLevels: { value: EnergyLevel; label: string }[] = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' }
  ];

  appetiteLevels: { value: AppetiteLevel; label: string }[] = [
    { value: 'low', label: 'Bajo' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Alto' }
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
    const isActive = (this.log() as any)[key];
    return `
      btn-option ${isActive ? 'btn-option-active' : ''}
    `;
  }

  activityClasses(value: string): string {
    const isActive = this.log().activityType === value;
    return `
      btn-option py-3 ${isActive ? 'btn-option-active' : ''}
    `;
  }

  selectorClasses(type: 'energy' | 'appetite', value: string): string {
    const currentValue = type === 'energy' ? this.log().energy : this.log().appetite;
    const isActive = currentValue === value;
    return `
      btn-selector ${isActive ? 'btn-selector-active' : ''}
    `;
  }

  isMealActive(key: string): boolean {
    return !!(this.log() as any)[key];
  }
}
