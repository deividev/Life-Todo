import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { DailyLogsModule } from '../daily-logs/daily-logs.module';
import { WeeklyLogsModule } from '../weekly-logs/weekly-logs.module';

@Module({
  imports: [DailyLogsModule, WeeklyLogsModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
