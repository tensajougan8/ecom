import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { TYPES } from '../types';
import { ISellerService } from '../services/interfaces/seller.interface';
import { IBuyerService } from '../services/interfaces/buyer.interface';
import { deserializeToDTO } from '../utils/deserializer';
import { OrderDTO } from '../dto/order.dto';
import { buyerAuthenticate } from '../middleware/buyerAuthenticator';

@controller('/buyer')
export class BuyerController {
	constructor(
        @inject(TYPES.BuyerService)
		private buyerService: IBuyerService
	) {}
	@httpPost('/create-order/:seller_id', buyerAuthenticate)
	async createOrder(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        try {
            const sellerID = req.params.seller_id;
            const order = deserializeToDTO(req.body, OrderDTO);
            order.sellerID = sellerID;
            order.buyerID = req.body.user.id;
            console.log(order);
            const response = await this.buyerService.createOrder(order);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    @httpGet("/list-of-sellers", buyerAuthenticate)
	async getSellers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        try {
            const response = await this.buyerService.findAllSellers();
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    @httpGet("/seller-catalog/:seller_id", buyerAuthenticate)
	async getSellerCatalog(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        try {
            const sellerID = req.params.seller_id;
            const response = await this.buyerService.findSellerCatalogById(sellerID);
            res.status(200).json(response);
        }catch (error: any) {
            res.status(500).json(error.message);
        } 
    }
}
