import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityUser} from '../dto/EntityUser';
import {EntityUserRole} from "../dto/EntityUserRole";
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
        this.fetchUserList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.fetchUserInfo();
        });
    }
    public hideManageUserMessageDispalyModal(): void {
        this.manageUserMessageDispalyModal.hide();
    }

    searchUser(event: Event) {

    }

    newUser(event: Event) {

    }

    saveUser(event: Event) {

    }
    selectedUser(event: Event) {

    }

    public fetchUserList() {

    }

    public fetchUserListByName() {

    }

    public fetchUserInfo() {

    }

    public manageUserUpdateLeftPanel() {

    }
    public roleAdmin() {

    }
    public roleStaff() {

    }
    
}

