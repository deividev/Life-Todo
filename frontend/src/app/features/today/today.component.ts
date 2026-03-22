import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  gradient: string;
}

interface ActivityOption {
  value: ActivityType;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  gradient: string;
}

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    FormsModule, 
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

      <div class="hero-section">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4 sm:gap-5">
            <div class="hero-icon-lg">
              <i class="pi pi-sun"></i>
            </div>
            <div>
              <h3 class="hero-title">Resumen del día</h3>
              <p class="hero-subtitle">{{ todaySummary() }}</p>
            </div>
          </div>
          <div class="flex gap-2 sm:gap-3">
            @for (meal of mealOptions; track meal.key) {
              @if (isMealActive(meal.key)) {
                <div class="chip-meal" [style.background]="meal.gradient">
                  <i [class]="'pi ' + meal.icon" [style.color]="meal.iconColor"></i>
                </div>
              }
            }
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div class="widget-card">
          <div class="widget-header">
            <div class="widget-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <i class="pi pi-utensils" style="color: #d97706;"></i>
            </div>
            <div>
              <h4 class="widget-title">Comidas del día</h4>
              <p class="widget-subtitle">Toca para marcar las comidas tomadas</p>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            @for (meal of mealOptions; track meal.key) {
              <p-button
                [label]="meal.label"
                [icon]="'pi ' + meal.icon"
                [severity]="isMealActive(meal.key) ? 'success' : 'secondary'"
                (onClick)="toggleMeal(meal.key)"
                styleClass="meal-btn w-full"
                [attr.data-active]="isMealActive(meal.key)"
                [attr.data-color]="meal.iconColor"
              />
            }
          </div>
        </div>

        <div class="widget-card">
          <div class="widget-header">
            <div class="widget-icon" style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);">
              <i class="pi pi-directions-run" style="color: #059669;"></i>
            </div>
            <div>
              <h4 class="widget-title">Actividad física</h4>
              <p class="widget-subtitle">¿Qué has hecho hoy?</p>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            @for (activity of activityOptions; track activity.value) {
              <p-button
                [label]="activity.label"
                [icon]="'pi ' + activity.icon"
                [severity]="isActivityActive(activity.value) ? 'success' : 'secondary'"
                (onClick)="setActivity(activity.value)"
                styleClass="activity-btn w-full"
                [attr.data-active]="isActivityActive(activity.value)"
              />
            }
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div class="widget-card">
          <div class="widget-header">
            <div class="widget-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <i class="pi pi-bolt" style="color: #d97706;"></i>
            </div>
            <div>
              <h4 class="widget-title">Nivel de energía</h4>
              <p class="widget-subtitle">¿Cómo te sientes hoy?</p>
            </div>
          </div>
          <p-selectbutton 
            [options]="energyOptions" 
            [(ngModel)]="energyValue"
            (onChange)="setEnergy($event.value)"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full energy-selector"
          />
        </div>

        <div class="widget-card">
          <div class="widget-header">
            <div class="widget-icon" style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);">
              <i class="pi pi-heart" style="color: #db2777;"></i>
            </div>
            <div>
              <h4 class="widget-title">Apetito</h4>
              <p class="widget-subtitle">¿Cómo ha sido tu hambre hoy?</p>
            </div>
          </div>
          <p-selectbutton 
            [options]="appetiteOptions" 
            [(ngModel)]="appetiteValue"
            (onChange)="setAppetite($event.value)"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full appetite-selector"
          />
        </div>
      </div>

      <div class="widget-card">
        <div class="widget-header">
          <div class="widget-icon" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
            <i class="pi pi-pencil" style="color: #7c3aed;"></i>
          </div>
          <div>
            <h4 class="widget-title">Notas personales</h4>
            <p class="widget-subtitle">Reflexiones sobre tu día</p>
          </div>
        </div>
        <textarea 
          pTextarea 
          [(ngModel)]="note" 
          (blur)="saveNote()" 
          placeholder="¿Cómo te sientes? ¿Qué has notado hoy? Escribe aquí tus observaciones..."
          [autoResize]="true" 
          rows="4" 
          class="w-full"
        ></textarea>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .widget-card {
      @apply bg-white rounded-2xl p-5 border border-slate-200/80;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (hover: hover) {
      .widget-card:hover {
        @apply border-teal-200;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        transform: translateY(-1px);
      }
    }

    @media (min-width: 640px) {
      .widget-card {
        @apply p-6 rounded-2xl;
      }
    }

    .widget-header {
      @apply flex items-center gap-3 mb-5;
    }

    @media (min-width: 640px) {
      .widget-header {
        @apply gap-4 mb-6;
      }
    }

    .widget-icon {
      @apply w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    @media (min-width: 640px) {
      .widget-icon {
        @apply w-14 h-14;
      }
    }

    .widget-icon i {
      @apply text-xl;
    }

    @media (min-width: 640px) {
      .widget-icon i {
        @apply text-2xl;
      }
    }

    .widget-title {
      @apply text-base sm:text-lg font-bold text-slate-900;
    }

    .widget-subtitle {
      @apply text-xs sm:text-sm text-slate-500 mt-0.5;
    }

    :host ::ng-deep .meal-btn[data-active="true"],
    :host ::ng-deep .activity-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px 8px !important;
      min-height: 80px;
      border-radius: 16px !important;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .meal-btn[data-active="true"],
      :host ::ng-deep .activity-btn {
        padding: 14px 10px !important;
        min-height: 96px;
      }
    }

    :host ::ng-deep .meal-btn[data-active="true"],
    :host ::ng-deep .activity-btn.p-button-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      border-color: #10b981 !important;
      color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    :host ::ng-deep .meal-btn .p-button-label,
    :host ::ng-deep .activity-btn .p-button-label {
      @apply text-xs sm:text-sm font-semibold mt-2;
    }

    :host ::ng-deep .meal-btn .p-button-icon,
    :host ::ng-deep .activity-btn .p-button-icon {
      @apply text-2xl sm:text-3xl;
    }

    :host ::ng-deep .energy-selector .p-selectbutton,
    :host ::ng-deep .appetite-selector .p-selectbutton {
      display: flex;
      width: 100%;
      gap: 8px;
    }

    :host ::ng-deep .energy-selector .p-button,
    :host ::ng-deep .appetite-selector .p-button {
      flex: 1;
      justify-content: center;
      padding: 12px 8px;
      border-radius: 14px;
      font-size: 0.875rem;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .energy-selector .p-button,
      :host ::ng-deep .appetite-selector .p-button {
        padding: 14px 20px;
        border-radius: 16px;
        font-size: 1rem;
      }
    }

    :host ::ng-deep .energy-selector .p-button .p-button-label,
    :host ::ng-deep .appetite-selector .p-button .p-button-label {
      font-weight: 600;
    }

    .hero-section {
      @apply bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden;
      box-shadow: 0 8px 32px rgba(13, 148, 136, 0.35), inset 0 1px 0 rgba(255,255,255,0.25);
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 60%;
      height: 150%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      pointer-events: none;
    }

    @media (min-width: 640px) {
      .hero-section {
        @apply p-6 mb-6;
      }
    }

    .hero-icon-lg {
      @apply w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    @media (min-width: 640px) {
      .hero-icon-lg {
        @apply w-18 h-18;
      }
    }

    .hero-icon-lg i {
      @apply text-2xl sm:text-3xl text-white;
    }

    .hero-title {
      @apply text-xl sm:text-2xl font-bold text-white;
    }

    @media (min-width: 640px) {
      .hero-title {
        @apply text-2xl;
      }
    }

    .hero-subtitle {
      @apply text-sm sm:text-base text-white/80 mt-1;
    }

    .chip-meal {
      @apply inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    @media (min-width: 640px) {
      .chip-meal {
        @apply w-12 h-12 rounded-xl;
      }
      .chip-meal i {
        @apply text-xl;
      }
    }

    .chip-meal i {
      @apply text-lg;
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
    { key: 'breakfast', label: 'Desayuno', icon: 'pi-sun', bgColor: 'var(--color-meal-breakfast-solid)', iconColor: 'var(--color-meal-breakfast-icon)', gradient: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)' },
    { key: 'lunch', label: 'Almuerzo', icon: 'pi-coffee', bgColor: 'var(--color-meal-lunch-solid)', iconColor: 'var(--color-meal-lunch-icon)', gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)' },
    { key: 'snack', label: 'Merienda', icon: 'pi-apple', bgColor: 'var(--color-meal-snack-solid)', iconColor: 'var(--color-meal-snack-icon)', gradient: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)' },
    { key: 'dinner', label: 'Cena', icon: 'pi-moon', bgColor: 'var(--color-meal-dinner-solid)', iconColor: 'var(--color-meal-dinner-icon)', gradient: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)' }
  ];

  activityOptions: ActivityOption[] = [
    { value: 'none', label: 'Ninguna', icon: 'pi-minus', color: '#64748b', bgColor: '#e2e8f0', gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' },
    { value: 'walk', label: 'Paseo', icon: 'pi-directions-walk', color: '#059669', bgColor: '#a7f3d0', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
    { value: 'exercise', label: 'Ejercicio', icon: 'pi-bolt', color: '#d97706', bgColor: '#fde68a', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    { value: 'walk_and_exercise', label: 'Ambos', icon: 'pi-star', color: '#4f46e5', bgColor: '#c7d2fe', gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' }
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
    if (meals.length === 4) return 'Día completo - ¡Excelente!';
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
