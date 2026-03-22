import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressService } from '../../core/services/progress.service';

Chart.register(...registerables);

interface WeightData { week: string; weight: number }
interface MealStat { name: string; icon: string; count: number; color: string }
interface ActivityStat { name: string; count: number; percentage: number; color: string; icon: string }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [Card, ProgressBar],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h2 class="page-title">Tu Progreso</h2>
          <p class="page-subtitle">Resumen de las últimas semanas</p>
        </div>
      </div>

      <div class="space-y-4">
        <p-card styleClass="card-elevated">
          <ng-template pTemplate="header">
            <div class="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary-light/30 to-transparent">
              <div class="flex items-center gap-3">
                <div class="card-header-icon">
                  <i class="pi pi-chart-line"></i>
                </div>
                <div>
                  <span class="font-bold text-sm text-text">Evolución de peso</span>
                  <p class="text-xs text-text-muted mt-0.5">Últimas 12 semanas</p>
                </div>
              </div>
              @if (weightChange() !== null) {
                <div class="weight-change-badge" 
                     [class.positive]="weightChange()! < 0" 
                     [class.negative]="weightChange()! > 0">
                  <i [class]="weightChange()! < 0 ? 'pi pi-arrow-down' : weightChange()! > 0 ? 'pi pi-arrow-up' : 'pi pi-minus'"></i>
                  {{ weightChange()! > 0 ? '+' : '' }}{{ weightChange() }} kg
                </div>
              }
            </div>
          </ng-template>
          @if (weightData().length > 0) {
            <div class="chart-container">
              <canvas #weightChart></canvas>
            </div>
          } @else {
            <div class="empty-state">
              <div class="empty-state-icon-wrapper">
                <i class="pi pi-chart-line empty-state-icon"></i>
              </div>
              <p class="empty-state-text">Registra tu peso semanalmente para ver la evolución</p>
            </div>
          }
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon">
                <i class="pi pi-utensils"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Comidas registradas</span>
                <p class="text-xs text-text-muted mt-0.5">Últimos 30 días</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-2 gap-3">
            @for (meal of mealStats(); track meal.name) {
              <div class="meal-stat-card">
                <div class="meal-stat-icon" [style.background]="meal.color">
                  <i [class]="'pi ' + mealIcons[meal.icon]"></i>
                </div>
                <div class="meal-stat-content">
                  <div class="meal-stat-value">{{ meal.count }}</div>
                  <div class="meal-stat-label">{{ meal.name }}</div>
                </div>
              </div>
            }
          </div>
          @if (totalMeals() > 0) {
            <div class="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
              <span class="text-sm text-text-muted font-medium">Total registrado</span>
              <span class="section-badge">
                <i class="pi pi-check-circle"></i>
                {{ totalMeals() }} comidas
              </span>
            </div>
          }
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-bg-warm/50 to-transparent">
              <div class="card-header-icon" style="background: linear-gradient(135deg, var(--color-secondary-light) 0%, #c7d2fe 100%);">
                <i class="pi pi-bolt" style="color: var(--color-secondary);"></i>
              </div>
              <div>
                <span class="font-bold text-sm text-text">Actividad semanal</span>
                <p class="text-xs text-text-muted mt-0.5">Distribución de tipos de actividad</p>
              </div>
            </div>
          </ng-template>
          @if (activityStats().length > 0) {
            <div class="space-y-4">
              @for (activity of activityStats(); track activity.name) {
                <div class="activity-row">
                  <div class="activity-icon" [style.background]="activity.color + '20'">
                    <i [class]="'pi ' + activity.icon" [style.color]="activity.color"></i>
                  </div>
                  <div class="activity-content">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-semibold text-sm text-text">{{ activity.name }}</span>
                      <span class="text-sm font-bold" [style.color]="activity.color">{{ activity.count }} días</span>
                    </div>
                    <div class="activity-bar">
                      <p-progressbar [value]="activity.percentage" [showValue]="false" [style]="{'height': '8px'}"></p-progressbar>
                    </div>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="empty-state py-8">
              <div class="empty-state-icon-wrapper">
                <i class="pi pi-chart-bar empty-state-icon"></i>
              </div>
              <p class="empty-state-text">Registra tu actividad para ver estadísticas</p>
            </div>
          }
        </p-card>

        @if (latestWeekly()) {
          <p-card styleClass="card-elevated">
            <ng-template pTemplate="header">
              <div class="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-primary-light/30 to-transparent">
                <div class="card-header-icon" style="background: linear-gradient(135deg, var(--color-primary-light) 0%, white 100%);">
                  <i class="pi pi-sliders-h" style="color: var(--color-primary);"></i>
                </div>
                <div>
                  <span class="font-bold text-sm text-text">Últimas medidas</span>
                  <p class="text-xs text-text-muted mt-0.5">Datos de la semana más reciente</p>
                </div>
              </div>
            </ng-template>
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-card">
                <div class="metric-value">{{ latestWeekly()!.weightKg || '--' }}</div>
                <div class="metric-label">kg</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">{{ latestWeekly()!.waistCm || '--' }}</div>
                <div class="metric-label">cintura</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">{{ latestWeekly()!.armCm || '--' }}</div>
                <div class="metric-label">brazo</div>
              </div>
            </div>
          </p-card>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .weight-change-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
    }

    .weight-change-badge.positive {
      background: var(--color-primary-light);
      color: var(--color-primary-dark);
    }

    .weight-change-badge.negative {
      background: #fee2e2;
      color: #dc2626;
    }

    .meal-stat-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px;
      background: linear-gradient(135deg, white 0%, var(--color-bg-warm) 100%);
      border-radius: 14px;
      border: 1px solid var(--color-border-light);
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .meal-stat-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .meal-stat-icon i {
      font-size: 18px;
      color: white;
    }

    .meal-stat-content {
      flex: 1;
    }

    .meal-stat-value {
      font-size: 22px;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1.2;
    }

    .meal-stat-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    .activity-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon i {
      font-size: 16px;
    }

    .activity-content {
      flex: 1;
      padding-top: 4px;
    }

    .activity-bar {
      height: 8px;
      background: var(--color-bg-warm);
      border-radius: 4px;
      overflow: hidden;
    }

    .chart-container {
      position: relative;
      height: 200px;
      width: 100%;
    }
  `]
})
export class ProgressComponent implements OnInit, AfterViewInit {
  @ViewChild('weightChart') weightChartRef!: ElementRef<HTMLCanvasElement>;

  private progressService = inject(ProgressService);
  private chart: Chart | null = null;
  private chartInitialized = signal(false);
  
  weightData = signal<WeightData[]>([]);
  mealStats = signal<MealStat[]>([]);
  activityStats = signal<ActivityStat[]>([]);
  totalMeals = signal(0);
  latestWeekly = signal<any>(null);

  weightChange = signal<number | null>(null);

  mealIcons: Record<string, string> = {
    'breakfast': 'pi-sun',
    'lunch': 'pi-coffee',
    'snack': 'pi-briefcase',
    'dinner': 'pi-moon'
  };

  mealColors: Record<string, string> = {
    'breakfast': '#f59e0b',
    'lunch': '#92400e',
    'snack': '#7c3aed',
    'dinner': '#3b82f6'
  };

  private activityColors: Record<string, string> = {
    'Ninguna': '#9ca3af',
    'Paseo': '#10b981',
    'Ejercicio': '#6366f1',
    'Ambos': '#f59e0b'
  };

  private activityIcons: Record<string, string> = {
    'Ninguna': 'pi-minus',
    'Paseo': 'pi-directions-walk',
    'Ejercicio': 'pi-bolt',
    'Ambos': 'pi-star'
  };

  constructor() {
    effect(() => {
      if (this.chartInitialized() && this.weightChartRef) {
        this.renderChart();
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.chartInitialized.set(true);
    this.renderChart();
  }

  loadData() {
    this.progressService.getSummary().subscribe({
      next: (data) => {
        this.weightData.set(data.weightData || []);
        this.mealStats.set([
          { name: 'Desayunos', icon: 'breakfast', count: data.mealStats?.breakfast || 0, color: this.mealColors['breakfast'] },
          { name: 'Almuerzos', icon: 'lunch', count: data.mealStats?.lunch || 0, color: this.mealColors['lunch'] },
          { name: 'Meriendas', icon: 'snack', count: data.mealStats?.snack || 0, color: this.mealColors['snack'] },
          { name: 'Cenas', icon: 'dinner', count: data.mealStats?.dinner || 0, color: this.mealColors['dinner'] }
        ]);
        this.totalMeals.set(data.totalMeals || 0);
        this.latestWeekly.set(data.latestWeekly);

        const actStats = data.activityStats || {};
        const total = Object.values(actStats).reduce((a: number, b: unknown) => a + (b as number), 0) || 1;
        const labels: Record<string, string> = {
          'none': 'Ninguna',
          'walk': 'Paseo',
          'exercise': 'Ejercicio',
          'walk_and_exercise': 'Ambos'
        };

        this.activityStats.set(
          Object.entries(actStats).map(([key, count]) => ({
            name: labels[key] || key,
            count: count as number,
            percentage: Math.round(((count as number) / total) * 100),
            color: this.activityColors[labels[key] || key] || '#10b981',
            icon: this.activityIcons[labels[key] || key] || 'pi-circle'
          }))
        );

        if (data.weightData && data.weightData.length >= 2) {
          const first = data.weightData[0].weight;
          const last = data.weightData[data.weightData.length - 1].weight;
          this.weightChange.set(Math.round((last - first) * 10) / 10);
        }

        setTimeout(() => this.renderChart(), 100);
      },
      error: (err) => console.error('Error loading progress:', err)
    });
  }

  private formatWeekLabel(weekStart: string): string {
    const date = new Date(weekStart + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  private renderChart() {
    if (!this.weightChartRef?.nativeElement) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const data = this.weightData();
    if (data.length === 0) return;

    this.chart = new Chart(this.weightChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.map(d => this.formatWeekLabel(d.week)),
        datasets: [{
          label: 'Peso (kg)',
          data: data.map(d => d.weight),
          borderColor: '#0d9488',
          backgroundColor: 'rgba(13, 148, 136, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#0d9488',
          pointBorderWidth: 3,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#0d9488',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e3a34',
            titleColor: '#ffffff',
            bodyColor: 'rgba(255,255,255,0.7)',
            padding: 14,
            cornerRadius: 12,
            displayColors: false,
            titleFont: {
              size: 13,
              weight: 600
            },
            bodyFont: {
              size: 14,
              weight: 600
            },
            callbacks: {
              label: (context) => `${context.parsed.y} kg`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0,0,0,0.04)'
            },
            ticks: {
              color: '#7c9e99',
              font: { size: 11, weight: 500 },
              callback: (value) => value + ' kg'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#7c9e99',
              font: { size: 11, weight: 500 }
            }
          }
        }
      }
    });
  }
}
