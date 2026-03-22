import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { Tag } from 'primeng/tag';
import { DailyLogService } from '../../core/services/daily-log.service';
import { DailyLog, ActivityType, EnergyLevel, AppetiteLevel } from '../../core/models/daily-log.model';
import { getCurrentDateMadrid } from '../../shared/utils/timezone';

interface MealOption {
  key: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  label: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface ActivityOption {
  value: ActivityType;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    FormsModule, 
    Card, 
    Button, 
    SelectButton, 
    Textarea, 
    Tag
  ],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h2 class="page-title">{{ greeting() }}</h2>
          <p class="page-subtitle capitalize">{{ formattedDate() }}</p>
        </div>
        <p-tag 
          [value]="saving() ? 'Guardando...' : saved() ? 'Guardado' : ''" 
          [severity]="saving() ? 'warn' : 'success'"
          [icon]="saving() ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
          [style.visibility]="saving() || saved() ? 'visible' : 'hidden'"
          styleClass="shadow-sm"
        />
      </div>

      <div class="summary-hero">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="hero-icon">
              <i class="pi pi-sun"></i>
            </div>
            <div>
              <h3 class="hero-title">Resumen del día</h3>
              <p class="hero-subtitle">{{ todaySummary() }}</p>
            </div>
          </div>
          <div class="flex gap-1.5 sm:gap-2">
            @for (meal of mealOptions; track meal.key) {
              @if (isMealActive(meal.key)) {
                <div class="chip-meal" [style.background]="meal.bgColor">
                  <i [class]="'pi ' + meal.icon" [style.color]="meal.iconColor"></i>
                </div>
              }
            }
          </div>
        </div>
      </div>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon">
              <i class="pi pi-utensils"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Comidas del día</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Toca para marcar las que has tomado</p>
            </div>
          </div>
        </ng-template>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          @for (meal of mealOptions; track meal.key) {
            <p-button
              [label]="meal.label"
              [icon]="'pi ' + meal.icon"
              [severity]="isMealActive(meal.key) ? 'success' : 'secondary'"
              (onClick)="toggleMeal(meal.key)"
              styleClass="meal-btn w-full"
              [attr.data-active]="isMealActive(meal.key)"
            />
          }
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon card-header-icon-success">
              <i class="pi pi-directions-run"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Actividad física</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">¿Qué has hecho hoy?</p>
            </div>
          </div>
        </ng-template>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          @for (activity of activityOptions; track activity.value) {
            <p-button
              [label]="activity.label"
              [icon]="'pi ' + activity.icon"
              [severity]="isActivityActive(activity.value) ? 'success' : 'secondary'"
              (onClick)="setActivity(activity.value)"
              styleClass="activity-btn w-full"
            />
          }
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon card-header-icon-warning">
              <i class="pi pi-bolt"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Nivel de energía</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">¿Cómo te sientes hoy?</p>
            </div>
          </div>
        </ng-template>
        <p-selectbutton 
          [options]="energyOptions" 
          [(ngModel)]="energyValue"
          (onChange)="setEnergy($event.value)"
          optionLabel="label"
          optionValue="value"
          styleClass="w-full energy-selector"
        />
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon card-header-icon-info">
              <i class="pi pi-heart"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Apetito</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">¿Cómo ha sido tu hambre hoy?</p>
            </div>
          </div>
        </ng-template>
        <p-selectbutton 
          [options]="appetiteOptions" 
          [(ngModel)]="appetiteValue"
          (onChange)="setAppetite($event.value)"
          optionLabel="label"
          optionValue="value"
          styleClass="w-full appetite-selector"
        />
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon card-header-icon-purple">
              <i class="pi pi-pencil"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Notas personales</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Reflexiones sobre tu día</p>
            </div>
          </div>
        </ng-template>
        <textarea 
          pTextarea 
          [(ngModel)]="note" 
          (blur)="saveNote()" 
          placeholder="¿Cómo te sientes? ¿Qué has notado hoy?"
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

    .section-card {
      @apply mb-3;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hero-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    @media (min-width: 640px) {
      .hero-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
      }
    }

    .hero-icon i {
      font-size: 18px;
      color: white;
    }

    @media (min-width: 640px) {
      .hero-icon i {
        font-size: 22px;
      }
    }

    .hero-title {
      @apply text-base sm:text-lg font-bold text-white;
    }

    .hero-subtitle {
      @apply text-xs sm:text-sm text-white/80;
    }

    :host ::ng-deep .meal-btn[data-active="true"],
    :host ::ng-deep .activity-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 4px !important;
      min-height: 64px;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .meal-btn[data-active="true"],
      :host ::ng-deep .activity-btn {
        padding: 10px 6px !important;
        min-height: 72px;
      }
    }

    :host ::ng-deep .meal-btn[data-active="true"],
    :host ::ng-deep .activity-btn.p-button-success {
      background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-dark) 100%) !important;
      border-color: var(--color-success) !important;
      color: white;
    }

    :host ::ng-deep .meal-btn .p-button-label,
    :host ::ng-deep .activity-btn .p-button-label {
      @apply text-[10px] sm:text-xs font-semibold mt-1;
    }

    :host ::ng-deep .meal-btn .p-button-icon,
    :host ::ng-deep .activity-btn .p-button-icon {
      @apply text-base sm:text-lg;
    }

    :host ::ng-deep .energy-selector .p-selectbutton,
    :host ::ng-deep .appetite-selector .p-selectbutton {
      display: flex;
      width: 100%;
    }

    :host ::ng-deep .energy-selector .p-button,
    :host ::ng-deep .appetite-selector .p-button {
      flex: 1;
      justify-content: center;
      padding: 8px 6px;
      border-radius: 10px;
      font-size: 0.75rem;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .energy-selector .p-button,
      :host ::ng-deep .appetite-selector .p-button {
        padding: 10px 12px;
        border-radius: 12px;
        font-size: 0.875rem;
      }
    }

    :host ::ng-deep .energy-selector .p-button .p-button-label,
    :host ::ng-deep .appetite-selector .p-button .p-button-label {
      font-weight: 600;
    }
  `]
})
export class TodayComponent {
  private dailyLogService = inject(DailyLogService);

  currentDate = getCurrentDateMadrid();
  note = '';
  energyValue: EnergyLevel = 'medium';
  appetiteValue: AppetiteLevel = 'normal';
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
    { key: 'breakfast', label: 'Desayuno', icon: 'pi-sun', bgColor: 'var(--color-meal-breakfast)', iconColor: 'var(--color-meal-breakfast-icon)' },
    { key: 'lunch', label: 'Almuerzo', icon: 'pi-coffee', bgColor: 'var(--color-meal-lunch)', iconColor: 'var(--color-meal-lunch-icon)' },
    { key: 'snack', label: 'Merienda', icon: 'pi-briefcase', bgColor: 'var(--color-meal-snack)', iconColor: 'var(--color-meal-snack-icon)' },
    { key: 'dinner', label: 'Cena', icon: 'pi-moon', bgColor: 'var(--color-meal-dinner)', iconColor: 'var(--color-meal-dinner-icon)' }
  ];

  activityOptions: ActivityOption[] = [
    { value: 'none', label: 'Ninguna', icon: 'pi-minus', color: 'var(--color-activity-none-icon)', bgColor: 'var(--color-activity-none)' },
    { value: 'walk', label: 'Paseo', icon: 'pi-directions-walk', color: 'var(--color-activity-walk-icon)', bgColor: 'var(--color-activity-walk)' },
    { value: 'exercise', label: 'Ejercicio', icon: 'pi-bolt', color: 'var(--color-activity-exercise-icon)', bgColor: 'var(--color-activity-exercise)' },
    { value: 'walk_and_exercise', label: 'Ambos', icon: 'pi-star', color: 'var(--color-activity-both-icon)', bgColor: 'var(--color-activity-both)' }
  ];

  energyOptions = [
    { value: 'low' as EnergyLevel, label: 'Baja' },
    { value: 'medium' as EnergyLevel, label: 'Media' },
    { value: 'high' as EnergyLevel, label: 'Alta' }
  ];

  appetiteOptions = [
    { value: 'low' as AppetiteLevel, label: 'Bajo' },
    { value: 'normal' as AppetiteLevel, label: 'Normal' },
    { value: 'high' as AppetiteLevel, label: 'Alto' }
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
    if (meals.length === 0) return 'Sin registrar todavía';
    if (meals.length === 4) return 'Día completo - ¡Genial!';
    return `${meals.length} de 4 comidas registradas`;
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
          this.energyValue = existing.energy || 'medium';
          this.appetiteValue = existing.appetite || 'normal';
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
    this.energyValue = value;
    const current = this.log();
    this.log.set({ ...current, energy: value });
  }

  setAppetite(value: AppetiteLevel) {
    this.appetiteValue = value;
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

  isMealActive(key: string): boolean {
    return !!(this.log() as any)[key];
  }

  isActivityActive(value: string): boolean {
    return this.log().activityType === value;
  }
}
