import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOPurchaseOrder} from '../dto/DTOPurchaseOrder';
import {EntityPurchaseOrder} from '../dto/EntityPurchaseOrder';

@Component({
    selector: 'app',
    templateUrl: 'app/html/purchase/purchaselist.component.html',
    providers: [WebAPIService]
})

export class PurchaseListComponent { 
    private webAPIService: WebAPIService;
    private reqDTOPurchaseOrder: DTOPurchaseOrder;
    private purchaseOrderList: DTOPurchaseOrder[];
    
    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;
        this.reqDTOPurchaseOrder = new DTOPurchaseOrder();
        this.reqDTOPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.purchaseOrderList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityPurchaseOrder\":{\"id\":1,\"orderNo\":\"order1\",\"supplierUserId\":3,\"orderDate\":0,\"requestedShipDate\":0,\"subtotal\":0.0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoSupplier\":{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":0,\"userId\":0,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}]");
        console.log(this.purchaseOrderList);
    }

    ngOnInit() {
        
    }
    searchPurchaseOrder(event: Event) {
        console.log(this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo);
    }
}




