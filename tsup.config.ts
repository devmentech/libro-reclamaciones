import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next'
  ],
  globalName: 'LibroReclamaciones',
  esbuildOptions(options: any) {
    options.banner = {
      js: '"use client";'
    }
    // Asegurar que React esté disponible globalmente
    options.define = {
      ...options.define,
      'process.env.NODE_ENV': '"production"'
    }
  }
})
