import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Tag } from 'primeng/tag';
import { WeeklyLogService } from '../../core/services/weekly-log.service';
import { WeeklyLog, WeeklyFeeling } from '../../core/models/weekly-log.model';
import { getWeekStartMadrid, getWeekOptions } from '../../shared/utils/timezone';

interface FeelingOption {
  value: WeeklyFeeling;
  label: string;
  icon: string;
  severity: 'danger' | 'secondary' | 'success';
}

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [FormsModule, Card, Select, Textarea, InputNumber, Tag],
  template: `
    <div class="animate-fade-in">
      <div class="page-header flex items-start justify-between">
        <div>
          <h2 class="page-title">Registro Semanal</h2>
          <p class="page-subtitle">{{ selectedWeekLabel }}</p>
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
            <i class="pi pi-calendar text-primary"></i>
            <span class="font-semibold text-sm text-text">Semana</span>
          </div>
        </ng-template>
        <p-select
          [options]="weekOptions"
          [(ngModel)]="selectedWeek"
          (onChange)="onWeekChange()"
          optionLabel="label"
          optionValue="weekStart"
          styleClass="w-full"
          [placeholder]="'Selecciona semana'"
        />
      </p-card>

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-sliders-h text-primary"></i>
            <span class="font-semibold text-sm text-text">Medidas</span>
          </div>
        </ng-template>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <label class="block text-xs text-text-muted font-medium mb-2">Peso</label>
            <p-inputnumber
              [(ngModel)]="weight"
              (onBlur)="save()"
              [minFractionDigits]="1"
              [maxFractionDigits]="1"
              [min]="30"
              [max]="200"
              [showButtons]="false"
              placeholder="--"
              inputStyleClass="input-number"
              suffix=" kg"
            />
          </div>
          <div class="text-center">
            <label class="block text-xs text-text-muted font-medium mb-2">Cintura</label>
            <p-inputnumber
              [(ngModel)]="waist"
              (onBlur)="save()"
              [minFractionDigits]="1"
              [maxFractionDigits]="1"
              [min]="50"
              [max]="150"
              [showButtons]="false"
              placeholder="--"
              inputStyleClass="input-number"
              suffix=" cm"
            />
          </div>
          <div class="text-center">
            <label class="block text-xs text-text-muted font-medium mb-2">Brazo</label>
            <p-inputnumber
              [(ngModel)]="arm"
              (onBlur)="save()"
              [minFractionDigits]="1"
              [maxFractionDigits]="1"
              [min]="20"
              [max]="50"
              [showButtons]="false"
              placeholder="--"
              inputStyleClass="input-number"
              suffix=" cm"
            />
          </div>
        </div>
      </p-card>

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-smile text-primary"></i>
            <span class="font-semibold text-sm text-text">¿Cómo te sientes?</span>
          </div>
        </ng-template>
        <div class="flex gap-3">
          @for (f of feelingOptions; track f.value) {
            <button
              (click)="setFeeling(f.value)"
              [class]="feelingClasses(f.value)"
            >
              <div class="feeling-btn-icon">
                <i [class]="'pi ' + f.icon"></i>
              </div>
              <span class="text-xs font-medium">{{ f.label }}</span>
            </button>
          }
        </div>
      </p-card>

      <p-card>
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-pencil text-text-muted"></i>
            <span class="font-semibold text-sm text-text">Nota semanal</span>
          </div>
        </ng-template>
        <textarea
          pTextarea
          [(ngModel)]="note"
          (blur)="saveNote()"
          placeholder="¿Qué tal fue esta semana?"
          [autoResize]="true"
          rows="4"
          class="w-full"
        ></textarea>
      </p-card>

      @if (weeklyLog()) {
        <div class="section-divider"></div>
        
        <p-card styleClass="card-elevated">
          <ng-template pTemplate="header">
            <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
              <i class="pi pi-chart-bar text-primary"></i>
              <span class="font-semibold text-sm text-text">Resumen</span>
            </div>
          </ng-template>
          <div class="grid grid-cols-3 gap-3">
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
        </p-card>
      }
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

    :host ::ng-deep .p-select {
      width: 100%;
    }

    :host ::ng-deep .p-select-label {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      border-radius: 0.75rem;
      border: 2px solid var(--color-border-light);
      background: var(--color-surface);
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

    :host ::ng-deep .p-inputnumber-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid var(--color-border-light);
      border-radius: 0.75rem;
      background: var(--color-bg-warm);
      color: var(--color-text);
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
    }

    :host ::ng-deep .p-inputnumber-input:focus {
      border-color: var(--color-primary);
      background: var(--color-surface);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
      outline: none;
    }

    .feeling-btn {
      @apply flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none;
      @apply border-border-light bg-bg-warm text-text-secondary;
      @apply hover:border-primary/30 hover:bg-primary-light/30;
      @apply active:scale-[0.97];
    }

    .feeling-btn-active {
      @apply border-primary bg-primary-light text-primary;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }

    .feeling-btn-icon {
      @apply w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 text-lg;
    }

    .feeling-btn-active .feeling-btn-icon {
      @apply bg-primary text-white;
    }

    .feeling-btn:not(.feeling-btn-active) .feeling-btn-icon {
      @apply bg-bg text-text-muted;
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

  feelingOptions: FeelingOption[] = [
    { value: 'worse', label: 'Peor', icon: 'pi-frown', severity: 'danger' },
    { value: 'same', label: 'Igual', icon: 'pi-minus-circle', severity: 'secondary' },
    { value: 'better', label: 'Mejor', icon: 'pi-smile', severity: 'success' }
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
        } else {
          this.weeklyLog.set(null);
          this.weight = null;
          this.waist = null;
          this.arm = null;
          this.feeling = null;
          this.note = '';
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
      weightKg: this.weight ?? undefined,
      waistCm: this.waist ?? undefined,
      armCm: this.arm ?? undefined,
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

  feelingClasses(value: string | undefined): string {
    if (!value) return 'feeling-btn';
    const isActive = this.feeling === value;
    return isActive ? 'feeling-btn feeling-btn-active' : 'feeling-btn';
  }
}
