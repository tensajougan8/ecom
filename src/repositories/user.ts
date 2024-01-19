import { IUserRepository } from './interfaces/user.interface';
import { User } from '../models/user'; 
import { injectable } from 'inversify';
import { UserDTO } from '../dto/user.dto';

@injectable()
export class UserRepository implements IUserRepository {
	async findByUsername(username: string): Promise<any> {
		console.log(username)
		return await User.findOne({ userName: username });
	}

	async findById(id: string): Promise<any> {
		return await User.findById(id);
	}

	async create(user: UserDTO): Promise<any> {
		try {
			const constructedUser = new User(user);
			await constructedUser.save();
			console.log('User saved successfully!');
		} catch (error: any) {
			console.error('Error saving user:', error.message);
		}
	}
}
