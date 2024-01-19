import { UserDTO } from '../../dto/user.dto';

interface IAuthService {
	register(request: UserDTO): Promise<any>;
	login(email: string, password: string): Promise<any>;
}

export { IAuthService };
