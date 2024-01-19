import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { ISellerService } from '../services/interfaces/seller.interface';
import { TYPES } from '../types';
import { CatalogDTO } from '../dto/catalog.dto';
import { deserializeToDTO } from '../utils/deserializer';
import { BadRequestError, InternalServerError } from '../middleware/errorHandlingMiddleware';
import { StatusCodes } from 'http-status-codes';
import { sellerAuthenticate } from '../middleware/sellerAuthenticator';

@controller('/seller')
export class SellerController {
	constructor(
		@inject(TYPES.SellerService)
		private sellerService: ISellerService,
	) {}
	@httpPost('/create-catalog', sellerAuthenticate)
	async createCatalog(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        try {
            const request = deserializeToDTO(req.body, CatalogDTO);
            request.sellerID = req.body.user.id;
            console.log(request)
            const createdCatalog = await this.sellerService.createCatalog(request.sellerID);
            const createdProducts = await this.sellerService.createProducts(request.products, createdCatalog.id);
            res.status(StatusCodes.CREATED).json({createdProducts})
        } catch (error: any) {
            if(error instanceof BadRequestError){
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message
                })
            }
            next(new InternalServerError(error.message));
        }
    }

    @httpGet("/order", sellerAuthenticate)
	async getOrders(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        try {
            const sellerID = req.body.user.id;
            const response = await this.sellerService.findAllOrders(sellerID);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
