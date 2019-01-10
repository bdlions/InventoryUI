import {Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {DTOSaleOrder} from './../../dto/DTOSaleOrder';
import {EntitySaleOrder} from './../../dto/EntitySaleOrder';
import {EntityUser} from './../../dto/EntityUser';
import {EntityCustomer} from "./../../dto/EntityCustomer";
import {EntityUserRole} from "./../../dto/EntityUserRole";
import {DTOCustomer} from './../../dto/DTOCustomer';
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
    
    @ViewChild('saleOrderSummaryCustomerModal') public saleOrderSummaryCustomerModal: ModalDirective;

    public showStartDatePicker: boolean = false;
    public showEndDatePicker: boolean = false;
    public fromDate: Date = new Date();
    public toDate: Date = new Date();
    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "salesordersummary";
    
    private reqDTOCustomer: DTOCustomer;
    private dtoCustomer: DTOCustomer;
    private customerList: DTOCustomer[];
    private customerRequestId: number;
    
    //private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];
    private totalSaleAmount: number;
    
    private offset: number;
    private limit: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    
    customerLength = 0;
    customerPageSize = 10;
    customerPageSizeOptions = [5, 10];

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

        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();
        
        this.totalSaleAmount = 0;
        this.offset = 0;
        this.limit = this.pageSize;
        this.saleOrderList = Array();
        this.fetchSaleOrderList();
        
        this.reqDTOCustomer = new DTOCustomer();
        this.reqDTOCustomer.entityCustomer = new EntityCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer.limit = this.customerPageSize;
        this.reqDTOCustomer.offset = 0;
        this.customerRequestId = ACTION.FETCH_CUSTOMERS;
        this.fetchCustomerList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    
    public hideSaleOrderSummaryCustomerModal(): void {
        this.saleOrderSummaryCustomerModal.hide();
    }
    
    public showSaleOrderSummaryCustomerModal(event: Event) {
        this.saleOrderSummaryCustomerModal.config.backdrop = false;
        this.saleOrderSummaryCustomerModal.show();
    }

    
    public searchSaleOrderSummaryCustomer(event: Event) {
        this.reqDTOCustomer.limit = this.customerPageSize;
        this.reqDTOCustomer.offset = 0;
        if (this.reqDTOCustomer.entityCustomer.customerName != null && this.reqDTOCustomer.entityCustomer.customerName != "")
        {
            this.customerRequestId = ACTION.FETCH_CUSTOMERS_BY_NAME;
            this.fetchCustomerListByName();
        }
        else if (this.reqDTOCustomer.entityCustomer.cell != null && this.reqDTOCustomer.entityCustomer.cell != "")
        {
            this.customerRequestId = ACTION.FETCH_CUSTOMERS_BY_CELL;
            this.fetchCustomerListByCell();
        }
        else if (this.reqDTOCustomer.entityCustomer.email != null && this.reqDTOCustomer.entityCustomer.email != "")
        {
            this.customerRequestId = ACTION.FETCH_CUSTOMERS_BY_EMAIL;
            this.fetchCustomerListByEmail();
        }
        else
        {
            //if nothing is set then get all customers
            this.customerRequestId = ACTION.FETCH_CUSTOMERS;
            this.fetchCustomerList();       
        }
    }
    
    public selectedCustomer(event: Event, customerId: number) {
        this.saleOrderSummaryCustomerModal.hide();
        let customerCounter: number;
        for (customerCounter = 0; customerCounter < this.customerList.length; customerCounter++) {
            if (this.customerList[customerCounter].entityCustomer.id == customerId) {
                this.dtoCustomer = this.customerList[customerCounter];
            }
        }
    }
    
    public fetchCustomerList() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public fetchCustomerListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_NAME), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public fetchCustomerListByCell() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_CELL), requestBody).then(result => {
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public fetchCustomerListByEmail() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_EMAIL), requestBody).then(result => {
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    
    
    public fetchSaleOrderList() {
        let fromDate: string = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
        let toDate: string = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
        //let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        let userId: number = -1;
        if (this.dtoCustomer.entityUser.id > 0)
        {
            userId = this.dtoCustomer.entityUser.id;
        }
        let requestBody: string = "{\"startDate\": \"" + fromDate + "\", \"endDate\": \"" + toDate + "\", \"userId\": \"" + userId + "\", \"offset\": \"" + this.offset + "\", \"limit\": \"" + this.limit + "\"}";
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
    
    onCustomerPaginateChange(event:PageEvent){
        this.reqDTOCustomer.limit = event.pageSize;
        this.reqDTOCustomer.offset = (event.pageIndex * event.pageSize) ;
        if (this.customerRequestId == ACTION.FETCH_CUSTOMERS)
        {
            this.fetchCustomerList();
        }
        else if (this.customerRequestId == ACTION.FETCH_CUSTOMERS_BY_NAME)
        {
            this.fetchCustomerListByName();
        }
        else if (this.customerRequestId == ACTION.FETCH_CUSTOMERS_BY_CELL)
        {
            this.fetchCustomerListByCell();
        }
        else if (this.customerRequestId == ACTION.FETCH_CUSTOMERS_BY_EMAIL)
        {
            this.fetchCustomerListByEmail();
        }
    }

}

