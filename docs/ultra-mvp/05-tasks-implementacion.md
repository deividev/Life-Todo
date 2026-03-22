# Documento 5 — Tasks de implementación Ultra MVP

## Fase 0 — Replanteamiento base
- crear nueva rama para Ultra MVP
- conservar PR anterior solo como referencia
- sustituir setup Supabase por frontend + backend propios

## Fase 1 — Backend base
- inicializar NestJS en `backend/`
- configurar Prisma
- configurar SQLite
- crear esquema inicial
- crear migración inicial
- crear módulos:
  - daily-logs
  - weekly-logs
  - progress

## Fase 2 — API MVP
- implementar `GET /daily-logs/:date`
- implementar `PUT /daily-logs/:date`
- implementar `GET /weekly-logs/:weekStart`
- implementar `PUT /weekly-logs/:weekStart`
- implementar `GET /progress/summary`
- validar DTOs y errores básicos

## Fase 3 — Frontend base
- mover/recrear app Angular en `frontend/`
- configurar Tailwind
- definir routing
- crear layout móvil
- crear servicios HTTP
- crear modelos compartidos o duplicados simples

## Fase 4 — Today
- construir pantalla Today
- conectar con API
- guardado rápido
- feedback básico de carga/error

## Fase 5 — Weekly
- construir pantalla Weekly
- conectar con API
- validación simple de inputs
- guardado correcto

## Fase 6 — Progress
- construir pantalla Progress
- gráfica de peso
- resumen de comidas
- resumen simple comparativo

## Fase 7 — Pulido
- README actualizado
- `.env.example`
- scripts de arranque
- instrucciones de DB y migraciones
- build frontend y backend

## Fase 8 — GitHub
- commits claros
- push a nueva rama
- PR nueva contra `main`
- descripción en español

## Criterio de terminado
- app levanta en local,
- backend responde,
- SQLite funciona,
- Today/Weekly/Progress usables,
- build correcto,
- PR subida a GitHub.
