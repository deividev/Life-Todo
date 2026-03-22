import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressService } from '../../core/services/progress.service';

Chart.register(...registerables);

interface WeightData { week: string; weight: number }
interface MealStat { name: string; icon: string; count: number }
interface ActivityStat { name: string; count: number; percentage: number; color: string }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [Card, ProgressBar],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <h2 class="page-title">Tu Progreso</h2>
        <p class="page-subtitle">Últimas 12 semanas</p>
      </div>

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center justify-between px-5 py-4 border-b border-border-light">
            <div class="flex items-center gap-2">
              <i class="pi pi-chart-line text-primary"></i>
              <span class="font-semibold text-sm text-text">Evolución de peso</span>
            </div>
            @if (weightChange() !== null) {
              <div class="flex items-center gap-1.5 text-sm font-semibold" 
                   [class.text-success]="weightChange()! < 0" 
                   [class.text-danger]="weightChange()! > 0" 
                   [class.text-text-muted]="weightChange() === 0">
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

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-utensils text-primary"></i>
            <span class="font-semibold text-sm text-text">Comidas (30 días)</span>
          </div>
        </ng-template>
        <div class="grid grid-cols-2 gap-3">
          @for (meal of mealStats(); track meal.name) {
            <div class="stat-card">
              <div class="stat-card-icon">
                <i [class]="'pi ' + mealIcons[meal.icon]"></i>
              </div>
              <div class="stat-card-value">{{ meal.count }}</div>
              <div class="stat-card-label">{{ meal.name }}</div>
            </div>
          }
        </div>
        @if (totalMeals() > 0) {
          <div class="mt-4 pt-4 border-t border-border-light flex items-center justify-between text-sm">
            <span class="text-text-muted font-medium">Total registrado</span>
            <span class="font-semibold text-primary">{{ totalMeals() }} comidas</span>
          </div>
        }
      </p-card>

      <p-card styleClass="mb-4">
        <ng-template pTemplate="header">
          <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
            <i class="pi pi-bolt text-primary"></i>
            <span class="font-semibold text-sm text-text">Actividad semanal</span>
          </div>
        </ng-template>
        @if (activityStats().length > 0) {
          <div class="space-y-4">
            @for (activity of activityStats(); track activity.name) {
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="font-medium text-text">{{ activity.name }}</span>
                  <span class="text-text-muted font-medium">{{ activity.count }} días</span>
                </div>
                <div class="stat-bar">
                  <p-progressbar [value]="activity.percentage" [showValue]="false" [style]="{'height': '10px', 'background': 'var(--color-bg-warm)', 'border-radius': '9999px'}">
                    <ng-template pTemplate="container" [ngStyle]="{'background': activity.color, 'border-radius': '9999px'}"></ng-template>
                  </p-progressbar>
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
            <div class="flex items-center gap-2 px-5 py-4 border-b border-border-light">
              <i class="pi pi-sliders-h text-primary"></i>
              <span class="font-semibold text-sm text-text">Últimas medidas</span>
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

    :host ::ng-deep .p-progressbar {
      height: 10px;
      background: var(--color-bg-warm);
      border-radius: 9999px;
    }

    :host ::ng-deep .p-progressbar .p-progressbar-value {
      background: var(--color-primary);
      border-radius: 9999px;
    }

    .chart-container {
      @apply relative h-48 w-full;
    }

    .stat-card {
      @apply bg-bg-warm rounded-xl p-3.5 border border-border-light;
    }

    .stat-card-icon {
      @apply w-10 h-10 rounded-xl bg-surface flex items-center justify-center shadow-sm mb-3;
    }

    .stat-card-icon i {
      @apply text-lg text-primary;
    }

    .stat-card-value {
      @apply text-xl font-bold text-text;
    }

    .stat-card-label {
      @apply text-xs text-text-muted font-medium mt-0.5;
    }

    .stat-bar {
      @apply h-2.5 bg-bg-warm rounded-full overflow-hidden;
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

  private activityColors: Record<string, string> = {
    'Ninguna': '#9ca3af',
    'Paseo': '#10b981',
    'Ejercicio': '#6366f1',
    'Ambos': '#f59e0b'
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
          { name: 'Desayunos', icon: 'breakfast', count: data.mealStats?.breakfast || 0 },
          { name: 'Almuerzos', icon: 'lunch', count: data.mealStats?.lunch || 0 },
          { name: 'Meriendas', icon: 'snack', count: data.mealStats?.snack || 0 },
          { name: 'Cenas', icon: 'dinner', count: data.mealStats?.dinner || 0 }
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
            color: this.activityColors[labels[key] || key] || '#10b981'
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
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#10b981',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#10b981'
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
            backgroundColor: '#1f2937',
            titleColor: '#ffffff',
            bodyColor: '#9ca3af',
            padding: 12,
            cornerRadius: 10,
            displayColors: false,
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
              color: '#9ca3af',
              font: { size: 11 }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9ca3af',
              font: { size: 11 }
            }
          }
        }
      }
    });
  }
}
