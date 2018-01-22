import {EntitySupplier} from "./EntitySupplier";
import {EntityUser} from "./EntityUser";
import {EntityUserRole} from "./EntityUserRole";
import {EntityProductSupplier} from "./EntityProductSupplier";
export class DTOSupplier {
    limit: number;
    offset: number;
    entitySupplier: EntitySupplier;
    entityUser: EntityUser;
    entityUserRole: EntityUserRole;
    entityProductSupplierList: EntityProductSupplier[];
}


