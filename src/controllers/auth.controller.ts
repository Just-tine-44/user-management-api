import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await AuthService.login(req.body.email, req.body.password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default AuthController;