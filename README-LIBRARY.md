# Libro de Reclamaciones - Librería React/Next.js

Componente de Libro de Reclamaciones Virtual para Perú según formato INDECOPI (DS N° 101-2022-PCM).

## Instalación

```bash
npm install @devmentech/libro-reclamaciones
# o
yarn add @devmentech/libro-reclamaciones
# o
pnpm add @devmentech/libro-reclamaciones
# o
bun add @devmentech/libro-reclamaciones
```

## Configuración

### 1. Importar estilos CSS

En tu `app/globals.css` o archivo CSS principal:

```css
@import '@devmentech/libro-reclamaciones/dist/styles.css';
```

### 2. Configurar Tailwind CSS

En tu `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Agregar esta línea para incluir los estilos de la librería
    "./node_modules/@devmentech/libro-reclamaciones/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Uso

### Uso Básico

```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';

export default function ReclamacionesPage() {
  const productos = [
    { id: "1", name: "Producto 1" },
    { id: "2", name: "Servicio 1" }
  ];

  const handleSubmit = async (data) => {
    console.log('Datos del reclamo:', data);
    // Aquí puedes enviar los datos a tu backend
  };

  return (
    <div className="container mx-auto p-4">
      <LibroReclamaciones
        companyName="Mi Empresa S.A.C."
        formTitle="Libro de Reclamaciones"
        formSubtitle="Hoja de Reclamación"
        products={productos}
        currency={{
          symbol: "S/",
          name: "Soles Peruanos"
        }}
        responseTime={15}
        recaptcha={{
          enabled: false,
          siteKey: ""
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### Uso con Endpoint de Productos

```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';

export default function ReclamacionesPage() {
  const handleSubmit = async (data) => {
    // Procesar los datos del reclamo
    await fetch('/api/reclamaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  return (
    <LibroReclamaciones
      companyName="Mi Empresa S.A.C."
      formTitle="Libro de Reclamaciones"
      formSubtitle="Hoja de Reclamación"
      productsEndpoint="/api/productos"
      currency={{
        symbol: "S/",
        name: "Soles Peruanos"
      }}
      responseTime={15}
      recaptcha={{
        enabled: true,
        siteKey: "tu_site_key_de_recaptcha"
      }}
      onSubmit={handleSubmit}
      onDataChange={(data) => {
        console.log('Datos cambiaron:', data);
      }}
    />
  );
}
```

## Props

### LibroReclamacionesProps

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `companyName` | `string` | ✅ | Nombre de la empresa |
| `formTitle` | `string` | ✅ | Título del formulario |
| `formSubtitle` | `string` | ✅ | Subtítulo del formulario |
| `currency` | `{symbol: string, name: string}` | ✅ | Configuración de moneda |
| `responseTime` | `number` | ✅ | Días para respuesta |
| `recaptcha` | `{enabled: boolean, siteKey: string}` | ✅ | Configuración reCAPTCHA |
| `products` | `ProductDTO[]` | ❌ | Lista de productos/servicios |
| `productsEndpoint` | `string` | ❌ | URL para cargar productos |
| `className` | `string` | ❌ | Clases CSS adicionales |
| `onSubmit` | `(data: ComplaintFormData) => void \| Promise<void>` | ❌ | Callback al enviar |
| `onDataChange` | `(data: Partial<ComplaintFormData>) => void` | ❌ | Callback cuando cambian datos |

## Tipos

```typescript
type ProductDTO = {
  id: string | number;
  name: string;
};

type ComplaintFormData = {
  fullName: string;
  address: string;
  id: string;
  phone: string;
  email: string;
  isMinor: boolean;
  guardian?: string;
  productId: string;
  amount: number;
  incidentDate: Date;
  type: 'reclamo' | 'queja';
  details: string;
  request: string;
  signature?: string;
};
```

## Formato del Endpoint de Productos

Si usas `productsEndpoint`, tu API debe retornar:

```json
{
  "products": [
    {"id": "1", "name": "Producto 1"},
    {"id": "2", "name": "Servicio 1"}
  ]
}
```

## Ejemplo de API Route (Next.js)

```typescript
// app/api/productos/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    { id: "1", name: "Producto Premium" },
    { id: "2", name: "Servicio Básico" },
    { id: "3", name: "Consultoría" }
  ];

  return NextResponse.json({ products });
}
```

```typescript
// app/api/reclamaciones/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Aquí puedes guardar en base de datos, enviar emails, etc.
  console.log('Nuevo reclamo recibido:', data);
  
  // Ejemplo: Guardar en base de datos
  // await saveComplaint(data);
  
  // Ejemplo: Enviar email
  // await sendEmail(data);
  
  return NextResponse.json({ 
    success: true, 
    message: 'Reclamo enviado correctamente' 
  });
}
```

## Componentes Individuales

También puedes usar componentes individuales:

```tsx
import { 
  IssueDate, 
  UploadSignature, 
  DrawSignature, 
  Captcha 
} from '@devmentech/libro-reclamaciones';

// Usar componentes individualmente según necesites
```

## Personalización

### Estilos Personalizados

Puedes sobrescribir los estilos CSS:

```css
.libro-reclamaciones-container {
  /* Tus estilos personalizados */
}

.libro-reclamaciones-signature-canvas {
  /* Personalizar el canvas de firma */
  border: 2px solid #your-color;
}
```

### Configuración de Tailwind

La librería usa variables CSS que puedes personalizar:

```css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* etc. */
}
```

## Requisitos

- React >= 16.8.0
- Next.js >= 13.0.0
- Tailwind CSS >= 3.0.0

## Licencia

AGPL-3.0

## Soporte

Para reportar problemas o solicitar características: [GitHub Issues](https://github.com/devmentech/libro-reclamaciones/issues)
