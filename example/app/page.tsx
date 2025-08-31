import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Demo Libro de Reclamaciones
        </h1>
        <p className="text-gray-600 mb-8">
          Ejemplo de uso del paquete
          <br />
          <code>@devmentech/libro-reclamaciones</code>
        </p>
        <Link 
          href="/reclamaciones"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ver Formulario de Reclamaciones
        </Link>
        <div className="mt-6 text-sm text-gray-500">
          <ul className="mt-2 space-y-1 text-left">
            <li>• Integración en workspace pnpm</li>
            <li>• Configuración con Tailwind CSS</li>
            <li>• API routes para manejar envíos</li>
            <li>• Formulario completo según INDECOPI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
