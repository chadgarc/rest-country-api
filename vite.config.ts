/**
 * Vite configuration for the application.
 *
 * @file vite.config.ts
 * @description Vite configuration with React plugin, Babel transpilation,
 *              and Tailwind CSS Vite plugin.
 *
 * @property {string} base - Base path for asset URLs (`'./'`).
 * @property {string} build.outDir - Output directory for production builds (`'./docs'`).
 * @property {Object} server - Development server configuration.
 */
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
build: {
    outDir: './docs',
    emptyOutDir: false,
    cssMinify: false,
},
  server: {
    host: true,
    allowedHosts: ['codium.ec']
  },
})
