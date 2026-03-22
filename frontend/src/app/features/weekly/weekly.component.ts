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
  bgColor: string;
  iconColor: string;
}

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [FormsModule, Card, Select, Textarea, InputNumber, Tag],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
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

      <div class="space-y-4">
        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon">
                <i class="pi pi-calendar"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Semana</span>
                <p class="text-xs text-text-muted mt-0.5">Selecciona la semana a registrar</p>
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
            [placeholder]="'Selecciona semana'"
          />
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);">
                <i class="pi pi-sliders-h" style="color: var(--color-info);"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Medidas corporales</span>
                <p class="text-xs text-text-muted mt-0.5">Registra tus medidas semanales</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-3 gap-4">
            <div class="measure-input-group">
              <label class="measure-label">
                <i class="pi pi-user"></i>
                Peso
              </label>
              <p-inputnumber
                [(ngModel)]="weight"
                (onBlur)="save()"
                [minFractionDigits]="1"
                [maxFractionDigits]="1"
                [min]="30"
                [max]="200"
                [showButtons]="false"
                placeholder="--"
                suffix=" kg"
              />
            </div>
            <div class="measure-input-group">
              <label class="measure-label">
                <i class="pi pi-circle"></i>
                Cintura
              </label>
              <p-inputnumber
                [(ngModel)]="waist"
                (onBlur)="save()"
                [minFractionDigits]="1"
                [maxFractionDigits]="1"
                [min]="50"
                [max]="150"
                [showButtons]="false"
                placeholder="--"
                suffix=" cm"
              />
            </div>
            <div class="measure-input-group">
              <label class="measure-label">
                <i class="pi pi-arrow-right-arrow-left"></i>
                Brazo
              </label>
              <p-inputnumber
                [(ngModel)]="arm"
                (onBlur)="save()"
                [minFractionDigits]="1"
                [maxFractionDigits]="1"
                [min]="20"
                [max]="50"
                [showButtons]="false"
                placeholder="--"
                suffix=" cm"
              />
            </div>
          </div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
                <i class="pi pi-smile" style="color: var(--color-accent);"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">¿Cómo te sientes?</span>
                <p class="text-xs text-text-muted mt-0.5">Compara con la semana anterior</p>
              </div>
            </div>
          </ng-template>
          <div class="flex gap-3">
            @for (f of feelingOptions; track f.value) {
              <button
                (click)="setFeeling(f.value)"
                [class]="feelingClasses(f.value)"
              >
                <div class="feeling-btn-inner" [style.background]="isFeelingActive(f.value) ? f.bgColor : 'var(--color-bg-warm)'">
                  <i [class]="'pi ' + f.icon" [style.color]="isFeelingActive(f.value) ? f.iconColor : 'var(--color-text-muted)'"></i>
                </div>
                <span class="feeling-btn-label" [class.text-primary]="isFeelingActive(f.value)">{{ f.label }}</span>
              </button>
            }
          </div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
                <i class="pi pi-pencil" style="color: #9333ea;"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Nota semanal</span>
                <p class="text-xs text-text-muted mt-0.5">Reflexiones sobre tu semana</p>
              </div>
            </div>
          </ng-template>
          <textarea
            pTextarea
            [(ngModel)]="note"
            (blur)="saveNote()"
            placeholder="¿Qué tal fue esta semana? ¿Logros, retos, observaciones..."
            [autoResize]="true"
            rows="4"
            class="w-full"
          ></textarea>
        </p-card>

        @if (weeklyLog()) {
          <div class="section-divider"></div>
          
          <p-card styleClass="card-elevated">
            <ng-template pTemplate="header">
              <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-primary-light/30 to-transparent">
                <div class="card-header-icon" style="background: linear-gradient(135deg, var(--color-primary-light) 0%, white 100%);">
                  <i class="pi pi-chart-bar" style="color: var(--color-primary);"></i>
                </div>
                <div>
                  <span class="font-bold text-sm text-text">Resumen de la semana</span>
                  <p class="text-xs text-text-muted mt-0.5">Datos registrados</p>
                </div>
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
            @if (weeklyLog()!.weeklyFeeling) {
              <div class="mt-4 pt-4 border-t border-border-light flex items-center justify-center gap-2">
                <span class="text-sm text-text-muted font-medium">Sensación:</span>
                <span class="section-badge">
                  @if (weeklyLog()!.weeklyFeeling === 'better') {
                    <i class="pi pi-smile"></i> Mejor
                  } @else if (weeklyLog()!.weeklyFeeling === 'worse') {
                    <i class="pi pi-frown"></i> Peor
                  } @else {
                    <i class="pi pi-minus-circle"></i> Igual
                  }
                </span>
              </div>
            }
          </p-card>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .measure-input-group {
      text-align: center;
    }

    .measure-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .measure-label i {
      font-size: 12px;
    }

    .feeling-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px 8px;
      border-radius: 16px;
      border: 2px solid var(--color-border-light);
      background: linear-gradient(180deg, white 0%, var(--color-bg-warm) 100%);
      transition: all 0.2s ease;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .feeling-btn:hover {
      border-color: var(--color-primary);
      box-shadow: 0 4px 16px rgba(13, 148, 136, 0.15);
      transform: translateY(-2px);
    }

    .feeling-btn:active {
      transform: translateY(0) scale(0.98);
    }

    .feeling-btn-active {
      border-color: var(--color-primary);
      background: linear-gradient(180deg, var(--color-primary-light) 0%, white 100%);
      box-shadow: 0 4px 16px rgba(13, 148, 136, 0.2);
    }

    .feeling-btn-inner {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .feeling-btn-inner i {
      font-size: 22px;
      transition: color 0.2s ease;
    }

    .feeling-btn-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text);
      transition: color 0.2s ease;
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
    { value: 'worse', label: 'Peor', icon: 'pi-frown', bgColor: '#fee2e2', iconColor: '#dc2626' },
    { value: 'same', label: 'Igual', icon: 'pi-minus-circle', bgColor: '#fef3c7', iconColor: '#d97706' },
    { value: 'better', label: 'Mejor', icon: 'pi-smile', bgColor: '#d1fae5', iconColor: '#059669' }
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

  isFeelingActive(value: string | undefined): boolean {
    return this.feeling === value;
  }
}
