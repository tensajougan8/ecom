import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ISellerRepository } from '../repositories/interfaces/seller.interface';
import mongoose from 'mongoose';
import { IBuyerRepository } from '../repositories/interfaces/buyer.interface';
import { IBuyerService } from './interfaces/buyer.interface';
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from '../middleware/errorHandlingMiddleware';
import { OrderDTO } from '../dto/order.dto';
import { next } from 'inversify-express-utils';

@injectable()
export class BuyerService implements IBuyerService {
	constructor(
		@inject(TYPES.SellerRepository)
		private sellerRepository: ISellerRepository,
		@inject(TYPES.BuyerRepository)
		private buyerRepository: IBuyerRepository
	) {}

	async findAllSellers() {
		return await this.sellerRepository.findAllSellers();
	}
	async findSellerCatalogById(id: string) {
        try {
            const catalog = await this.sellerRepository.findSellerCatalogById(id);
            if (!catalog) {
                throw new NotFoundError('Seller catalog not found');
            }
            const products = await this.sellerRepository.findProductsByCatalogId(
                catalog._id
            );
            if (!products) {
                throw new NotFoundError('Products not found');
            }
            return products; 
        } catch (error: any) {
            console.log(error)
            throw error;
        }
	}
	async createOrder(order: OrderDTO) {
		try {
			const sellerCatalog =
				await this.sellerRepository.findSellerCatalogById(
					order.sellerID!
				);

			if (!sellerCatalog) {
				throw new NotFoundError('Seller catalog not found');
			}

			console.log(sellerCatalog);

			// const itemIds = order.productID.map(
			// 	(productID) => new mongoose.Types.ObjectId(productID)
			// );

			return await this.buyerRepository.createOrder(order);
		} catch (error: any) {
			throw error;
		}
	}
}
