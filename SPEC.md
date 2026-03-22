# Life-Todo Health Tracker - MVP Specification

## Overview
Mobile-first web app for daily health tracking with focus on nutrition, activity, and progress visualization.

## Tech Stack
- **Frontend**: Angular 19+ with TypeScript
- **Styling**: Tailwind CSS 4 (mobile-first)
- **Backend**: Supabase (Auth + PostgreSQL)
- **Charts**: Chart.js
- **PWA**: Lightweight service worker

## Features

### Authentication
- Supabase Auth with Magic Link
- Email-based login
- Persistent session
- Protected routes

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
- Unique per user+week_start

### Progress Tab
Visual analytics:
- **Weight chart**: Line chart of weekly weights
- **Meals summary**: Count of meal days logged
- **Activity overview**: Weekly activity distribution

## Data Model

### daily_logs
```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id uuid REFERENCES auth.users NOT NULL
date date NOT NULL
breakfast boolean DEFAULT false
lunch boolean DEFAULT false
snack boolean DEFAULT false
dinner boolean DEFAULT false
activity_type text CHECK (activity_type IN ('none','walk','exercise','walk_and_exercise'))
energy text CHECK (energy IN ('low','medium','high'))
appetite text CHECK (appetite IN ('low','normal','high'))
note text
created_at timestamptz DEFAULT now()
updated_at timestamptz DEFAULT now()
UNIQUE(user_id, date)
```

### weekly_logs
```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id uuid REFERENCES auth.users NOT NULL
week_start date NOT NULL
weight_kg decimal(5,2)
waist_cm decimal(5,1)
arm_cm decimal(5,1)
weekly_feeling text CHECK (weekly_feeling IN ('worse','same','better'))
note text
created_at timestamptz DEFAULT now()
updated_at timestamptz DEFAULT now()
UNIQUE(user_id, week_start)
```

### RLS Policies
- Users can only read/write their own data
- Auth required for all operations

## Timezone
- All dates in Europe/Madrid (CET/CEST)
- Week starts Monday
- Daily logs use calendar date in Madrid timezone

## Environment Variables
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## File Structure
```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── supabase.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── daily-log.service.ts
│   │   │   └── weekly-log.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   └── models/
│   │       ├── daily-log.model.ts
│   │       └── weekly-log.model.ts
│   ├── features/
│   │   ├── login/
│   │   ├── today/
│   │   ├── weekly/
│   │   └── progress/
│   ├── shared/
│   │   ├── components/
│   │   │   └── tabs/
│   │   └── utils/
│   │       └── timezone.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.css
```

## TODO
- [ ] Add PWA manifest
- [ ] Add service worker
- [ ] Add push notifications (future)
- [ ] Export data (future)
