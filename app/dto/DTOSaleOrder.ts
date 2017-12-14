import {EntitySaleOrder} from "./EntitySaleOrder";
import {DTOCustomer} from "./DTOCustomer";
import {DTOProduct} from "./DTOProduct";
export class DTOSaleOrder {
    limit: number;
    offset: number;
    entitySaleOrder: EntitySaleOrder;
    dtoCustomer: DTOCustomer;
    products: Array<DTOProduct>;
    orderDate: string;
}
