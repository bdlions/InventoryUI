import {EntityAdjustStockOrder} from "./EntityAdjustStockOrder";
import {DTOProduct} from "./DTOProduct";
export class DTOAdjustStockOrder {
    limit: number;
    offset: number;    
    entityAdjustStockOrder: EntityAdjustStockOrder;
    products: Array<DTOProduct>;
    adjustDate: string;
}
