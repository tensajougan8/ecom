import { OrderDTO } from "../../dto/order.dto";

interface IBuyerService {
    findAllSellers(): Promise<any>;
    findSellerCatalogById(id: string): Promise<any>;
    createOrder(order: OrderDTO): Promise<any>;
}

export { IBuyerService };
