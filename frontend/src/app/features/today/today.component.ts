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
}

interface ActivityOption {
  value: ActivityType;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [FormsModule, Card, Tag, Textarea],
  template: `
    <div class="animate-fade-in">
      <div class="page-header flex items-start justify-between">
        <div>
          <h2 class="page-title">{{ formattedDate() }}</h2>
          <p class="page-subtitle">{{ greeting() }}</p>
        </div>
        @if (saving() || saved()) {
          <p-tag 
            [value]="saving() ? 'Guardando...' : 'Guardado'" 
            [severity]="saving() ? 'warn' : 'success'"
            [icon]="saving() ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
          />
        }
      </div>

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-utensils text-primary"></i>
            <span class="font-semibold text-sm text-text">Comidas</span>
          </div>
        </ng-template>
        <div class="grid grid-cols-4 gap-3">
          @for (meal of mealOptions; track meal.key) {
            <button
              (click)="toggleMeal(meal.key)"
              [class]="mealClasses(meal.key)"
            >
              <div class="btn-option-icon">
                <i [class]="'pi ' + meal.icon"></i>
              </div>
              <span class="btn-option-label">{{ meal.label }}</span>
            </button>
          }
        </div>
      </p-card>

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-bolt text-primary"></i>
            <span class="font-semibold text-sm text-text">Actividad</span>
          </div>
        </ng-template>
        <div class="grid grid-cols-4 gap-3">
          @for (activity of activityOptions; track activity.value) {
            <button
              (click)="setActivity(activity.value)"
              [class]="activityClasses(activity.value)"
            >
              <div class="btn-option-icon">
                <i [class]="'pi ' + activity.icon"></i>
              </div>
              <span class="btn-option-label">{{ activity.label }}</span>
            </button>
          }
        </div>
      </p-card>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <p-card styleClass="!py-3">
          <ng-template pTemplate="header">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-border-light">
              <i class="pi pi-chart-bar text-primary text-sm"></i>
              <span class="font-medium text-xs text-text">Energía</span>
            </div>
          </ng-template>
          <div class="flex gap-1.5">
            @for (level of energyLevels; track level.value) {
              <button
                (click)="setEnergy(level.value)"
                [class]="selectorClasses('energy', level.value)"
              >
                <i [class]="'pi ' + level.icon + ' text-sm mb-1'"></i>
                <span class="text-xs">{{ level.shortLabel }}</span>
              </button>
            }
          </div>
        </p-card>

        <p-card styleClass="!py-3">
          <ng-template pTemplate="header">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-border-light">
              <i class="pi pi-circle text-primary text-sm"></i>
              <span class="font-medium text-xs text-text">Apetito</span>
            </div>
          </ng-template>
          <div class="flex gap-1.5">
            @for (level of appetiteLevels; track level.value) {
              <button
                (click)="setAppetite(level.value)"
                [class]="selectorClasses('appetite', level.value)"
              >
                <i [class]="'pi ' + level.icon + ' text-sm mb-1'"></i>
                <span class="text-xs">{{ level.shortLabel }}</span>
              </button>
            }
          </div>
        </p-card>
      </div>

      <p-card>
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-pencil text-text-muted"></i>
            <span class="font-semibold text-sm text-text">Nota</span>
          </div>
        </ng-template>
        <textarea
          pTextarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Cómo te sientes hoy?"
          [autoResize]="true"
          rows="3"
          class="w-full"
        ></textarea>
      </p-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    :host ::ng-deep .p-card {
      border-radius: 1rem;
      border: 1px solid var(--color-border-light);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
    }

    :host ::ng-deep .p-card-body {
      padding: 0;
    }

    :host ::ng-deep .p-card-content {
      padding: 1.25rem;
      padding-top: 0.75rem;
    }

    :host ::ng-deep .p-textarea {
      width: 100%;
      border: 2px solid var(--color-border-light);
      border-radius: 0.75rem;
      background: var(--color-surface);
      color: var(--color-text);
      font-size: 0.875rem;
      padding: 0.75rem;
      transition: all 0.2s;
    }

    :host ::ng-deep .p-textarea:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
      outline: none;
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
    { key: 'breakfast', label: 'Desayuno', icon: 'pi-sun' },
    { key: 'lunch', label: 'Almuerzo', icon: 'pi-coffee' },
    { key: 'snack', label: 'Merienda', icon: 'pi-briefcase' },
    { key: 'dinner', label: 'Cena', icon: 'pi-moon' }
  ];

  activityOptions: ActivityOption[] = [
    { value: 'none', label: 'Ninguna', icon: 'pi-minus' },
    { value: 'walk', label: 'Paseo', icon: 'pi-directions-walk' },
    { value: 'exercise', label: 'Ejercicio', icon: 'pi-bolt' },
    { value: 'walk_and_exercise', label: 'Ambos', icon: 'pi-star' }
  ];

  energyLevels: { value: EnergyLevel; label: string; shortLabel: string; icon: string }[] = [
    { value: 'low', label: 'Baja', shortLabel: 'B', icon: 'pi-minus-circle' },
    { value: 'medium', label: 'Media', shortLabel: 'M', icon: 'pi-circle' },
    { value: 'high', label: 'Alta', shortLabel: 'A', icon: 'pi-circle-fill' }
  ];

  appetiteLevels: { value: AppetiteLevel; label: string; shortLabel: string; icon: string }[] = [
    { value: 'low', label: 'Bajo', shortLabel: 'B', icon: 'pi-minus-circle' },
    { value: 'normal', label: 'Normal', shortLabel: 'N', icon: 'pi-circle' },
    { value: 'high', label: 'Alto', shortLabel: 'A', icon: 'pi-circle-fill' }
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
    const isActive = this.isMealActive(key);
    return `btn-option text-center ${isActive ? 'btn-option-active' : ''}`;
  }

  activityClasses(value: string): string {
    const isActive = this.isActivityActive(value);
    return `btn-option text-center ${isActive ? 'btn-option-active' : ''}`;
  }

  selectorClasses(type: 'energy' | 'appetite', value: string): string {
    const currentValue = type === 'energy' ? this.log().energy : this.log().appetite;
    return currentValue === value ? 'btn-selector btn-selector-active flex-1 text-center py-2' : 'btn-selector flex-1 text-center py-2';
  }

  isMealActive(key: string): boolean {
    return !!(this.log() as any)[key];
  }

  isActivityActive(value: string): boolean {
    return this.log().activityType === value;
  }
}
