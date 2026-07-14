import express from 'express';
import './config/database';
import routes from './routes';

const app = express();
const port = 8000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});
