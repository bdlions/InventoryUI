import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {DTOProduct} from '../dto/DTOProduct';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product/productlist.component.html',
    providers: [WebAPIService]
})

export class ProductListComponent { 
    private webAPIService: WebAPIService;
    private productList: EntityProduct[];
    private productCategoryList: EntityProductCategory[];
    private reqDTOProduct: DTOProduct;
    private reqEntityProduct: EntityProduct;
    
    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;
        this.reqDTOProduct = new DTOProduct();
        this.reqEntityProduct = new EntityProduct();
        this.productList = JSON.parse("[{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":0.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        this.productCategoryList = JSON.parse("[{\"id\":1,\"title\":\"Product category1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product category2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        console.log(this.productList);
        console.log(this.productCategoryList);
        //this.fetchProductList();
    }

    ngOnInit() {
        
    }
    
    public fetchProductList()
    {
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
        this.reqDTOProduct.entityProduct = this.reqEntityProduct;
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS), requestBody).then(result => {
            console.log(result);
            if(result.success && result.products != null)
            {
                this.productList = result.products;
            } 
            else
            {
                console.log(result);
            }        
        });
    }
}

