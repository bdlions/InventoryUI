export class EntityPurchaseOrder {
    id: number;
    orderNo: string;
    supplierUserId: number;
    supplierName: string;
    cell: string;
    email: string;
    orderDate: number;
    requestedShipDate: number;
    subtotal: number;
    discount: number;
    total: number;
    paid: number;
    remarks: string;
    createdOn: number;
    modifiedOn: number;
}
