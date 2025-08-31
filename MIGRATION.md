# 🔄 Guía de Migración: Proyecto Original → Librería

Esta guía te ayudará a migrar desde la implementación original del proyecto a la nueva librería `@devmentech/libro-reclamaciones`.

## 📂 Estructura Antigua vs Nueva

### Antes (Proyecto Original)
```
tu-proyecto/
├── components/
│   ├── complaints-form.tsx
│   ├── captcha.tsx
│   ├── issue-date.tsx
│   └── upload-signature.tsx
├── dto/
│   ├── product.dto.ts
│   └── products-response.dto.ts
├── app/
│   └── page.tsx
└── lib/
    └── utils.ts
```

### Después (Con Librería)
```
tu-proyecto/
├── app/
│   └── reclamaciones/
│       └── page.tsx
├── api/
│   ├── productos/
│   │   └── route.ts
│   └── reclamaciones/
│       └── route.ts
└── package.json (con la librería instalada)
```

## 🚀 Pasos de Migración

### 1. Instalar la Librería

```bash
# Desinstalar dependencias del proyecto original (si están en package.json)
npm uninstall @radix-ui/react-* @react-pdf/renderer react-google-recaptcha

# Instalar la nueva librería
npm install @devmentech/libro-reclamaciones
```

### 2. Migrar Configuración

#### Antes (variables de entorno):
```env
COMPANY_NAME="Mi Empresa"
FORM_TITLE="Libro de Reclamaciones"
FORM_SUBTITLE="Hoja de Reclamación"
CURRENCY_SYMBOL="S/"
CURRENCY_NAME="Soles Peruanos"
MAX_RESPONSE_TIME=15
RECAPTCHA_ENABLED=false
RECAPTCHA_WEB_KEY=""
NEXT_PUBLIC_PRODUCTS_ENDPOINT="/data/products.json"
```

#### Después (mismo formato, pero usando en el componente):
```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';

export default function ReclamacionesPage() {
  return (
    <LibroReclamaciones
      companyName={process.env.COMPANY_NAME!}
      formTitle={process.env.FORM_TITLE!}
      formSubtitle={process.env.FORM_SUBTITLE!}
      currency={{
        symbol: process.env.CURRENCY_SYMBOL!,
        name: process.env.CURRENCY_NAME!
      }}
      responseTime={parseInt(process.env.MAX_RESPONSE_TIME!)}
      recaptcha={{
        enabled: process.env.RECAPTCHA_ENABLED === 'true',
        siteKey: process.env.RECAPTCHA_WEB_KEY!
      }}
      productsEndpoint={process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT}
      onSubmit={handleSubmit}
    />
  );
}
```

### 3. Migrar el Componente Principal

#### Antes (`app/page.tsx`):
```tsx
import ComplaintsForm from "@/components/complaints-form";
import { ProductsResponseDTO } from "@/dto/products-response.dto";
// ... mucho código de configuración

export default async function Home() {
  const response = await fetch(PRODUCTS_ENDPOINT);
  const data: ProductsResponseDTO = await response.json();
  // ... lógica compleja
  
  return (
    <section className="p-4">
      <ComplaintsForm
        companyName={companyName}
        formTitle={formTitle}
        // ... muchas props
      />
    </section>
  );
}
```

#### Después (`app/reclamaciones/page.tsx`):
```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';

export default function ReclamacionesPage() {
  const handleSubmit = async (data) => {
    const response = await fetch('/api/reclamaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Reclamo enviado correctamente');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <LibroReclamaciones
        companyName="Mi Empresa S.A.C."
        formTitle="Libro de Reclamaciones"
        formSubtitle="Hoja de Reclamación"
        productsEndpoint="/api/productos"
        currency={{ symbol: "S/", name: "Soles Peruanos" }}
        responseTime={15}
        recaptcha={{ enabled: false, siteKey: "" }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### 4. Migrar API de Productos

#### Antes (`public/data/products.json`):
```json
{
  "products": [
    {"id": 1, "name": "Producto 1"},
    {"id": 2, "name": "Producto 2"}
  ]
}
```

#### Después (`app/api/productos/route.ts`):
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    { id: "1", name: "Producto 1" },
    { id: "2", name: "Producto 2" }
  ];

  return NextResponse.json({ products });
}
```

### 5. Crear API de Reclamaciones

Nuevo archivo `app/api/reclamaciones/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Aquí puedes:
  // 1. Validar los datos
  // 2. Guardar en base de datos
  // 3. Enviar emails
  // 4. Generar PDF
  
  console.log('Nuevo reclamo:', data);
  
  return NextResponse.json({ 
    success: true, 
    message: 'Reclamo enviado correctamente',
    id: `REC-${Date.now()}`
  });
}
```

### 6. Actualizar Estilos

#### Agregar a tu `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Importar estilos de la librería */
@import '@devmentech/libro-reclamaciones/dist/styles.css';
```

#### Actualizar `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Agregar la librería
    "./node_modules/@devmentech/libro-reclamaciones/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
```

## 🗂️ Limpieza de Archivos

### Archivos que puedes eliminar:
- `components/complaints-form.tsx`
- `components/captcha.tsx`
- `components/issue-date.tsx`
- `components/upload-signature.tsx`
- `components/draw-signature.tsx`
- `components/ui/*` (si solo los usabas para el libro de reclamaciones)
- `dto/product.dto.ts`
- `dto/products-response.dto.ts`
- `lib/utils.ts` (si solo tenía utilidades para el libro)

### Dependencias que puedes desinstalar:
```bash
npm uninstall @radix-ui/react-checkbox @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slot @react-pdf/renderer @types/react-google-recaptcha class-variance-authority react-google-recaptcha
```

## ✅ Verificación Post-Migración

1. **Instalar dependencias**: `npm install`
2. **Compilar**: `npm run build`
3. **Probar**: `npm run dev`
4. **Verificar formulario**: Navegar a `/reclamaciones`
5. **Probar envío**: Completar y enviar un reclamo de prueba

## 🎯 Beneficios de la Migración

- ✅ **Menos código**: De ~1000 líneas a ~50 líneas
- ✅ **Mantenimiento**: Actualizaciones automáticas de la librería
- ✅ **Performance**: Bundle más pequeño
- ✅ **Tipado**: TypeScript mejorado
- ✅ **Reutilización**: Usar en múltiples proyectos
- ✅ **Soporte**: Documentación y comunidad

## 🆘 Problemas Comunes

### Error: "Module not found"
```bash
npm install @devmentech/libro-reclamaciones
```

### Error: "Styles not loading"
Verificar importación en `globals.css`:
```css
@import '@devmentech/libro-reclamaciones/dist/styles.css';
```

### Error: "Products not loading"
Verificar que el endpoint `/api/productos` retorne:
```json
{
  "products": [
    {"id": "1", "name": "Producto 1"}
  ]
}
```

## 🔄 Rollback (si es necesario)

Si necesitas volver al código original:

1. Copia los archivos desde `original/` de vuelta a la raíz
2. Restaura `package.json` original
3. Ejecuta `npm install`

## 📞 Soporte

Si tienes problemas durante la migración:
- Revisa esta guía paso a paso
- Consulta [INSTALLATION.md](./INSTALLATION.md)
- Abre un issue en GitHub con detalles del error
