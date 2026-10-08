import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './src/server/api.js';
import { DEV_HOST, DEV_PORT } from './src/server/devConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const isProduction = process.env.NODE_ENV === 'production';
  const port = isProduction ? Number(process.env.PORT ?? DEV_PORT) : DEV_PORT;
  const host = process.env.HOST || DEV_HOST;

  // CORS and origin handling
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowed = (process.env.PUBLIC_LEAD_ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
      .split(',')
      .map((s) => s.trim());
    if (origin && (allowed.includes(origin) || allowed.includes('*'))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // JSON request body parser
  app.use(express.json());

  // Mount API router
  app.use('/api', apiRouter);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      organizationId: process.env.PUBLIC_LEAD_ORGANIZATION_ID || '6ac2a411ceac76195538b01f',
      superAdminEmail: process.env.PLATFORM_SUPER_ADMIN_EMAIL || 'admin@wordbitx.com',
      time: new Date().toISOString(),
    });
  });

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Vite middleware for dev mode
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: DEV_HOST,
        port: DEV_PORT,
        strictPort: true,
        hmr: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  await new Promise<void>((resolve, reject) => {
    const onError = (error: Error) => {
      httpServer.removeListener('listening', onListening);
      reject(error);
    };
    const onListening = () => {
      httpServer.removeListener('error', onError);
      resolve();
    };

    httpServer.once('error', onError);
    httpServer.once('listening', onListening);
    httpServer.listen(port, host);
  });

  console.log(`WordbitX CRM server running at http://localhost:${port}`);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
