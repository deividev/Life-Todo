import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { DailyLogService } from '../../core/services/daily-log.service';
import { DailyLog, ActivityType, EnergyLevel, AppetiteLevel } from '../../core/models/daily-log.model';
import { getCurrentDateMadrid } from '../../shared/utils/timezone';

interface MealOption {
  key: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  label: string;
  icon: string;
  bgColor: string;
}

interface ActivityOption {
  value: ActivityType;
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [FormsModule, Card, Tag, Textarea],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h2 class="page-title">{{ greeting() }}</h2>
          <p class="page-subtitle capitalize">{{ formattedDate() }}</p>
        </div>
        @if (saving() || saved()) {
          <p-tag 
            [value]="saving() ? 'Guardando...' : 'Guardado'" 
            [severity]="saving() ? 'warn' : 'success'"
            [icon]="saving() ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
          />
        }
      </div>

      <div class="mb-5">
        <p-card styleClass="accent-card mb-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="section-icon">
              <i class="pi pi-sun text-xl text-primary"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-text">Resumen del día</h3>
              <p class="text-xs text-text-muted mt-0.5">{{ todaySummary() }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            @for (meal of mealOptions; track meal.key) {
              @if (isMealActive(meal.key)) {
                <div class="meal-indicator" [style.background]="meal.bgColor">
                  <i [class]="'pi ' + meal.icon"></i>
                </div>
              }
            }
            @if (!hasAnyMeal()) {
              <span class="text-sm text-text-muted font-medium py-2">Sin registrar</span>
            }
          </div>
        </p-card>
      </div>

      <div class="space-y-4">
        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon">
                <i class="pi pi-utensils"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Comidas</span>
                <p class="text-xs text-text-muted mt-0.5">Selecciona las que has tomado</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-4 gap-3">
            @for (meal of mealOptions; track meal.key) {
              <button
                (click)="toggleMeal(meal.key)"
                [class]="mealClasses(meal.key)"
              >
                <div class="meal-btn-inner">
                  <div class="meal-btn-icon" [style.background]="isMealActive(meal.key) ? 'var(--color-primary)' : 'var(--color-bg-warm)'">
                    <i [class]="'pi ' + meal.icon" [style.color]="isMealActive(meal.key) ? 'white' : 'var(--color-text-muted)'"></i>
                  </div>
                  <span class="meal-btn-label">{{ meal.label }}</span>
                </div>
              </button>
            }
          </div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, var(--color-secondary-light) 0%, #c7d2fe 100%);">
                <i class="pi pi-bolt" style="color: var(--color-secondary);"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Actividad física</span>
                <p class="text-xs text-text-muted mt-0.5">¿Qué has hecho hoy?</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-4 gap-3">
            @for (activity of activityOptions; track activity.value) {
              <button
                (click)="setActivity(activity.value)"
                [class]="activityClasses(activity.value)"
              >
                <div class="meal-btn-inner">
                  <div class="meal-btn-icon" [style.background]="isActivityActive(activity.value) ? activity.color : 'var(--color-bg-warm)'">
                    <i [class]="'pi ' + activity.icon" [style.color]="isActivityActive(activity.value) ? 'white' : 'var(--color-text-muted)'"></i>
                  </div>
                  <span class="meal-btn-label">{{ activity.label }}</span>
                </div>
              </button>
            }
          </div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="flex gap-3 flex-1">
                <div class="card-header-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
                  <i class="pi pi-bolt" style="color: var(--color-accent);"></i>
                </div>
                <span class="font-bold text-sm text-text self-center">Energía</span>
              </div>
              <div class="flex gap-1.5">
                @for (level of energyLevels; track level.value) {
                  <button
                    (click)="setEnergy(level.value)"
                    [class]="selectorClasses('energy', level.value)"
                  >
                    <i [class]="'pi ' + level.icon" [class.text-primary]="isEnergyActive(level.value)"></i>
                    <span class="text-xs font-semibold" [class.text-primary]="isEnergyActive(level.value)">{{ level.shortLabel }}</span>
                  </button>
                }
              </div>
            </div>
          </ng-template>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);">
                <i class="pi pi-circle" style="color: var(--color-info);"></i>
              </div>
              <span class="font-bold text-sm text-text self-center">Apetito</span>
              <div class="flex gap-1.5 ml-auto">
                @for (level of appetiteLevels; track level.value) {
                  <button
                    (click)="setAppetite(level.value)"
                    [class]="selectorClasses('appetite', level.value)"
                  >
                    <i [class]="'pi ' + level.icon" [class.text-primary]="isAppetiteActive(level.value)"></i>
                    <span class="text-xs font-semibold" [class.text-primary]="isAppetiteActive(level.value)">{{ level.shortLabel }}</span>
                  </button>
                }
              </div>
            </div>
          </ng-template>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
                <i class="pi pi-pencil" style="color: #9333ea;"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Notas</span>
                <p class="text-xs text-text-muted mt-0.5">¿Cómo te sientes hoy?</p>
              </div>
            </div>
          </ng-template>
          <textarea
            pTextarea
            [(ngModel)]="note"
            (blur)="saveNote()"
            placeholder="Escribe cómo te sientes, qué has notado, cualquier cosa..."
            [autoResize]="true"
            rows="3"
            class="w-full"
          ></textarea>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .section-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--color-primary-light) 0%, white 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
    }

    .meal-indicator {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .meal-indicator i {
      font-size: 14px;
    }

    .meal-indicator i.pi-sun,
    .meal-indicator i.pi-moon { color: var(--color-accent); }
    .meal-indicator i.pi-coffee { color: #92400e; }
    .meal-indicator i.pi-briefcase { color: #7c3aed; }

    .meal-btn-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .meal-btn-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .meal-btn-icon i {
      font-size: 18px;
      transition: color 0.2s ease;
    }

    .meal-btn-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text);
    }

    .btn-option {
      width: 100%;
      padding: 12px 8px;
      border-radius: 16px;
      border: 2px solid var(--color-border-light);
      background: linear-gradient(180deg, white 0%, var(--color-bg-warm) 100%);
      transition: all 0.2s ease;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .btn-option:hover {
      border-color: var(--color-primary);
      box-shadow: 0 4px 16px rgba(13, 148, 136, 0.15);
      transform: translateY(-1px);
    }

    .btn-option:active {
      transform: translateY(0) scale(0.98);
    }

    .btn-option-active {
      border-color: var(--color-primary);
      background: linear-gradient(180deg, var(--color-primary-light) 0%, white 100%);
      box-shadow: 0 4px 16px rgba(13, 148, 136, 0.2);
    }

    .btn-selector {
      flex: 1;
      padding: 10px 6px;
      border-radius: 12px;
      border: 2px solid var(--color-border-light);
      background: linear-gradient(180deg, white 0%, var(--color-bg-warm) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-selector:hover {
      border-color: var(--color-primary);
    }

    .btn-selector-active {
      border-color: var(--color-primary);
      background: linear-gradient(180deg, var(--color-primary-light) 0%, white 100%);
    }
  `]
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

  mealOptions: MealOption[] = [
    { key: 'breakfast', label: 'Desayuno', icon: 'pi-sun', bgColor: '#fef3c7' },
    { key: 'lunch', label: 'Almuerzo', icon: 'pi-coffee', bgColor: '#fed7aa' },
    { key: 'snack', label: 'Merienda', icon: 'pi-briefcase', bgColor: '#e9d5ff' },
    { key: 'dinner', label: 'Cena', icon: 'pi-moon', bgColor: '#dbeafe' }
  ];

  activityOptions: ActivityOption[] = [
    { value: 'none', label: 'Ninguna', icon: 'pi-minus', color: '#9ca3af' },
    { value: 'walk', label: 'Paseo', icon: 'pi-directions-walk', color: '#10b981' },
    { value: 'exercise', label: 'Ejercicio', icon: 'pi-bolt', color: '#6366f1' },
    { value: 'walk_and_exercise', label: 'Ambos', icon: 'pi-star', color: '#f59e0b' }
  ];

  energyLevels: { value: EnergyLevel; label: string; shortLabel: string; icon: string }[] = [
    { value: 'low', label: 'Baja', shortLabel: 'Baja', icon: 'pi-minus-circle' },
    { value: 'medium', label: 'Media', shortLabel: 'Media', icon: 'pi-circle' },
    { value: 'high', label: 'Alta', shortLabel: 'Alta', icon: 'pi-circle-fill' }
  ];

  appetiteLevels: { value: AppetiteLevel; label: string; shortLabel: string; icon: string }[] = [
    { value: 'low', label: 'Bajo', shortLabel: 'Bajo', icon: 'pi-minus-circle' },
    { value: 'normal', label: 'Normal', shortLabel: 'Normal', icon: 'pi-circle' },
    { value: 'high', label: 'Alto', shortLabel: 'Alto', icon: 'pi-circle-fill' }
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

  todaySummary = computed(() => {
    const meals = ['breakfast', 'lunch', 'snack', 'dinner'].filter(m => (this.log() as any)[m]);
    if (meals.length === 0) return 'No has registrado nada todavía';
    if (meals.length === 4) return '¡Día completo! Todo registrado';
    return `${meals.length} de 4 comidas registradas`;
  });

  hasAnyMeal(): boolean {
    const l = this.log();
    return !!(l.breakfast || l.lunch || l.snack || l.dinner);
  }

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
    return `btn-option text-center ${this.isMealActive(key) ? 'btn-option-active' : ''}`;
  }

  activityClasses(value: string): string {
    return `btn-option text-center ${this.isActivityActive(value) ? 'btn-option-active' : ''}`;
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

  isEnergyActive(value: string): boolean {
    return this.log().energy === value;
  }

  isAppetiteActive(value: string): boolean {
    return this.log().appetite === value;
  }
}
