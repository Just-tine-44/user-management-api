import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
  
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await AuthService.login(req.body.email, req.body.password);
      res.status(200).json({ token });
    } catch (error: unknown) {
      res.status(401).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
}

export default AuthController;