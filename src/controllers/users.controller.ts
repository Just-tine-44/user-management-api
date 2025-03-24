import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../model/user.model';

class UsersController {
  // List all users
  static async listUsers(req: Request, res: Response): Promise<Response> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error listing users:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  //  Create a new user
  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      console.log("Received data:", req.body);
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create({ username, email, password });

      await userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  //  Delete a user
  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await userRepository.remove(user);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: Number(id) } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

export default UsersController;