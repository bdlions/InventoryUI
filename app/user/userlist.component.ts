import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityUser} from '../dto/EntityUser';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/user/userlist.component.html',
    providers: [WebAPIService]
})

export class UserListComponent {
    private webAPIService: WebAPIService;
    private showNavBar: boolean = false;
    private activeMenu: string = "userlist";

    private requestId: number;

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor(private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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

        this.requestId = ACTION.FETCH_CUSTOMERS;
        this.fetchUserList();
    }

    ngOnInit() {

    }
    searchUser(event: Event) {

    }
    showUser(event: Event) {

        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("manageuser");
        this.router.navigate(["manageuser"]);
    }

    public fetchUserList() {

    }
    public fetchUserListByName() {

    }
    
    onPaginateChange(event: PageEvent) {

    }
}



