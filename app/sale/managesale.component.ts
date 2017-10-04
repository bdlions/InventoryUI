import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOSaleOrder} from '../dto/DTOSaleOrder';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/managesale.component.html',
    providers: [WebAPIService]
})

export class ManageSaleComponent { 
    private subscribe: Subscription;
    private webAPIService: WebAPIService;
    private dtoSaleOrder: DTOSaleOrder;
    private orderNo: string; 
    
    constructor(private marketAPI: MarketAPI, private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;    
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.orderNo = params['orderNo'];
            this.dtoSaleOrder = JSON.parse("{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":1,\"orderNo\":\"order1\",\"customerUserId\":4,\"statusId\":0,\"saleDate\":0,\"discount\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}");
            console.log(this.orderNo);
            console.log(this.dtoSaleOrder);
        });
    }
}




