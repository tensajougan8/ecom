import mongoose, {Schema, Document} from "mongoose";

export interface ICatalog extends Document {
	sellerID: Schema.Types.ObjectId;
}

const CatalogSchema = new mongoose.Schema({
	sellerID: { type: Schema.Types.ObjectId, ref: 'User' }, 
});
  
  export const Catalog = mongoose.model('Catalog', CatalogSchema);