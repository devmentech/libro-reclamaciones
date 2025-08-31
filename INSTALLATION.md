# Instalación y Configuración - Libro de Reclamaciones

## 🚀 Instalación Rápida

### 1. Instalar la librería

```bash
npm install @devmentech/libro-reclamaciones
# o
yarn add @devmentech/libro-reclamaciones
# o  
pnpm add @devmentech/libro-reclamaciones
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
    // Agregar esta línea para la librería
    "./node_modules/@devmentech/libro-reclamaciones/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 3. Importar estilos CSS

En tu `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Importar estilos de la librería */
@import '@devmentech/libro-reclamaciones/dist/styles.css';
```

### 4. Usar el componente

```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';

export default function MiPagina() {
  const productos = [
    { id: "1", name: "Producto 1" },
    { id: "2", name: "Servicio 1" }
  ];

  const handleSubmit = async (data) => {
    console.log('Reclamo enviado:', data);
    // Procesar el reclamo aquí
  };

  return (
    <LibroReclamaciones
      companyName="Mi Empresa S.A.C."
      formTitle="Libro de Reclamaciones"
      formSubtitle="Hoja de Reclamación"
      products={productos}
      currency={{ symbol: "S/", name: "Soles Peruanos" }}
      responseTime={15}
      recaptcha={{ enabled: false, siteKey: "" }}
      onSubmit={handleSubmit}
    />
  );
}
```

## 📋 Configuración Completa

### Configuración con Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_COMPANY_NAME="Mi Empresa S.A.C."
NEXT_PUBLIC_FORM_TITLE="Libro de Reclamaciones"
NEXT_PUBLIC_FORM_SUBTITLE="Hoja de Reclamación"
NEXT_PUBLIC_CURRENCY_SYMBOL="S/"
NEXT_PUBLIC_CURRENCY_NAME="Soles Peruanos"
NEXT_PUBLIC_RESPONSE_TIME=15
NEXT_PUBLIC_RECAPTCHA_ENABLED=false
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
NEXT_PUBLIC_PRODUCTS_ENDPOINT="/api/productos"
```

### Componente con Variables de Entorno

```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';

export default function ReclamacionesPage() {
  return (
    <LibroReclamaciones
      companyName={process.env.NEXT_PUBLIC_COMPANY_NAME!}
      formTitle={process.env.NEXT_PUBLIC_FORM_TITLE!}
      formSubtitle={process.env.NEXT_PUBLIC_FORM_SUBTITLE!}
      productsEndpoint={process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT}
      currency={{
        symbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL!,
        name: process.env.NEXT_PUBLIC_CURRENCY_NAME!
      }}
      responseTime={parseInt(process.env.NEXT_PUBLIC_RESPONSE_TIME!)}
      recaptcha={{
        enabled: process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === 'true',
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
      }}
      onSubmit={async (data) => {
        const response = await fetch('/api/reclamaciones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          alert('Reclamo enviado correctamente');
        }
      }}
    />
  );
}
```

## 🔧 Configuración de APIs

### API de Productos (`app/api/productos/route.ts`)

```typescript
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

### API de Reclamaciones (`app/api/reclamaciones/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Validar datos
  if (!data.fullName || !data.email || !data.details) {
    return NextResponse.json(
      { error: 'Datos requeridos faltantes' }, 
      { status: 400 }
    );
  }
  
  // Guardar en base de datos
  // await saveComplaint(data);
  
  // Enviar emails
  // await sendEmailToCompany(data);
  // await sendEmailToCustomer(data);
  
  return NextResponse.json({ 
    success: true, 
    message: 'Reclamo enviado correctamente',
    id: generateComplaintId()
  });
}

function generateComplaintId() {
  return `REC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

## 🎨 Personalización de Estilos

### Sobrescribir Variables CSS

```css
/* En tu globals.css */
:root {
  /* Personalizar colores principales */
  --primary: 200 100% 50%;
  --primary-foreground: 0 0% 100%;
  
  /* Personalizar bordes */
  --border: 220 13% 91%;
  --radius: 8px;
}

/* Personalizar contenedor */
.libro-reclamaciones-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Personalizar canvas de firma */
.libro-reclamaciones-signature-canvas {
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  background: #f8fafc;
}
```

## 🔒 Configuración de reCAPTCHA

1. Ve a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Crea un nuevo sitio web
3. Selecciona reCAPTCHA v2
4. Agrega tu dominio
5. Copia las claves y agrégalas a tu `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_ENABLED=true
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="tu_site_key_aqui"
```

## 📱 Configuración Responsive

La librería es responsive por defecto, pero puedes personalizar:

```css
/* Personalizar para móviles */
@media (max-width: 768px) {
  .libro-reclamaciones-container {
    padding: 1rem;
    margin: 0.5rem;
  }
}
```

## 🐛 Troubleshooting

### Error: "Module not found"
- Asegúrate de haber instalado todas las dependencias
- Verifica que Tailwind CSS esté configurado correctamente

### Error: "Styles not applying"
- Verifica que hayas importado el CSS de la librería
- Revisa la configuración de Tailwind CSS

### Error: "Type errors"
- Asegúrate de tener TypeScript configurado
- Instala los tipos necesarios: `npm install -D @types/react @types/react-dom`

## 🚀 Deployment

### Vercel
- La librería funciona sin configuración adicional en Vercel

### Netlify  
- Asegúrate de configurar las variables de entorno en el dashboard

### Self-hosted
- Configura las variables de entorno en tu servidor
- Asegúrate de que Node.js >= 18 esté instalado

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación completa
2. Busca en [Issues existentes](https://github.com/devmentech/libro-reclamaciones/issues)
3. Abre un nuevo issue si es necesario
