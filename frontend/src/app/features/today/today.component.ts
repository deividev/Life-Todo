import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { Tag } from 'primeng/tag';
import { Badge } from 'primeng/badge';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Divider } from 'primeng/divider';
import { DailyLogService } from '../../core/services/daily-log.service';
import { DailyLog, ActivityType, EnergyLevel, AppetiteLevel } from '../../core/models/daily-log.model';
import { getCurrentDateMadrid } from '../../shared/utils/timezone';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    FormsModule, 
    Card, 
    Button, 
    SelectButton, 
    Textarea, 
    Tag, 
    IconField,
    InputIcon
  ],
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

      <p-card styleClass="summary-card">
        <div class="summary-content">
          <div class="summary-icon">
            <i class="pi pi-sun"></i>
          </div>
          <div class="summary-info">
            <span class="summary-title">Resumen del día</span>
            <span class="summary-subtitle">{{ todaySummary() }}</span>
          </div>
          <div class="summary-badges">
            @for (meal of mealOptions; track meal.key) {
              @if (isMealActive(meal.key)) {
                <span class="meal-badge" [style.background]="meal.bgColor">
                  <i [class]="'pi ' + meal.icon"></i>
                </span>
              }
            }
          </div>
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon">
              <i class="pi pi-utensils"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">Comidas</span>
              <p class="text-xs text-text-muted mt-0.5">Selecciona las que has tomado</p>
            </div>
          </div>
        </ng-template>
        <div class="grid grid-cols-4 gap-3">
          @for (meal of mealOptions; track meal.key) {
            <p-button
              [label]="meal.label"
              [icon]="'pi ' + meal.icon"
              [severity]="isMealActive(meal.key) ? 'primary' : 'secondary'"
              [outlined]="!isMealActive(meal.key)"
              (onClick)="toggleMeal(meal.key)"
              styleClass="meal-btn w-full"
              [style.--p-button-border-radius]="'16px'"
            />
          }
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);">
              <i class="pi pi-directions-run" style="color: #16a34a;"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">Actividad física</span>
              <p class="text-xs text-text-muted mt-0.5">¿Qué has hecho hoy?</p>
            </div>
          </div>
        </ng-template>
        <div class="grid grid-cols-4 gap-3">
          @for (activity of activityOptions; track activity.value) {
            <p-button
              [label]="activity.label"
              [icon]="'pi ' + activity.icon"
              [severity]="isActivityActive(activity.value) ? 'success' : 'secondary'"
              [outlined]="!isActivityActive(activity.value)"
              (onClick)="setActivity(activity.value)"
              styleClass="activity-btn w-full"
            />
          }
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <i class="pi pi-bolt" style="color: #d97706;"></i>
            </div>
            <span class="font-bold text-base text-text">Energía</span>
          </div>
        </ng-template>
        <p-selectbutton 
          [options]="energyOptions" 
          [(ngModel)]="energyValue"
          (onChange)="setEnergy($event.value)"
          optionLabel="label"
          optionValue="value"
          styleClass="energy-selector"
        />
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);">
              <i class="pi pi-heart" style="color: #2563eb;"></i>
            </div>
            <span class="font-bold text-base text-text">Apetito</span>
          </div>
        </ng-template>
        <p-selectbutton 
          [options]="appetiteOptions" 
          [(ngModel)]="appetiteValue"
          (onChange)="setAppetite($event.value)"
          optionLabel="label"
          optionValue="value"
          styleClass="appetite-selector"
        />
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
              <i class="pi pi-pencil" style="color: #9333ea;"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">Notas</span>
              <p class="text-xs text-text-muted mt-0.5">¿Cómo te sientes hoy?</p>
            </div>
          </div>
        </ng-template>
        <p-iconfield>
          <p-inputicon class="pi pi-pencil" style="color: var(--color-text-muted);"/>
          <textarea 
            pTextarea 
            [(ngModel)]="note" 
            (blur)="saveNote()" 
            placeholder="Escribe cómo te sientes, qué has notado..."
            [autoResize]="true" 
            rows="3" 
            class="w-full"
          ></textarea>
        </p-iconfield>
      </p-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .summary-card {
      background: linear-gradient(135deg, var(--color-primary-light) 0%, white 100%) !important;
      border: 1px solid rgba(13, 148, 136, 0.2) !important;
      box-shadow: 0 4px 20px rgba(13, 148, 136, 0.15) !important;
    }

    .summary-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .summary-icon {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
    }

    .summary-icon i {
      font-size: 24px;
      color: white;
    }

    .summary-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .summary-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text);
    }

    .summary-subtitle {
      font-size: 13px;
      color: var(--color-text-muted);
      font-weight: 500;
    }

    .summary-badges {
      display: flex;
      gap: 8px;
    }

    .meal-badge {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .meal-badge i {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .section-card {
      margin-bottom: 16px;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 0;
    }

    .card-header-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--color-primary-light) 0%, rgba(204, 251, 241, 0.5) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(13, 148, 136, 0.15);
    }

    .card-header-icon i {
      font-size: 18px;
      color: var(--color-primary);
    }

    :host ::ng-deep .meal-btn,
    :host ::ng-deep .activity-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 8px !important;
      min-height: 90px;
    }

    :host ::ng-deep .meal-btn .p-button-label,
    :host ::ng-deep .activity-btn .p-button-label {
      font-size: 11px;
      font-weight: 600;
      margin-top: 6px;
    }

    :host ::ng-deep .meal-btn .p-button-icon,
    :host ::ng-deep .activity-btn .p-button-icon {
      font-size: 20px;
    }

    :host ::ng-deep .energy-selector,
    :host ::ng-deep .appetite-selector {
      width: 100%;
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
      padding: 14px 16px;
      border-radius: 14px;
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

  mealOptions = [
    { key: 'breakfast' as const, label: 'Desayuno', icon: 'pi-sun', bgColor: '#fef3c7' },
    { key: 'lunch' as const, label: 'Almuerzo', icon: 'pi-coffee', bgColor: '#fed7aa' },
    { key: 'snack' as const, label: 'Merienda', icon: 'pi-briefcase', bgColor: '#e9d5ff' },
    { key: 'dinner' as const, label: 'Cena', icon: 'pi-moon', bgColor: '#dbeafe' }
  ];

  activityOptions = [
    { value: 'none' as ActivityType, label: 'Ninguna', icon: 'pi-minus' },
    { value: 'walk' as ActivityType, label: 'Paseo', icon: 'pi-directions-walk' },
    { value: 'exercise' as ActivityType, label: 'Ejercicio', icon: 'pi-bolt' },
    { value: 'walk_and_exercise' as ActivityType, label: 'Ambos', icon: 'pi-star' }
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
