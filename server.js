import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.use('*', (req, res, next) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

createServer();