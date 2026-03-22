import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { WeeklyLogsService } from './weekly-logs.service';

@Controller('weekly-logs')
export class WeeklyLogsController {
  constructor(private readonly weeklyLogsService: WeeklyLogsService) {}

  @Get(':weekStart')
  async getByWeekStart(@Param('weekStart') weekStart: string) {
    return this.weeklyLogsService.findByWeekStart(weekStart);
  }

  @Put(':weekStart')
  async upsert(@Param('weekStart') weekStart: string, @Body() dto: any) {
    return this.weeklyLogsService.upsert(weekStart, dto);
  }
}
