# Tasks: Frontend React/Next.js Reboot

## Phase 1: Project Setup & Foundation

- [ ] 1.1 Eliminar carpeta `frontend/` Angular existente
- [ ] 1.2 Crear proyecto Next.js con `npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
- [ ] 1.3 Instalar dependencias extra: `lucide-react recharts date-fns clsx tailwind-merge`
- [ ] 1.4 Configurar `tailwind.config.ts` con la paleta de colores del Angular (teal primary, meal colors)
- [ ] 1.5 Configurar `globals.css` con base styles, fonts (Inter), scrollbar
- [ ] 1.6 Crear `types/index.ts` con tipos TypeScript para DailyLog, WeeklyLog, ProgressSummary
- [ ] 1.7 Crear `lib/api.ts` con funciones get/save para los 3 endpoints
- [ ] 1.8 Crear `lib/utils.ts` con timezone helpers (getCurrentDateMadrid, getWeekStartMadrid)

## Phase 2: Shell & Layout

- [ ] 2.1 Crear `app/layout.tsx` con root layout, fonts, metadata
- [ ] 2.2 Crear `components/shell/Sidebar.tsx` para desktop (>1024px)
- [ ] 2.3 Crear `components/shell/BottomNav.tsx` para mobile
- [ ] 2.4 Crear `components/shell/AppShell.tsx` que combina sidebar + bottom + content
- [ ] 2.5 Crear `app/page.tsx` que renderiza AppShell con Today view
- [ ] 2.6 Crear `app/weekly/page.tsx` y `app/progress/page.tsx` con sus vistas placeholder

## Phase 3: Today View Implementation

- [ ] 3.1 Crear `components/today/HeroSection.tsx` con greeting, fecha, summary
- [ ] 3.2 Crear `components/today/MealGrid.tsx` con 4 botones toggle (breakfast/lunch/snack/dinner)
- [ ] 3.3 Crear `components/today/ActivitySelector.tsx` con 4 opciones de actividad
- [ ] 3.4 Crear `components/today/EnergyAppetite.tsx` con selectores para energía y apetito
- [ ] 3.5 Crear `components/today/NoteSection.tsx` con textarea
- [ ] 3.6 Crear `components/today/TodayPage.tsx` que integra todos los componentes
- [ ] 3.7 Implementar estado local con useState y efectos de carga
- [ ] 3.8 Implementar auto-guardado con debounce
- [ ] 3.9 Implementar indicadores saving/saved

## Phase 4: Weekly View Implementation

- [ ] 4.1 Crear `components/weekly/WeekSelector.tsx` con dropdown de semanas
- [ ] 4.2 Crear `components/weekly/MeasuresCard.tsx` con inputs para peso/cintura/brazo
- [ ] 4.3 Crear `components/weekly/FeelingSelector.tsx` con 3 opciones (worse/same/better)
- [ ] 4.4 Crear `components/weekly/WeeklyNote.tsx` con textarea
- [ ] 4.5 Crear `components/weekly/WeeklyPage.tsx` que integra componentes
- [ ] 4.6 Implementar carga de datos por semana seleccionada
- [ ] 4.7 Implementar guardado al blur de inputs

## Phase 5: Progress View Implementation

- [ ] 5.1 Crear `components/progress/WeightChart.tsx` con Recharts line chart
- [ ] 5.2 Crear `components/progress/WeightBadge.tsx` con delta de peso (+/- kg)
- [ ] 5.3 Crear `components/progress/MealStats.tsx` con grid de stats de comidas
- [ ] 5.4 Crear `components/progress/ActivityStats.tsx` con distribución de actividad
- [ ] 5.5 Crear `components/progress/LatestMeasures.tsx` con medidas recientes
- [ ] 5.6 Crear `components/progress/ProgressPage.tsx` que integra todo
- [ ] 5.7 Implementar empty states con mensajes amigables

## Phase 6: Shared UI Components

- [ ] 6.1 Crear `components/ui/Button.tsx` (variants: primary, secondary, outline)
- [ ] 6.2 Crear `components/ui/Card.tsx` (wrapper con padding, border, shadow)
- [ ] 6.3 Crear `components/ui/SelectButton.tsx` (like PrimeNG selectbutton)
- [ ] 6.4 Crear `components/ui/InputNumber.tsx` (input con suffix para unidades)
- [ ] 6.5 Crear `components/ui/Textarea.tsx`
- [ ] 6.6 Crear `components/ui/Tag.tsx` (badge con colors)
- [ ] 6.7 Refactorizar componentes existentes para usar los shared

## Phase 7: Polish & Verification

- [ ] 7.1 Verificar responsive en móvil (bottom nav visible, sidebar hidden)
- [ ] 7.2 Verificar responsive en desktop (sidebar visible, bottom nav hidden)
- [ ] 7.3 Verificar que backend responde correctamente
- [ ] 7.4 Agregar CORS proxy si necesario (next.config.js)
- [ ] 7.5 Verificar que no hay console errors
- [ ] 7.6 Probar flujos: Today → guardar → recargar
- [ ] 7.7 Probar flujos: Weekly → cambiar semana → guardar
- [ ] 7.8 Probar flujos: Progress → ver empty state → (con datos)
- [ ] 7.9 Documentar commands en README: `pnpm dev`, `pnpm build`
