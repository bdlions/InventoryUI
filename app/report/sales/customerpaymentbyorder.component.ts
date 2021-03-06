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
    templateUrl: 'app/html/report/sales/customerpaymentbyorder.component.html',
    providers: [WebAPIService]
})

export class CustomerPaymentByOrder {
    private webAPIService: WebAPIService;
    private subscribe: Subscription;

//    public showStartDatePicker: boolean = false;
//    public showEndDatePicker: boolean = false;
//    public fromDate: Date = new Date();
//    public toDate: Date = new Date();
//    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "customerpaymentbyorder";

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
        //this.searchDTOCustomer = new DTOCustomer();
        //this.searchDTOCustomer.entityUser = new EntityUser();

    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    searchCustomerPaymentByOrder(event: Event) {

    }
    printCustomerPaymentByOrder(event: Event) {

    }

}

