import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import {defineConfig} from 'vite';
import { DEV_HOST, DEV_PORT } from './src/server/devConfig.ts';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': projectRoot,
    },
  },
  server: {
    host: DEV_HOST,
    port: DEV_PORT,
    strictPort: true,
    // The Express server also hosts Vite's HMR websocket on port 3000.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  preview: {
    host: DEV_HOST,
    strictPort: true,
  },
});
