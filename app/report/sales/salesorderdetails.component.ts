import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/sales/salesorderdetails.component.html',
    providers: [WebAPIService]
})

export class SalesOrderDetails {
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    //private searchDTOCustomer: DTOCustomer;
    private showNavBar: boolean = false;
    private activeMenu: string = "salesorderdetails";

    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager) {
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
        //this.searchDTOCustomer = new DTOCustomer();
        //this.searchDTOCustomer.entityUser = new EntityUser();

    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    searchSalesOrderDetails(event: Event){
        
    }
    printSalesOrderDetails(event: Event){
        
    }

}

