import { injectable } from 'inversify';
import { Catalog } from '../models/catalog';
import { User } from '../models/user';
import { ISellerRepository } from './interfaces/seller.interface';
import { Order } from '../models/orders';
import { Product } from '../models/product';
import { ProductDTO } from '../dto/product.dto';
import mongoose from 'mongoose';

@injectable()
export class SellerRepository implements ISellerRepository {
	async createCatalog(sellerID: string): Promise<any> {
		const sellerCreated = new Catalog({
			sellerID: new mongoose.Types.ObjectId(sellerID),
		});
		await sellerCreated.save();
		return sellerCreated;
	}
	async findAllSellers(): Promise<any> {
		const sellers = await User.find({ userType: 'SELLER' }).select('-password');
		return sellers;
	}
	async findSellerCatalogById(id: string): Promise<any> {
		const sellerCatalog = await Catalog.findOne({ sellerID: id }).exec();
		return sellerCatalog;
	}

	async findOrdersBySellerId(sellerId: string): Promise<any> {
		try {
			const orders = await Order.find({ sellerID: sellerId }).populate('products buyerID').populate({
				path: 'buyerID',
				select: 'userName userType _id'
			  }).exec();
			return orders;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async createProducts(products: ProductDTO[]): Promise<any> {
		try {
			const productsCreated = await Product.insertMany(products);
			return productsCreated;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findProductsByCatalogId(catalogID: string): Promise<any> {
		try {
			const products = await Product.find({ catalogID: catalogID }).exec();
			return products;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async doesSellerHaveCatalog(id: string): Promise<any> {
		try {
			const catalog = await Catalog.findOne({ sellerID: id }).exec();
			if (catalog && catalog.id) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			throw error;
		}
	}
}
