
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOSaleOrder} from '../dto/DTOSaleOrder';
import {EntitySaleOrder} from '../dto/EntitySaleOrder';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/salelist.component.html',
    providers: [WebAPIService]
})

export class SaleListComponent {
    private webAPIService: WebAPIService;
    private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];

    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.reqDTOSaleOrder = new DTOSaleOrder();
        this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.saleOrderList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":1,\"orderNo\":\"order1\",\"customerUserId\":4,\"statusId\":0,\"saleDate\":0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}]");
        console.log(this.saleOrderList);
    }

    ngOnInit() {

    }

    searchSaleOrder(event: Event) {
        console.log(this.reqDTOSaleOrder.entitySaleOrder.orderNo);
    }
    showSaleOrder(event: Event, id: number) {
        console.log(id);
    }
}




