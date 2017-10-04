import {EntitySupplier} from "./EntitySupplier";
import {EntityUser} from "./EntityUser";
import {EntityUserRole} from "./EntityUserRole";
export class DTOSupplier {
    limit: number;
    offset: number;
    entitySupplier: EntitySupplier;
    entityUser: EntityUser;
    entityUserRole: EntityUserRole;
}


