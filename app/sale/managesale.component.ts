import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {TabsetComponent} from 'ngx-bootstrap';

import {DTOSaleOrder} from '../dto/DTOSaleOrder';
import {EntitySaleOrder} from '../dto/EntitySaleOrder';

import {EntityUser} from '../dto/EntityUser';
import {EntityCustomer} from "../dto/EntityCustomer";
import {EntityUserRole} from "../dto/EntityUserRole";
import {DTOCustomer} from '../dto/DTOCustomer';

import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';
import {DTOProduct} from '../dto/DTOProduct';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/managesale.component.html',
    providers: [WebAPIService]
})

export class ManageSaleComponent {
    private subscribe: Subscription;
    @ViewChild('saleOrderCustomerModal') public saleOrderCustomerModal: ModalDirective;
    @ViewChild('saleOrderProductModal') public saleOrderProductModal: ModalDirective;
    @ViewChild('selectedSaleOrderProductDeleteModal') public selectedSaleOrderProductDeleteModal: ModalDirective;
    @ViewChild('addSaleOrderProduct') public addSaleOrderProduct: ModalDirective;
    @ViewChild('manageSaleMessageDispalyModal') public manageSaleMessageDispalyModal: ModalDirective;
    @ViewChild('saleOrderSoldProductsModal') public saleOrderSoldProductsModal: ModalDirective;
    @ViewChild('selectedSaleOrderReturnedProductDeleteModal') public selectedSaleOrderReturnedProductDeleteModal: ModalDirective;
    
    private webAPIService: WebAPIService;
    private dtoSaleOrder: DTOSaleOrder;
    private orderNo: string;
    private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];

    private reqDTOCustomer: DTOCustomer;
    private dtoCustomer: DTOCustomer;
    private customerList: DTOCustomer[];
    
    private reqDTOProduct: DTOProduct;
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    //private productList: EntityProduct[];
    private dtoProductList: DTOProduct[];
    private selectedProductType: EntityProductType;
    private selectedProductCategory: EntityProductCategory;
    private productIdToPopupSelectProduct: number;
    private productIdToPopupDeleteProduct: number;
    private productIdToPopupSelectReturnProduct: number;
    private productIdToPopupDeleteReturnProduct: number;

    private manageSaleErrorMessage: string;
    
    private barcode: string;
    private barcodeScannedEntityProduct: EntityProduct;
    
    private disableSaveButton: boolean = false;
    
    //constants & constraints
    private maxSaleOrderLeftPanel: number = 10;
    
    private productRequestId: number;
    private customerRequestId: number;
    
    // MatPaginator Inputs
    productLength = 0;
    productPageSize = 10;
    productPageSizeOptions = [5, 10];
    
    customerLength = 0;
    customerPageSize = 10;
    customerPageSizeOptions = [5, 10];
    
    barcodeScanInterval;

    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        
        this.barcode = "";
        this.barcodeScannedEntityProduct = new EntityProduct();
        
        this.reqDTOSaleOrder = new DTOSaleOrder();
        this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.reqDTOSaleOrder.limit = 10;
        this.reqDTOSaleOrder.offset = 0;
        this.fetchSaleOrderList();
        
        this.dtoSaleOrder = new DTOSaleOrder();
        this.dtoSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.dtoSaleOrder.entitySaleOrder.id = 0;
        this.dtoSaleOrder.dtoCustomer = new DTOCustomer();
        this.dtoSaleOrder.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoSaleOrder.dtoCustomer.entityUser = new EntityUser();
        this.dtoSaleOrder.dtoCustomer.entityUserRole = new EntityUserRole();
        this.dtoSaleOrder.products = Array();
        this.dtoSaleOrder.returnProducts = Array();

        this.reqDTOCustomer = new DTOCustomer();
        this.reqDTOCustomer.entityCustomer = new EntityCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer.limit = this.customerPageSize;
        this.reqDTOCustomer.offset = 0;
        this.customerRequestId = ACTION.FETCH_CUSTOMERS;
        this.fetchCustomerList();
        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();

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
            this.orderNo = params['orderNo'];
            if (this.orderNo != null && this.orderNo != "")
            {
                this.setSaleOrderInfo(this.orderNo);
            }            
        });
    }

    searchSaleOrder(event: Event) {
        if (this.reqDTOSaleOrder.entitySaleOrder.orderNo != null && this.reqDTOSaleOrder.entitySaleOrder.orderNo != "") {
            this.reqDTOSaleOrder.limit = 10;
            this.reqDTOSaleOrder.offset = 0;
            this.searchSaleOrdersByOrderNo();
        }
        else {
            this.reqDTOSaleOrder.limit = 10;
            this.reqDTOSaleOrder.offset = 0;
            this.fetchSaleOrderList();
        }
    }

    selectedSaleOrderCustomer(event: Event, id: number) {
        //console.log(id);
    }
    selectedSaleOrderProduct(event: Event, id: number) {
        //console.log(id);
    }

    selectedSaleOrderProductDetails(event: Event, id: number) {
        //console.log(id);
    }
    selectedSaleOrderProductDelete(event: Event, id: number) {
        //console.log(id);
    }

    public hideSaleOrderCustomerModal(): void {
        this.saleOrderCustomerModal.hide();
    }

    public hideSaleOrderProductModal(): void {
        this.saleOrderProductModal.hide();
    }

    public hideAddSaleOrderProduct(): void {
        this.addSaleOrderProduct.hide();
    }
    public hideSelectedSaleOrderProductDeleteModal(): void {
        this.selectedSaleOrderProductDeleteModal.hide();
    }
    public hideManageSaleMessageDispalyModal(): void {
        this.manageSaleMessageDispalyModal.hide();
    }
    public hideSaleOrderSoldProductsModal(): void {
        this.saleOrderSoldProductsModal.hide();
    }
    public hideSelectedSaleOrderReturnedProductDeleteModal(): void {
        this.selectedSaleOrderReturnedProductDeleteModal.hide();
    }
    
    public showSaleOrderEmptyRowProductModal(event: Event) {
        this.saleOrderProductModal.config.backdrop = false;
        this.saleOrderProductModal.show();
    }


    //customer section
    public showSaleOrderCustomerModal(event: Event) {
        this.saleOrderCustomerModal.config.backdrop = false;
        this.saleOrderCustomerModal.show();
    }

    public searchSaleOrderCustomer(event: Event) {
        this.reqDTOCustomer.limit = this.customerPageSize;
        this.reqDTOCustomer.offset = 0;
        if (this.reqDTOCustomer.entityCustomer.customerName != null && this.reqDTOCustomer.entityCustomer.customerName != "")
        {
            this.customerRequestId = ACTION.FETCH_CUSTOMERS_BY_NAME;
            this.fetchCustomerListByName();
        }
        else if (this.reqDTOCustomer.entityCustomer.cell != null && this.reqDTOCustomer.entityCustomer.cell != "")
        {
            this.customerRequestId = ACTION.FETCH_CUSTOMERS_BY_CELL;
            this.fetchCustomerListByCell();
        }
        else if (this.reqDTOCustomer.entityCustomer.email != null && this.reqDTOCustomer.entityCustomer.email != "")
        {
            this.customerRequestId = ACTION.FETCH_CUSTOMERS_BY_EMAIL;
            this.fetchCustomerListByEmail();
        }
        else
        {
            //if nothing is set then get all customers
            this.customerRequestId = ACTION.FETCH_CUSTOMERS;
            this.fetchCustomerList();       
        }
    }
    public fetchCustomerList() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public fetchCustomerListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_NAME), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public fetchCustomerListByCell() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_CELL), requestBody).then(result => {
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public fetchCustomerListByEmail() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_EMAIL), requestBody).then(result => {
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
                this.customerLength = result.totalCustomers;
            }
        });
    }
    
    public selectedCustomer(event: Event, customerId: number) {
        this.saleOrderCustomerModal.hide();
        let customerCounter: number;
        for (customerCounter = 0; customerCounter < this.customerList.length; customerCounter++) {
            if (this.customerList[customerCounter].entityCustomer.id == customerId) {
                this.dtoCustomer = this.customerList[customerCounter];
                this.dtoSaleOrder.entitySaleOrder.customerUserId = this.dtoCustomer.entityUser.id;
                this.dtoSaleOrder.entitySaleOrder.address = this.dtoCustomer.entityUser.address;
            }
        }
    }
    //product section
    searchSaleOrderProduct(event: Event) {
        this.reqDTOProduct.limit = this.productPageSize;
        this.reqDTOProduct.offset = 0;
        this.productRequestId = ACTION.SEARCH_PRODUCTS_WITH_STOCKS;
        this.searchProductsWithStocks();
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
                this.productLength = result.counter;
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
                this.productLength = result.counter;
            }
            else {
                //console.log(result);
            }
        });
    }
    
//    public searchProductsByName() {
//        let requestBody: string = JSON.stringify(this.reqDTOProduct);
//        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS_BY_NAME), requestBody).then(result => {
//            if (result.success && result.products != null) {
//                this.productList = result.products;
//                this.productLength = result.totalProducts;
//            }
//            else {
//                //console.log(result);
//            }
//        });
//    }
    
    public showSaleOrderProductModal(event: Event, tempDTOProduct: DTOProduct) {
        if (tempDTOProduct == null)
        {
            tempDTOProduct = new DTOProduct();
            tempDTOProduct.entityProduct = new EntityProduct();
            tempDTOProduct.entityProduct.id = 0;
        }
        if (tempDTOProduct.id > 0)
        {
            //show proper error message
            this.manageSaleErrorMessage = "Please click on Return tab and return this product with sale quantity insteal of selecting a different product.";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        
        this.productIdToPopupSelectProduct = tempDTOProduct.entityProduct.id;
        this.saleOrderProductModal.config.backdrop = false;
        this.saleOrderProductModal.show();
    }

    public selectedSaleOrderProductFromModal(event: Event, productId: number) {
        this.saleOrderProductModal.hide();
        this.appendProductInSaleOrder(productId);
    }
    
    public appendProductInSaleOrder(productId: number)
    {
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.dtoProductList.length; productCounter++) {
            if (this.dtoProductList[productCounter].entityProduct.id == productId) {
                dtoProduct.entityProduct = this.dtoProductList[productCounter].entityProduct;
                dtoProduct.quantity = this.dtoProductList[productCounter].entityProduct.defaultSaleQuantity;
            }
        }
        
        //we dont have the barcode scanned product in pop up product list
        if (dtoProduct.entityProduct.id == null && this.barcodeScannedEntityProduct.id > 0)
        {
            dtoProduct.entityProduct = this.barcodeScannedEntityProduct;
            dtoProduct.quantity = this.barcodeScannedEntityProduct.defaultSaleQuantity;
            //after assigning the product we are resetting barcode scanned entity product info
            this.barcodeScannedEntityProduct = new EntityProduct();
        }
        
        let saleProductCounter: number;
        if (this.productIdToPopupSelectProduct == 0 && dtoProduct.entityProduct.id > 0) {
            let isAppend: boolean = true;
            for (saleProductCounter = 0; saleProductCounter < this.dtoSaleOrder.products.length; saleProductCounter++) {
                if (this.dtoSaleOrder.products[saleProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    //from empty cell/add button, selecting a product whish is already in product list
                    this.dtoSaleOrder.products[saleProductCounter].quantity = (this.dtoSaleOrder.products[saleProductCounter].quantity + this.dtoSaleOrder.products[saleProductCounter].entityProduct.defaultSaleQuantity);
                    isAppend = false;
                    break;
                }
            }
            if (isAppend)
            {
                this.dtoSaleOrder.products[this.dtoSaleOrder.products.length] = dtoProduct;
            } 
        }
        else {
            let tempProducts: DTOProduct[] = Array();
            let isOverWrite: boolean = false;
            for (saleProductCounter = 0; saleProductCounter < this.dtoSaleOrder.products.length; saleProductCounter++) {
                if (this.dtoSaleOrder.products[saleProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    this.dtoSaleOrder.products[saleProductCounter].quantity = (this.dtoSaleOrder.products[saleProductCounter].quantity + this.dtoSaleOrder.products[saleProductCounter].entityProduct.defaultSaleQuantity);
                    isOverWrite = true;
                    break;
                }
            }
            let tempProductsCounter: number = 0;
            for (saleProductCounter = 0; saleProductCounter < this.dtoSaleOrder.products.length; saleProductCounter++) {
                if (this.dtoSaleOrder.products[saleProductCounter].entityProduct.id == this.productIdToPopupSelectProduct) {
                    if (!isOverWrite)
                    {
                        this.dtoSaleOrder.products[saleProductCounter] = dtoProduct;
                        tempProducts[tempProductsCounter] = this.dtoSaleOrder.products[saleProductCounter];
                        tempProductsCounter++;
                    }
                }
                else
                {
                    tempProducts[tempProductsCounter] = this.dtoSaleOrder.products[saleProductCounter];
                    tempProductsCounter++;
                }
            }
            this.dtoSaleOrder.products = tempProducts;
        }
        this.calculateBalance();
    }

    public showSelectedSaleOrderProductDeleteModal(event: Event, tempDTOProduct: DTOProduct) {
        if (tempDTOProduct.id > 0)
        {
            //show proper error message
            this.manageSaleErrorMessage = "Please click on Return tab and return this product with sale quantity insteal of deleting it.";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        this.productIdToPopupDeleteProduct = tempDTOProduct.entityProduct.id;
        this.selectedSaleOrderProductDeleteModal.config.backdrop = false;
        this.selectedSaleOrderProductDeleteModal.show();
    }

    public deleteSelectedProductFromModal(event: Event) {
        let tempDTOProductlist: DTOProduct[] = Array();
        this.selectedSaleOrderProductDeleteModal.hide();
        let saleProductCounter: number;
        for (saleProductCounter = 0; saleProductCounter < this.dtoSaleOrder.products.length; saleProductCounter++) {
            if (this.dtoSaleOrder.products[saleProductCounter].entityProduct.id != this.productIdToPopupDeleteProduct) {
                tempDTOProductlist[tempDTOProductlist.length] = this.dtoSaleOrder.products[saleProductCounter];
            }
        }
        this.dtoSaleOrder.products = tempDTOProductlist;
        this.calculateBalance();
    }

    public calculateBalance() {
        let totalPrice: number = 0;
        let totalVat: number = 0;
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoSaleOrder.products.length; purchasedProductCounter++) {
            let currentPrice: number = this.dtoSaleOrder.products[purchasedProductCounter].quantity * this.dtoSaleOrder.products[purchasedProductCounter].entityProduct.unitPrice - (this.dtoSaleOrder.products[purchasedProductCounter].quantity * this.dtoSaleOrder.products[purchasedProductCounter].entityProduct.unitPrice * this.dtoSaleOrder.products[purchasedProductCounter].discount / 100);
            let currentVat: number = this.dtoSaleOrder.products[purchasedProductCounter].quantity * this.dtoSaleOrder.products[purchasedProductCounter].entityProduct.unitPrice * this.dtoSaleOrder.products[purchasedProductCounter].entityProduct.vat / 100;
            this.dtoSaleOrder.products[purchasedProductCounter].total = currentPrice;
            totalPrice = totalPrice + currentPrice;
            totalVat = totalVat + currentVat;
        }
        let totalReturnPrice: number = 0;
        let counter: number;
        for (counter = 0; counter < this.dtoSaleOrder.returnProducts.length; counter++) {
            let currentPrice: number = this.dtoSaleOrder.returnProducts[counter].quantity * this.dtoSaleOrder.returnProducts[counter].entityProduct.unitPrice - (this.dtoSaleOrder.returnProducts[counter].quantity * this.dtoSaleOrder.returnProducts[counter].entityProduct.unitPrice * this.dtoSaleOrder.returnProducts[counter].discount / 100 );
            this.dtoSaleOrder.returnProducts[counter].total = currentPrice;
            totalReturnPrice = totalReturnPrice + currentPrice;
        }
        this.dtoSaleOrder.entitySaleOrder.subtotal = totalPrice;
        this.dtoSaleOrder.entitySaleOrder.totalReturn = totalReturnPrice;
        this.dtoSaleOrder.entitySaleOrder.vat = totalVat;
        this.dtoSaleOrder.entitySaleOrder.total = (totalPrice + totalVat - totalReturnPrice - this.dtoSaleOrder.entitySaleOrder.discount);
        //for a new sale order we are assuming whole payment is paid by customer
        if (this.dtoSaleOrder.entitySaleOrder.orderNo == null || this.dtoSaleOrder.entitySaleOrder.orderNo == "")
        {
            this.dtoSaleOrder.entitySaleOrder.paid = this.dtoSaleOrder.entitySaleOrder.total;
        }        
    }
    //sale save/update section
    public newSaleOrder(event: Event) {
        this.resetSaleOrder();
    }

    public resetSaleOrder() {
        this.disableSaveButton = false;
        this.orderNo = '';
        this.dtoSaleOrder = new DTOSaleOrder();
        this.dtoSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.dtoSaleOrder.entitySaleOrder.id = 0;
        this.dtoSaleOrder.dtoCustomer = new DTOCustomer();
        this.dtoSaleOrder.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoSaleOrder.dtoCustomer.entityUser = new EntityUser();
        this.dtoSaleOrder.dtoCustomer.entityUserRole = new EntityUserRole();
        this.dtoSaleOrder.products = Array();
        this.dtoSaleOrder.returnProducts = Array();

        //previsouly searched customer is not reset
        /*this.reqDTOCustomer = new DTOCustomer();
        this.reqDTOCustomer.entityCustomer = new EntityCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer.limit = 10;
        this.reqDTOCustomer.offset = 0;*/
        
        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();

        //previsouly searched product is not reset
        /*this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;*/
    }

    saveSaleOrder(event: Event) {
        if (this.dtoSaleOrder.entitySaleOrder.id > 0) 
        {
            //order is required to update order
            if (this.dtoSaleOrder.entitySaleOrder.orderNo == null || this.dtoSaleOrder.entitySaleOrder.orderNo == "") {
                this.manageSaleErrorMessage = "Order No is required.";
                this.manageSaleMessageDispalyModal.config.backdrop = false;
                this.manageSaleMessageDispalyModal.show();
                return;
            }
        } 
            
        //check product selection
        if (this.dtoSaleOrder.products == null) {
            this.manageSaleErrorMessage = "Select a product";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        //checking positive quantity
        let counter: number;
        for (counter = 0; counter < this.dtoSaleOrder.products.length; counter++)
        {
            if (this.dtoSaleOrder.products[counter].quantity == null || this.dtoSaleOrder.products[counter].quantity+"" == "" || this.dtoSaleOrder.products[counter].quantity <= 0)
            {
                this.manageSaleErrorMessage = "Invalid Quantity for the product : " + this.dtoSaleOrder.products[counter].entityProduct.name;
                this.manageSaleMessageDispalyModal.config.backdrop = false;
                this.manageSaleMessageDispalyModal.show();
                return;
            }
            if (this.dtoSaleOrder.products[counter].entityProduct.unitPrice == null || this.dtoSaleOrder.products[counter].entityProduct.unitPrice+"" == "")
            {
                this.manageSaleErrorMessage = "Invalid Unit Price for the product : " + this.dtoSaleOrder.products[counter].entityProduct.name;
                this.manageSaleMessageDispalyModal.config.backdrop = false;
                this.manageSaleMessageDispalyModal.show();
                return;
            }
        }
        
        //checking valid quantity and price for purchase return product list
        if (this.dtoSaleOrder.returnProducts != null)
        {
            for (counter = 0; counter < this.dtoSaleOrder.returnProducts.length; counter++)
            {
                if (this.dtoSaleOrder.returnProducts[counter].quantity == null || this.dtoSaleOrder.returnProducts[counter].quantity+"" == "" || this.dtoSaleOrder.returnProducts[counter].quantity <= 0)
                {
                    this.manageSaleErrorMessage = "Invalid Quantity for the Return product : " + this.dtoSaleOrder.returnProducts[counter].entityProduct.name;
                    this.manageSaleMessageDispalyModal.config.backdrop = false;
                    this.manageSaleMessageDispalyModal.show();
                    return;
                }
                if (this.dtoSaleOrder.returnProducts[counter].entityProduct.unitPrice == null || this.dtoSaleOrder.returnProducts[counter].entityProduct.unitPrice+"" == "")
                {
                    this.manageSaleErrorMessage = "Invalid Unit Price for the Return product : " + this.dtoSaleOrder.returnProducts[counter].entityProduct.name;
                    this.manageSaleMessageDispalyModal.config.backdrop = false;
                    this.manageSaleMessageDispalyModal.show();
                    return;
                }
            }
        }
        
        //if sale is executed without selecting customer then paid and total must be equal  
        if (this.dtoSaleOrder.entitySaleOrder.customerUserId == null || this.dtoSaleOrder.entitySaleOrder.customerUserId <= 0)
        {
            if (this.dtoSaleOrder.entitySaleOrder.paid != this.dtoSaleOrder.entitySaleOrder.total)
            {
                this.manageSaleErrorMessage = "Paid amount should be equal to total amount.";
                this.manageSaleMessageDispalyModal.config.backdrop = false;
                this.manageSaleMessageDispalyModal.show();
                return;
            }
        } 
      
        this.disableSaveButton = true;
        let requestBody: string = JSON.stringify(this.dtoSaleOrder);
        if (this.dtoSaleOrder.entitySaleOrder.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SALE_ORDER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                if (result.success) {
                    //this.dtoSaleOrder.entitySaleOrder.id = result.entitySaleOrder.id;
                    this.dtoSaleOrder.entitySaleOrder = result.entitySaleOrder;
                    //this.dtoSaleOrder.entitySaleOrder.orderNo = result.entitySaleOrder.orderNo;
                    this.manageSaleOrderUpdateLeftPanel();
                    this.searchProductsWithStocks();
                }
                else 
                {
                    this.manageSaleErrorMessage = result.message;
                    this.manageSaleMessageDispalyModal.config.backdrop = false;
                    this.manageSaleMessageDispalyModal.show();
                }
            });
        }
        else {
            //handle to update sale order
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_SALE_ORDER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                console.log(result);
                if (result.success) {
                    this.manageSaleOrderUpdateLeftPanel(); 
                    this.searchProductsWithStocks();             
                }
                else {
                    this.manageSaleErrorMessage = result.message;
                    this.manageSaleMessageDispalyModal.config.backdrop = false;
                    this.manageSaleMessageDispalyModal.show();
                }
            });
        }
    }
    //sale search section
    public setSaleOrderInfo(orderNo: string) {
        this.dtoSaleOrder = new DTOSaleOrder();
        this.dtoSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.dtoSaleOrder.entitySaleOrder.id = 0;
        this.dtoSaleOrder.dtoCustomer = new DTOCustomer();
        this.dtoSaleOrder.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoSaleOrder.dtoCustomer.entityUser = new EntityUser();
        this.dtoSaleOrder.dtoCustomer.entityUserRole = new EntityUserRole();
        this.dtoSaleOrder.products = Array();
        this.dtoSaleOrder.returnProducts = Array();

        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();

        this.reqDTOSaleOrder.entitySaleOrder.orderNo = orderNo;
        this.fetchSaleOrderInfo();
    }

    public fetchSaleOrderInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoSaleOrder = result;
                this.calculateBalance();
                this.reqDTOCustomer.entityCustomer.userId = this.dtoSaleOrder.entitySaleOrder.customerUserId;
                this.fetchCustomerInfo();
            }
            else {

            }
        });
    }

    public fetchCustomerInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoCustomer = result;
            }
        });
    }

    public fetchSaleOrderList() {
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDERS), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
            }
            else {

            }
        });
    }

    selectedSaleOrder(event: Event, orderNo: string) {
        event.preventDefault();
        this.orderNo = orderNo;
        this.setSaleOrderInfo(orderNo);
    }

    public manageSaleOrderUpdateLeftPanel()
    {
        this.orderNo = this.dtoSaleOrder.entitySaleOrder.orderNo;
        let tempSaleOrderList: DTOSaleOrder[] = Array();
        tempSaleOrderList[0] = this.dtoSaleOrder;
        let totalSaleOrder: number = 1;
        let saleOrderCounter: number;
        for (saleOrderCounter = 0; saleOrderCounter < this.saleOrderList.length; saleOrderCounter++)
        {
            if (this.saleOrderList[saleOrderCounter].entitySaleOrder.id != this.dtoSaleOrder.entitySaleOrder.id && totalSaleOrder <= this.maxSaleOrderLeftPanel)
            {
                tempSaleOrderList[totalSaleOrder] = this.saleOrderList[saleOrderCounter];
                totalSaleOrder++;
            }
        }
        this.saleOrderList = tempSaleOrderList;
    }
    
    public searchSaleOrdersByOrderNo() {
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDERS_BY_ORDER_NO), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
            }
            else {

            }
        });
    }
    
    printReport(event: Event)
    {
        window.printJS(window.SITE_URL +'salereport?order_no=' + this.dtoSaleOrder.entitySaleOrder.orderNo);
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
    
    onCustomerPaginateChange(event:PageEvent){
        this.reqDTOCustomer.limit = event.pageSize;
        this.reqDTOCustomer.offset = (event.pageIndex * event.pageSize) ;
        if (this.customerRequestId == ACTION.FETCH_CUSTOMERS)
        {
            this.fetchCustomerList();
        }
        else if (this.customerRequestId == ACTION.FETCH_CUSTOMERS_BY_NAME)
        {
            this.fetchCustomerListByName();
        }
        else if (this.customerRequestId == ACTION.FETCH_CUSTOMERS_BY_CELL)
        {
            this.fetchCustomerListByCell();
        }
        else if (this.customerRequestId == ACTION.FETCH_CUSTOMERS_BY_EMAIL)
        {
            this.fetchCustomerListByEmail();
        }
    }
    
    //barCode logic section starts
    onBarcodeCharChange(event:Event)
    {
        clearInterval(this.barcodeScanInterval);
        this.barcodeScanInterval = setInterval(() => { this.getProductByCode(); }, 1000 * 1);       
    }    
    getProductByCode()
    {
        clearInterval(this.barcodeScanInterval);
        let entityProduct: EntityProduct = new EntityProduct();
        entityProduct.code = this.barcode;
        //resetting barcode
        this.barcode = "";
        let requestBody: string = JSON.stringify(entityProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_BY_CODE), requestBody).then(result => {
            if (result.success) {
                this.barcodeScannedEntityProduct = result;
                this.productIdToPopupSelectProduct = 0;
                this.appendProductInSaleOrder(result.id);
                this.barcode = "";
            }
            else {
                
            }
        });
    }
    //barCode logic section ends
    
    //Return products section starts
    public showSaleOrderSoldProductsModal(event: Event, tempDTOProduct: DTOProduct) {
        if (tempDTOProduct == null)
        {
            tempDTOProduct = new DTOProduct();
            tempDTOProduct.entityProduct = new EntityProduct();
            tempDTOProduct.entityProduct.id = 0;
        }
        if (tempDTOProduct.id > 0)
        {
            //show proper error message
            this.manageSaleErrorMessage = "Please set quantity to 0 insteal of selecting a different product.";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        
        this.productIdToPopupSelectReturnProduct = tempDTOProduct.entityProduct.id;
        this.saleOrderSoldProductsModal.config.backdrop = false;
        this.saleOrderSoldProductsModal.show();
    }
    selectedSaleOrderSoldProductFromModalToReturn(event: Event, productId: number)
    {
        this.saleOrderSoldProductsModal.hide();
        this.appendReturnedProductInSaleOrder(productId);
    }
    public appendReturnedProductInSaleOrder(productId: number)
    {
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.dtoSaleOrder.products.length; productCounter++) {
            if (this.dtoSaleOrder.products[productCounter].entityProduct.id == productId) {
                dtoProduct.entityProduct.id = this.dtoSaleOrder.products[productCounter].entityProduct.id;
                dtoProduct.entityProduct.name = this.dtoSaleOrder.products[productCounter].entityProduct.name;
                dtoProduct.entityProduct.unitPrice = this.dtoSaleOrder.products[productCounter].entityProduct.unitPrice;
                dtoProduct.discount = this.dtoSaleOrder.products[productCounter].discount;
            }
        }
        let purchasedProductCounter: number;
        if (this.productIdToPopupSelectReturnProduct == 0 && dtoProduct.entityProduct.id > 0) {
            let isAppend: boolean = true;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoSaleOrder.returnProducts.length; purchasedProductCounter++) {
                if (this.dtoSaleOrder.returnProducts[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    //from empty cell/add button, selecting a product whish is already in product list
                    this.dtoSaleOrder.returnProducts[purchasedProductCounter].quantity = (this.dtoSaleOrder.returnProducts[purchasedProductCounter].quantity + 1);
                    isAppend = false;
                    break;
                }
            }
            if (isAppend)
            {
                this.dtoSaleOrder.returnProducts[this.dtoSaleOrder.returnProducts.length] = dtoProduct;
            }           
        }
        else {
            let tempProducts: DTOProduct[] = Array();
            let isOverWrite: boolean = false;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoSaleOrder.returnProducts.length; purchasedProductCounter++) {
                if (this.dtoSaleOrder.returnProducts[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    this.dtoSaleOrder.returnProducts[purchasedProductCounter].quantity = (this.dtoSaleOrder.returnProducts[purchasedProductCounter].quantity + 1);
                    isOverWrite = true;
                    break;
                }
            }
            let tempProductsCounter: number = 0;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoSaleOrder.returnProducts.length; purchasedProductCounter++) {
                if (this.dtoSaleOrder.returnProducts[purchasedProductCounter].entityProduct.id == this.productIdToPopupSelectReturnProduct) {
                    if (!isOverWrite)
                    {
                        this.dtoSaleOrder.returnProducts[purchasedProductCounter] = dtoProduct;                        
                    }
                    tempProducts[tempProductsCounter] = this.dtoSaleOrder.returnProducts[purchasedProductCounter];
                    tempProductsCounter++;
                }
                else
                {
                    tempProducts[tempProductsCounter] = this.dtoSaleOrder.returnProducts[purchasedProductCounter];
                    tempProductsCounter++;
                }
            }
            this.dtoSaleOrder.returnProducts = tempProducts;      
        }
        this.calculateBalance();
    }
    showSelectedSaleOrderReturnedProductDeleteModal(event: Event, tempDTOProduct: DTOProduct)
    {
        if (tempDTOProduct.id > 0)
        {
            //show proper error message
            this.manageSaleErrorMessage = "Please set quantity to 0 insteal of deleting it.";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        this.productIdToPopupDeleteReturnProduct = tempDTOProduct.entityProduct.id;
        this.selectedSaleOrderReturnedProductDeleteModal.config.backdrop = false;
        this.selectedSaleOrderReturnedProductDeleteModal.show();
    }
    deleteSelectedReturnedProductFromSaleOrder(event: Event)
    {
        let tempDTOProductlist: DTOProduct[] = Array();
        this.selectedSaleOrderReturnedProductDeleteModal.hide();
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoSaleOrder.returnProducts.length; purchasedProductCounter++) {
            if (this.dtoSaleOrder.returnProducts[purchasedProductCounter].entityProduct.id != this.productIdToPopupDeleteReturnProduct) {
                tempDTOProductlist[tempDTOProductlist.length] = this.dtoSaleOrder.returnProducts[purchasedProductCounter];
            }
        }
        this.dtoSaleOrder.returnProducts = tempDTOProductlist;
        this.calculateBalance();
    }
    //Return products section ends
}