import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProgressService } from '../../core/services/progress.service';

Chart.register(...registerables);

interface WeightData { week: string; weight: number }
interface MealStat { name: string; icon: string; count: number }
interface ActivityStat { name: string; count: number; percentage: number }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  template: `
    <div class="space-y-6">
      <h2 class="text-xl font-bold">Progreso</h2>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-4 flex items-center gap-2">
          <span class="text-xl">📊</span> Peso Semanal
        </h3>
        @if (weightData().length > 0) {
          <div class="h-64">
            <canvas #weightChart></canvas>
          </div>
        } @else {
          <div class="h-64 flex items-center justify-center text-text-muted">
            <p>No hay datos de peso registrados</p>
          </div>
        }
      </section>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-4 flex items-center gap-2">
          <span class="text-xl">🍽️</span> Resumen de Comidas
        </h3>
        <div class="grid grid-cols-2 gap-4">
          @for (meal of mealStats(); track meal.name) {
            <div class="bg-background rounded-xl p-4 text-center">
              <div class="text-3xl mb-1">{{ meal.icon }}</div>
              <div class="text-2xl font-bold text-primary">{{ meal.count }}</div>
              <div class="text-sm text-text-muted">{{ meal.name }}</div>
            </div>
          }
        </div>
        <div class="mt-4 text-center text-text-muted text-sm">
          Últimos 30 días • {{ totalMeals() }} comidas registradas
        </div>
      </section>

      <section class="bg-surface rounded-2xl p-4 shadow-sm">
        <h3 class="font-semibold mb-4 flex items-center gap-2">
          <span class="text-xl">🏃</span> Actividad Semanal
        </h3>
        @if (activityStats().length > 0) {
          <div class="space-y-3">
            @for (activity of activityStats(); track activity.name) {
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>{{ activity.name }}</span>
                  <span class="text-text-muted">{{ activity.count }} días</span>
                </div>
                <div class="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-primary rounded-full transition-all"
                    [style.width.%]="activity.percentage"
                  ></div>
                </div>
              </div>
            }
          </div>
        } @else {
          <p class="text-text-muted text-center py-4">No hay datos de actividad</p>
        }
      </section>

      @if (latestWeekly()) {
        <section class="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <span class="text-xl">📏</span> Últimas Medidas
          </h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">
                {{ latestWeekly()!.weightKg || '-' }}
              </div>
              <div class="text-xs text-text-muted">kg</div>
            </div>
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">
                {{ latestWeekly()!.waistCm || '-' }}
              </div>
              <div class="text-xs text-text-muted">cintura</div>
            </div>
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">
                {{ latestWeekly()!.armCm || '-' }}
              </div>
              <div class="text-xs text-text-muted">brazo</div>
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
  
  weightData = signal<WeightData[]>([]);
  mealStats = signal<MealStat[]>([]);
  activityStats = signal<ActivityStat[]>([]);
  totalMeals = signal(0);
  latestWeekly = signal<any>(null);

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
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
            percentage: Math.round(((count as number) / total) * 100)
          }))
        );

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
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}
