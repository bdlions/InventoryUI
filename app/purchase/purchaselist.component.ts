import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOPurchaseOrder} from '../dto/DTOPurchaseOrder';
import {EntityPurchaseOrder} from '../dto/EntityPurchaseOrder';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/purchase/purchaselist.component.html',
    providers: [WebAPIService]
})

export class PurchaseListComponent {
    private webAPIService: WebAPIService;
    private reqDTOPurchaseOrder: DTOPurchaseOrder;
    private purchaseOrderList: DTOPurchaseOrder[];
    private showNavBar: boolean = false;
    private activeMenu: string = "purchaselist";
    
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
        this.reqDTOPurchaseOrder = new DTOPurchaseOrder();
        this.reqDTOPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        //this.purchaseOrderList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityPurchaseOrder\":{\"id\":1,\"orderNo\":\"order1\",\"supplierUserId\":3,\"orderDate\":0,\"requestedShipDate\":0,\"subtotal\":0.0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoSupplier\":{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":0,\"userId\":0,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false},{\"limit\":0,\"offset\":0,\"entityPurchaseOrder\":{\"id\":2,\"orderNo\":\"order2\",\"supplierUserId\":2,\"orderDate\":0,\"requestedShipDate\":0,\"subtotal\":10.0,\"discount\":10.0,\"total\":10.0,\"paid\":10.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoSupplier\":{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":2,\"userId\":0,\"remarks\":0,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}]");
        //console.log(this.purchaseOrderList);
        this.requestId = ACTION.FETCH_PURCHASE_ORDERS;
        this.reqDTOPurchaseOrder.offset = 0;
        this.reqDTOPurchaseOrder.limit = this.pageSize;
        this.fetchPurchaseOrderList();
    }

    ngOnInit() {

    }
    searchPurchaseOrder(event: Event) {
        //console.log(this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo);
        this.reqDTOPurchaseOrder.limit = this.pageSize;
        this.reqDTOPurchaseOrder.offset = 0;
        if (this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo != null && this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo != "")
        {
            this.requestId = ACTION.FETCH_PURCHASE_ORDERS_BY_ORDER_NO;
            this.searchPurchaseOrdersByOrderNo();
            return;
        }
        //if nothing is set then get all purchase orders
        this.requestId = ACTION.FETCH_PURCHASE_ORDERS;
        this.fetchPurchaseOrderList();
    }
    showPurchaseOrder(event: Event, orderNo: string) {
        //console.log(id);
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managepurchase");
        this.router.navigate(["managepurchase", {orderNo: orderNo}]);
    }
    
    public fetchPurchaseOrderList() {
        //this.reqDTOPurchaseOrder.offset = 0;
        //this.reqDTOPurchaseOrder.limit = 10;
        let requestBody: string = JSON.stringify(this.reqDTOPurchaseOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDERS), requestBody).then(result => {
            if (result.success && result.purchaseOrders != null) {
                this.purchaseOrderList = result.purchaseOrders;
                this.length = result.totalPurchaseOrders;
            }
            else {
                
            }
        });
    }
    
    public searchPurchaseOrdersByOrderNo() {
        let requestBody: string = JSON.stringify(this.reqDTOPurchaseOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDERS_BY_ORDER_NO), requestBody).then(result => {
            if (result.success && result.purchaseOrders != null) {
                this.purchaseOrderList = result.purchaseOrders;
                this.length = result.totalPurchaseOrders;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOPurchaseOrder.limit = event.pageSize;
        this.reqDTOPurchaseOrder.offset = (event.pageIndex * event.pageSize) ;
        if (this.requestId == ACTION.FETCH_PURCHASE_ORDERS)
        {
            this.fetchPurchaseOrderList();
        }
        else if (this.requestId == ACTION.FETCH_PURCHASE_ORDERS_BY_ORDER_NO)
        {
            this.searchPurchaseOrdersByOrderNo();
        }
    }
}




