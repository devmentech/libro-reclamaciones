'use client'

import { LibroReclamaciones } from '@devmentech/libro-reclamaciones'
import type { ComplaintFormData } from '@devmentech/libro-reclamaciones'
import Link from 'next/link'

export default function ReclamacionesPage() {
  const productos = [
    { id: "1", name: "Producto Premium" },
    { id: "2", name: "Servicio Básico" },
    { id: "3", name: "Consultoría Especializada" },
    { id: "4", name: "Soporte Técnico" }
  ]

  const handleSubmit = async (data: ComplaintFormData) => {
    console.log('Datos del reclamo recibidos:', data)
    
    try {
      const response = await fetch('/api/reclamaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        alert('Reclamo enviado correctamente')
      } else {
        alert('Error al enviar el reclamo')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión')
    }
  }

  const handleDataChange = (data: Partial<ComplaintFormData>) => {
    console.log('Datos del formulario cambiaron:', data)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8">
          Sistema de Reclamaciones
        </h1>
        
        <LibroReclamaciones
          companyName="DevMenTech S.A.C."
          formTitle="Libro de Reclamaciones"
          formSubtitle="Hoja de Reclamación"
          products={productos}
          currency={{
            symbol: "S/",
            name: "Soles Peruanos"
          }}
          responseTime={15}
          recaptcha={{
            enabled: false, // Cambiar a true en producción
            siteKey: "tu_recaptcha_site_key_aqui"
          }}
          onSubmit={handleSubmit}
          onDataChange={handleDataChange}
          className="shadow-lg"
        />
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Este formulario cumple con la normativa peruana según el 
            DS N° 101-2022-PCM de INDECOPI
          </p>
        </div>
      </div>
    </div>
  )
}
