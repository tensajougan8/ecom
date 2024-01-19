import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { MIDDLEWARE } from '../utils/messages';

const JWT_SECRET = config.JWT_SECRET!;

export const sellerAuthenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.header('Authorization');
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			res.status(401).json({ message: MIDDLEWARE.FAILURE.INVALID_TOKEN });
			return;
		}
		const decodedToken: any = jwt.verify(token, JWT_SECRET);
		req.body.userID = decodedToken.userID;

		const user = await User.findOne({ _id: decodedToken.userID });
		console.log(user);
		if (user && user?._id && user?.userType === 'SELLER') {
			req.body.user = user;
		} else if (user!.userType !== 'SELLER') {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: MIDDLEWARE.FAILURE.NOT_AUTHORIZED,
			});
			return;
		} else {
			res.status(404).json({ message: MIDDLEWARE.FAILURE.NO_USER });
			return;
		}
		next();
	} catch (error) {
		res.status(401).json({ message: MIDDLEWARE.FAILURE.AUTH_FAILED });
	}
};
