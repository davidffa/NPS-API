import 'reflect-metadata';
import createConnection from './database';
import express from 'express';

import router from './routes';

const app = express();

createConnection();

app.use(express.json());
app.use(router);

export default app;