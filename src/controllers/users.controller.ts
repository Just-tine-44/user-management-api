import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UsersController {
    static async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userData = req.body;
            const newUser = await UserService.createUser(userData);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creating user" });
        }
    }
}

export default UsersController;