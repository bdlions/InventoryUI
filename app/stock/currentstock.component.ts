import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOProduct} from '../dto/DTOProduct';

@Component({
    selector: 'app',
    templateUrl: 'app/html/stock/currentstock.component.html',
    providers: [WebAPIService]
})

export class CurrentStockComponent { 
    private webAPIService: WebAPIService;
    private reqDTOProduct: DTOProduct;
    private productList: DTOProduct[];
    
    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;
        this.reqDTOProduct = new DTOProduct();
        this.productList = JSON.parse("[{\"limit\":10, \"offset\":0, \"quantity\":50, \"entityProduct\":{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}}]");
        console.log(this.productList);
    }

    ngOnInit() {
        
    }
}





