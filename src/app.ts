import 'reflect-metadata';
import createConnection from './database';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from './errors/AppError';

import router from './routes';

const app = express();

createConnection();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.json(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`
  });
});

export default app;