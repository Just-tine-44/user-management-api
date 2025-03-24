import { getRepository } from 'typeorm';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class AuthService {
    static async register(userData: any): Promise<User> {
        const userRepository = getRepository(User);
        const existingUser = await userRepository.findOne({ where: { email: userData.email } });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = userRepository.create({ ...userData, password: hashedPassword });
        return userRepository.save(user);
    }

    static async login(email: string, password: string): Promise<string> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        return token;
    }
}

export default AuthService;