import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';

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

    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
        this.fetchCurrentStock();
        this.fetchProductCategoryList();        
    }

    ngOnInit() {

    }

    public searchCurrentStock(event: Event) {
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
            }
            else {
                
            }
        });
    }
}





