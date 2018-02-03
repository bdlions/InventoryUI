export class EntityPurchaseOrder {
    id: number;
    orderNo: string;
    nextOrderNo: number;
    supplierUserId: number;
    supplierName: string;
    cell: string;
    email: string;
    orderDate: number;
    requestedShipDate: number;
    subtotal: number = 0;
    discount: number = 0;
    total: number = 0;
    paid: number = 0;
    remarks: string;
    createdOn: number;
    modifiedOn: number;
    createdByUserId: number;
    createdByUserName: string;
    modifiedByUserId: number;
    modifiedByUserName: string;
}
