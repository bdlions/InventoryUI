import {EntityProduct} from "./EntityProduct";
import {EntityProductCategory} from "./EntityProductCategory";
import {EntityProductType} from "./EntityProductType";
import {EntityProductSupplier} from "./EntityProductSupplier";
export class DTOProduct {
    limit: number;
    offset: number;
    quantity: number = 1;
    discount: number = 0;
    total: number = 0;
    entityProduct: EntityProduct;
    entityProductCategory: EntityProductCategory;
    entityProductType: EntityProductType;
    entityProductSupplierList: EntityProductSupplier[];
}

