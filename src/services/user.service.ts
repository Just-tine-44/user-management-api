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
}

export default UserService;