import {EntityUser} from "./EntityUser";
import {EntityUserRole} from "./EntityUserRole";
export class DTOUser {
    limit: number;
    offset: number;
    entityUser: EntityUser;
    entityUserRoles: EntityUserRole[];
}


