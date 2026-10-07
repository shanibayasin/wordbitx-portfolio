import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import net from 'net';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

async function getAvailablePort(startPort: number): Promise<number> {
  return await new Promise((resolve, reject) => {
    const tester = net.createServer();

    tester.once('error', () => {
      resolve(getAvailablePort(startPort + 1));
    });

    tester.once('listening', () => {
      tester.close(() => resolve(startPort));
    });

    tester.listen(startPort, '127.0.0.1');
  });
}

export default defineConfig(async () => {
  const preferredHmrPort = Number(process.env.HMR_PORT ?? 24679);
  const hmrPort = await getAvailablePort(preferredHmrPort);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': projectRoot,
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT ?? 3000),
      strictPort: false,
      hmr: process.env.DISABLE_HMR === 'true'
        ? false
        : {
            host: '127.0.0.1',
            port: hmrPort,
            clientPort: hmrPort,
          },
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT ?? 4173),
      strictPort: false,
    },
  };
});
