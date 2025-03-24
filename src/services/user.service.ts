import { AppDataSource } from '../config/data-source';
import { User } from '../model/user.model';
import * as bcrypt from 'bcrypt';

interface UserInput {
    username: string;
    email: string;
    password: string;
}

class UserService {
    static async createUser(userData: UserInput): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        if (!userData.email || !userData.password || !userData.username) {
            throw new Error("All fields are required");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10); 
        const user = userRepository.create({ ...userData, password: hashedPassword }); 
        return userRepository.save(user); 
    }

    static async getUserById(id: number): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.findOne({ where: { id } });
    }

    static async deleteUser(id: number): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id } });
        
        if (!user) {
            throw new Error("User not found");
        }
        
        await userRepository.remove(user);
    }
}

export default UserService;