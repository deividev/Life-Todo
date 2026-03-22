import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailyLogService } from '../../core/services/daily-log.service';
import { AuthService } from '../../core/services/auth.service';
import { DailyLog, ActivityType, EnergyLevel, AppetiteLevel } from '../../core/models/daily-log.model';
import { getCurrentDateMadrid } from '../../shared/utils/timezone';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">{{ formattedDate() }}</h2>
        @if (saving()) {
          <span class="text-sm text-text-muted">Guardando...</span>
        } @else if (saved()) {
          <span class="text-sm text-success">Guardado</span>
        }
      </div>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <span class="text-xl">🍽️</span> Comidas
        </h3>
        <div class="grid grid-cols-2 gap-3">
          @for (meal of meals; track meal.key) {
            <button
              (click)="toggleMeal(meal.key)"
              [class]="mealClasses(meal.key)"
            >
              <span class="text-2xl mb-1">{{ meal.icon }}</span>
              <span class="block text-sm">{{ meal.label }}</span>
            </button>
          }
        </div>
      </section>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <span class="text-xl">🏃</span> Actividad
        </h3>
        <div class="grid grid-cols-2 gap-2">
          @for (activity of activities; track activity.value) {
            <button
              (click)="setActivity(activity.value)"
              [class]="activityClasses(activity.value)"
            >
              {{ activity.label }}
            </button>
          }
        </div>
      </section>

      <div class="grid grid-cols-2 gap-4">
        <section class="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="text-xl">⚡</span> Energía
          </h3>
          <div class="flex gap-2">
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

        <section class="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="text-xl">🍴</span> Apetito
          </h3>
          <div class="flex gap-2">
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

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <span class="text-xl">📝</span> Nota
        </h3>
        <textarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Cómo te sientes hoy?"
          rows="3"
          class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
        ></textarea>
      </section>
    </div>
  `
})
export class TodayComponent {
  private dailyLogService = inject(DailyLogService);
  private authService = inject(AuthService);

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
    activity_type: 'none',
    energy: 'medium',
    appetite: 'normal'
  });

  meals = [
    { key: 'breakfast' as const, label: 'Desayuno', icon: '🌅' },
    { key: 'lunch' as const, label: 'Almuerzo', icon: '☀️' },
    { key: 'snack' as const, label: 'Merienda', icon: '🍪' },
    { key: 'dinner' as const, label: 'Cena', icon: '🌙' }
  ];

  activities: { value: ActivityType; label: string }[] = [
    { value: 'none', label: 'Ninguna' },
    { value: 'walk', label: 'Paseo' },
    { value: 'exercise', label: 'Ejercicio' },
    { value: 'walk_and_exercise', label: 'Ambos' }
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

  async loadTodayLog() {
    const user = this.authService.user();
    if (!user) return;

    const existing = await this.dailyLogService.getByDate(this.currentDate, user.id);
    if (existing) {
      this.log.set(existing);
      this.note = existing.note || '';
    }
  }

  toggleMeal(key: 'breakfast' | 'lunch' | 'snack' | 'dinner') {
    const current = this.log();
    this.log.set({ ...current, [key]: !current[key] });
  }

  setActivity(value: ActivityType) {
    const current = this.log();
    this.log.set({ ...current, activity_type: value });
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

  async autoSave(currentLog: Partial<DailyLog>) {
    const user = this.authService.user();
    if (!user) return;

    this.saving.set(true);
    await this.dailyLogService.save({ ...currentLog, date: this.currentDate }, user.id);
    this.saving.set(false);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  mealClasses(key: string): string {
    const isActive = (this.log() as any)[key];
    return `
      flex flex-col items-center justify-center p-4 rounded-xl border-2 transition
      ${isActive 
        ? 'border-primary bg-primary/10 text-primary' 
        : 'border-border bg-background text-text-muted hover:border-primary/50'}
    `;
  }

  activityClasses(value: string): string {
    const isActive = this.log().activity_type === value;
    return `
      py-3 px-4 rounded-xl border-2 transition text-sm font-medium
      ${isActive 
        ? 'border-primary bg-primary/10 text-primary' 
        : 'border-border bg-background text-text-muted hover:border-primary/50'}
    `;
  }

  selectorClasses(type: 'energy' | 'appetite', value: string): string {
    const currentValue = type === 'energy' ? this.log().energy : this.log().appetite;
    const isActive = currentValue === value;
    return `
      flex-1 py-2 px-3 rounded-lg border-2 transition text-sm font-medium text-center
      ${isActive 
        ? 'border-primary bg-primary/10 text-primary' 
        : 'border-border bg-background text-text-muted hover:border-primary/50'}
    `;
  }
}
