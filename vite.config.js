import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Agregamos esta línea para corregir las rutas en GitHub Pages:
  base: '/SYSTEM-BILLAR/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 3000,
    open: true
  },

  // ============ PLUGINS DE OPTIMIZACIÓN ============
  plugins: [
    // Compresión Gzip para todos los assets
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Solo archivos > 10KB
      deleteOriginFile: false,
    }),
    
    // Compresión Brotli (mejor que gzip, ~20% más compacto)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    
    // Visualizador del bundle (genera stats.html)
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  // ============ OPTIMIZACIONES DE PERFORMANCE ============
  build: {
    // Minificación agresiva con terser para mejor compresión
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Eliminar funciones específicas
        passes: 2, // Múltiples pasadas de optimización
      },
      format: {
        comments: false, // Eliminar comentarios
      },
      mangle: {
        safari10: true, // Compatibilidad con Safari 10
      },
    },

    // Code splitting optimizado - separar vendor y chunks por módulos
    rollupOptions: {
      output: {
        // Estrategia de chunking manual para mejor caché
        manualChunks: {
          // Firebase en un chunk separado (se cachea mejor)
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          
          // Módulos de servicios en chunks separados
          'services': [
            './src/services/state.js',
            './src/services/db.service.js',
            './src/services/auth.service.js',
          ],
          
          // Módulos de UI separados (se cargan después)
          'modules-mesas': ['./src/modules/mesas/mesas.module.js'],
          'modules-ventas': ['./src/modules/ventas/ventas.module.js'],
          'modules-inventario': ['./src/modules/inventario/inventario.module.js'],
          'modules-reportes': ['./src/modules/reportes/reportes.module.js'],
          'modules-caja': ['./src/modules/caja/caja.module.js'],
        },
        
        // Nombres de archivos con hash para mejor caché
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Tamaño de chunk más pequeño para mejor splitting
    chunkSizeWarningLimit: 500,

    // Optimizar CSS
    cssCodeSplit: true,
    cssMinify: true,

    // Source maps solo en desarrollo
    sourcemap: false,

    // Target para mejor compatibilidad y optimización
    target: 'es2018',

    // Optimizar assets
    assetsInlineLimit: 4096, // Inline de assets pequeños (< 4KB)
    
    // Reportar tamaños comprimidos
    reportCompressedSize: true,
  },

  // Optimizaciones de dependencias
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
    exclude: [],
  },

  // CSS optimizations
  css: {
    devSourcemap: false,
  },
});