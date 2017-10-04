import {EntitySaleOrder} from "./EntitySaleOrder";
import {DTOCustomer} from "./DTOCustomer";
import {DTOProduct} from "./DTOProduct";
export class DTOSaleOrder {
    limit: number;
    offset: number;
    entityPurchaseOrder: EntitySaleOrder;
    dtoSupplier: DTOCustomer;
    products: Array<DTOProduct>;
}
