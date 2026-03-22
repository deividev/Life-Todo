import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { WeeklyLogService } from '../../core/services/weekly-log.service';
import { WeeklyLog, WeeklyFeeling } from '../../core/models/weekly-log.model';
import { getWeekStartMadrid, getWeekOptions } from '../../shared/utils/timezone';

interface MeasureInput {
  label: string;
  icon: string;
  unit: string;
  min: number;
  max: number;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [
    FormsModule, 
    Card, 
    Select, 
    Textarea, 
    InputNumber, 
    Tag,
    Button
  ],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h2 class="page-title">Registro Semanal</h2>
          <p class="page-subtitle">{{ selectedWeekLabel }}</p>
        </div>
        <p-tag 
          [value]="saving() ? 'Guardando...' : saved() ? 'Guardado' : ''" 
          [severity]="saving() ? 'warn' : 'success'"
          [icon]="saving() ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
          [style.visibility]="saving() || saved() ? 'visible' : 'hidden'"
          styleClass="shadow-sm"
        />
      </div>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon">
              <i class="pi pi-calendar"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Seleccionar semana</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Elige la semana que quieres registrar</p>
            </div>
          </div>
        </ng-template>
        <p-select
          [options]="weekOptions"
          [(ngModel)]="selectedWeek"
          (onChange)="onWeekChange()"
          optionLabel="label"
          optionValue="weekStart"
          styleClass="w-full"
          placeholder="Selecciona semana"
        >
          <ng-template pTemplate="dropdownicon">
            <i class="pi pi-calendar text-slate-400"></i>
          </ng-template>
        </p-select>
      </p-card>

      <div class="summary-hero">
        <div class="flex items-center gap-3 sm:gap-4">
          <div class="hero-icon" style="background: rgba(255,255,255,0.25)">
            <i class="pi pi-sliders-h"></i>
          </div>
          <div>
            <h3 class="hero-title">Medidas corporales</h3>
            <p class="hero-subtitle">Registra tu progreso semanal</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        @for (measure of measureInputs; track measure.label) {
          <div class="measure-card">
            <div class="measure-icon" [style.background]="measure.bgColor">
              <i [class]="'pi ' + measure.icon" [style.color]="measure.color"></i>
            </div>
            <label class="measure-label">{{ measure.label }}</label>
            <p-inputnumber
              [(ngModel)]="measure.value"
              (onBlur)="save()"
              [minFractionDigits]="1"
              [maxFractionDigits]="1"
              [min]="measure.min"
              [max]="measure.max"
              [showButtons]="false"
              placeholder="--"
              [suffix]="' ' + measure.unit"
              styleClass="w-full"
            />
          </div>
        }
      </div>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon card-header-icon-warning">
              <i class="pi pi-smile"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">¿Cómo te sientes?</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Compara con la semana anterior</p>
            </div>
          </div>
        </ng-template>
        <div class="flex gap-2 sm:gap-3">
          @for (f of feelingOptions; track f.value) {
            <p-button
              [label]="f.label"
              [icon]="'pi ' + f.icon"
              [severity]="isFeelingActive(f.value) ? 'warn' : 'secondary'"
              (onClick)="setFeeling(f.value)"
              styleClass="feeling-btn flex-1"
            />
          }
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon card-header-icon-purple">
              <i class="pi pi-pencil"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Nota semanal</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Reflexiones sobre tu semana</p>
            </div>
          </div>
        </ng-template>
        <textarea 
          pTextarea 
          [(ngModel)]="note" 
          (blur)="saveNote()" 
          placeholder="¿Qué tal fue esta semana? Logros, retos, observaciones..."
          [autoResize]="true" 
          rows="4" 
          class="w-full"
        ></textarea>
      </p-card>

      @if (weeklyLog()?.weightKg || weeklyLog()?.waistCm || weeklyLog()?.armCm || weeklyLog()?.weeklyFeeling) {
        <div class="section-divider"></div>
        
        <p-card styleClass="summary-card">
          <ng-template pTemplate="header">
            <div class="card-header">
              <div class="card-header-icon">
                <i class="pi pi-chart-bar"></i>
              </div>
              <div>
                <span class="font-bold text-sm sm:text-base text-slate-900">Resumen de la semana</span>
                <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Datos registrados</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-3 gap-3 sm:gap-4">
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
          @if (weeklyLog()!.weeklyFeeling) {
            <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
              <div class="flex items-center justify-center gap-2">
                <span class="text-xs sm:text-sm text-slate-500 font-medium">Sensación semanal:</span>
                <p-tag 
                  [value]="getFeelingLabel(weeklyLog()!.weeklyFeeling!)"
                  [icon]="getFeelingIcon(weeklyLog()!.weeklyFeeling!)"
                  [severity]="getFeelingSeverity(weeklyLog()!.weeklyFeeling!)"
                />
              </div>
            </div>
          }
        </p-card>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .section-card {
      @apply mb-4;
    }

    .summary-card {
      @apply bg-gradient-to-br from-teal-50 via-white to-white border-teal-200 !important;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hero-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    @media (min-width: 640px) {
      .hero-icon {
        width: 52px;
        height: 52px;
        border-radius: 14px;
      }
    }

    .hero-icon i {
      font-size: 20px;
      color: white;
    }

    @media (min-width: 640px) {
      .hero-icon i {
        font-size: 24px;
      }
    }

    .hero-title {
      @apply text-base sm:text-lg font-bold text-white;
    }

    .hero-subtitle {
      @apply text-xs sm:text-sm text-white/80;
    }

    .measure-card {
      @apply bg-white rounded-xl p-3 border border-slate-200 text-center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    @media (min-width: 640px) {
      .measure-card {
        @apply p-3.5 rounded-xl;
      }
    }

    .measure-icon {
      @apply w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mx-auto mb-1.5;
    }

    .measure-icon i {
      @apply text-sm sm:text-base;
    }

    .measure-label {
      @apply text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2 block;
    }

    :host ::ng-deep .feeling-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px 8px;
      min-height: 80px;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .feeling-btn {
        padding: 14px 10px;
        min-height: 96px;
      }
    }

    :host ::ng-deep .feeling-btn .p-button-label {
      @apply text-xs sm:text-sm font-semibold mt-2;
    }

    :host ::ng-deep .feeling-btn .p-button-icon {
      @apply text-2xl sm:text-3xl;
    }

    :host ::ng-deep .feeling-btn.p-button-warn {
      background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-warning-dark) 100%) !important;
      border-color: var(--color-warning) !important;
      color: white;
    }

    :host ::ng-deep .p-inputnumber {
      width: 100%;
    }

    :host ::ng-deep .p-inputnumber .p-inputnumber-input {
      width: 100%;
      @apply text-center font-semibold;
    }
  `]
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

  measureInputs: (MeasureInput & { value: number | null })[] = [
    { label: 'Peso', icon: 'pi-user-edit', unit: 'kg', min: 30, max: 200, color: 'var(--color-measure-weight-icon)', bgColor: 'var(--color-measure-weight)', value: null },
    { label: 'Cintura', icon: 'pi-arrows-h', unit: 'cm', min: 50, max: 150, color: 'var(--color-measure-waist-icon)', bgColor: 'var(--color-measure-waist)', value: null },
    { label: 'Brazo', icon: 'pi-arrow-right-arrow-left', unit: 'cm', min: 20, max: 50, color: 'var(--color-measure-arm-icon)', bgColor: 'var(--color-measure-arm)', value: null }
  ];

  feelingOptions: { value: WeeklyFeeling; label: string; icon: string }[] = [
    { value: 'worse', label: 'Peor', icon: 'pi-thumbs-down' },
    { value: 'same', label: 'Igual', icon: 'pi-minus' },
    { value: 'better', label: 'Mejor', icon: 'pi-thumbs-up' }
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
          
          this.measureInputs[0].value = this.weight;
          this.measureInputs[1].value = this.waist;
          this.measureInputs[2].value = this.arm;
        } else {
          this.weeklyLog.set(null);
          this.weight = null;
          this.waist = null;
          this.arm = null;
          this.feeling = null;
          this.note = '';
          
          this.measureInputs[0].value = null;
          this.measureInputs[1].value = null;
          this.measureInputs[2].value = null;
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
      weightKg: this.measureInputs[0].value ?? undefined,
      waistCm: this.measureInputs[1].value ?? undefined,
      armCm: this.measureInputs[2].value ?? undefined,
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

  isFeelingActive(value: string | undefined): boolean {
    return this.feeling === value;
  }

  getFeelingLabel(feeling: WeeklyFeeling): string {
    return this.feelingOptions.find(f => f.value === feeling)?.label || '';
  }

  getFeelingIcon(feeling: WeeklyFeeling): string {
    return this.feelingOptions.find(f => f.value === feeling)?.icon || 'pi-minus';
  }

  getFeelingSeverity(feeling: WeeklyFeeling): 'success' | 'warn' | 'secondary' {
    switch (feeling) {
      case 'better': return 'success';
      case 'worse': return 'warn';
      default: return 'secondary';
    }
  }
}
