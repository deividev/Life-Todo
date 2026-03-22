import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { DailyLogsService } from './daily-logs.service';

@Controller('daily-logs')
export class DailyLogsController {
  constructor(private readonly dailyLogsService: DailyLogsService) {}

  @Get(':date')
  async getByDate(@Param('date') date: string) {
    return this.dailyLogsService.findByDate(date);
  }

  @Put(':date')
  async upsert(@Param('date') date: string, @Body() dto: any) {
    return this.dailyLogsService.upsert(date, dto);
  }
}
