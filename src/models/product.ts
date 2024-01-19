import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	price: number;
    catalogID: Schema.Types.ObjectId;
}

export const ProductSchema: Schema = new mongoose.Schema({
	catalogID: { type: Schema.Types.ObjectId, ref: 'Catalog' },
    name: String,
	price: Number,
});

export const Product = mongoose.model('Product', ProductSchema);
