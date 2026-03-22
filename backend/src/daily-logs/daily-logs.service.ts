import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class DailyLogsService {
  constructor(private prisma: PrismaService) {}

  async findByDate(date: string) {
    return this.prisma.dailyLog.findUnique({
      where: { date },
    });
  }

  async upsert(date: string, data: any) {
    return this.prisma.dailyLog.upsert({
      where: { date },
      update: data,
      create: { date, ...data },
    });
  }

  async findRecent(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];

    return this.prisma.dailyLog.findMany({
      where: { date: { gte: startDateStr } },
      orderBy: { date: 'desc' },
    });
  }
}
