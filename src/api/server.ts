import express from 'express';
import { HypurrYieldIndexer } from '../indexer/HypurrYieldIndexer.js';

export function startServer(indexer: HypurrYieldIndexer, port = 3000) {
  const app = express();

  app.get('/health', (req, res) => {
    const health = indexer.getHealth();
    res.status(health.healthy ? 200 : 503).json(health);
  });

  app.get('/metrics', (req, res) => {
    res.json(indexer.getMetrics());
  });

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
} 