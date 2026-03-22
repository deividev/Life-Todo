import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class WeeklyLogsService {
  constructor(private prisma: PrismaService) {}

  async findByWeekStart(weekStart: string) {
    return this.prisma.weeklyLog.findUnique({
      where: { weekStart },
    });
  }

  async upsert(weekStart: string, data: any) {
    return this.prisma.weeklyLog.upsert({
      where: { weekStart },
      update: data,
      create: { weekStart, ...data },
    });
  }

  async findRecent(weeks: number = 12) {
    return this.prisma.weeklyLog.findMany({
      orderBy: { weekStart: 'desc' },
      take: weeks,
    });
  }
}
