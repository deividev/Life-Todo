import { Injectable } from '@nestjs/common';
import { DailyLogsService } from '../daily-logs/daily-logs.service';
import { WeeklyLogsService } from '../weekly-logs/weekly-logs.service';

@Injectable()
export class ProgressService {
  constructor(
    private dailyLogsService: DailyLogsService,
    private weeklyLogsService: WeeklyLogsService,
  ) {}

  async getSummary() {
    const [recentDaily, recentWeekly] = await Promise.all([
      this.dailyLogsService.findRecent(30),
      this.weeklyLogsService.findRecent(12),
    ]);

    const mealStats = {
      breakfast: recentDaily.filter(d => d.breakfast).length,
      lunch: recentDaily.filter(d => d.lunch).length,
      snack: recentDaily.filter(d => d.snack).length,
      dinner: recentDaily.filter(d => d.dinner).length,
    };

    const activityStats: Record<string, number> = {
      none: 0,
      walk: 0,
      exercise: 0,
      walk_and_exercise: 0,
    };

    recentDaily.forEach(d => {
      const type = d.activityType || 'none';
      if (activityStats[type] !== undefined) {
        activityStats[type]++;
      }
    });

    const weightData = recentWeekly
      .filter(w => w.weightKg)
      .map(w => ({ week: w.weekStart, weight: w.weightKg! }))
      .reverse();

    return {
      mealStats,
      activityStats,
      weightData,
      latestWeekly: recentWeekly[0] || null,
      totalMeals: Object.values(mealStats).reduce((a, b) => a + b, 0),
    };
  }
}
