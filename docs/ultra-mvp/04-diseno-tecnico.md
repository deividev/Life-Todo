# Documento 4 — Diseño técnico inicial Ultra MVP

## Estructura del repo
```txt
Life-Todo/
  frontend/
  backend/
  docs/
```

## Frontend
### Rutas
- `/today`
- `/weekly`
- `/progress`

### Pantallas
#### Today
- 4 comidas
- actividad (`none | walk | exercise | walk_and_exercise`)
- energía
- apetito
- nota

#### Weekly
- peso
- cintura
- brazo
- sensación semanal
- nota

#### Progress
- gráfica de peso
- resumen de comidas por día/semana
- resumen comparativo simple

## Backend
### Endpoints propuestos
#### Daily logs
- `GET /daily-logs/:date`
- `PUT /daily-logs/:date`

#### Weekly logs
- `GET /weekly-logs/:weekStart`
- `PUT /weekly-logs/:weekStart`

#### Progress
- `GET /progress/summary`

## Modelo de datos
### DailyLog
- id
- date
- breakfastDone
- lunchDone
- snackDone
- dinnerDone
- activityType
- energy
- appetite
- note
- createdAt
- updatedAt

### WeeklyLog
- id
- weekStart
- weightKg
- waistCm
- armCm
- weeklyFeeling
- note
- createdAt
- updatedAt

## Reglas funcionales
- Zona horaria visible: Europe/Madrid
- Semana empieza en lunes
- Un único registro diario por fecha
- Un único registro semanal por inicio de semana

## Persistencia
- Prisma sobre SQLite
- migraciones incluidas en repo
- seed opcional si hace falta más adelante

## Integración frontend-backend
- Angular consume API REST de Nest
- servicios separados por feature
- entorno con `apiBaseUrl`

## Criterios técnicos
- sin NgRx
- sin auth compleja
- sin arquitectura pesada
- móvil primero
- build limpio en frontend y backend
