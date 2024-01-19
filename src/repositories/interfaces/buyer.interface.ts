import { OrderDTO } from "../../dto/order.dto";

interface IBuyerRepository {
    createOrder(Order: OrderDTO): Promise<any>;
}

export { IBuyerRepository };