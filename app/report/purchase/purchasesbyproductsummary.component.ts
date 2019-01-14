import {Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {EntityProduct} from './../../dto/EntityProduct';
import {EntityProductCategory} from './../../dto/EntityProductCategory';
import {EntityProductType} from './../../dto/EntityProductType';
import {DTOProduct} from './../../dto/DTOProduct';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/purchase/purchasesbyproductsummary.component.html',
    providers: [WebAPIService, DatePipe]
})

export class PurchasesByProductSummary {
    private datePipe: DatePipe;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    
    @ViewChild('purchaseByProductModal') public purchaseByProductModal: ModalDirective;

    public showStartDatePicker: boolean = false;
    public showEndDatePicker: boolean = false;
    public fromDate: Date = new Date();
    public toDate: Date = new Date();
    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "purchasesbyproductsummary";
    
    private productList: DTOProduct[];    
    private totalPurchaseAmount: number;
    
    private dtoProduct: DTOProduct;
    private productRequestId: number;
    private reqDTOProduct: DTOProduct;
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    //private productList: EntityProduct[];
    private dtoProductList: DTOProduct[];
    private selectedProductType: EntityProductType;
    private selectedProductCategory: EntityProductCategory;
    
    private offset: number;
    private limit: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    
    customerLength = 0;
    customerPageSize = 10;
    customerPageSizeOptions = [5, 10];
    
    productLength = 0;
    productPageSize = 10;
    productPageSizeOptions = [5, 10];

    constructor(private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager, public datepipe: DatePipe) {
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
        this.datePipe = datepipe;
        
        this.totalPurchaseAmount = 0;
        this.offset = 0;
        this.limit = this.pageSize;
        this.productList = Array();
        
        this.dtoProduct = new DTOProduct();
        this.dtoProduct.entityProduct = new EntityProduct();
        this.productTypeList = Array();
        this.productCategoryList = Array();
        this.selectedProductType = new EntityProductType();
        this.selectedProductCategory = new EntityProductCategory();
        this.fetchProductCategoryList();
        this.fetchProductTypeList();
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = this.productPageSize;
        this.reqDTOProduct.offset = 0;
        this.productRequestId = ACTION.FETCH_PRODUCTS_WITH_STOCKS;
        this.dtoProductList = Array();
        this.fetchProductList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    
    public fetchPurchaseByProductList() {
        let fromDate: string = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
        let toDate: string = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
        let productId: number = 0;
        if (this.dtoProduct.entityProduct.id > 0)
        {
            productId = this.dtoProduct.entityProduct.id;
        }
        let requestBody: string = "{\"startDate\": \"" + fromDate + "\", \"endDate\": \"" + toDate + "\", \"productId\": \"" + productId + "\", \"offset\": \"" + this.offset + "\", \"limit\": \"" + this.limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_BY_PRODUCT_SUMMARY), requestBody).then(result => {
            if (result.success && result.products != null) {
                this.productList = result.products;
                this.length = result.totalProducts;
                this.totalPurchaseAmount = result.totalAmount;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.offset = (event.pageIndex * event.pageSize) ;
        this.limit = event.pageSize;
        this.fetchPurchaseByProductList();
    }
    
    searchPurchaseByProduct(event: Event) 
    {
        this.offset = 0;
        this.limit = this.pageSize;
        this.productList = Array();
        this.fetchPurchaseByProductList();
    }

    
    //product modal related methods start
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
                this.productLength = result.counter;
            }
            else {
                //console.log(result);
            }
        });
    }
    
    searchProduct(event: Event) {
        this.reqDTOProduct.limit = this.productPageSize;
        this.reqDTOProduct.offset = 0;
        this.productRequestId = ACTION.SEARCH_PRODUCTS_WITH_STOCKS;
        this.searchProductsWithStocks();
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
                this.productLength = result.counter;
            }
            else {
                //console.log(result);
            }
        });
    }
    
    public selectedPurchaseOrderProductFromModal(event: Event, productId: number) {
        this.purchaseByProductModal.hide();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.dtoProductList.length; productCounter++) {
            if (this.dtoProductList[productCounter].entityProduct.id == productId) {
                this.dtoProduct = this.dtoProductList[productCounter];
                break;
            }
        }
    }
    
    public hidePurchaseByProductModal(): void {
        this.purchaseByProductModal.hide();
    }
    
    public showPurchaseByProductModal(event: Event) {
        this.purchaseByProductModal.config.backdrop = false;
        this.purchaseByProductModal.show();
    }
    onProductPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        if (this.productRequestId == ACTION.FETCH_PRODUCTS_WITH_STOCKS)
        {
            this.fetchProductList();
        }
        else if (this.productRequestId == ACTION.SEARCH_PRODUCTS_WITH_STOCKS)
        {
            this.searchProductsWithStocks();
        }
    }
    //product modal related methods end
}


