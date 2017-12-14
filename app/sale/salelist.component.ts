
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOSaleOrder} from '../dto/DTOSaleOrder';
import {EntitySaleOrder} from '../dto/EntitySaleOrder';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/salelist.component.html',
    providers: [WebAPIService]
})

export class SaleListComponent {
    private webAPIService: WebAPIService;
    private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];
    private showNavBar: boolean = false;
    private activeMenu: string = "salelist";
    
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
        this.reqDTOSaleOrder = new DTOSaleOrder();
        this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
        //this.saleOrderList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":1,\"orderNo\":\"order1\",\"customerUserId\":4,\"statusId\":0,\"saleDate\":0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false},{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":2,\"orderNo\":\"order2\",\"customerUserId\":2,\"statusId\":0,\"saleDate\":0,\"discount\":10.0,\"total\":10.0,\"paid\":10.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"accountStatusId\":1,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}]");
        //console.log(this.saleOrderList);
        this.requestId = ACTION.FETCH_SALE_ORDERS;
        this.reqDTOSaleOrder.offset = 0;
        this.reqDTOSaleOrder.limit = this.pageSize;
        this.fetchSaleOrderList();
    }

    ngOnInit() {

    }

    public searchSaleOrder(event: Event) {
        this.reqDTOSaleOrder.offset = 0;
        this.reqDTOSaleOrder.limit = this.pageSize;
        if (this.reqDTOSaleOrder.entitySaleOrder.orderNo != null && this.reqDTOSaleOrder.entitySaleOrder.orderNo != "")
        {
            this.requestId = ACTION.FETCH_SALE_ORDERS_BY_ORDER_NO;
            this.searchSaleOrdersByOrderNo();
        }
        else if (this.reqDTOSaleOrder.entitySaleOrder.cell != null && this.reqDTOSaleOrder.entitySaleOrder.cell != "")
        {
            this.requestId = ACTION.FETCH_SALE_ORDERS_BY_CELL;
            this.searchSaleOrdersByCell();
        }
        else
        {
            //if nothing is set then get all sale orders
            this.requestId = ACTION.FETCH_SALE_ORDERS
            this.fetchSaleOrderList();
        }        
    }
    
    public showSaleOrder(event: Event, orderNo: string) {
        //console.log(id);
         event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesale");
        this.router.navigate(["managesale", {orderNo: orderNo}]);
    }
    
    public fetchSaleOrderList() {
        //this.reqDTOSaleOrder.offset = 0;
        //this.reqDTOSaleOrder.limit = 10;
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDERS), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
                this.length = result.totalSaleOrders;
            }
            else {
                
            }
        });
    }
    
    public searchSaleOrdersByOrderNo() {
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDERS_BY_ORDER_NO), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
                this.length = result.totalSaleOrders;
            }
            else {
                
            }
        });
    }
    
    public searchSaleOrdersByCell() {
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDERS_BY_CELL), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
                this.length = result.totalSaleOrders;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOSaleOrder.limit = event.pageSize;
        this.reqDTOSaleOrder.offset = (event.pageIndex * event.pageSize) ;
        if (this.requestId == ACTION.FETCH_SALE_ORDERS)
        {
            this.fetchSaleOrderList()
        }
        else if (this.requestId == ACTION.FETCH_SALE_ORDERS_BY_ORDER_NO)
        {
            this.searchSaleOrdersByOrderNo();
        }
        else if (this.requestId == ACTION.FETCH_SALE_ORDERS_BY_CELL)
        {
            this.searchSaleOrdersByCell();
        }
    }
}