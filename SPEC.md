# Life-Todo Health Tracker - MVP Specification

## Overview
Mobile-first web app for daily health tracking with focus on nutrition, activity, and progress visualization.

## Tech Stack
- **Frontend**: Next.js 16 with React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend**: NestJS + Prisma + SQLite (puerto 3000)
- **HTTP**: Next.js proxy para evitar CORS

## Features

### Today Tab (Default View)
Quick daily health log:
- **Meals**: 4 slots (breakfast, lunch, snack, dinner) - each toggleable
- **Activity**: none | walk | exercise | walk_and_exercise
- **Energy**: low | medium | high
- **Appetite**: low | normal | high
- **Note**: Free text (optional)
- **Date**: Current date in Europe/Madrid timezone
- Auto-save on changes

### Weekly Tab
Weekly measurements and summary:
- **Week selector**: Week starting Monday (Europe/Madrid)
- **Weight (kg)**: Number input
- **Waist (cm)**: Number input
- **Arm (cm)**: Number input
- **Weekly feeling**: worse | same | better
- **Note**: Free text
- Unique per week_start

### Progress Tab
Visual analytics:
- **Weight chart**: Line chart of weekly weights (Recharts)
- **Meals summary**: Count of meal days logged
- **Latest measures**: Most recent body measurements

## Data Model (Prisma Schema)

### DailyLog
```prisma
model DailyLog {
  id           String   @id @default(uuid())
  date         String   @unique
  breakfast    Boolean  @default(false)
  lunch        Boolean  @default(false)
  snack        Boolean  @default(false)
  dinner       Boolean  @default(false)
  activityType String   @default("none")
  energy       String   @default("medium")
  appetite     String   @default("normal")
  note         String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### WeeklyLog
```prisma
model WeeklyLog {
  id            String   @id @default(uuid())
  weekStart     String   @unique
  weightKg      Float?
  waistCm       Float?
  armCm         Float?
  weeklyFeeling String?
  note          String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /daily-logs/:date | Get daily log |
| PUT | /daily-logs/:date | Create/update daily log |
| GET | /weekly-logs/:weekStart | Get weekly log |
| PUT | /weekly-logs/:weekStart | Create/update weekly log |
| GET | /progress/summary | Get progress summary |

## Timezone
- All dates in Europe/Madrid (CET/CEST)
- Week starts Monday
- Daily logs use calendar date in Madrid timezone

## Frontend File Structure
```
frontend/
├── app/
│   ├── layout.tsx        # Root layout with AppShell
│   ├── page.tsx          # Today view (home)
│   ├── weekly/page.tsx   # Weekly view
│   ├── progress/page.tsx # Progress view
│   └── globals.css       # Tailwind + theme
├── components/
│   ├── shell/            # Sidebar, BottomNav, AppShell
│   ├── today/            # Today components
│   ├── weekly/           # Weekly components
│   ├── progress/         # Progress components
│   └── ui/               # Shared UI components
├── lib/
│   ├── api.ts             # API client
│   ├── utils.ts          # Timezone utilities
│   └── cn.ts             # Classname helper
└── types/
    └── index.ts           # TypeScript types
```

## Commands

```bash
# Frontend
cd frontend
pnpm install
pnpm dev      # Development server (puerto 3001)
pnpm build    # Production build
pnpm start    # Production server

# Backend
cd backend
pnpm install
pnpm start:dev  # Development server (puerto 3000)
```

## Environment Variables

Frontend (`frontend/.env`):
```
NEXT_PUBLIC_API_URL=/api
```

Backend (`backend/.env`):
```
DATABASE_URL="file:./dev.db"
PORT=3000
```

## TODO
- [ ] Authentication (future)
- [ ] PWA manifest and service worker (future)
- [ ] Push notifications (future)
- [ ] Export data (future)
- [ ] Tests (future)
