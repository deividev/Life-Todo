import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProgressService } from '../../core/services/progress.service';

Chart.register(...registerables);

interface WeightData { week: string; weight: number }
interface MealStat { name: string; icon: string; count: number }
interface ActivityStat { name: string; count: number; percentage: number; color: string }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  template: `
    <div class="space-y-5">
      <div>
        <h2 class="text-2xl font-bold text-text">Tu Progreso</h2>
        <p class="text-sm text-text-muted mt-0.5">Últimas 12 semanas</p>
      </div>

      <section class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="card-header text-xs m-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            Evolución de peso
          </h3>
          @if (weightChange() !== null) {
            <div class="flex items-center gap-1 text-sm font-medium" [class.text-success]="weightChange()! < 0" [class.text-danger]="weightChange()! > 0">
              @if (weightChange()! < 0) {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              } @else if (weightChange()! > 0) {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              }
              {{ weightChange()! > 0 ? '+' : '' }}{{ weightChange() }} kg
            </div>
          }
        </div>
        @if (weightData().length > 0) {
          <div class="h-56">
            <canvas #weightChart></canvas>
          </div>
        } @else {
          <div class="empty-state">
            <div class="empty-state-icon">📊</div>
            <p class="empty-state-text">Registra tu peso semanalmente para ver la evolución</p>
          </div>
        }
      </section>

      <section class="card">
        <h3 class="card-header text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
            <path d="M7 2v20"></path>
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
          </svg>
          Comidas (últimos 30 días)
        </h3>
        <div class="grid grid-cols-2 gap-3">
          @for (meal of mealStats(); track meal.name) {
            <div class="bg-gradient-to-br from-surface to-background rounded-xl p-4 border border-border/50">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ meal.icon }}</span>
                <div class="flex-1">
                  <div class="text-2xl font-bold text-text">{{ meal.count }}</div>
                  <div class="text-xs text-text-muted">{{ meal.name }}</div>
                </div>
              </div>
            </div>
          }
        </div>
        @if (totalMeals() > 0) {
          <div class="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-sm">
            <span class="text-text-muted">Total registrado</span>
            <span class="font-semibold text-primary">{{ totalMeals() }} comidas</span>
          </div>
        }
      </section>

      <section class="card">
        <h3 class="card-header text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 16 4-4-4-4"></path>
            <path d="m6 8-4 4 4 4"></path>
            <path d="m14.5 4-5 16"></path>
          </svg>
          Actividad semanal
        </h3>
        @if (activityStats().length > 0) {
          <div class="space-y-4">
            @for (activity of activityStats(); track activity.name) {
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="flex items-center gap-2">
                    <span>{{ activity.name }}</span>
                  </span>
                  <span class="text-text-muted font-medium">{{ activity.count }} días</span>
                </div>
                <div class="h-3 bg-background rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    [style.width.%]="activity.percentage"
                    [style.background-color]="activity.color"
                  ></div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="empty-state py-6">
            <div class="empty-state-icon text-3xl">🏃</div>
            <p class="empty-state-text mt-2">Registra tu actividad para ver estadísticas</p>
          </div>
        }
      </section>

      @if (latestWeekly()) {
        <section class="card">
          <h3 class="card-header text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2v20"></path>
              <path d="M18 2v20"></path>
              <path d="M6 12h12"></path>
            </svg>
            Últimas medidas
          </h3>
          <div class="grid grid-cols-3 gap-3">
            <div class="metric-card">
              <div class="metric-value text-xl">{{ latestWeekly()!.weightKg || '--' }}</div>
              <div class="metric-label">kg</div>
            </div>
            <div class="metric-card">
              <div class="metric-value text-xl">{{ latestWeekly()!.waistCm || '--' }}</div>
              <div class="metric-label">cintura</div>
            </div>
            <div class="metric-card">
              <div class="metric-value text-xl">{{ latestWeekly()!.armCm || '--' }}</div>
              <div class="metric-label">brazo</div>
            </div>
          </div>
        </section>
      }
    </div>
  `
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

  private activityColors: Record<string, string> = {
    'Ninguna': '#94a3b8',
    'Paseo': '#22c55e',
    'Ejercicio': '#3b82f6',
    'Ambos': '#8b5cf6'
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
          { name: 'Desayunos', icon: '🌅', count: data.mealStats?.breakfast || 0 },
          { name: 'Almuerzos', icon: '☀️', count: data.mealStats?.lunch || 0 },
          { name: 'Meriendas', icon: '🍪', count: data.mealStats?.snack || 0 },
          { name: 'Cenas', icon: '🌙', count: data.mealStats?.dinner || 0 }
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
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#10b981',
          pointBorderWidth: 2,
          pointHoverRadius: 7
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
            backgroundColor: '#1e293b',
            titleColor: '#ffffff',
            bodyColor: '#94a3b8',
            padding: 12,
            cornerRadius: 8,
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
              color: 'rgba(0,0,0,0.05)'
            },
            ticks: {
              color: '#64748b',
              font: { size: 11 }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b',
              font: { size: 11 }
            }
          }
        }
      }
    });
  }
}
