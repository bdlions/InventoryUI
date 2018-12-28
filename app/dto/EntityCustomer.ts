export class EntityCustomer {
    id: number;
    userId: number;
    customerName: string;
    email: string;
    cell: string;
    balance: number = 0;
    previousBalance: number = 0;
}
