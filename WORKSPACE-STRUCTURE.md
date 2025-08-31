# Estructura del Monorepo

Este monorepo contiene una librería de React (`@devmentech/libro-reclamaciones`) y un proyecto de ejemplo Next.js.

## Estructura Limpia

```
libro-reclamaciones/
├── .gitignore                    # Ignora archivos del monorepo completo
├── pnpm-workspace.yaml          # Configuración del workspace
├── package.json                 # Configuración de la librería
├── src/                         # Código fuente de la librería
├── dist/                        # Build de la librería (ignorado en git)
├── example/                     # Proyecto Next.js de ejemplo
│   ├── .gitignore              # Específico para Next.js
│   ├── app/                    # App Router de Next.js
│   ├── package.json            # Dependencies del ejemplo
│   ├── tailwind.config.ts      # Configuración de Tailwind
│   └── ...                     # Otros archivos de configuración
└── original/                   # Código original (referencia)
```

## Archivos/Carpetas Ignorados

### En el .gitignore principal:
- `**/node_modules` - Dependencias de todos los proyectos
- `**/.next/` - Builds de Next.js
- `/dist` - Build de la librería
- `*.tgz` - Paquetes npm
- `pnpm-lock.yaml*` - Lockfiles de pnpm
- IDE y cache files

### En example/.gitignore:
- Configuración específica para proyectos Next.js
- Archivos de desarrollo y builds locales

## Comandos

```bash
# Instalar dependencias de todo el workspace
pnpm install

# Desarrollar con hot reload
cd example && pnpm dev

# Build de producción del ejemplo
cd example && pnpm build

# Build solo de la librería
pnpm build
```

## Carpetas Removidas

Se removieron las siguientes carpetas/archivos innecesarios:
- ❌ `example/page.tsx` - Archivo suelto que no pertenece a App Router
- ❌ `example/.next/` - Build cache que se regenera
- ❌ `example/node_modules/` - Se reinstala con pnpm workspace

La estructura ahora es completamente limpia y sigue las mejores prácticas de Next.js 14 con App Router.
