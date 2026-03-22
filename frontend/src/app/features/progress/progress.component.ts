import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { Tag } from 'primeng/tag';
import { ProgressService } from '../../core/services/progress.service';

Chart.register(...registerables);

interface WeightData { week: string; weight: number }
interface MealStat { name: string; icon: string; count: number; color: string; bgColor: string }
interface ActivityStat { name: string; count: number; percentage: number; color: string; bgColor: string; icon: string }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [Card, ProgressBar, Tag],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h2 class="page-title">Tu Progreso</h2>
          <p class="page-subtitle">Resumen de las últimas semanas</p>
        </div>
      </div>

      <div class="summary-hero">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="hero-icon" style="background: rgba(255,255,255,0.25)">
              <i class="pi pi-chart-line"></i>
            </div>
            <div>
              <h3 class="hero-title">Evolución de peso</h3>
              <p class="hero-subtitle">Últimas 12 semanas</p>
            </div>
          </div>
          @if (weightChange() !== null) {
            <div class="weight-change-badge" [class.positive]="weightChange()! < 0" [class.negative]="weightChange()! > 0">
              <i [class]="weightChange()! < 0 ? 'pi pi-arrow-down' : weightChange()! > 0 ? 'pi pi-arrow-up' : 'pi pi-minus'"></i>
              <span>{{ (weightChange()! > 0 ? '+' : '') + weightChange() }} kg</span>
            </div>
          }
        </div>
      </div>

      @if (weightData().length > 0) {
        <div class="chart-card mb-4">
          <canvas #weightChart></canvas>
        </div>
      } @else {
        <p-card styleClass="section-card mb-4">
          <div class="empty-state">
            <div class="empty-state-icon-wrapper">
              <i class="pi pi-chart-line empty-state-icon"></i>
            </div>
            <p class="empty-state-text">Registra tu peso semanalmente para ver la evolución</p>
          </div>
        </p-card>
      }

      <p-card styleClass="section-card">
        <ng-template pTemplate="header">
          <div class="card-header">
            <div class="card-header-icon">
              <i class="pi pi-utensils"></i>
            </div>
            <div>
              <span class="font-bold text-sm sm:text-base text-slate-900">Comidas registradas</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Últimos 30 días</p>
            </div>
            @if (totalMeals() > 0) {
              <p-tag 
                [value]="totalMeals() + ' comidas'"
                severity="info"
                icon="pi pi-check-circle"
                styleClass="ml-auto"
              />
            }
          </div>
        </ng-template>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          @for (meal of mealStats(); track meal.name) {
            <div class="stat-card">
              <div class="stat-icon-wrapper" [style.background]="meal.bgColor">
                <i [class]="'pi ' + meal.icon" [style.color]="meal.color"></i>
              </div>
              <div class="stat-value">{{ meal.count }}</div>
              <div class="stat-label">{{ meal.name }}</div>
            </div>
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
              <span class="font-bold text-sm sm:text-base text-slate-900">Actividad semanal</span>
              <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Distribución de tipos de actividad</p>
            </div>
          </div>
        </ng-template>
        @if (activityStats().length > 0) {
          <div class="progress-section">
            @for (activity of activityStats(); track activity.name) {
              <div class="progress-row">
                <div class="progress-icon" [style.background]="activity.bgColor">
                  <i [class]="'pi ' + activity.icon" [style.color]="activity.color"></i>
                </div>
                <div class="progress-content">
                  <div class="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span class="font-semibold text-xs sm:text-sm text-slate-700">{{ activity.name }}</span>
                    <span class="text-xs sm:text-sm font-bold" [style.color]="activity.color">{{ activity.count }} días</span>
                  </div>
                  <p-progressbar 
                    [value]="activity.percentage" 
                    [showValue]="false"
                    [style]="{'height': '6px'}"
                  />
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="empty-state py-6 sm:py-8">
            <div class="empty-state-icon-wrapper">
              <i class="pi pi-chart-bar empty-state-icon"></i>
            </div>
            <p class="empty-state-text">Registra tu actividad para ver estadísticas</p>
          </div>
        }
      </p-card>

      @if (latestWeekly()) {
        <p-card styleClass="section-card">
          <ng-template pTemplate="header">
            <div class="card-header">
              <div class="card-header-icon card-header-icon-info">
                <i class="pi pi-sliders-h"></i>
              </div>
              <div>
                <span class="font-bold text-sm sm:text-base text-slate-900">Últimas medidas</span>
                <p class="text-[10px] sm:text-xs text-slate-500 mt-0.5">Datos de la semana más reciente</p>
              </div>
            </div>
          </ng-template>
          <div class="grid grid-cols-3 gap-3 sm:gap-4">
            <div class="metric-card">
              <div class="metric-icon" style="background: #dbeafe">
                <i class="pi pi-user-edit" style="color: #3b82f6"></i>
              </div>
              <div class="metric-value">{{ latestWeekly()!.weightKg || '--' }}</div>
              <div class="metric-label">kg</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon" style="background: #f3e8ff">
                <i class="pi pi-arrows-h" style="color: #8b5cf6"></i>
              </div>
              <div class="metric-value">{{ latestWeekly()!.waistCm || '--' }}</div>
              <div class="metric-label">cintura</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon" style="background: #fce7f3">
                <i class="pi pi-arrow-right-arrow-left" style="color: #ec4899"></i>
              </div>
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

    .section-card {
      @apply mb-4;
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
        width: 56px;
        height: 56px;
        border-radius: 16px;
      }
    }

    .hero-icon i {
      font-size: 20px;
      color: white;
    }

    @media (min-width: 640px) {
      .hero-icon i {
        font-size: 26px;
      }
    }

    .hero-title {
      @apply text-base sm:text-lg font-bold text-white;
    }

    .hero-subtitle {
      @apply text-xs sm:text-sm text-white/80 mt-0.5;
    }

    .weight-change-badge {
      @apply flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      color: white;
    }

    .weight-change-badge i {
      @apply text-base sm:text-lg;
    }

    .weight-change-badge.positive i,
    .weight-change-badge.positive {
      color: #a7f3d0;
    }

    .weight-change-badge.negative i,
    .weight-change-badge.negative {
      color: #fecaca;
    }

    .chart-card {
      @apply bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    @media (min-width: 640px) {
      .chart-card {
        @apply p-4 rounded-2xl;
      }
    }

    .chart-card canvas {
      height: 180px !important;
    }

    @media (min-width: 640px) {
      .chart-card canvas {
        height: 220px !important;
      }
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 0;
    }

    @media (min-width: 640px) {
      .card-header {
        gap: 12px;
      }
    }

    .stat-card {
      @apply bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 text-center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      transition: all 0.2s ease;
    }

    @media (min-width: 640px) {
      .stat-card {
        @apply p-4 rounded-2xl;
      }
    }

    .stat-card:hover {
      @apply border-teal-200 shadow-md;
      transform: translateY(-2px);
    }

    .stat-icon-wrapper {
      @apply w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .stat-icon-wrapper i {
      @apply text-lg sm:text-xl;
    }

    .progress-section {
      @apply space-y-4;
    }

    @media (min-width: 640px) {
      .progress-section {
        @apply space-y-5;
      }
    }

    .progress-row {
      @apply flex items-start gap-2.5 sm:gap-3;
    }

    .progress-icon {
      @apply w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0;
    }

    .progress-icon i {
      @apply text-base sm:text-lg;
    }

    .progress-content {
      @apply flex-1 pt-0.5 sm:pt-1;
    }

    .metric-card {
      @apply bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-slate-200;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    @media (min-width: 640px) {
      .metric-card {
        @apply p-4 rounded-2xl;
      }
    }

    .metric-icon {
      @apply w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2;
    }

    .metric-icon i {
      @apply text-base sm:text-lg;
    }

    .metric-value {
      @apply text-xl sm:text-2xl font-bold text-slate-900 tracking-tight;
    }

    .metric-label {
      @apply text-[10px] sm:text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wide;
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

  mealColors: Record<string, { color: string; bgColor: string }> = {
    'breakfast': { color: '#d97706', bgColor: '#fef3c7' },
    'lunch': { color: '#c2410c', bgColor: '#fed7aa' },
    'snack': { color: '#7c3aed', bgColor: '#e9d5ff' },
    'dinner': { color: '#2563eb', bgColor: '#dbeafe' }
  };

  private activityColors: Record<string, { color: string; bgColor: string }> = {
    'Ninguna': { color: '#64748b', bgColor: '#f1f5f9' },
    'Paseo': { color: '#10b981', bgColor: '#d1fae5' },
    'Ejercicio': { color: '#f59e0b', bgColor: '#fef3c7' },
    'Ambos': { color: '#6366f1', bgColor: '#e0e7ff' }
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
          { name: 'Desayunos', icon: 'pi-sun', count: data.mealStats?.breakfast || 0, ...this.mealColors['breakfast'] },
          { name: 'Almuerzos', icon: 'pi-coffee', count: data.mealStats?.lunch || 0, ...this.mealColors['lunch'] },
          { name: 'Meriendas', icon: 'pi-briefcase', count: data.mealStats?.snack || 0, ...this.mealColors['snack'] },
          { name: 'Cenas', icon: 'pi-moon', count: data.mealStats?.dinner || 0, ...this.mealColors['dinner'] }
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
            ...(this.activityColors[labels[key] || key] || { color: '#10b981', bgColor: '#d1fae5' }),
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
            backgroundColor: '#0f172a',
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
              color: '#94a3b8',
              font: { size: 11, weight: 500 },
              callback: (value) => value + ' kg'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: { size: 11, weight: 500 }
            }
          }
        }
      }
    });
  }
}
