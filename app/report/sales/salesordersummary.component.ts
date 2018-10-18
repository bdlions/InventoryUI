import {Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {DTOSaleOrder} from './../../dto/DTOSaleOrder';
import {EntitySaleOrder} from './../../dto/EntitySaleOrder';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/sales/salesordersummary.component.html',
    providers: [WebAPIService, DatePipe]
})

export class SalesOrderSummary {
    private datePipe: DatePipe;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;

    public showStartDatePicker: boolean = false;
    public showEndDatePicker: boolean = false;
    public fromDate: Date = new Date();
    public toDate: Date = new Date();
    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "salesordersummary";
    
    //private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];
    private totalSaleAmount: number;
    
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
        //this.searchDTOCustomer = new DTOCustomer();
        //this.searchDTOCustomer.entityUser = new EntityUser();
        
        //this.reqDTOSaleOrder = new DTOSaleOrder();
        //this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
        //this.reqDTOSaleOrder.offset = 0;
        //this.reqDTOSaleOrder.limit = this.pageSize;
        this.totalSaleAmount = 0;
        this.offset = 0;
        this.limit = this.pageSize;
        this.saleOrderList = Array();
        this.fetchSaleOrderList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    
    public fetchSaleOrderList() {
        let fromDate: string = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
        let toDate: string = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
        //let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        let requestBody: string = "{\"startDate\": \"" + fromDate + "\", \"endDate\": \"" + toDate + "\", \"offset\": \"" + this.offset + "\", \"limit\": \"" + this.limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDER_SUMMARY), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
                this.length = result.totalSaleOrders;
                this.totalSaleAmount = result.totalSaleAmount;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.offset = (event.pageIndex * event.pageSize) ;
        this.limit = event.pageSize;
        //this.reqDTOSaleOrder.limit = event.pageSize;
        //this.reqDTOSaleOrder.offset = (event.pageIndex * event.pageSize) ;
        this.fetchSaleOrderList();
    }
    
    searchSalesOrderSummary(event: Event) 
    {
        this.offset = 0;
        this.limit = this.pageSize;
        this.saleOrderList = Array();
        this.fetchSaleOrderList();
    }
    
    public showSaleOrder(event: Event, orderNo: string) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesale");
        this.router.navigate(["managesale", {orderNo: orderNo}]);
    }
    
//    printSalesOrderSummary(event: Event) 
//    {
//
//    }

}

