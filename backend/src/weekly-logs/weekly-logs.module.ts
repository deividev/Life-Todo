import { Module } from '@nestjs/common';
import { WeeklyLogsController } from './weekly-logs.controller';
import { WeeklyLogsService } from './weekly-logs.service';

@Module({
  controllers: [WeeklyLogsController],
  providers: [WeeklyLogsService],
  exports: [WeeklyLogsService],
})
export class WeeklyLogsModule {}
