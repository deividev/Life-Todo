import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressService } from '../../core/services/progress.service';

Chart.register(...registerables);

interface WeightData { week: string; weight: number }
interface MealStat { name: string; icon: string; count: number; color: string; bgColor: string; gradient: string }
interface ActivityStat { name: string; count: number; percentage: number; color: string; bgColor: string; gradient: string; icon: string }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ProgressBar],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h2 class="page-title">Tu Progreso</h2>
          <p class="page-subtitle">Resumen de las últimas semanas</p>
        </div>
      </div>

      <div class="hero-section mb-5">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4 sm:gap-5">
            <div class="hero-icon-lg">
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
        <div class="widget-card mb-5">
          <div class="chart-container">
            <canvas #weightChart></canvas>
          </div>
        </div>
      } @else {
        <div class="widget-card mb-5">
          <div class="empty-state">
            <div class="empty-state-icon-wrapper">
              <i class="pi pi-chart-line empty-state-icon"></i>
            </div>
            <p class="empty-state-text">Registra tu peso semanalmente para ver la evolución</p>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        @if (latestWeekly()) {
          <div class="widget-card lg:col-span-1">
            <div class="widget-header">
              <div class="widget-icon" style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);">
                <i class="pi pi-sliders-h" style="color: #059669;"></i>
              </div>
              <div>
                <h4 class="widget-title">Últimas medidas</h4>
                <p class="widget-subtitle">Semana más reciente</p>
              </div>
            </div>
            <div class="space-y-3 sm:space-y-4">
              <div class="flex items-center gap-3 p-3 sm:p-4 bg-slate-50/80 rounded-xl">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);">
                  <i class="pi pi-user-edit" style="color: #2563eb; font-size: 1.125rem;"></i>
                </div>
                <div class="flex-1">
                  <div class="text-xl sm:text-2xl font-bold text-slate-900">{{ latestWeekly()!.weightKg || '--' }}</div>
                  <div class="text-xs text-slate-500 font-medium">kg</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 sm:p-4 bg-slate-50/80 rounded-xl">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
                  <i class="pi pi-arrows-h" style="color: #7c3aed; font-size: 1.125rem;"></i>
                </div>
                <div class="flex-1">
                  <div class="text-xl sm:text-2xl font-bold text-slate-900">{{ latestWeekly()!.waistCm || '--' }}</div>
                  <div class="text-xs text-slate-500 font-medium">cintura (cm)</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 sm:p-4 bg-slate-50/80 rounded-xl">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);">
                  <i class="pi pi-arrow-right-arrow-left" style="color: #db2777; font-size: 1.125rem;"></i>
                </div>
                <div class="flex-1">
                  <div class="text-xl sm:text-2xl font-bold text-slate-900">{{ latestWeekly()!.armCm || '--' }}</div>
                  <div class="text-xs text-slate-500 font-medium">brazo (cm)</div>
                </div>
              </div>
            </div>
          </div>
        }

        <div class="widget-card lg:col-span-2">
          <div class="widget-header">
            <div class="widget-icon" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <i class="pi pi-utensils" style="color: #d97706;"></i>
            </div>
            <div class="flex-1">
              <h4 class="widget-title">Comidas registradas</h4>
              <p class="widget-subtitle">Últimos 30 días</p>
            </div>
            @if (totalMeals() > 0) {
              <div class="badge-pill">
                <i class="pi pi-check-circle"></i>
                <span>{{ totalMeals() }} comidas</span>
              </div>
            }
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            @for (meal of mealStats(); track meal.name) {
              <div class="stat-card-mini">
                <div class="stat-icon-mini" [style.background]="meal.gradient">
                  <i [class]="'pi ' + meal.icon" [style.color]="meal.color"></i>
                </div>
                <div class="stat-value-mini">{{ meal.count }}</div>
                <div class="stat-label-mini">{{ meal.name }}</div>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="widget-card">
        <div class="widget-header">
          <div class="widget-icon" style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);">
            <i class="pi pi-directions-run" style="color: #059669;"></i>
          </div>
          <div>
            <h4 class="widget-title">Actividad semanal</h4>
            <p class="widget-subtitle">Distribución de tipos de actividad</p>
          </div>
        </div>
        @if (activityStats().length > 0) {
          <div class="progress-section">
            @for (activity of activityStats(); track activity.name) {
              <div class="progress-row">
                <div class="progress-icon" [style.background]="activity.gradient">
                  <i [class]="'pi ' + activity.icon" [style.color]="activity.color"></i>
                </div>
                <div class="progress-content">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold text-sm sm:text-base text-slate-700">{{ activity.name }}</span>
                    <span class="text-sm sm:text-base font-bold" [style.color]="activity.color">{{ activity.count }} días</span>
                  </div>
                  <p-progressbar 
                    [value]="activity.percentage" 
                    [showValue]="false"
                    [style]="{'height': '8px', 'border-radius': '6px'}"
                  />
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="empty-state py-8 sm:py-10">
            <div class="empty-state-icon-wrapper">
              <i class="pi pi-chart-bar empty-state-icon"></i>
            </div>
            <p class="empty-state-text">Registra tu actividad para ver estadísticas</p>
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

    .hero-section {
      @apply bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden;
      box-shadow: 0 8px 32px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255,255,255,0.25);
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

    .weight-change-badge {
      @apply flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      color: white;
    }

    @media (min-width: 640px) {
      .weight-change-badge {
        @apply px-4 py-2 rounded-xl text-base;
      }
    }

    .weight-change-badge i {
      @apply text-sm;
    }

    @media (min-width: 640px) {
      .weight-change-badge i {
        @apply text-base;
      }
    }

    .weight-change-badge.positive i,
    .weight-change-badge.positive {
      color: #a7f3d0;
    }

    .weight-change-badge.negative i,
    .weight-change-badge.negative {
      color: #fca5a5;
    }

    .chart-container {
      @apply rounded-xl overflow-hidden;
    }

    .chart-container canvas {
      height: 200px !important;
    }

    @media (min-width: 640px) {
      .chart-container canvas {
        height: 240px !important;
      }
    }

    @media (min-width: 1024px) {
      .chart-container canvas {
        height: 300px !important;
      }
    }

    .stat-card-mini {
      @apply bg-slate-50/80 rounded-xl p-4 sm:p-5 text-center;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (hover: hover) {
      .stat-card-mini:hover {
        @apply bg-slate-100/80;
        transform: translateY(-2px);
      }
    }

    .stat-icon-mini {
      @apply w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    @media (min-width: 640px) {
      .stat-icon-mini {
        @apply w-12 h-12 mb-4;
      }
    }

    .stat-icon-mini i {
      @apply text-lg sm:text-xl;
    }

    .stat-value-mini {
      @apply text-2xl sm:text-3xl font-bold text-slate-900;
    }

    .stat-label-mini {
      @apply text-xs text-slate-500 mt-1 font-medium;
    }

    @media (min-width: 640px) {
      .stat-label-mini {
        @apply text-sm mt-1.5;
      }
    }

    .progress-section {
      @apply space-y-5;
    }

    @media (min-width: 1024px) {
      .progress-section {
        @apply space-y-6;
      }
    }

    .progress-row {
      @apply flex items-start gap-4;
    }

    @media (min-width: 1024px) {
      .progress-row {
        @apply gap-5;
      }
    }

    .progress-icon {
      @apply w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    @media (min-width: 1024px) {
      .progress-icon {
        @apply w-14 h-14;
      }
    }

    .progress-icon i {
      @apply text-lg;
    }

    @media (min-width: 1024px) {
      .progress-icon i {
        @apply text-xl;
      }
    }

    .progress-content {
      @apply flex-1 pt-1;
    }

    .empty-state {
      @apply flex flex-col items-center justify-center py-10 sm:py-14 text-center;
    }

    .empty-state-icon-wrapper {
      @apply w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-5;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }

    @media (min-width: 1024px) {
      .empty-state-icon-wrapper {
        @apply w-24 h-24 mb-6;
      }
    }

    .empty-state-icon {
      @apply text-3xl sm:text-4xl text-slate-400;
    }

    @media (min-width: 1024px) {
      .empty-state-icon {
        @apply text-5xl;
      }
    }

    .empty-state-text {
      @apply text-slate-500 text-sm leading-relaxed max-w-[240px] font-medium;
    }

    @media (min-width: 1024px) {
      .empty-state-text {
        @apply text-base max-w-[300px];
      }
    }

    .badge-pill {
      @apply inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold;
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      color: #065f46;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
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
    'snack': 'pi-apple',
    'dinner': 'pi-moon'
  };

  mealColors: Record<string, { color: string; bgColor: string; gradient: string }> = {
    'breakfast': { color: '#ca8a04', bgColor: '#fef08a', gradient: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)' },
    'lunch': { color: '#ea580c', bgColor: '#fdba74', gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)' },
    'snack': { color: '#7c3aed', bgColor: '#c4b5fd', gradient: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)' },
    'dinner': { color: '#2563eb', bgColor: '#93c5fd', gradient: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)' }
  };

  private activityColors: Record<string, { color: string; bgColor: string; gradient: string }> = {
    'Ninguna': { color: '#64748b', bgColor: '#e2e8f0', gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' },
    'Paseo': { color: '#059669', bgColor: '#a7f3d0', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
    'Ejercicio': { color: '#d97706', bgColor: '#fde68a', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    'Ambos': { color: '#4f46e5', bgColor: '#c7d2fe', gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' }
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
          { name: 'Meriendas', icon: 'pi-apple', count: data.mealStats?.snack || 0, ...this.mealColors['snack'] },
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
            ...(this.activityColors[labels[key] || key] || { color: '#10b981', bgColor: '#d1fae5', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' }),
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
