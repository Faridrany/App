// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: resolve(__dirname, 'src'), // Folder utama proyek
  base: './',                      // Path relatif untuk asset
  publicDir: resolve(__dirname, 'src', 'public'), // Folder public (jika ada)
  build: {
    outDir: resolve(__dirname, 'dist'), // Output build ke /dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'), // Entry HTML
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias untuk import
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Starter Project',
        short_name: 'Starter',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4ade80',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
