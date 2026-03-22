# Life Todo - Wellness Tracker Frontend

Frontend React/Next.js para la app de tracking de salud y bienestar.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP**: fetch nativo

## Requisitos

- Node.js 18+
- pnpm (o npm/yarn)

## Setup

1. Instalar dependencias:
```bash
pnpm install
```

2. Asegurarse de que el backend esté corriendo en puerto 3000

3. Iniciar el servidor de desarrollo:
```bash
pnpm dev
```

El frontend estará disponible en http://localhost:3001

## Comandos

```bash
pnpm dev      # Desarrollo (puerto 3001)
pnpm build    # Build de producción
pnpm start    # Servidor de producción
pnpm lint    # Linting
```

## Estructura

```
frontend/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx         # Today (home)
│   ├── weekly/          # Vista semanal
│   └── progress/        # Vista de progreso
├── components/
│   ├── shell/           # Sidebar, BottomNav, AppShell
│   ├── today/           # Componentes de Today
│   ├── weekly/          # Componentes de Weekly
│   ├── progress/        # Componentes de Progress
│   └── ui/              # Componentes compartidos
├── lib/
│   ├── api.ts           # Cliente API
│   ├── utils.ts         # Utilidades (timezone)
│   └── cn.ts            # Helper de clases
├── types/
│   └── index.ts         # Tipos TypeScript
└── app/
    └── globals.css      # Estilos globales + Tailwind
```

## API

El frontend usa proxy de Next.js para evitar CORS:
- `/api/*` → `http://localhost:3000/*` (en desarrollo)

## Vistas

### Today
- Comidas del día (toggle)
- Actividad física
- Nivel de energía y apetito
- Notas personales
- Auto-guardado

### Weekly
- Selector de semana
- Medidas corporales (peso, cintura, brazo)
- Feeling semanal
- Notas semanales

### Progress
- Gráfico de evolución de peso
- Stats de comidas (últimos 30 días)
- Últimas medidas registradas
