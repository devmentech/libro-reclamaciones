# Example - Demo Libro de Reclamaciones

Este es un proyecto Next.js que demuestra el uso del paquete `@devmentech/libro-reclamaciones` en un monorepo con pnpm workspace.

## Estructura

```
example/
├── app/
│   ├── layout.tsx          # Layout principal con import de estilos
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales de Tailwind
│   ├── reclamaciones/
│   │   └── page.tsx        # Página con el formulario
│   └── api/
│       └── reclamaciones/
│           └── route.ts    # API route para manejar envíos
├── package.json            # Deps con workspace:* para la librería
├── next.config.mjs
├── tailwind.config.ts      # Configurado para incluir estilos de la librería
└── tsconfig.json
```

## Comandos

Desde la raíz del monorepo:

```bash
# Instalar dependencias (todas)
pnpm install

# Compilar la librería y ejecutar el example
cd example && pnpm dev

# Solo compilar la librería
pnpm build

# Ejecutar el example (requiere build previo)
cd example && next dev -p 3001
```

## Demo

1. **Página principal**: http://localhost:3001
   - Landing page con enlace al formulario

2. **Formulario**: http://localhost:3001/reclamaciones
   - Formulario completo de libro de reclamaciones
   - Validaciones según normativa INDECOPI
   - API mock que recibe y logea los datos

## Características demostradas

- ✅ **Monorepo pnpm**: workspace con `workspace:*` dependency
- ✅ **Next.js 14**: App Router, TypeScript, API Routes
- ✅ **Tailwind CSS**: Configurado para la librería + estilos locales
- ✅ **Componente consumido**: `LibroReclamaciones` desde workspace
- ✅ **API Integration**: Mock endpoint que recibe datos del formulario
- ✅ **Estilos**: Import de `@devmentech/libro-reclamaciones/dist/styles.css`

## Configuración clave

### package.json
```json
{
  "dependencies": {
    "@devmentech/libro-reclamaciones": "workspace:*"
  },
  "scripts": {
    "dev": "pnpm -w build && next dev -p 3001"
  }
}
```

### tailwind.config.ts
```ts
content: [
  './app/**/*.{ts,tsx}',
  '../node_modules/@devmentech/libro-reclamaciones/dist/**/*.{js,mjs}'
]
```

### app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import CSS de la librería */
@import '@devmentech/libro-reclamaciones/dist/styles.css';
```

### app/layout.tsx
```tsx
import './globals.css'  // Solo esto es necesario
```

## Producción

Para usar en un proyecto real:

1. Publica la librería: `npm publish` (desde la raíz)
2. Instala: `npm install @devmentech/libro-reclamaciones`
3. Configura Tailwind para incluir la librería en `content`
4. Importa los estilos en tu layout
5. Usa el componente `LibroReclamaciones`
