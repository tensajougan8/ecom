import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../types';
import { IAuthService } from '../services/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AUTH_CONTROLLER } from '../utils/messages';
import {
	ConflictError,
	InternalServerError,
} from '../middleware/errorHandlingMiddleware';
import { deserializeToDTO } from '../utils/deserializer';
import { UserDTO } from '../dto/user.dto';
import { LoginDTO } from '../dto/login.dto';

@controller('/auth')
export class AuthController {
	constructor(
		@inject(TYPES.AuthService)
		private authService: IAuthService
	) {}

	@httpPost('/register')
	async signup(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const request = deserializeToDTO(req.body, UserDTO);
			const response: any = await this.authService.register(request);

			res.status(StatusCodes.CREATED).json({
				success: true,
				message: AUTH_CONTROLLER.SUCCESS.USER_REGISTERED,
			});
		} catch (error) {
			if(error instanceof ConflictError){
				res.status(StatusCodes.CONFLICT).json({
					error: AUTH_CONTROLLER.FAILURE.USER_ALREADY_EXISTS,
				});
				return;
			}
			next(new InternalServerError());
		}
	}

	@httpPost('/login')
	async login(req: Request, res: Response) {
		try {
			const request = deserializeToDTO(req.body, LoginDTO);
			const result = await this.authService.login(request.userName, request.password);
			res.json(result);
		} catch (err) {
			res.status(500).send(err);
		}
	}
}
