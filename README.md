# Life-Todo Health Tracker

App de seguimiento de salud personal con Angular, NestJS y Tailwind CSS.

## Características

- **Today**: Registro diario de comidas, actividad, energía y apetito
- **Weekly**: Seguimiento semanal de peso y medidas
- **Progress**: Gráficas y estadísticas de progreso

## Stack Técnico

- **Frontend**: Angular 19+ (standalone components, signals), Tailwind CSS 4
- **Backend**: NestJS con TypeScript
- **Base de datos**: SQLite con Prisma ORM
- **Gráficas**: Chart.js
- **Mobile-first**

## Estructura del Proyecto

```
Life-Todo/
├── frontend/          # Angular app
│   ├── src/
│   │   └── app/
│   │       ├── core/services/   # HTTP services
│   │       ├── features/         # Today, Weekly, Progress
│   │       └── shared/           # Utils, components
│   └── package.json
├── backend/           # NestJS API
│   ├── src/
│   │   ├── daily-logs/
│   │   ├── weekly-logs/
│   │   └── progress/
│   ├── prisma/
│   └── package.json
├── docs/              # Documentación
└── README.md
```

## Setup Local

### Requisitos

- Node.js 18+
- pnpm

### Backend

```bash
cd backend
pnpm install
pnpm db:push          # Crea la base de datos SQLite
pnpm start:dev        # Inicia en http://localhost:3000
```

### Frontend

```bash
cd frontend
pnpm install
pnpm start             # Inicia en http://localhost:4200
```

### Variables de Entorno

**Backend** (`backend/.env`):
```
DATABASE_URL="file:./dev.db"
PORT=3000
```

**Frontend** (`frontend/src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000'
};
```

## API Endpoints

### Daily Logs
- `GET /daily-logs/:date` - Obtener registro del día
- `PUT /daily-logs/:date` - Crear/actualizar registro del día

### Weekly Logs
- `GET /weekly-logs/:weekStart` - Obtener registro semanal
- `PUT /weekly-logs/:weekStart` - Crear/actualizar registro semanal

### Progress
- `GET /progress/summary` - Resumen con estadísticas

## Zona Horaria

Todo funciona con timezone Europe/Madrid. Las semanas empiezan en Lunes.

## Scripts

```bash
# Backend
cd backend
pnpm db:push           # Sincroniza schema con SQLite
pnpm db:generate       # Genera cliente Prisma
pnpm build             # Build de producción
pnpm start:prod        # Inicia producción

# Frontend
cd frontend
pnpm build             # Build de producción
```

## Licencia

MIT
