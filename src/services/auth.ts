import { inject, injectable } from 'inversify';
import { IAuthService } from './interfaces/auth.interface';
import { TYPES } from '../types';
import { IUserRepository } from '../repositories/interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
} from '../middleware/errorHandlingMiddleware';
import config from '../config';

@injectable()
export class AuthService implements IAuthService {
	constructor(
		@inject(TYPES.UserRepository)
		private userRepository: IUserRepository
	) {}

	async register(user: UserDTO): Promise<any> {
		try {
			console.log(user);
			const checkExistingUser = await this.userRepository.findByUsername(
				user.userName
			);
			if (checkExistingUser) {
				throw new ConflictError('User already exists');
			}

			if (user && user.password) {
				const hashedPassword = await bcrypt.hash(user!.password, 10);
				user!.password = hashedPassword;
			}

			const createdUser = await this.userRepository.create(user!);
			return createdUser;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async login(username: string, password: string): Promise<any> {
		const JWT_SECRET = config.JWT_SECRET;
		const JWT_EXPIRY = config.JWT_EXPIRATION_TIME;
		try {
			const user = await this.userRepository.findByUsername(username);
			console.log(user);
			if (!user && user.length <= 0) {
				throw new NotFoundError('User not found');
			}

			const passwordMatch = await bcrypt.compare(
				password,
				user!.password
			);
			if (!passwordMatch) {
				throw new BadRequestError('Invalid credentials');
			}
			const token = jwt.sign({ userID: user._id }, JWT_SECRET, {
				expiresIn: JWT_EXPIRY,
			});

			return { token };
		} catch (error) {
			throw error;
		}
	}
}
