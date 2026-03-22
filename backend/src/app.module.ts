import { Module } from '@nestjs/common';
import { DailyLogsModule } from './daily-logs/daily-logs.module';
import { WeeklyLogsModule } from './weekly-logs/weekly-logs.module';
import { ProgressModule } from './progress/progress.module';
import { PrismaModule } from './common/prisma.module';

@Module({
  imports: [PrismaModule, DailyLogsModule, WeeklyLogsModule, ProgressModule],
})
export class AppModule {}
