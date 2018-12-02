import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOAdjustStockOrder} from '../dto/DTOAdjustStockOrder';
import {EntityAdjustStockOrder} from '../dto/EntityAdjustStockOrder';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/stock/adjuststock.component.html',
    providers: [WebAPIService, DatePipe]
})

export class AdjustStockComponent {
    private subscribe: Subscription;
    private datePipe: DatePipe;
    private webAPIService: WebAPIService;
    
    // MatPaginator Inputs
    productLength = 0;
    productPageSize = 10;
    productPageSizeOptions = [5, 10];
    
    private maxAdjustStockOrderLeftPanel: number = 10;
    private manageAdjustStockOrderErrorMessage: string;
    private disableSaveButton: boolean = false;
    public showAdjustStockDatePicker: boolean = false;
    public adjustDate: Date = new Date();
    public minDate: Date = void 0;
    private orderNo: string;
        
    private reqDTOAdjustStockOrder: DTOAdjustStockOrder;
    private adjustStockOrderList: DTOAdjustStockOrder[];
    private dtoAdjustStockOrder: DTOAdjustStockOrder;
    
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    private dtoProductList: DTOProduct[];
    private selectedProductType: EntityProductType;
    private selectedProductCategory: EntityProductCategory;
    private reqDTOProduct: DTOProduct;
    
    @ViewChild('adjustStockProductModal') public adjustStockProductModal: ModalDirective;
    @ViewChild('selectedAdjustStockOrderProductDeleteModal') public selectedAdjustStockOrderProductDeleteModal: ModalDirective;
    @ViewChild('manageAdjustStockOrderMessageDispalyModal') public manageAdjustStockOrderMessageDispalyModal: ModalDirective;
    
    private productIdToPopupSelectProduct: number;
    private productIdToPopupDeleteProduct: number;
    
    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, public datepipe: DatePipe) {
        this.datePipe = datepipe;
        this.webAPIService = webAPIService;
        
        this.reqDTOAdjustStockOrder = new DTOAdjustStockOrder();
        this.reqDTOAdjustStockOrder.entityAdjustStockOrder = new EntityAdjustStockOrder();
        this.reqDTOAdjustStockOrder.limit = 10;
        this.reqDTOAdjustStockOrder.offset = 0;
        this.fetchAdjustStockOrderList();
        
        this.dtoAdjustStockOrder = new DTOAdjustStockOrder();
        this.dtoAdjustStockOrder.entityAdjustStockOrder = new EntityAdjustStockOrder();
        this.dtoAdjustStockOrder.entityAdjustStockOrder.id = 0;
        this.dtoAdjustStockOrder.products = Array();
        
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
        this.dtoProductList = Array();
        this.fetchProductList();   
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.orderNo = params['orderNo'];
            if (this.orderNo != null && this.orderNo != "")
            {
                
            }            
        });
    }

    public fetchAdjustStockOrderList() {
        let requestBody: string = JSON.stringify(this.reqDTOAdjustStockOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ADJUST_STOCK_ORDERS), requestBody).then(result => {
            if (result.success && result.list != null) {
                this.adjustStockOrderList = result.list;
            }
            else {

            }
        });
    }
    
    searchAdjustStockOrder(event: Event) {
        let orderNo = this.reqDTOAdjustStockOrder.entityAdjustStockOrder.orderNo;
        let offset: number = 0;
        let limit: number = 10;
        let requestBody: string = "{\"orderNo\": \"" + orderNo + "\",\"offset\": \"" + offset + "\", \"limit\": \"" + limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SEARCH_ADJUST_STOCK_ORDERS), requestBody).then(result => {
            if (result.success && result.list != null) {
                this.adjustStockOrderList = result.list;
            }
            else {
                
            }
        });
    }
    
    selectedAdjustStockOrder(event: Event, orderNo: string) {
        event.preventDefault();
        this.orderNo = orderNo;
        this.setAdjustStockOrderInfo(orderNo);
    }    
    
    public setAdjustStockOrderInfo(orderNo: string) {
        this.dtoAdjustStockOrder = new DTOAdjustStockOrder();
        this.dtoAdjustStockOrder.entityAdjustStockOrder = new EntityAdjustStockOrder();
        this.dtoAdjustStockOrder.entityAdjustStockOrder.id = 0;
        this.dtoAdjustStockOrder.products = Array();

        this.reqDTOAdjustStockOrder.entityAdjustStockOrder.orderNo = orderNo;
        this.fetchAdjustStockOrderInfo();
    }

    public fetchAdjustStockOrderInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOAdjustStockOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ADJUST_STOCK_ORDER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoAdjustStockOrder = result;
                this.adjustDate = new Date(this.dtoAdjustStockOrder.adjustDate);

            }
            else {

            }
        });
    }
    
    public newAdjustStockOrder(event: Event) {
        this.resetAdjustStockOrder();
    }

    public resetAdjustStockOrder() {
        this.disableSaveButton = false;
        this.orderNo = '';
        this.adjustDate = new Date();
        this.dtoAdjustStockOrder = new DTOAdjustStockOrder();
        this.dtoAdjustStockOrder.entityAdjustStockOrder = new EntityAdjustStockOrder();
        this.dtoAdjustStockOrder.entityAdjustStockOrder.id = 0;
        this.dtoAdjustStockOrder.products = Array();
    }
    
    public saveAdjustStockOrder(event: Event) 
    {
        if (this.dtoAdjustStockOrder.entityAdjustStockOrder.id > 0) {
            //order is required to update order
            if (this.dtoAdjustStockOrder.entityAdjustStockOrder.orderNo == null || this.dtoAdjustStockOrder.entityAdjustStockOrder.orderNo == "") {
                this.manageAdjustStockOrderErrorMessage = "Order No is required";
                this.manageAdjustStockOrderMessageDispalyModal.config.backdrop = false;
                this.manageAdjustStockOrderMessageDispalyModal.show();
                return;
            }
        }
        
        //check product selection
        if (this.dtoAdjustStockOrder.products == null || this.dtoAdjustStockOrder.products.length == 0) {
            this.manageAdjustStockOrderErrorMessage = "Select a product";
            this.manageAdjustStockOrderMessageDispalyModal.config.backdrop = false;
            this.manageAdjustStockOrderMessageDispalyModal.show();
            return;
        }
        
        this.dtoAdjustStockOrder.adjustDate = this.datepipe.transform(this.adjustDate, 'yyyy-MM-dd');
        
        this.disableSaveButton = true;
        let requestBody: string = JSON.stringify(this.dtoAdjustStockOrder);
        //console.log(requestBody);
        if (this.dtoAdjustStockOrder.entityAdjustStockOrder.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_ADJUST_STOCK_ORDER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                if (result.success) {
                    this.dtoAdjustStockOrder.entityAdjustStockOrder = result.entityAdjustStockOrder;
                    this.manageAdjustStockOrderUpdateLeftPanel();
                    this.fetchProductList();
                }
                else 
                {
                    this.manageAdjustStockOrderErrorMessage = result.message;
                    //display pop up with message
                    this.manageAdjustStockOrderMessageDispalyModal.config.backdrop = false;
                    this.manageAdjustStockOrderMessageDispalyModal.show();
                }
            });
        }
        else {
            //handle to update purchase order
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_ADJUST_STOCK_ORDER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                if (result.success) {
                    this.manageAdjustStockOrderUpdateLeftPanel();
                    this.fetchProductList();                   
                }
                else 
                {
                    this.manageAdjustStockOrderErrorMessage = result.message;
                    //display pop up with message
                    this.manageAdjustStockOrderMessageDispalyModal.config.backdrop = false;
                    this.manageAdjustStockOrderMessageDispalyModal.show();
                }
            });
        }
    }
    
    
    public searchAdjustStockOrderProduct(event: Event) {
        this.reqDTOProduct.limit = this.productPageSize;
        this.reqDTOProduct.offset = 0;
        this.fetchProductList();
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
                
            }
        });
    }
    
    public fetchProductList() {
        var typeId: number = 0;
        var categoryId: number = 0;
        if (this.selectedProductType != null && this.selectedProductType.id != null && this.selectedProductType.id > 0)
        {
            typeId = this.selectedProductType.id;
        }
        if (this.selectedProductCategory != null && this.selectedProductCategory.id != null && this.selectedProductCategory.id > 0)
        {
            categoryId = this.selectedProductCategory.id;
        }
        var name: string = "";
        if(this.reqDTOProduct.entityProduct.name != null && this.reqDTOProduct.entityProduct.name != "")
        {
            name = this.reqDTOProduct.entityProduct.name;
        }
        //let requestBody: string = JSON.stringify(this.reqDTOProduct);
        let requestBody: string = "{\"name\": \"" + name + "\", \"typeId\": " + typeId + ", \"categoryId\": " + categoryId + ", \"offset\": \"" + this.reqDTOProduct.offset + "\", \"limit\": \"" + this.reqDTOProduct.limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SEARCH_PRODUCTS_WITH_STOCK_SUPPLIERS_PRICE), requestBody).then(result => {
            if (result.success && result.list != null) {
                this.dtoProductList = result.list;
                this.productLength = result.counter;
            }
            else {
                //console.log(result);
            }
        });
    }
    
    public showAdjustStockOrderProductModal(event: Event, productId: number) {
        this.productIdToPopupSelectProduct = productId;
        this.adjustStockProductModal.config.backdrop = false;
        this.adjustStockProductModal.show();
    }
    public hideAdjustStockOrderProductModal(): void {
        this.adjustStockProductModal.hide();
    }
    public selectedAdjustStockOrderProductFromModal(event: Event, productId: number) {
        this.adjustStockProductModal.hide();
        this.appendProductInAdjustStockOrder(productId);
    }
    public appendProductInAdjustStockOrder(productId: number)
    {
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.dtoProductList.length; productCounter++) {
            if (this.dtoProductList[productCounter].entityProduct.id == productId) {
                dtoProduct.entityProduct = this.dtoProductList[productCounter].entityProduct;
                dtoProduct.oldQuantity = this.dtoProductList[productCounter].quantity;
                dtoProduct.newQuantity = this.dtoProductList[productCounter].quantity - 1;                
            }
        }        
        let purchasedProductCounter: number;
        if (this.productIdToPopupSelectProduct == 0 && dtoProduct.entityProduct.id > 0) {
            let isAppend: boolean = true;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoAdjustStockOrder.products.length; purchasedProductCounter++) {
                if (this.dtoAdjustStockOrder.products[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    //from empty cell/add button, selecting a product whish is already in product list
                    this.dtoAdjustStockOrder.products[purchasedProductCounter].quantity = (this.dtoAdjustStockOrder.products[purchasedProductCounter].quantity + 1);
                    isAppend = false;
                    break;
                }
            }
            if (isAppend)
            {
                this.dtoAdjustStockOrder.products[this.dtoAdjustStockOrder.products.length] = dtoProduct;
            }           
        }
        else {
            let tempProducts: DTOProduct[] = Array();
            let isOverWrite: boolean = false;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoAdjustStockOrder.products.length; purchasedProductCounter++) {
                if (this.dtoAdjustStockOrder.products[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    isOverWrite = true;
                    break;
                }
            }
            let tempProductsCounter: number = 0;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoAdjustStockOrder.products.length; purchasedProductCounter++) {
                if (this.dtoAdjustStockOrder.products[purchasedProductCounter].entityProduct.id == this.productIdToPopupSelectProduct) {
                    if (!isOverWrite)
                    {
                        this.dtoAdjustStockOrder.products[purchasedProductCounter] = dtoProduct;                        
                    }
                    tempProducts[tempProductsCounter] = this.dtoAdjustStockOrder.products[purchasedProductCounter];
                    tempProductsCounter++;
                }
                else
                {
                    tempProducts[tempProductsCounter] = this.dtoAdjustStockOrder.products[purchasedProductCounter];
                    tempProductsCounter++;
                }
            }
            this.dtoAdjustStockOrder.products = tempProducts;      
        }
    }
    public showSelectedAdjustStockOrderProductDeleteModal(event: Event, productId: number) {
        this.productIdToPopupDeleteProduct = productId;
        this.selectedAdjustStockOrderProductDeleteModal.config.backdrop = false;
        this.selectedAdjustStockOrderProductDeleteModal.show();
    }
    public hideSelectedAdjustStockOrderProductDeleteModal(): void {
        this.selectedAdjustStockOrderProductDeleteModal.hide();
    }
    public deleteAdjustStockOrderSelectedProductFromModal(event: Event) {
        let tempDTOProductlist: DTOProduct[] = Array();
        this.selectedAdjustStockOrderProductDeleteModal.hide();
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoAdjustStockOrder.products.length; purchasedProductCounter++) {
            if (this.dtoAdjustStockOrder.products[purchasedProductCounter].entityProduct.id != this.productIdToPopupDeleteProduct) {
                tempDTOProductlist[tempDTOProductlist.length] = this.dtoAdjustStockOrder.products[purchasedProductCounter];
            }
        }
        this.dtoAdjustStockOrder.products = tempDTOProductlist;
    }
    public hideManageAdjustStockOrderMessageDispalyModal(): void {
        this.manageAdjustStockOrderMessageDispalyModal.hide();
    }
    public manageAdjustStockOrderUpdateLeftPanel()
    {
        this.orderNo = this.dtoAdjustStockOrder.entityAdjustStockOrder.orderNo;
        let tempAdjustStockOrderList: DTOAdjustStockOrder[] = Array();
        tempAdjustStockOrderList[0] = this.dtoAdjustStockOrder;
        let totalAdjustStockOrder: number = 1;
        let adjustStockOrderCounter: number;
        for (adjustStockOrderCounter = 0; adjustStockOrderCounter < this.adjustStockOrderList.length; adjustStockOrderCounter++)
        {
            if (this.adjustStockOrderList[adjustStockOrderCounter].entityAdjustStockOrder.id != this.dtoAdjustStockOrder.entityAdjustStockOrder.id && totalAdjustStockOrder <= this.maxAdjustStockOrderLeftPanel)
            {
                tempAdjustStockOrderList[totalAdjustStockOrder] = this.adjustStockOrderList[adjustStockOrderCounter];
                totalAdjustStockOrder++;
            }
        }
        this.adjustStockOrderList = tempAdjustStockOrderList;
    }
    
    onProductPaginateChange(event:PageEvent){
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        this.fetchProductList();
    } 
}