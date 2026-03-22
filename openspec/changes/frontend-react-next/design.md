# Design: Frontend React/Next.js Reboot

## Technical Approach

Reescribir el frontend usando Next.js 14 App Router. La app es principalmente client-side (no requiere SSR para las vistas de logging), así que usaremos 'use client' donde sea necesario. Next.js proporciona:
- Hot reload rápido
- File-based routing
- Optimizaciones de build
- Fácil deployment si se requiere

## Architecture Decisions

### Decision: Next.js vs Vite+React

**Choice**: Next.js 14 App Router
**Alternatives considered**: Vite + React SPA
**Rationale**: 
- Mejor DX con file-based routing
- Optimizaciones de imágenes y fuentes incluidas
- Facilita migración futura a full-stack si se requiere
- Ecosystem maduro para React

### Decision: Tailwind CSS v3

**Choice**: Tailwind CSS 3 (manual config)
**Alternatives considered**: Tailwind v4, CSS modules, styled-components
**Rationale**:
- v4 tiene breaking changes y ecosystem menos estable
- Tailwind es el estándar de facto para new projects
- Configuración manual da control total sobre theme
- Compatibilidad con la config existente del frontend Angular

### Decision: Lucide React para iconos

**Choice**: Lucide React
**Alternatives considered**: Heroicons, Phosphor Icons, PrimeIcons (actual)
**Rationale**:
- Más icons que Heroicons
- API consistente con React (no SVG inline)
- Tree-shakeable (solo bundle icons usados)
- Look moderno y limpio

### Decision: Recharts para gráficos

**Choice**: Recharts
**Alternatives considered**: Chart.js (react-chartjs-2), Visx
**Rationale**:
- API React-native (componentes, no canvas manual)
- Personalizable pero opinionado
- Bundle size razonable
- Ejemplo de uso similar ya existe (Chart.js en Angular)

## Data Flow

```
User Action → React State (useState/useReducer)
                    ↓
            API Call (fetch)
                    ↓
            Backend (NestJS:3000)
                    ↓
            Prisma → SQLite
```

Para Today:
```
TodayPage (useEffect) → getDailyLog(date) → GET /daily-logs/:date
        ↓
  User toggles meal → updateMeal(key) → PUT /daily-logs/:date
        ↓
  Optimistic UI update → server confirms
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `frontend/` | Delete | Carpeta Angular completa |
| `frontend/` | Create | Nuevo proyecto Next.js |
| `frontend/package.json` | Create | Dependencies |
| `frontend/tailwind.config.ts` | Create | Theme config |
| `frontend/app/layout.tsx` | Create | Root layout con shell |
| `frontend/app/globals.css` | Create | Tailwind + custom CSS |
| `frontend/app/page.tsx` | Create | Today view |
| `frontend/app/weekly/page.tsx` | Create | Weekly view |
| `frontend/app/progress/page.tsx` | Create | Progress view |
| `frontend/components/shell/Sidebar.tsx` | Create | Desktop sidebar |
| `frontend/components/shell/BottomNav.tsx` | Create | Mobile nav |
| `frontend/components/today/*.tsx` | Create | Today components |
| `frontend/components/weekly/*.tsx` | Create | Weekly components |
| `frontend/components/progress/*.tsx` | Create | Progress components |
| `frontend/components/ui/*.tsx` | Create | Shared UI components |
| `frontend/lib/api.ts` | Create | API client functions |
| `frontend/types/index.ts` | Create | TypeScript types |

## Interfaces / Contracts

```typescript
// Tipos para DailyLog (del backend)
interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  breakfast: boolean;
  lunch: boolean;
  snack: boolean;
  dinner: boolean;
  activityType: 'none' | 'walk' | 'exercise' | 'walk_and_exercise';
  energy: 'low' | 'medium' | 'high';
  appetite: 'low' | 'normal' | 'high';
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para WeeklyLog
interface WeeklyLog {
  id: string;
  weekStart: string; // YYYY-MM-DD (Lunes)
  weightKg?: number;
  waistCm?: number;
  armCm?: number;
  weeklyFeeling?: 'worse' | 'same' | 'better';
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Progress Summary del backend
interface ProgressSummary {
  weightData: Array<{ week: string; weight: number }>;
  mealStats: {
    breakfast: number;
    lunch: number;
    snack: number;
    dinner: number;
  };
  activityStats: Record<string, number>;
  latestWeekly?: WeeklyLog;
}
```

## API Client

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getDailyLog(date: string): Promise<DailyLog | null> {
  const res = await fetch(`${API_BASE}/daily-logs/${date}`);
  if (!res.ok) return null;
  return res.json();
}

export async function saveDailyLog(date: string, data: Partial<DailyLog>): Promise<DailyLog> {
  const res = await fetch(`${API_BASE}/daily-logs/${date}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Similar para weekly-logs y progress
```

## Timezone Utils

```typescript
// Usar las mismas utils del frontend Angular o reimplementar
export function getCurrentDateMadrid(): string {
  // ... código para obtener fecha actual en Europe/Madrid
}

export function getWeekStartMadrid(date: Date = new Date()): string {
  // ... código para obtener inicio de semana (Lunes)
}

export function getWeekOptions(weeks: number): Array<{ weekStart: string; label: string }> {
  // ... generar opciones de semanas para selector
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | API functions | Jest tests mocks |
| Unit | Timezone utils | Jest tests con different dates |
| Component | Today interactions | React Testing Library |
| Component | Weekly selectors | React Testing Library |
| E2E | Full user flows | Manual verification |

Por ahora: verification manual hasta que el MVP esté funcionando.

## Migration / Rollout

No hay data migration requerida — el backend es el mismo, solo cambia el frontend.

Pasos:
1. Crear nuevo proyecto Next.js
2. Configurar Tailwind con la paleta de colores existente
3. Implementar shell (sidebar + bottom nav)
4. Implementar Today view
5. Implementar Weekly view
6. Implementar Progress view
7. Verificar integración con backend
8. Deploy si aplica

## Open Questions

- [ ] ¿Puerto para frontend? ¿3001 o 5173? (elegir uno y documentar)
- [ ] ¿Necesitamos proxy en Next.js para API calls en dev? (evitar CORS)
- [ ] ¿Docker compose para levantar ambos servicios?
