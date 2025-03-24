import { getRepository } from 'typeorm';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

class UserService {
    static async createUser(userData: any): Promise<User> {
        const userRepository = getRepository(User);


        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            throw new Error("All fields are required");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10); 
        const user = userRepository.create({ ...userData, password: hashedPassword }); 
        return userRepository.save(user); 
    }

    static async deleteUser(id: number): Promise<void> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id } });
        
        if (!user) {
            throw new Error("User not found");
        }
        
        await userRepository.remove(user);
    }
}

export default UserService;