import express, { Application } from 'express';
import 'reflect-metadata'; // Required for TypeORM
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';

const createServer = (): Application => {
  const app: Application = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  
  // Basic error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  return app;
};

export default createServer;