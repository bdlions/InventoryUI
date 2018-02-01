import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOUser} from '../dto/DTOUser';
import {EntityUser} from '../dto/EntityUser';
import {EntityUserRole} from "../dto/EntityUserRole";
import {EntityRole} from '../dto/EntityRole';
import {NavigationManager} from "../services/NavigationManager";
import {Subscription} from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: 'app/html/user/manageuser.component.html',
    providers: [WebAPIService]
})

export class ManageUserComponent {
    @ViewChild('manageUserMessageDispalyModal') public manageUserMessageDispalyModal: ModalDirective;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private showNavBar: boolean = false;
    private activeMenu: string = "manageuser";
    //    private manageUserSuccessMessage: string;
    private manageUserErrorMessage: string;

    //constants & constraints
    private maxUserLeftPanel: number = 10;
    
    private entityUserList: EntityUser[];
    private userRoleList: EntityRole[];
    private dtoUser: DTOUser;
    private userId: number;

    constructor(private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager) {
        this.navigationManager.showNavBarEmitter.subscribe((mode) => {
            if (mode !== null) {
                this.showNavBar = mode;
            }
        });
        this.navigationManager.menuActivationEmitter.subscribe((menuName) => {
            if (menuName !== null) {
                this.activeMenu = menuName;
            }
        });
        this.webAPIService = webAPIService;
        
        
        this.userRoleList = Array();
        this.fetchUserRoleList();
        //this.fetchUserList();
        
        this.entityUserList = Array();
        this.fetchUserList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.userId = params['userId'];
            this.dtoUser = new DTOUser();
            this.dtoUser.entityUser = new EntityUser();
            this.dtoUser.entityUserRoles = Array();
            if (this.userId > 0)
            {
                this.fetchUserInfo();                
            }
            
        });
    }
    public hideManageUserMessageDispalyModal(): void {
        this.manageUserMessageDispalyModal.hide();
    }
    
    fetchUserRoleList()
    {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_ROLE_LIST), "{}").then(result => {
            if (result.success) {
                this.userRoleList = result.list;
            }
            else {

            }
        });
    }
    
    public fetchUserList() {
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USERS), "{}").then(result => {
            if (result.success) {
                this.entityUserList = result.list;
            }
            else {

            }
        });
    }
    
    public fetchUserInfo() 
    {
        let entityUser: EntityUser = new EntityUser();
        entityUser.id = this.userId;
        let requestBody: string = JSON.stringify(entityUser);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_WITH_ROLES), requestBody).then(result => {
            if (result.success) {
                this.dtoUser = result;
            }
            else {

            }
        });
    }
    
    setCurrentRoles(id: number)
    {
        if (this.dtoUser != null && this.dtoUser.entityUserRoles != null)
        {
            for (let counter = 0; counter < this.dtoUser.entityUserRoles.length; counter++)
            {
                if (this.dtoUser.entityUserRoles[counter].roleId == id)
                {
                    return true;
                }
            }
        }
        return false;
    }
    
    updateCheckedRoles(role: EntityRole, event: Event)
    {
        let tempRoles: EntityUserRole[] = Array();
        let tempEntityUserRole: EntityUserRole = new EntityUserRole();
        tempEntityUserRole.roleId = role.id;
        let isAppend: boolean = true;
        if (this.dtoUser != null && this.dtoUser.entityUserRoles != null)
        {
            for (let counter = 0; counter < this.dtoUser.entityUserRoles.length; counter++)
            {
                if (this.dtoUser.entityUserRoles[counter].roleId == role.id)
                {
                    isAppend = false;
                }
                else
                {                    
                    tempRoles[tempRoles.length] = this.dtoUser.entityUserRoles[counter];
                }
            }
        }
        if (isAppend)
        {
            tempRoles[tempRoles.length] = tempEntityUserRole;
        }
        this.dtoUser.entityUserRoles = tempRoles;
    }

    newUser(event: Event) {
        this.dtoUser = new DTOUser();
        this.dtoUser.entityUser = new EntityUser();
        this.dtoUser.entityUserRoles = Array();
    }
    
    saveUser(event: Event) {
        //check name, email and password
        if (this.dtoUser.entityUser.email == null || this.dtoUser.entityUser.email == "")
        {
            this.manageUserErrorMessage = "Email is required.";
            this.manageUserMessageDispalyModal.config.backdrop = false;
            this.manageUserMessageDispalyModal.show();
            return;
        }
        if (this.dtoUser.entityUser.password == null || this.dtoUser.entityUser.password == "")
        {
            this.manageUserErrorMessage = "Password is required.";
            this.manageUserMessageDispalyModal.config.backdrop = false;
            this.manageUserMessageDispalyModal.show();
            return;
        }
        if (this.dtoUser.entityUser.userName == null || this.dtoUser.entityUser.userName == "")
        {
            this.manageUserErrorMessage = "Name is required.";
            this.manageUserMessageDispalyModal.config.backdrop = false;
            this.manageUserMessageDispalyModal.show();
            return;
        }
        let requestBody: string = JSON.stringify(this.dtoUser);
        if (this.dtoUser.entityUser.id > 0)
        {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_USER_INFO), requestBody).then(result => {
                if (result.success) {
                    this.dtoUser.entityUser = result.entityUser;
                }
                else {
                    this.manageUserErrorMessage = result.message;
                    this.manageUserMessageDispalyModal.config.backdrop = false;
                    this.manageUserMessageDispalyModal.show();                    
                }
            });
        }
        else
        {            
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_USER_INFO), requestBody).then(result => {
                if (result.success) {
                    
                }
                else {
                    this.manageUserErrorMessage = result.message;
                    this.manageUserMessageDispalyModal.config.backdrop = false;
                    this.manageUserMessageDispalyModal.show();
                }
            });
        }
    }   
    
    selectedUser(event: Event, userId: number) 
    {
        this.userId = userId;
        this.fetchUserInfo();
    } 
}

