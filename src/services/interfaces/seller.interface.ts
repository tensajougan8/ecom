import { ProductDTO } from "../../dto/product.dto";

interface ISellerService {
	createCatalog(sellerID: string): Promise<any>;
	findAllOrders(id: string): Promise<any>;
    createProducts(products: ProductDTO[], catalogID: string): Promise<any>;
}

export { ISellerService };
