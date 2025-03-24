import { AppDataSource } from '../config/data-source';
import { User } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface UserInput {
  username: string;
  email: string;
  password: string;
}

class AuthService {
  static async register(userData: UserInput): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    if (!userData.email || !userData.password || !userData.username) {
      throw new Error("All fields are required");
    }

    const existingUser = await userRepository.findOne({ where: { email: userData.email } });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = userRepository.create({ ...userData, password: hashedPassword });

    return userRepository.save(user);
  }

  static async login(email: string, password: string): Promise<string> {
    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  }
}

export default AuthService;
