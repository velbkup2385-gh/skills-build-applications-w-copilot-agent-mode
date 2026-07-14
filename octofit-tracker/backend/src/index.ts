import express from 'express';
import './config/database';

const app = express();
const port = 8000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});
