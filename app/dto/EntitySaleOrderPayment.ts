export class EntitySaleOrderPayment {
    id: number;
    customerUserId: number;
    customerName: string;
    paymentTypeId: number;
    reference: string;
    amountIn: number = 0;
    amountOut: number = 0;
    description: string;
    paymentDate: string;
    createdOn: number;
    modifiedOn: number;
    createdByUserId: number;
    createdByUserName: string;
    modifiedByUserId: number;
    modifiedByUserName: string;
}
