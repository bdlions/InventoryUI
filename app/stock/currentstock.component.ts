import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/stock/currentstock.component.html',
    providers: [WebAPIService]
})

export class CurrentStockComponent {
    private webAPIService: WebAPIService;
    private reqDTOProduct: DTOProduct;
    private productList: DTOProduct[];
    private productCategoryList: EntityProductCategory[];
    
    private requestId: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor(private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = this.pageSize;
        this.reqDTOProduct.offset = 0;
        this.requestId = ACTION.FETCH_CURRENT_STOCK;
        this.fetchCurrentStock();
        this.fetchProductCategoryList();        
    }

    ngOnInit() {

    }

    public searchCurrentStock(event: Event) {
        this.reqDTOProduct.limit = this.pageSize;
        this.reqDTOProduct.offset = 0;
        if (this.reqDTOProduct.entityProduct.name != null && this.reqDTOProduct.entityProduct.name != "")
        {
            this.requestId = ACTION.FETCH_CURRENT_STOCK_BY_PRODUCT_NAME;
            this.fetchCurrentStockByProductName();
            return;
        }
        //if nothing is set then get all current stocks
        this.requestId = ACTION.FETCH_CURRENT_STOCK;
        this.fetchCurrentStock();
    }
    
    public fetchProductCategoryList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_PRODUCT_CATEGORIES), requestBody).then(result => {
            if (result.success && result.productCategories != null) {
                this.productCategoryList = result.productCategories;
            }
            else {
                //console.log(result);
            }
        });
    }
    public fetchCurrentStock() {

        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CURRENT_STOCK), requestBody).then(result => {
            if (result.success && result.products != null) {
                this.productList = result.products;
                this.length = result.totalProducts;
            }
            else {
                
            }
        });
    }
    
    public fetchCurrentStockByProductName() {

        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CURRENT_STOCK_BY_PRODUCT_NAME), requestBody).then(result => {
            if (result.success && result.products != null) {
                this.productList = result.products;
                this.length = result.totalProducts;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        if (this.requestId == ACTION.FETCH_CURRENT_STOCK)
        {
            this.fetchCurrentStock();
        }
        else if (this.requestId == ACTION.FETCH_CURRENT_STOCK_BY_PRODUCT_NAME)
        {
            this.fetchCurrentStockByProductName();
        }
    }
}





