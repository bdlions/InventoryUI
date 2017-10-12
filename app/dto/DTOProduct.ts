import {EntityProduct} from "./EntityProduct";
import {EntityProductCategory} from "./EntityProductCategory";
import {EntityProductType} from "./EntityProductType";
export class DTOProduct {
    limit: number;
    offset: number;
    quantity: number;
    entityProduct: EntityProduct;
    entityProductCategory: EntityProductCategory;
    entityProductType: EntityProductType;
}

