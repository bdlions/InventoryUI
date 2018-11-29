import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {WebAPIService} from './../webservice/web-api-service';
import {NavigationManager} from "../services/NavigationManager";
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/stock/currentstock.component.html',
    providers: [WebAPIService]
})

export class CurrentStockComponent {
    private webAPIService: WebAPIService;
    private reqDTOProduct: DTOProduct;
    //private productList: DTOProduct[];
    private dtoProductList: DTOProduct[];
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    private selectedProductType: EntityProductType;
    private selectedProductCategory: EntityProductCategory;
    
    private showNavBar: boolean = false;
    private activeMenu: string = "productlist";
    
    private requestId: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor(private router: Router, webAPIService: WebAPIService, private navigationManager: NavigationManager) {
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
        
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = this.pageSize;
        this.reqDTOProduct.offset = 0;
        this.requestId = ACTION.FETCH_PRODUCTS_WITH_STOCKS;
        this.dtoProductList = Array();
        this.fetchProductList();
        //this.fetchCurrentStock();
        
        this.productTypeList = Array();
        this.productCategoryList = Array();
        this.selectedProductType = new EntityProductType();
        this.selectedProductCategory = new EntityProductCategory();
        this.fetchProductCategoryList();  
        this.fetchProductTypeList();      
    }

    ngOnInit() {

    }

    public searchCurrentStock(event: Event) {
        this.reqDTOProduct.limit = this.pageSize;
        this.reqDTOProduct.offset = 0;
        this.requestId = ACTION.SEARCH_PRODUCTS_WITH_STOCKS;
        this.searchProductsWithStocks();
    }
    
    showProduct(event: Event, id: number) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("manageproduct");
        this.router.navigate(["manageproduct", {productId: id}]);
    }
    
    public fetchProductCategoryList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_PRODUCT_CATEGORIES), requestBody).then(result => {
            if (result.success && result.productCategories != null) {
                this.productCategoryList = result.productCategories;
                if (this.productCategoryList.length > 0)
                {
                    this.selectedProductCategory = this.productCategoryList[0];
                }
            }
            else {
                //console.log(result);
            }
        });
    }
    
    public fetchProductTypeList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_PRODUCT_TYPES), requestBody).then(result => {
            if (result.success && result.productTypes != null) {
                this.productTypeList = result.productTypes;
                if (this.productTypeList.length > 0)
                {
                    this.selectedProductType = this.productTypeList[0];
                }
            }
            else {
                //console.log(result);
            }
        });
    }
    
    public fetchProductList() {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS_WITH_STOCKS), requestBody).then(result => {
            if (result.success && result.list != null) {
                this.dtoProductList = result.list;
                this.length = result.counter;
            }
            else {
                //console.log(result);
            }
        });
    }
    
    public searchProductsWithStocks() {
        var typeId: number = 0;
        var categoryId: number = 0;
        if (this.selectedProductType != null)
        {
            typeId = this.selectedProductType.id;
        }
        if (this.selectedProductCategory != null)
        {
            categoryId = this.selectedProductCategory.id;
        }
        var name: string = "";
        if(this.reqDTOProduct.entityProduct.name != null && this.reqDTOProduct.entityProduct.name != "")
        {
            name = this.reqDTOProduct.entityProduct.name;
        }
        let requestBody: string = "{\"name\": \"" + name + "\", \"typeId\": " + typeId + ", \"categoryId\": " + categoryId + ", \"offset\": \"" + this.reqDTOProduct.offset + "\", \"limit\": \"" + this.reqDTOProduct.limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SEARCH_PRODUCTS_WITH_STOCKS), requestBody).then(result => {
            if (result.success && result.list != null) {
                this.dtoProductList = result.list;
                this.length = result.counter;
            }
            else {
                //console.log(result);
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        if (this.requestId == ACTION.FETCH_PRODUCTS_WITH_STOCKS)
        {
            this.fetchProductList();
        }
        else if (this.requestId == ACTION.SEARCH_PRODUCTS_WITH_STOCKS)
        {
            this.searchProductsWithStocks();
        }
    }
    
    //--------------------- print entire current stock ------------------------------//
    printCurrentStocks(event: Event)
    {
        window.printJS(window.SITE_URL +'currentstockreport');
    }
}





