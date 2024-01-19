import mongoose from 'mongoose';
import { Catalog } from '../models/catalog';
import { Order } from '../models/orders';
import { IBuyerRepository } from './interfaces/buyer.interface';
import { injectable } from 'inversify';
import { OrderDTO } from '../dto/order.dto';

@injectable()
export class BuyerRepository implements IBuyerRepository {


	async createOrder(order: OrderDTO): Promise<any> {
		console.log('order',order)
		const newOrder = new Order({
			buyerID: order.buyerID,
			products: order.productID,
			sellerID: order.sellerID,
		});

		try {
			const savedOrder = await newOrder.save();
			return savedOrder;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
