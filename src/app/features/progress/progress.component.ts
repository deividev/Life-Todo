import { Component, inject, signal, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WeeklyLogService } from '../../core/services/weekly-log.service';
import { DailyLogService } from '../../core/services/daily-log.service';
import { AuthService } from '../../core/services/auth.service';
import { WeeklyLog } from '../../core/models/weekly-log.model';
import { DailyLog } from '../../core/models/daily-log.model';

Chart.register(...registerables);

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
                {{ latestWeekly()!.weight_kg || '-' }}
              </div>
              <div class="text-xs text-text-muted">kg</div>
            </div>
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">
                {{ latestWeekly()!.waist_cm || '-' }}
              </div>
              <div class="text-xs text-text-muted">cintura</div>
            </div>
            <div class="bg-background rounded-xl p-3">
              <div class="text-2xl font-bold text-primary">
                {{ latestWeekly()!.arm_cm || '-' }}
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

  private weeklyLogService = inject(WeeklyLogService);
  private dailyLogService = inject(DailyLogService);
  private authService = inject(AuthService);

  private chart: Chart | null = null;
  
  weightData = signal<{ week: string; weight: number }[]>([]);
  mealStats = signal<{ name: string; icon: string; count: number }[]>([]);
  activityStats = signal<{ name: string; count: number; percentage: number }[]>([]);
  totalMeals = signal(0);
  latestWeekly = signal<WeeklyLog | null>(null);

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  async loadData() {
    const user = this.authService.user();
    if (!user) return;

    const weeklyLogs = await this.weeklyLogService.getRecent(user.id, 12);
    this.weightData.set(
      weeklyLogs
        .filter(w => w.weight_kg)
        .map(w => ({
          week: this.formatWeekLabel(w.week_start),
          weight: w.weight_kg!
        }))
        .reverse()
    );

    if (weeklyLogs.length > 0) {
      this.latestWeekly.set(weeklyLogs[weeklyLogs.length - 1]);
    }

    const dailyLogs = await this.dailyLogService.getHistory(user.id, 30);
    this.calculateMealStats(dailyLogs);
    this.calculateActivityStats(dailyLogs);

    setTimeout(() => this.renderChart(), 100);
  }

  private calculateMealStats(logs: DailyLog[]) {
    const stats = {
      breakfast: { name: 'Desayunos', icon: '🌅', count: 0 },
      lunch: { name: 'Almuerzos', icon: '☀️', count: 0 },
      snack: { name: 'Meriendas', icon: '🍪', count: 0 },
      dinner: { name: 'Cenas', icon: '🌙', count: 0 }
    };

    logs.forEach(log => {
      if (log.breakfast) stats.breakfast.count++;
      if (log.lunch) stats.lunch.count++;
      if (log.snack) stats.snack.count++;
      if (log.dinner) stats.dinner.count++;
    });

    this.mealStats.set(Object.values(stats));
    this.totalMeals.set(
      stats.breakfast.count + stats.lunch.count + 
      stats.snack.count + stats.dinner.count
    );
  }

  private calculateActivityStats(logs: DailyLog[]) {
    const stats: Record<string, number> = {
      'none': 0,
      'walk': 0,
      'exercise': 0,
      'walk_and_exercise': 0
    };

    logs.forEach(log => {
      if (log.activity_type && stats[log.activity_type] !== undefined) {
        stats[log.activity_type]++;
      }
    });

    const total = logs.length || 1;
    const labels: Record<string, string> = {
      'none': 'Ninguna',
      'walk': 'Paseo',
      'exercise': 'Ejercicio',
      'walk_and_exercise': 'Ambos'
    };

    this.activityStats.set(
      Object.entries(stats).map(([key, count]) => ({
        name: labels[key],
        count,
        percentage: Math.round((count / total) * 100)
      }))
    );
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
        labels: data.map(d => d.week),
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
