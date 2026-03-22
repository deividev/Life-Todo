# Documento 3 — Stack técnico Ultra MVP

## Objetivo
Reducir dependencias externas y dejar toda la app dentro del repositorio.

## Stack decidido
- Frontend: Angular + TypeScript + Tailwind
- Backend: NestJS + TypeScript
- Base de datos: SQLite
- ORM: Prisma
- Repo: monorepo simple con `frontend/` y `backend/`

## Motivo de este cambio
Se descarta Supabase para evitar:
- crear proyecto externo,
- depender de configuración fuera del repo,
- y tener infraestructura separada demasiado pronto.

## Enfoque Ultra MVP
- Todo en el repo.
- Setup local simple.
- Sin auth compleja en esta fase.
- Acceso local/privado primero.
- Validar producto antes de complicar despliegue o seguridad avanzada.

## Decisiones técnicas
### Frontend
- Angular standalone
- Angular Router
- Reactive Forms
- Tailwind CSS
- Chart.js para gráficas simples

### Backend
- NestJS con módulos mínimos
- REST API simple
- Validación básica con DTOs

### Base de datos
- SQLite con Prisma
- archivo local versionado fuera de git (`dev.db` ignorado)
- migraciones Prisma dentro del repo

## Módulos funcionales MVP
- Today
- Weekly
- Progress

## Fuera de alcance por ahora
- login/magic link
- multiusuario
- notificaciones
- sincronización cloud
- permisos complejos

## Ventajas
- arranque más rápido,
- menos dependencia externa,
- todo visible y controlable,
- fácil de evolucionar luego a PostgreSQL si aporta.
