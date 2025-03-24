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

    static async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id);
            
            if (isNaN(userId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            
            await UserService.deleteUser(userId);
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            if (error instanceof Error && error.message === "User not found") {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(500).json({ message: "Error deleting user" });
        }
    }
}

export default UsersController;