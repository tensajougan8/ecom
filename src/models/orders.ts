import mongoose, { Schema, Document } from 'mongoose';;

export interface IOrder extends Document {
	buyerID: Schema.Types.ObjectId;
	products: Schema.Types.ObjectId[];
	sellerID: Schema.Types.ObjectId;
}

const OrderSchema = new mongoose.Schema({
	buyerID: { type: Schema.Types.ObjectId, ref: 'User' }, 
	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	sellerID: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Order = mongoose.model('Order', OrderSchema);
