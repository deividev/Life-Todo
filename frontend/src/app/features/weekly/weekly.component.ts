import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  gradient: string;
}

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [
    FormsModule, 
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

      <div class="widget-card mb-5">
        <div class="widget-header">
          <div class="widget-icon" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);">
            <i class="pi pi-calendar" style="color: #2563eb;"></i>
          </div>
          <div class="flex-1">
            <h4 class="widget-title">Seleccionar semana</h4>
            <p class="widget-subtitle">Elige la semana que quieres registrar</p>
          </div>
        </div>
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
      </div>

      <div class="hero-section mb-5">
        <div class="flex items-center gap-4 sm:gap-5">
          <div class="hero-icon-lg">
            <i class="pi pi-sliders-h"></i>
          </div>
          <div>
            <h3 class="hero-title">Medidas corporales</h3>
            <p class="hero-subtitle">Registra tu progreso semanal</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-5">
        @for (measure of measureInputs; track measure.label) {
          <div class="measure-card">
            <div class="measure-icon" [style.background]="measure.gradient">
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

      <div class="widget-card mb-5">
        <div class="widget-header">
          <div class="widget-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
            <i class="pi pi-smile" style="color: #d97706;"></i>
          </div>
          <div>
            <h4 class="widget-title">¿Cómo te sientes?</h4>
            <p class="widget-subtitle">Compara con la semana anterior</p>
          </div>
        </div>
        <div class="flex gap-3 sm:gap-4">
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
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="widget-card">
          <div class="widget-header">
            <div class="widget-icon" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
              <i class="pi pi-pencil" style="color: #7c3aed;"></i>
            </div>
            <div>
              <h4 class="widget-title">Nota semanal</h4>
              <p class="widget-subtitle">Reflexiones sobre tu semana</p>
            </div>
          </div>
          <textarea 
            pTextarea 
            [(ngModel)]="note" 
            (blur)="saveNote()" 
            placeholder="¿Qué tal fue esta semana? Logros, retos, observaciones..."
            [autoResize]="true" 
            rows="5" 
            class="w-full"
          ></textarea>
        </div>

        @if (weeklyLog()?.weightKg || weeklyLog()?.waistCm || weeklyLog()?.armCm || weeklyLog()?.weeklyFeeling) {
          <div class="widget-card">
            <div class="widget-header">
              <div class="widget-icon" style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);">
                <i class="pi pi-chart-bar" style="color: #059669;"></i>
              </div>
              <div>
                <h4 class="widget-title">Resumen de la semana</h4>
                <p class="widget-subtitle">Datos registrados</p>
              </div>
            </div>
            <div class="data-grid">
              <div class="data-item">
                <div class="data-item-value">{{ weeklyLog()!.weightKg || '--' }}</div>
                <div class="data-item-label">kg</div>
              </div>
              <div class="data-item">
                <div class="data-item-value">{{ weeklyLog()!.waistCm || '--' }}</div>
                <div class="data-item-label">cintura (cm)</div>
              </div>
              <div class="data-item">
                <div class="data-item-value">{{ weeklyLog()!.armCm || '--' }}</div>
                <div class="data-item-label">brazo (cm)</div>
              </div>
            </div>
            @if (weeklyLog()!.weeklyFeeling) {
              <div class="mt-5 pt-4 border-t border-slate-100">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm text-slate-600 font-medium">Sensación semanal:</span>
                  <p-tag 
                    [value]="getFeelingLabel(weeklyLog()!.weeklyFeeling!)"
                    [icon]="getFeelingIcon(weeklyLog()!.weeklyFeeling!)"
                    [severity]="getFeelingSeverity(weeklyLog()!.weeklyFeeling!)"
                  />
                </div>
              </div>
            }
          </div>
        }
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

    @media (min-width: 640px) {
      .widget-card {
        @apply p-6 rounded-2xl;
      }
    }

    @media (hover: hover) {
      .widget-card:hover {
        @apply border-teal-200;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        transform: translateY(-1px);
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

    .measure-card {
      @apply bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (hover: hover) {
      .measure-card:hover {
        @apply border-teal-200;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        transform: translateY(-2px);
      }
    }

    .measure-icon {
      @apply w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    @media (min-width: 640px) {
      .measure-icon {
        @apply w-14 h-14 mb-4;
      }
    }

    .measure-icon i {
      @apply text-xl sm:text-2xl;
    }

    .measure-label {
      @apply text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 block;
    }

    @media (min-width: 640px) {
      .measure-label {
        @apply text-sm mb-4;
      }
    }

    :host ::ng-deep .feeling-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 14px 10px;
      min-height: 88px;
      border-radius: 16px !important;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .feeling-btn {
        padding: 16px 12px;
        min-height: 100px;
      }
    }

    :host ::ng-deep .feeling-btn .p-button-label {
      @apply text-xs sm:text-sm font-semibold mt-2;
    }

    :host ::ng-deep .feeling-btn .p-button-icon {
      @apply text-2xl sm:text-3xl;
    }

    :host ::ng-deep .feeling-btn.p-button-warn {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
      border-color: #f59e0b !important;
      color: white;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
    }

    :host ::ng-deep .p-inputnumber {
      width: 100%;
    }

    :host ::ng-deep .p-inputnumber .p-inputnumber-input {
      width: 100%;
      @apply text-center font-semibold;
    }

    .hero-section {
      @apply bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden;
      box-shadow: 0 8px 32px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.25);
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
        @apply p-6;
      }
    }

    .hero-icon-lg {
      @apply w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
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

    .data-grid {
      @apply grid grid-cols-3 gap-3 sm:gap-4;
    }

    .data-item {
      @apply bg-slate-50/80 rounded-xl p-4 sm:p-5 text-center;
    }

    .data-item-value {
      @apply text-2xl sm:text-3xl font-bold text-slate-900;
    }

    .data-item-label {
      @apply text-xs text-slate-500 mt-1.5 font-medium;
    }

    @media (min-width: 640px) {
      .data-item-label {
        @apply text-sm mt-2;
      }
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
    { label: 'Peso', icon: 'pi-user-edit', unit: 'kg', min: 30, max: 200, color: '#2563eb', bgColor: '#bfdbfe', gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', value: null },
    { label: 'Cintura', icon: 'pi-arrows-h', unit: 'cm', min: 50, max: 150, color: '#7c3aed', bgColor: '#e9d5ff', gradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', value: null },
    { label: 'Brazo', icon: 'pi-arrow-right-arrow-left', unit: 'cm', min: 20, max: 50, color: '#db2777', bgColor: '#fbcfe8', gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', value: null }
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
