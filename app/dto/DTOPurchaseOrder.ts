import {EntityPurchaseOrder} from "./EntityPurchaseOrder";
import {DTOSupplier} from "./DTOSupplier";
import {DTOProduct} from "./DTOProduct";
export class DTOPurchaseOrder {
    limit: number;
    offset: number;
    entityPurchaseOrder: EntityPurchaseOrder;
    dtoSupplier: DTOSupplier;
    products: Array<DTOProduct>;
    returnProducts: Array<DTOProduct>;
    orderDate: string;
    invoiceDate: string;
}