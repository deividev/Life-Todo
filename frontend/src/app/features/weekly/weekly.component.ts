import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { WeeklyLogService } from '../../core/services/weekly-log.service';
import { WeeklyLog, WeeklyFeeling } from '../../core/models/weekly-log.model';
import { getWeekStartMadrid, getWeekOptions } from '../../shared/utils/timezone';

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
    Button,
    IconField,
    InputIcon
  ],
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

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon">
              <i class="pi pi-calendar"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">Semana</span>
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
          placeholder="Selecciona semana"
        >
          <ng-template pTemplate="dropdownicon">
            <i class="pi pi-calendar"></i>
          </ng-template>
        </p-select>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);">
              <i class="pi pi-sliders-h" style="color: #2563eb;"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">Medidas corporales</span>
              <p class="text-xs text-text-muted mt-0.5">Registra tus medidas semanales</p>
            </div>
          </div>
        </ng-template>
        <div class="grid grid-cols-3 gap-4">
          <div class="measure-group">
            <label class="measure-label">
              <i class="pi pi-user-edit"></i>
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
              styleClass="w-full"
            />
          </div>
          <div class="measure-group">
            <label class="measure-label">
              <i class="pi pi-arrows-h"></i>
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
              styleClass="w-full"
            />
          </div>
          <div class="measure-group">
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
              styleClass="w-full"
            />
          </div>
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <i class="pi pi-smile" style="color: #d97706;"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">¿Cómo te sientes?</span>
              <p class="text-xs text-text-muted mt-0.5">Compara con la semana anterior</p>
            </div>
          </div>
        </ng-template>
        <div class="flex gap-3">
          @for (f of feelingOptions; track f.value) {
            <p-button
              [label]="f.label"
              [icon]="'pi ' + f.icon"
              [severity]="isFeelingActive(f.value) ? 'warn' : 'secondary'"
              [outlined]="!isFeelingActive(f.value)"
              (onClick)="setFeeling(f.value)"
              styleClass="feeling-btn flex-1"
            />
          }
        </div>
      </p-card>

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
              <i class="pi pi-pencil" style="color: #9333ea;"></i>
            </div>
            <div>
              <span class="font-bold text-base text-text">Nota semanal</span>
              <p class="text-xs text-text-muted mt-0.5">Reflexiones sobre tu semana</p>
            </div>
          </div>
        </ng-template>
        <p-iconfield>
          <p-inputicon class="pi pi-pencil" style="color: var(--color-text-muted);"/>
          <textarea 
            pTextarea 
            [(ngModel)]="note" 
            (blur)="saveNote()" 
            placeholder="¿Qué tal fue esta semana? ¿Logros, retos, observaciones..."
            [autoResize]="true" 
            rows="4" 
            class="w-full"
          ></textarea>
        </p-iconfield>
      </p-card>

      @if (weeklyLog()?.weightKg || weeklyLog()?.waistCm || weeklyLog()?.armCm || weeklyLog()?.weeklyFeeling) {
        <div class="section-divider"></div>
        
        <p-card styleClass="summary-card">
          <ng-template pTemplate="header">
            <div class="card-header">
              <div class="card-header-icon" style="background: linear-gradient(135deg, var(--color-primary-light) 0%, rgba(204, 251, 241, 0.5) 100%);">
                <i class="pi pi-chart-bar" style="color: var(--color-primary);"></i>
              </div>
              <div>
                <span class="font-bold text-base text-text">Resumen de la semana</span>
                <p class="text-xs text-text-muted mt-0.5">Datos registrados</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-3 gap-4">
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
            <div class="mt-4 pt-4 border-t border-border-light">
              <div class="flex items-center justify-center gap-2">
                <span class="text-sm text-text-muted font-medium">Sensación:</span>
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
      margin-bottom: 16px;
    }

    .summary-card {
      background: linear-gradient(135deg, var(--color-primary-light) 0%, white 100%) !important;
      border: 1px solid rgba(13, 148, 136, 0.2) !important;
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

    .measure-group {
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
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .measure-label i {
      font-size: 12px;
    }

    :host ::ng-deep .feeling-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 12px;
    }

    :host ::ng-deep .feeling-btn .p-button-label {
      font-size: 12px;
      font-weight: 600;
      margin-top: 8px;
    }

    :host ::ng-deep .feeling-btn .p-button-icon {
      font-size: 24px;
    }

    :host ::ng-deep .p-inputnumber {
      width: 100%;
    }

    :host ::ng-deep .p-inputnumber .p-inputnumber-input {
      width: 100%;
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
