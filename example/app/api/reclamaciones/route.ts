import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Reclamo recibido:', {
      timestamp: new Date().toISOString(),
      data: body
    })
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reclamo recibido correctamente',
      id: `RCL-${Date.now()}`
    })
  } catch (error) {
    console.error('Error procesando reclamo:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
