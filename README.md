# Life-Todo Health Tracker

App de seguimiento de salud personal con Angular, Supabase y Tailwind CSS.

## Características

- **Today**: Registro diario de comidas, actividad, energía y apetito
- **Weekly**: Seguimiento semanal de peso y medidas
- **Progress**: Gráficas y estadísticas de progreso
- **Auth**: Magic link con Supabase

## Stack Técnico

- Angular 19+ (standalone components, signals)
- TypeScript strict mode
- Tailwind CSS 4 (mobile-first)
- Supabase (Auth + PostgreSQL)
- Chart.js para gráficos

## Setup Local

### 1. Requisitos

- Node.js 18+
- pnpm
- Cuenta de Supabase

### 2. Configurar Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar `supabase-schema.sql` en el SQL Editor
3. Configurar autenticación:
   - Ir a Authentication > Providers > Email
   - Habilitar "Secure email link"
   - Configurar Site URL

### 3. Variables de Entorno

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Instalar y Ejecutar

```bash
pnpm install
pnpm dev
```

## Deployment

### Build

```bash
pnpm build
```

Los archivos están en `dist/health-tracker/`.

### Vercel / Netlify

1. Configurar variables de entorno en el dashboard
2. Deploy del directorio `dist/health-tracker/browser`

## Estructura del Proyecto

```
src/app/
├── core/
│   ├── services/     # Supabase, Auth, Daily/Weekly log services
│   ├── guards/        # Auth guard
│   └── models/        # TypeScript interfaces
├── features/
│   ├── login/        # Magic link login
│   ├── today/        # Daily log view
│   ├── weekly/       # Weekly log view
│   └── progress/     # Charts and stats
└── shared/
    ├── components/   # Shared UI components
    └── utils/        # Timezone utilities
```

## Zona Horaria

Todo funciona con timezone Europe/Madrid. Las semanas empiezan en Lunes.

## Licencia

MIT
