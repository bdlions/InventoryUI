export class EntityProduct {
    id: number;
    categoryId: number;
    categoryTitle: string;
    vat: number;
    name: string;
    code: string;
    width: string;
    height: string;
    weight: string;
    costPrice: number = 0;
    unitPrice: number = 0;
    length: string;
    typeId: number;
    typeTitle: string;
    standardUOMId: number;
    saleUOMId: number;
    purchaseUOMId: number;
    createdOn: number;
    modifiedOn: number;
}
