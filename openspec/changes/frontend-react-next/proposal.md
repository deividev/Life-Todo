# Proposal: Frontend React/Next.js Reboot

## Intent

Abandonar el frontend Angular actual (que no alcanza nivel visual/productivo aceptable) y reescribirlo completamente con React/Next.js + Tailwind + Lucide icons. Objetivo: calidad visual comparable a apps wellness como Lifesum/Levels/MyFitnessPal.

## Scope

### In Scope
- Borrar carpeta `frontend/` Angular existente
- Crear nuevo frontend Next.js 14+ con App Router
- Implementar Shell con sidebar desktop / bottom nav mobile
- Re-implementar Today view (comidas, actividad, energía, apetito, notas)
- Re-implementar Weekly view (medidas corporales, selector semana, feeling)
- Re-implementar Progress view (charts peso, stats comidas, actividad)
- Tailwind CSS con diseño responsive mobile-first
- Iconografía Lucide React consistente
- Conectar con backend NestJS existente (puerto 3000)
- Build funcionando y commands documentados

### Out of Scope
- Cambios en backend o modelo de datos
- Auth (por ahora sin auth, acceso directo)
- PWA, offline support
- Tests E2E

## Approach

Stack confirmado:
- **Framework**: Next.js 14 (App Router, React Server Components donde aplique)
- **Styling**: Tailwind CSS 3 (configurado manualmente, no v4)
- **Icons**: Lucide React
- **HTTP**: fetch nativo o axios
- **Charts**: Recharts (buen soporte React)
- **Responsive**: Mobile-first con breakpoints sm/md/lg/xl

Paleta de colores a preservar del frontend Angular:
```css
--color-primary: #0d9488 (teal-600)
--color-secondary: #6366f1
--color-accent: #f59e0b
--color-meal-breakfast: #fef08a
--color-meal-lunch: #fdba74
--color-meal-snack: #c4b5fd
--color-meal-dinner: #93c5fd
```

Estructura de archivos:
```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Today)
│   ├── weekly/page.tsx
│   ├── progress/page.tsx
│   └── globals.css
├── components/
│   ├── shell/
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── Header.tsx
│   ├── today/
│   │   ├── HeroSection.tsx
│   │   ├── MealGrid.tsx
│   │   ├── ActivitySelector.tsx
│   │   └── EnergyAppetite.tsx
│   ├── weekly/
│   │   ├── WeekSelector.tsx
│   │   └── MeasuresCard.tsx
│   ├── progress/
│   │   ├── WeightChart.tsx
│   │   └── StatsGrid.tsx
│   └── ui/
│       └── (shared components)
├── lib/
│   ├── api.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `frontend/` | Removed | Carpeta Angular completa |
| `backend/` | No change | Endpoints unchanged |
| `SPEC.md` | Updated | Actualizar tech stack |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Retroceso en funcionalidad | Low | Mapear endpoints 1:1 del backend |
| Incompatibilidad datos | Low | Mismo schema Prisma, mismos endpoints |
| Performance suboptimal | Medium | Next.js caching, React Query si necesario |

## Rollback Plan

1. `git checkout HEAD~1 frontend/` — restaurar Angular
2. Ajustar .env para apuntar al backend

## Dependencies

- Node.js 18+
- pnpm como package manager

## Success Criteria

- [ ] `pnpm dev` levanta frontend en puerto 5173 o 3001
- [ ] Backend responde en puerto 3000
- [ ] Today muestra fecha actual y permite togglear comidas
- [ ] Weekly permite seleccionar semana y guardar medidas
- [ ] Progress muestra datos (vacío si no hay datos)
- [ ] Responsive: funciona en móvil y desktop
- [ ] No console errors en uso normal
