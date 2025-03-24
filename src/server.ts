import express, { Application } from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';

const createServer = async (): Promise<Application> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");

    const app: Application = express();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Register Routes Properly
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes); 

    // Error handler
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
    });

    return app;
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Ensure the server starts correctly
createServer().then((app) => {
  app.listen(5000, () => console.log("Server running on http://localhost:5000"));
});