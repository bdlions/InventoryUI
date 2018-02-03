import {Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {DTOPurchaseOrder} from './../../dto/DTOPurchaseOrder';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/purchase/purchaseordersummary.component.html',
    providers: [WebAPIService, DatePipe]
})

export class PurchaseOrderSummary {
    private datePipe: DatePipe;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;

    public showStartDatePicker: boolean = false;
    public showEndDatePicker: boolean = false;
    public fromDate: Date = new Date();
    public toDate: Date = new Date();
    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "purchaseordersummary";
    
    private purchaseOrderList: DTOPurchaseOrder[];
    
    private offset: number;
    private limit: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor(private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager, public datepipe: DatePipe) {
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
        this.datePipe = datepipe;
        
        this.offset = 0;
        this.limit = this.pageSize;
        this.purchaseOrderList = Array();
        this.fetchPurchaseOrderList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    
    public fetchPurchaseOrderList() {
        let fromDate: string = this.datepipe.transform(this.fromDate, 'dd-MM-yyyy');
        let toDate: string = this.datepipe.transform(this.toDate, 'dd-MM-yyyy');
        let requestBody: string = "{\"startDate\": \"" + fromDate + "\", \"endDate\": \"" + toDate + "\", \"offset\": \"" + this.offset + "\", \"limit\": \"" + this.limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDER_SUMMARY), requestBody).then(result => {
            if (result.success && result.list != null) {
                this.purchaseOrderList = result.list;
                this.length = result.counter;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.offset = (event.pageIndex * event.pageSize) ;
        this.limit = event.pageSize;
        this.fetchPurchaseOrderList();
    }
    
    searchPurchaseOrderSummary(event: Event) 
    {
        this.offset = 0;
        this.limit = this.pageSize;
        this.purchaseOrderList = Array();
        this.fetchPurchaseOrderList();
    }
    
    public showPurchaseOrder(event: Event, orderNo: string) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managepurchase");
        this.router.navigate(["managepurchase", {orderNo: orderNo}]);
    }
    
    printPurchaseOrderSummary(event: Event) {

    }

}

