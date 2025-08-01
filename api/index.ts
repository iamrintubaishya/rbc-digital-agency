import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
let routesInitialized = false;

async function initializeRoutes() {
  if (!routesInitialized) {
    await registerRoutes(app);
    routesInitialized = true;
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const expressApp = await initializeRoutes();
  
  // Handle the request
  expressApp(req, res);
}