#!/bin/bash

# Script para crear un nuevo release de la librería

echo "🔨 Construyendo la librería..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Construcción exitosa"
    
    echo "🧪 Ejecutando verificaciones de tipos..."
    npm run type-check
    
    if [ $? -eq 0 ]; then
        echo "✅ Verificaciones de tipos completadas"
        
        echo "📋 Revisando linting..."
        npm run lint
        
        if [ $? -eq 0 ]; then
            echo "✅ Linting completado"
            echo "🎉 La librería está lista para publicar!"
            echo ""
            echo "Para publicar ejecuta:"
            echo "  npm publish"
        else
            echo "❌ Errores de linting encontrados"
            exit 1
        fi
    else
        echo "❌ Errores de tipo encontrados"
        exit 1
    fi
else
    echo "❌ Error en la construcción"
    exit 1
fi
