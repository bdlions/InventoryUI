export class EntitySaleOrder {
    id: number;
    orderNo: string;
    nextOrderNo: number;
    customerUserId: number;
    customerName: string;
    cell: string;
    email: string;
    statusId: number;
    saleDate: number;
    remarks: string;
    subtotal: number = 0;
    discount: number = 0;
    total: number = 0;
    paid: number = 0;
    createdOn: number;
    modifiedOn: number;
}
