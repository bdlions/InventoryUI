import {EntityCustomer} from "./EntityCustomer";
import {EntityUser} from "./EntityUser";
import {EntityUserRole} from "./EntityUserRole";
export class DTOCustomer {
    limit: number;
    offset: number;
    entityCustomer: EntityCustomer;
    entityUser: EntityUser;
    entityUserRole: EntityUserRole;
}



