import { inject, injectable } from 'inversify';
import { ISellerService } from './interfaces/seller.interface';
import { TYPES } from '../types';
import { ISellerRepository } from '../repositories/interfaces/seller.interface';
import { ProductDTO } from '../dto/product.dto';
import { BadRequestError } from '../middleware/errorHandlingMiddleware';

@injectable()
export class SellerService implements ISellerService {
	constructor(
		@inject(TYPES.SellerRepository)
		private sellerRepository: ISellerRepository
	) {}
	async createCatalog(sellerID: string) {
		try {
			const sellerHasCatalog = await this.sellerRepository.doesSellerHaveCatalog(sellerID)
			console.log(sellerHasCatalog);
			if (sellerHasCatalog) {
				throw new BadRequestError('You already hav a catalog');
			}
			const sellerCreated = await this.sellerRepository.createCatalog(
				sellerID
			);
			return sellerCreated;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
	async createProducts(products: ProductDTO[], catalogID: string) {
		const updatedProducts = products.map((product) => ({
			...product,
			catalogID,
		}));
		const productsCreated = await this.sellerRepository.createProducts(
			updatedProducts
		);
		return productsCreated;
	}
	async findAllOrders(id: string) {
		const sellers = await this.sellerRepository.findOrdersBySellerId(id);
		return sellers;
	}
}
