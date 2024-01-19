import { UserDTO } from '../../dto/user.dto';

interface IUserRepository {
	findByUsername(username: string): Promise<any>;
	findById(id: string): Promise<any>;
	create(user: UserDTO): Promise<any>;
}

export { IUserRepository };
