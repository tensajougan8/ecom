import { ProductDTO } from "../../dto/product.dto";

interface ISellerRepository {
    findSellerCatalogById(id: string): Promise<any>;
    findAllSellers(): Promise<any>;
    createCatalog(sellerID: string): Promise<any>;
    findOrdersBySellerId(id: string): Promise<any>;
    createProducts(products: ProductDTO[]): Promise<any>;
    findProductsByCatalogId(catalogID: string): Promise<any>;
    doesSellerHaveCatalog(sellerID: string): Promise<any>;
}
export { ISellerRepository };