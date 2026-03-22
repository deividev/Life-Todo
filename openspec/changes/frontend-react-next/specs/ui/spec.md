# Delta for UI Layer

## ADDED Requirements

### Requirement: Today View - Daily Health Logging

El sistema DEBE mostrar la vista Today con:
- Fecha actual formateada en español (Europe/Madrid)
- Greeting contextual (Buenos días/Buenas tardes/Buenas noches)
- Toggle buttons para 4 comidas (breakfast, lunch, snack, dinner)
- Selector de actividad (none, walk, exercise, walk_and_exercise)
- Selector de energía (low, medium, high)
- Selector de apetito (low, normal, high)
- Campo de nota libre (textarea)
- Indicador de estado de guardado (saving/saved)

El sistema DEBE hacer auto-guardado al cambiar cualquier campo.

#### Scenario: Toggle meal on

- GIVEN usuario está en Today view
- WHEN toca botón de desayuno
- THEN el botón cambia a estado activo (visual feedback verde)
- AND se hace PUT request a `/daily-logs/{date}`

#### Scenario: View loads with existing data

- GIVEN existe un DailyLog para la fecha actual
- WHEN la vista Today carga
- THEN se muestra el estado actual de todas las comidas/actividad/energía/apetito
- AND la nota se muestra en el textarea

#### Scenario: Auto-save on change

- GIVEN usuario cambia energía a "high"
- WHEN el cambio se completa
- THEN se muestra "Guardando..." brevemente
- AND luego "Guardado" con checkmark

---

### Requirement: Weekly View - Body Measurements

El sistema DEBE mostrar la vista Weekly con:
- Selector de semana (dropdown con semanas últimas 12)
- Inputs numéricos para: peso (kg), cintura (cm), brazo (cm)
- Selector de feeling semanal (worse, same, better)
- Campo de nota semanal
- Badge de estado de guardado

La semana DEBE comenzar en Lunes (Europe/Madrid).

#### Scenario: Week selection

- GIVEN usuario abre Weekly
- WHEN selecciona una semana diferente
- THEN se cargan los datos existentes de esa semana
- AND los campos se populan con los valores guardados

#### Scenario: Save measurements

- GIVEN usuario ingresa peso 75.5
- WHEN pierde foco del input
- THEN se hace PUT request a `/weekly-logs/{weekStart}`
- AND se muestra feedback de guardado

---

### Requirement: Progress View - Analytics

El sistema DEBE mostrar la vista Progress con:
- Gráfico de línea con evolución de peso (últimas 12 semanas)
- Badge de cambio de peso (+/- kg)
- Stats de comidas (conteo de cada comida en últimos 30 días)
- Stats de actividad (distribución por tipo)
- Medidas más recientes

#### Scenario: Empty state

- GIVEN no hay datos de peso
- WHEN se abre Progress
- THEN se muestra mensaje "Registra tu peso semanalmente para ver la evolución"
- AND no se renderiza el gráfico

#### Scenario: Data loaded

- GIVEN existen WeeklyLogs con peso
- WHEN Progress carga
- THEN el gráfico muestra la línea de evolución
- AND el badge muestra el cambio total

---

### Requirement: Shell - Navigation

El sistema DEBE proporcionar navegación entre vistas:
- En mobile: Bottom navigation bar con tabs Today, Weekly, Progress
- En desktop (>1024px): Sidebar fija izquierda con logo y navegación
- Indicador visual de tab activa

El layout DEBE ser responsive y no provocar scroll horizontal.

#### Scenario: Mobile navigation

- GIVEN viewport < 1024px
- WHEN se muestra la app
- THEN se ve bottom nav con 3 iconos/labels
- AND sidebar no es visible

#### Scenario: Desktop navigation

- GIVEN viewport >= 1024px
- WHEN se muestra la app
- THEN se ve sidebar izquierda con logo y nav items
- AND bottom nav no es visible

---

### Requirement: API Integration

El frontend DEBE comunicarse con el backend via:
- GET `/daily-logs/{date}` — obtener log diario
- PUT `/daily-logs/{date}` — guardar log diario
- GET `/weekly-logs/{weekStart}` — obtener log semanal
- PUT `/weekly-logs/{weekStart}` — guardar log semanal
- GET `/progress/summary` — obtener resumen de progreso

El frontend DEBE usar timezone Europe/Madrid para todas las fechas.

#### Scenario: Backend unreachable

- GIVEN el backend no está disponible
- WHEN se hace request
- THEN se muestra mensaje de error amigable
- AND la app no crashea

---

### Requirement: Visual Design

El diseño DEBE seguir:
- Paleta de colores wellness: teal primary (#0d9488), meals con colores cálidos diferenciados
- Border radius consistente: rounded-xl para cards, rounded-2xl para containers principales
- Sombras suaves: shadow-sm para elevación sutil
- Transiciones suaves: 200-300ms ease para hover states
- Espaciado generoso para look premium

Los iconos DEBEN ser Lucide React con stroke-width consistente.

#### Scenario: Meal buttons with colors

- GIVEN usuario ve los botones de comida
- THEN cada botón tiene color distintivo:
  - Breakfast: amarillo/amber
  - Lunch: naranja
  - Snack: púrpura
  - Dinner: azul

#### Scenario: Active states

- GIVEN un botón de comida está activo
- THEN tiene fondo verde con gradiente
- AND sombra que indica profundidad
- AND transición suave al togglear
