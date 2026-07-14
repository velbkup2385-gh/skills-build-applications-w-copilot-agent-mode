import express from 'express';
import './config/database';
import routes from './routes';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(routes);
app.locals.apiBaseUrl = apiBaseUrl;

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
