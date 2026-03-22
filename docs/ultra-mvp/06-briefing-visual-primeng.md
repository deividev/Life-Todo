# Documento 6 — Briefing visual final para rediseño con PrimeNG

## Objetivo
Rediseñar Life-Todo para que tenga una interfaz:
- profesional,
- atractiva,
- usable,
- mobile-first,
- con sensación de producto real de salud/wellness.

## Problema actual
Las iteraciones visuales previas no valen como resultado final.
Problemas detectados:
- iconos/emojis gigantes o desproporcionados,
- aspecto de prototipo crudo,
- jerarquía visual floja,
- falta de sistema visual consistente,
- layout mejorable,
- sensación general poco profesional.

## Stack visual obligatorio
- Angular
- PrimeNG
- PrimeIcons
- Tailwind CSS

## Regla de implementación
- PrimeNG debe usarse como base visual real de componentes.
- Tailwind debe usarse para layout, spacing y ajuste fino.
- Evitar inventar UI tosca cuando PrimeNG ya da una base mejor.

## Dirección estética
### Sensación buscada
- wellness
- calmado
- limpio
- premium suave
- moderno
- claro
- usable en móvil

### No queremos
- look de prototipo rápido
- colores chillones
- exceso de emojis
- componentes visualmente infantiles
- cards desordenadas
- navegación tosca

## Paleta visual propuesta
- fondo general: gris/blanco roto suave
- superficies: blanco limpio
- texto principal: gris oscuro elegante
- texto secundario: gris medio
- color principal: verde salvia / emerald suave
- color secundario: azul grisáceo / índigo suave
- estados funcionales suaves, no agresivos

## Reglas visuales
- spacing generoso y consistente
- cards limpias con bordes suaves
- sombras sutiles
- iconografía consistente y controlada
- evitar emojis grandes; preferir iconos SVG o PrimeIcons
- jerarquía tipográfica clara
- navegación inferior compacta y elegante

## Pantallas prioritarias
### 1. Shell + navegación
- header limpio
- title/subtitle claros
- bottom nav elegante y coherente

### 2. Today
Debe ser la mejor pantalla visualmente.
- resumen del día
- comidas en formato claro y atractivo
- actividad, energía, apetito y notas bien ordenados
- estados seleccionados elegantes

### 3. Weekly
- experiencia de check-in semanal agradable
- inputs bien organizados
- secciones claras

### 4. Progress
- dashboard limpio
- métricas arriba
- gráfica en card grande
- bloques secundarios bien compuestos

## Componentes PrimeNG recomendados
- Card
- Button
- Tag / Badge
- InputTextarea
- InputNumber
- Divider
- SelectButton / Toggle-like controls
- Chart si encaja, o contenedor propio para Chart.js

## Bug visual a corregir sí o sí
Hay que eliminar:
- iconos gigantes,
- escalas raras,
- saltos visuales,
- botones con aspecto de juguete,
- composición poco seria.

## Criterio de éxito
El rediseño solo vale si al verlo transmite:
- producto real,
- orden,
- calma,
- claridad,
- y calidad visual suficiente para no dar vergüenza enseñarlo.

## Restricción
No meter features grandes nuevas. El foco es visual/UX, no ampliar alcance funcional.
