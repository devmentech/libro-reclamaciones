# 📚 Libro de Reclamaciones - Librería React/Next.js

[![npm version](https://badge.fury.io/js/@devmentech%2Flibro-reclamaciones.svg)](https://badge.fury.io/js/@devmentech%2Flibro-reclamaciones)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://opensource.org/licenses/AGPL-3.0)

Componente de **Libro de Reclamaciones Virtual** para Perú que cumple con el formato oficial de **INDECOPI** según el DS N° 101-2022-PCM. Ideal para empresas que necesitan implementar un sistema de reclamaciones digital y conforme a la normativa peruana.

## ✨ Características

- 🇵🇪 **Cumple normativa peruana** - Formato oficial INDECOPI
- 🎨 **Completamente personalizable** - Estilos y configuración adaptables
- 📱 **Responsive** - Funciona perfectamente en móviles y desktop
- ⚡ **Alto rendimiento** - Construido con React 18+ y Next.js 13+
- 🔒 **Seguro** - Integración opcional con reCAPTCHA
- 📄 **Generación PDF** - Preparado para exportar reclamaciones
- 📧 **Sistema de emails** - Hooks para envío automático
- 🎯 **TypeScript** - Completamente tipado
- 🛠️ **Fácil integración** - Plug and play en cualquier proyecto Next.js

## 🚀 Instalación Rápida

```bash
npm install @devmentech/libro-reclamaciones
```

```tsx
import { LibroReclamaciones } from '@devmentech/libro-reclamaciones';
import '@devmentech/libro-reclamaciones/dist/styles.css';

export default function MiPagina() {
  return (
    <LibroReclamaciones
      companyName="Mi Empresa S.A.C."
      formTitle="Libro de Reclamaciones"
      formSubtitle="Hoja de Reclamación"
      products={[
        { id: "1", name: "Producto 1" },
        { id: "2", name: "Servicio 1" }
      ]}
      currency={{ symbol: "S/", name: "Soles Peruanos" }}
      responseTime={15}
      recaptcha={{ enabled: false, siteKey: "" }}
      onSubmit={(data) => console.log('Reclamo:', data)}
    />
  );
}
```

Para documentación completa, ver [README-LIBRARY.md](./README-LIBRARY.md) y [INSTALLATION.md](./INSTALLATION.md).

---

**Hecho con ❤️ en Perú por [DevMenTech](https://devmentech.com)**
* Utiliza Bun como runtime para un rendimiento mejorado.
* Integración con reCAPTCHA (opcional).

## Instalación y Uso

1. **Clonar el repositorio:**
   Como este repositorio está marcado como plantilla, puedes generar un nuevo repositorio a partir de ella.  Alternativamente, puedes clonarla:

   ```bash
   git clone https://github.com/georgegiosue/complaints-book
   ```

2. **Instalar dependencias:**
   Navega al directorio del proyecto y ejecuta:

   ```bash
   bun install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto y configura las siguientes variables:

   ```
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_PRODUCTS_ENDPOINT="http://localhost:3000/data/products.json"
   COMPANY_NAME="Nombre de la Empresa"
   FORM_TITLE="Libro de Reclamaciones"
   FORM_SUBTITLE="Hoja de Reclamación"
   CURRENCY_SYMBOL="S/"
   CURRENCY_NAME="Soles Peruanos"
   MAX_RESPONSE_TIME=15 # En días

   RECAPTCHA_ENABLED=false
   RECAPTCHA_WEB_KEY=...
   RECAPTCHA_SECRET_KEY=... # Reemplazar con tu WEB SITE KEY en http://www.google.com/recaptcha/admin 
   ```

   **Explicación de las variables:**

   * `NEXT_PUBLIC_APP_URL`: URL de la aplicación.
   * `NEXT_PUBLIC_PRODUCTS_ENDPOINT`: URL del endpoint que devuelve la lista de productos/servicios.
   * `COMPANY_NAME`: Nombre de la empresa.
   * `FORM_TITLE`: Título del formulario.
   * `FORM_SUBTITLE`: Subtítulo del formulario.
   * `CURRENCY_SYMBOL`: Símbolo de la moneda.
   * `CURRENCY_NAME`: Nombre de la moneda.
   * `MAX_RESPONSE_TIME`: Tiempo máximo de respuesta en días.
   * `RECAPTCHA_ENABLED`: Habilitar o deshabilitar reCAPTCHA (true/false).
   * `RECAPTCHA_WEB_KEY`: Clave web de reCAPTCHA.
   * `RECAPTCHA_SECRET_KEY`: Clave secreta de reCAPTCHA.


4. **Configurar la lista de productos/servicios:**
   Crea un archivo `products.json` en la carpeta `public/data` (o ajusta la ruta en `NEXT_PUBLIC_PRODUCTS_ENDPOINT`) con el siguiente formato:

   ```json
   {
     "products": [
       {"id": 1, "name": "Producto 1"},
       {"id": 2, "name": "Producto 2"},
       {"id": 3, "name": "Servicio 1"},
       // ... más productos/servicios
     ]
   }
   ```

5. **Ejecutar la aplicación:**

   ```bash
   bun --bun run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`.



## Tareas Pendientes

* **Implementar descarga de PDF:**  Generar un PDF de la reclamación una vez enviada.
* **Implementar envío de emails:**  Enviar la reclamación por correo electrónico a la empresa y al usuario.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un fork del repositorio y envía un pull request.

Aquí tienes la traducción al español:

1. Haz un **fork** del proyecto.
2. Crea tu **rama de características** (`git checkout -b feature/AmazingFeature`).
3. Realiza un **commit** de tus cambios (`git commit -m 'Agregar alguna característica asombrosa'`).
4. Haz **push** a la rama (`git push origin feature/AmazingFeature`).
5. Abre un [**Pull Request**](https://github.com/georgegiosue/complaints-book/pulls).

## Troubleshooting 🔧

Si encuentras algún problema al configurar o ejecutar la aplicación, por favor revisa la sección de [Issues](https://github.com/georgegiosue/complaints-book/issues) de este repositorio para ver si tu problema ya ha sido abordado. Si no es así, siéntete libre de abrir un nuevo issue con una descripción del problema que estás experimentando.

## Licencia

GNU AFFERO GENERAL PUBLIC LICENSE Version 3
