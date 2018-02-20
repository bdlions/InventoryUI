import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {TabsetComponent} from 'ngx-bootstrap';

import {DTOPurchaseOrder} from '../dto/DTOPurchaseOrder';
import {EntityPurchaseOrder} from '../dto/EntityPurchaseOrder';
import {EntityProductSupplier} from "../dto/EntityProductSupplier";
import {EntityUser} from '../dto/EntityUser';
import {EntitySupplier} from "../dto/EntitySupplier";
import {EntityUserRole} from "../dto/EntityUserRole";
import {DTOSupplier} from '../dto/DTOSupplier';

import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/purchase/managepurchase.component.html',
    providers: [WebAPIService]
})

export class ManagePurchaseComponent {
    private subscribe: Subscription;
    @ViewChild('purchaseOrderSupplierModal') public purchaseOrderSupplierModal: ModalDirective;
    @ViewChild('purchaseOrderProductModal') public purchaseOrderProductModal: ModalDirective;
    @ViewChild('selectedPurchaseOrderProductDeleteModal') public selectedPurchaseOrderProductDeleteModal: ModalDirective;
    @ViewChild('addPurchaseOrderProduct') public addPurchaseOrderProduct: ModalDirective;
    @ViewChild('managePurchaseMessageDispalyModal') public managePurchaseMessageDispalyModal: ModalDirective;
    @ViewChild('purchaseOrderPurchasedProductsModal') public purchaseOrderPurchasedProductsModal: ModalDirective;
    @ViewChild('selectedPurchaseOrderReturnedProductDeleteModal') public selectedPurchaseOrderReturnedProductDeleteModal: ModalDirective;
    private webAPIService: WebAPIService;
    private orderNo: string;

    private reqDTOPurchaseOrder: DTOPurchaseOrder;
    private purchaseOrderList: DTOPurchaseOrder[];
    private dtoPurchaseOrder: DTOPurchaseOrder;

    private reqDTOSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    private dtoSupplier: DTOSupplier;

    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    private dtoProductList: DTOProduct[];
    private selectedProductType: EntityProductType;
    private selectedProductCategory: EntityProductCategory;
    private reqDTOProduct: DTOProduct;
    private productList: EntityProduct[];

    private entityProduct: EntityProduct;
    private searchEntityProduct: EntityProduct;
    //private productId: number;
    private productIdToPopupSelectProduct: number;
    private productIdToPopupDeleteProduct: number;
    
    private productIdToPopupSelectReturnProduct: number;
    private productIdToPopupDeleteReturnProduct: number;

    //    private managePurchaseSuccessMessage: string;
    private managePurchaseErrorMessage: string;
    
    private barcode: string = "";
    
    private disableSaveButton: boolean = false;
    
    //constants & constraints
    private maxPurchaseOrderLeftPanel: number = 10;
    
    private productRequestId: number;
    private supplierRequestId: number;
    
    private entityProductSupplierList: EntityProductSupplier[];
    
    // MatPaginator Inputs
    productLength = 0;
    productPageSize = 10;
    productPageSizeOptions = [5, 10];
    
    supplierLength = 0;
    supplierPageSize = 10;
    supplierPageSizeOptions = [5, 10];
    
    barcodeScanInterval;
    
    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;

        this.entityProductSupplierList = Array();

        this.reqDTOPurchaseOrder = new DTOPurchaseOrder();
        this.reqDTOPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.reqDTOPurchaseOrder.limit = 10;
        this.reqDTOPurchaseOrder.offset = 0;
        this.fetchPurchaseOrderList();

        this.dtoPurchaseOrder = new DTOPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder.id = 0;
        this.dtoPurchaseOrder.dtoSupplier = new DTOSupplier();
        this.dtoPurchaseOrder.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoPurchaseOrder.dtoSupplier.entityUser = new EntityUser();
        this.dtoPurchaseOrder.dtoSupplier.entityUserRole = new EntityUserRole();
        this.dtoPurchaseOrder.products = Array();
        this.dtoPurchaseOrder.returnProducts = Array();

        this.reqDTOSupplier = new DTOSupplier();
        this.reqDTOSupplier.entitySupplier = new EntitySupplier();
        this.reqDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier.limit = this.supplierPageSize;
        this.reqDTOSupplier.offset = 0;
        this.supplierRequestId = ACTION.FETCH_SUPPLIERS;
        this.fetchSupplierList();
        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();

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

        
        this.searchEntityProduct = new EntityProduct();
        this.entityProduct = JSON.parse("{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"length\":\"10 cm\",\"width\":\"20 cm\",\"height\":\"30 cm\",\"weight\":\"40 cm\",\"remark\":\"This is a good product...\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}");
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.orderNo = params['orderNo'];
            if (this.orderNo != null && this.orderNo != "")
            {
                this.setPurchaseOrderInfo(this.orderNo);
            }            
        });
    }

    searchPurchaseOrder(event: Event) {
        //console.log(this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo);
        if (this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo != null && this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo != "") {
            this.reqDTOPurchaseOrder.limit = 10;
            this.reqDTOPurchaseOrder.offset = 0;
            this.searchPurchaseOrdersByOrderNo();
        }
        else {
            this.reqDTOPurchaseOrder.limit = 10;
            this.reqDTOPurchaseOrder.offset = 0;
            this.fetchPurchaseOrderList();
        }
    }



    selectedPurchaseOrderSupplier(event: Event, id: number) {
        console.log(id);
    }

    selectedPurchaseOrderProductDetails(event: Event, id: number) {
        console.log(id);
    }
    selectedPurchaseOrderProductDelete(event: Event, id: number) {
        console.log(id);
    }

    public hidePurchaseOrderSupplierModal(): void {
        this.purchaseOrderSupplierModal.hide();
    }
    public hidePurchaseOrderProductModal(): void {
        this.purchaseOrderProductModal.hide();
    }
    public hideAddPurchaseOrderProduct(): void {
        this.addPurchaseOrderProduct.hide();
    }
    public hideSelectedPurchaseOrderProductDeleteModal(): void {
        this.selectedPurchaseOrderProductDeleteModal.hide();
    }
    public showAddPurchaseOrderProductModal(event: Event) {
        this.addPurchaseOrderProduct.config.backdrop = false;
        this.addPurchaseOrderProduct.show();
    }
    public hideManagePurchaseMessageDispalyModal(): void {
        this.managePurchaseMessageDispalyModal.hide();
    }
    public hidePurchaseOrderPurchasedProductsModal(): void {
        this.purchaseOrderPurchasedProductsModal.hide();
    }
    public hideSelectedPurchaseOrderReturnedProductDeleteModal(): void {
        this.selectedPurchaseOrderReturnedProductDeleteModal.hide();
    }
    
    
    public showPurchaseOrderEmptyRowProductModal(event: Event) {
        this.purchaseOrderProductModal.config.backdrop = false;
        this.purchaseOrderProductModal.show();
    }



    //supplier section
    public fetchSupplierList() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }
    
    public fetchSupplierListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_NAME), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }
    
    public fetchSupplierListByCell() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_CELL), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }
    
    public fetchSupplierListByEmail() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_EMAIL), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }

    public showPurchaseOrderSupplierModal(event: Event) {
        this.purchaseOrderSupplierModal.config.backdrop = false;
        this.purchaseOrderSupplierModal.show();
    }

    public searchPurchaseOrderSupplier(event: Event) {
        //this.fetchSupplierList();
        
        this.reqDTOSupplier.limit = this.supplierPageSize;
        this.reqDTOSupplier.offset = 0;
        if (this.reqDTOSupplier.entitySupplier.supplierName != null && this.reqDTOSupplier.entitySupplier.supplierName != "")
        {
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS_BY_NAME;
            this.fetchSupplierListByName();
        }
        else if (this.reqDTOSupplier.entitySupplier.cell != null && this.reqDTOSupplier.entitySupplier.cell != "")
        {
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS_BY_CELL;
            this.fetchSupplierListByCell();
        }
        else if (this.reqDTOSupplier.entitySupplier.email != null && this.reqDTOSupplier.entitySupplier.email != "")
        {
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS_BY_EMAIL;
            this.fetchSupplierListByEmail();
        }
        else
        {
            //if nothing is set then get all suppliers
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS;
            this.fetchSupplierList();
        }
        
    }

    public selectedSupplier(event: Event, supplierId: number) {
        this.purchaseOrderSupplierModal.hide();
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++) {
            if (this.supplierList[supplierCounter].entitySupplier.id == supplierId) {
                this.dtoSupplier = this.supplierList[supplierCounter];
                this.dtoPurchaseOrder.entityPurchaseOrder.supplierUserId = this.dtoSupplier.entityUser.id;
                this.fetchSupplierProductList(this.dtoSupplier.entityUser.id);
            }
        }
    }
    
    fetchSupplierProductList(supplierUserId: number)
    {
        //getting entire product list of this supplier
        let dtoSupplier: DTOSupplier = new DTOSupplier();
        let entityUser: EntityUser = new EntityUser();
        entityUser.id = supplierUserId;
        dtoSupplier.entityUser = entityUser;        
        let requestBody: string = JSON.stringify(dtoSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_PRODUCT_LIST), requestBody).then(result => {
            if (result.success) {
                if(result.list != null)
                {
                    this.entityProductSupplierList = result.list;
                    for (let counter1: number = 0; counter1 < this.entityProductSupplierList.length; counter1++)
                    {
                        for (let counter2: number = 0; counter2 < this.dtoPurchaseOrder.products.length; counter2++)
                        {
                            if (this.entityProductSupplierList[counter1].productId == this.dtoPurchaseOrder.products[counter2].entityProduct.id)
                            {
                                this.dtoPurchaseOrder.products[counter2].entityProduct.costPrice = this.entityProductSupplierList[counter1].supplierPrice;
                            }
                        }
                    }
                    this.calculateBalance();
                }
            }
        });
    }

    //product section
    public searchPurchaseOrderProduct(event: Event) {
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
    
    public searchProductsByName() {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS_BY_NAME), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.products != null) {
                this.productList = result.products;
                this.productLength = result.totalProducts;
            }
            else {
                //console.log(result);
            }
        });
    }

    public showPurchaseOrderProductModal(event: Event, productId: number) {
        this.productIdToPopupSelectProduct = productId;
        this.purchaseOrderProductModal.config.backdrop = false;
        this.purchaseOrderProductModal.show();
    }

    public selectedPurchaseOrderProductFromModal(event: Event, productId: number) {
        this.purchaseOrderProductModal.hide();
        this.appendProductInPurchaseOrder(productId);
    }
    
    public appendProductInPurchaseOrder(productId: number)
    {
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.dtoProductList.length; productCounter++) {
            if (this.dtoProductList[productCounter].entityProduct.id == productId) {
                dtoProduct.entityProduct = this.dtoProductList[productCounter].entityProduct;
            }
        }
        console.log(this.productList);
        console.log(this.entityProductSupplierList);
        if (this.entityProductSupplierList != null && this.entityProductSupplierList.length > 0)
        {
            for (let counter1: number = 0; counter1 < this.entityProductSupplierList.length; counter1++)
            {
                if (this.entityProductSupplierList[counter1].productId == dtoProduct.entityProduct.id)
                {
                    dtoProduct.entityProduct.costPrice = this.entityProductSupplierList[counter1].supplierPrice;
                }
            }
        }
        console.log(dtoProduct);
        let purchasedProductCounter: number;
        if (this.productIdToPopupSelectProduct == 0 && dtoProduct.entityProduct.id > 0) {
            let isAppend: boolean = true;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.products.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    //from empty cell/add button, selecting a product whish is already in product list
                    this.dtoPurchaseOrder.products[purchasedProductCounter].quantity = (this.dtoPurchaseOrder.products[purchasedProductCounter].quantity + 1);
                    isAppend = false;
                    break;
                }
            }
            if (isAppend)
            {
                this.dtoPurchaseOrder.products[this.dtoPurchaseOrder.products.length] = dtoProduct;
            }           
        }
        else {
            let tempProducts: DTOProduct[] = Array();
            let isOverWrite: boolean = false;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.products.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    this.dtoPurchaseOrder.products[purchasedProductCounter].quantity = (this.dtoPurchaseOrder.products[purchasedProductCounter].quantity + 1);
                    isOverWrite = true;
                    break;
                }
            }
            let tempProductsCounter: number = 0;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.products.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.id == this.productIdToPopupSelectProduct) {
                    if (!isOverWrite)
                    {
                        this.dtoPurchaseOrder.products[purchasedProductCounter] = dtoProduct;                        
                    }
                    tempProducts[tempProductsCounter] = this.dtoPurchaseOrder.products[purchasedProductCounter];
                    tempProductsCounter++;
                }
                else
                {
                    tempProducts[tempProductsCounter] = this.dtoPurchaseOrder.products[purchasedProductCounter];
                    tempProductsCounter++;
                }
            }
            this.dtoPurchaseOrder.products = tempProducts;      
        }
        this.calculateBalance();
    }

    public showSelectedPurchaseOrderProductDeleteModal(event: Event, productId: number) {
        this.productIdToPopupDeleteProduct = productId;
        this.selectedPurchaseOrderProductDeleteModal.config.backdrop = false;
        this.selectedPurchaseOrderProductDeleteModal.show();
    }

    public deleteSelectedProductFromModal(event: Event) {
        let tempDTOProductlist: DTOProduct[] = Array();
        this.selectedPurchaseOrderProductDeleteModal.hide();
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.products.length; purchasedProductCounter++) {
            if (this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.id != this.productIdToPopupDeleteProduct) {
                tempDTOProductlist[tempDTOProductlist.length] = this.dtoPurchaseOrder.products[purchasedProductCounter];
            }
        }
        this.dtoPurchaseOrder.products = tempDTOProductlist;
        this.calculateBalance();
    }

    public calculateBalance() {
        let totalPrice: number = 0;        
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.products.length; purchasedProductCounter++) {
            let currentPrice: number = this.dtoPurchaseOrder.products[purchasedProductCounter].quantity * this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.costPrice - (this.dtoPurchaseOrder.products[purchasedProductCounter].quantity * this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.costPrice * this.dtoPurchaseOrder.products[purchasedProductCounter].discount / 100 );
            this.dtoPurchaseOrder.products[purchasedProductCounter].total = currentPrice;
            totalPrice = totalPrice + currentPrice;
        }
        let totalReturnPrice: number = 0;
        let counter: number;
        for (counter = 0; counter < this.dtoPurchaseOrder.returnProducts.length; counter++) {
            let currentPrice: number = this.dtoPurchaseOrder.returnProducts[counter].quantity * this.dtoPurchaseOrder.returnProducts[counter].entityProduct.costPrice - (this.dtoPurchaseOrder.returnProducts[counter].quantity * this.dtoPurchaseOrder.returnProducts[counter].entityProduct.costPrice * this.dtoPurchaseOrder.returnProducts[counter].discount / 100 );
            this.dtoPurchaseOrder.returnProducts[counter].total = currentPrice;
            totalReturnPrice = totalReturnPrice + currentPrice;
        }
        
        this.dtoPurchaseOrder.entityPurchaseOrder.subtotal = totalPrice;
        this.dtoPurchaseOrder.entityPurchaseOrder.totalReturn = totalReturnPrice;
        this.dtoPurchaseOrder.entityPurchaseOrder.total = (totalPrice - totalReturnPrice - this.dtoPurchaseOrder.entityPurchaseOrder.discount);
    }

    //purchase add/save section
    public newPurchaseOrder(event: Event) {
        this.resetPurchaseOrder();
    }

    public resetPurchaseOrder() {
        this.disableSaveButton = false;
        this.orderNo = '';
        this.dtoPurchaseOrder = new DTOPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder.id = 0;
        this.dtoPurchaseOrder.dtoSupplier = new DTOSupplier();
        this.dtoPurchaseOrder.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoPurchaseOrder.dtoSupplier.entityUser = new EntityUser();
        this.dtoPurchaseOrder.dtoSupplier.entityUserRole = new EntityUserRole();
        this.dtoPurchaseOrder.products = Array();
        this.dtoPurchaseOrder.returnProducts = Array();

        this.reqDTOSupplier = new DTOSupplier();
        this.reqDTOSupplier.entitySupplier = new EntitySupplier();
        this.reqDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier.limit = 10;
        this.reqDTOSupplier.offset = 0;
        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();

        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
        this.productRequestId = ACTION.FETCH_PRODUCTS;
        this.fetchProductList();
        
        this.entityProductSupplierList = Array();
    }

    public savePurchaseOrder(event: Event) {
        if (this.dtoPurchaseOrder.entityPurchaseOrder.id > 0) {
            //order is required to update order
            if (this.dtoPurchaseOrder.entityPurchaseOrder.orderNo == null || this.dtoPurchaseOrder.entityPurchaseOrder.orderNo == "") {
                this.managePurchaseErrorMessage = "Order No is required";
                this.managePurchaseMessageDispalyModal.config.backdrop = false;
                this.managePurchaseMessageDispalyModal.show();
                return;
            }
        }
        //check supplier selection
        if (this.dtoSupplier.entityUser.id == null || this.dtoSupplier.entityUser.id < 0) {
            this.managePurchaseErrorMessage = "Please select a supplier";
            this.managePurchaseMessageDispalyModal.config.backdrop = false;
            this.managePurchaseMessageDispalyModal.show();
            return;
        }
        //check product selection
        if (this.dtoPurchaseOrder.products == null) {
            this.managePurchaseErrorMessage = "Select a product";
            this.managePurchaseMessageDispalyModal.config.backdrop = false;
            this.managePurchaseMessageDispalyModal.show();
            return;
        }
        
        //checking valid quantity and price for purchase product list
        let counter: number;
        for (counter = 0; counter < this.dtoPurchaseOrder.products.length; counter++)
        {
            if (this.dtoPurchaseOrder.products[counter].quantity == null || this.dtoPurchaseOrder.products[counter].quantity+"" == "" || this.dtoPurchaseOrder.products[counter].quantity <= 0)
            {
                this.managePurchaseErrorMessage = "Invalid Quantity for the product : " + this.dtoPurchaseOrder.products[counter].entityProduct.name;
                this.managePurchaseMessageDispalyModal.config.backdrop = false;
                this.managePurchaseMessageDispalyModal.show();
                return;
            }
            if (this.dtoPurchaseOrder.products[counter].entityProduct.costPrice == null || this.dtoPurchaseOrder.products[counter].entityProduct.costPrice+"" == "")
            {
                this.managePurchaseErrorMessage = "Invalid Unit Price for the product : " + this.dtoPurchaseOrder.products[counter].entityProduct.name;
                this.managePurchaseMessageDispalyModal.config.backdrop = false;
                this.managePurchaseMessageDispalyModal.show();
                return;
            }
        }
        
        //checking valid quantity and price for purchase return product list
        if (this.dtoPurchaseOrder.returnProducts != null)
        {
            for (counter = 0; counter < this.dtoPurchaseOrder.returnProducts.length; counter++)
            {
                if (this.dtoPurchaseOrder.returnProducts[counter].quantity == null || this.dtoPurchaseOrder.returnProducts[counter].quantity+"" == "" || this.dtoPurchaseOrder.returnProducts[counter].quantity <= 0)
                {
                    this.managePurchaseErrorMessage = "Invalid Quantity for the Return product : " + this.dtoPurchaseOrder.returnProducts[counter].entityProduct.name;
                    this.managePurchaseMessageDispalyModal.config.backdrop = false;
                    this.managePurchaseMessageDispalyModal.show();
                    return;
                }
                if (this.dtoPurchaseOrder.returnProducts[counter].entityProduct.costPrice == null || this.dtoPurchaseOrder.returnProducts[counter].entityProduct.costPrice+"" == "")
                {
                    this.managePurchaseErrorMessage = "Invalid Unit Price for the Return product : " + this.dtoPurchaseOrder.returnProducts[counter].entityProduct.name;
                    this.managePurchaseMessageDispalyModal.config.backdrop = false;
                    this.managePurchaseMessageDispalyModal.show();
                    return;
                }
            }
        }
        
        
        this.disableSaveButton = true;
        let requestBody: string = JSON.stringify(this.dtoPurchaseOrder);
        //console.log(requestBody);
        if (this.dtoPurchaseOrder.entityPurchaseOrder.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PURCHASE_ORDER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                if (result.success) {
                    this.dtoPurchaseOrder.entityPurchaseOrder.id = result.entityPurchaseOrder.id;
                    this.dtoPurchaseOrder.entityPurchaseOrder.orderNo = result.entityPurchaseOrder.orderNo;
                    this.managePurchaseOrderUpdateLeftPanel();
                }
                else 
                {
                    this.managePurchaseErrorMessage = result.message;
                    //display pop up with message
                    this.managePurchaseMessageDispalyModal.config.backdrop = false;
                    this.managePurchaseMessageDispalyModal.show();
                }
            });
        }
        else {
            //handle to update purchase order
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_PURCHASE_ORDER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                console.log(result);
                if (result.success) {
                    this.managePurchaseOrderUpdateLeftPanel();                    
                }
                else 
                {
                    this.managePurchaseErrorMessage = result.message;
                    //display pop up with message
                    this.managePurchaseMessageDispalyModal.config.backdrop = false;
                    this.managePurchaseMessageDispalyModal.show();
                }
            });
        }
    }

    //purchase search section
    public setPurchaseOrderInfo(orderNo: string) {
        this.dtoPurchaseOrder = new DTOPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder.id = 0;
        this.dtoPurchaseOrder.dtoSupplier = new DTOSupplier();
        this.dtoPurchaseOrder.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoPurchaseOrder.dtoSupplier.entityUser = new EntityUser();
        this.dtoPurchaseOrder.dtoSupplier.entityUserRole = new EntityUserRole();
        this.dtoPurchaseOrder.products = Array();
        this.dtoPurchaseOrder.returnProducts = Array();

        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();

        //this.reqDTOPurchaseOrder = new DTOPurchaseOrder();
        //this.reqDTOPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo = orderNo;
        this.fetchPurchaseOrderInfo();
    }
    public fetchPurchaseOrderList() {
        let requestBody: string = JSON.stringify(this.reqDTOPurchaseOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDERS), requestBody).then(result => {
            if (result.success && result.purchaseOrders != null) {
                this.purchaseOrderList = result.purchaseOrders;
            }
            else {

            }
        });
    }

    public fetchPurchaseOrderInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOPurchaseOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoPurchaseOrder = result;
                this.calculateBalance();
                this.reqDTOSupplier.entitySupplier.userId = this.dtoPurchaseOrder.entityPurchaseOrder.supplierUserId;
                this.fetchSupplierInfo();
            }
            else {

            }
        });
    }
    public fetchSupplierInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoSupplier = result;
            }
        });
    }
    selectedPurchaseOrder(event: Event, orderNo: string) {
        event.preventDefault();
        this.orderNo = orderNo;
        this.setPurchaseOrderInfo(orderNo);
    }
    
    public managePurchaseOrderUpdateLeftPanel()
    {
        this.orderNo = this.dtoPurchaseOrder.entityPurchaseOrder.orderNo;
        let tempPurchaseOrderList: DTOPurchaseOrder[] = Array();
        tempPurchaseOrderList[0] = this.dtoPurchaseOrder;
        let totalPurchaseOrder: number = 1;
        let purchaseOrderCounter: number;
        for (purchaseOrderCounter = 0; purchaseOrderCounter < this.purchaseOrderList.length; purchaseOrderCounter++)
        {
            if (this.purchaseOrderList[purchaseOrderCounter].entityPurchaseOrder.id != this.dtoPurchaseOrder.entityPurchaseOrder.id && totalPurchaseOrder <= this.maxPurchaseOrderLeftPanel)
            {
                tempPurchaseOrderList[totalPurchaseOrder] = this.purchaseOrderList[purchaseOrderCounter];
                totalPurchaseOrder++;
            }
        }
        this.purchaseOrderList = tempPurchaseOrderList;
    }
    
    public searchPurchaseOrdersByOrderNo() {
        let requestBody: string = JSON.stringify(this.reqDTOPurchaseOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDERS_BY_ORDER_NO), requestBody).then(result => {
            if (result.success && result.purchaseOrders != null) {
                this.purchaseOrderList = result.purchaseOrders;
            }
            else {
                
            }
        });
    }
    
    printReport(event: Event)
    {
        window.printJS(window.SITE_URL +'purchasereport?order_no=' + this.dtoPurchaseOrder.entityPurchaseOrder.orderNo);
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
    
    onSupplierPaginateChange(event:PageEvent)
    {
        this.reqDTOSupplier.limit = event.pageSize;
        this.reqDTOSupplier.offset = (event.pageIndex * event.pageSize) ;
        if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS)
        {
            this.fetchSupplierList();
        }
        else if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS_BY_NAME)
        {
            this.fetchSupplierListByName();
        }
        else if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS_BY_CELL)
        {
            this.fetchSupplierListByCell();
        }
        else if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS_BY_EMAIL)
        {
            this.fetchSupplierListByEmail();
        }
    }
    
    onBarcodeCharChange(event:Event)
    {
        /*if (this.barcode.length == 13)
        {
            let productId: number = 0;
            let productCounter: number;
            for (productCounter = 0; productCounter < this.productList.length; productCounter++) {
                if (this.productList[productCounter].code == this.barcode) {
                    productId = this.productList[productCounter].id;
                }
            }
            if (productId > 0)
            {                
                this.productIdToPopupSelectProduct = 0;
                this.appendProductInPurchaseOrder(productId);
                this.barcode = "";
            }
            //alert("Barcode:" + this.barcode);            
        }*/ 
        clearInterval(this.barcodeScanInterval);
        this.barcodeScanInterval = setInterval(() => { this.getProductByCode(); }, 1000 * 1);
    }
    
    getProductByCode()
    {
        console.log(this.barcode);
        clearInterval(this.barcodeScanInterval);
        let entityProduct: EntityProduct = new EntityProduct();
        entityProduct.code = this.barcode;
        //resetting barcode
        this.barcode = "";
        let requestBody: string = JSON.stringify(entityProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_BY_CODE), requestBody).then(result => {
            //console.log(result);
            if (result.success) {
                this.productIdToPopupSelectProduct = 0;
                this.appendProductInPurchaseOrder(result.id);
                this.barcode = "";
            }
            else {
                //console.log(result);
            }
        });
    }
    
    //Return products section starts
    public showPurchaseOrderPurchasedProductsModal(event: Event, productId: number) {
        this.productIdToPopupSelectReturnProduct = productId;
        this.purchaseOrderPurchasedProductsModal.config.backdrop = false;
        this.purchaseOrderPurchasedProductsModal.show();
    }
    selectedPurchaseOrderPurchasedProductFromModalToReturn(event: Event, productId: number)
    {
        this.purchaseOrderPurchasedProductsModal.hide();
        this.appendReturnedProductInPurchaseOrder(productId);
    }
    public appendReturnedProductInPurchaseOrder(productId: number)
    {
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.dtoPurchaseOrder.products.length; productCounter++) {
            if (this.dtoPurchaseOrder.products[productCounter].entityProduct.id == productId) {
                dtoProduct.entityProduct.id = this.dtoPurchaseOrder.products[productCounter].entityProduct.id;
                dtoProduct.entityProduct.name = this.dtoPurchaseOrder.products[productCounter].entityProduct.name;
                dtoProduct.entityProduct.costPrice = this.dtoPurchaseOrder.products[productCounter].entityProduct.costPrice;
                dtoProduct.discount = this.dtoPurchaseOrder.products[productCounter].discount;
            }
        }
        let purchasedProductCounter: number;
        if (this.productIdToPopupSelectReturnProduct == 0 && dtoProduct.entityProduct.id > 0) {
            let isAppend: boolean = true;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.returnProducts.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    //from empty cell/add button, selecting a product whish is already in product list
                    this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].quantity = (this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].quantity + 1);
                    isAppend = false;
                    break;
                }
            }
            if (isAppend)
            {
                this.dtoPurchaseOrder.returnProducts[this.dtoPurchaseOrder.returnProducts.length] = dtoProduct;
            }           
        }
        else {
            let tempProducts: DTOProduct[] = Array();
            let isOverWrite: boolean = false;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.returnProducts.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].entityProduct.id == dtoProduct.entityProduct.id) {
                    this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].quantity = (this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].quantity + 1);
                    isOverWrite = true;
                    break;
                }
            }
            let tempProductsCounter: number = 0;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.returnProducts.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].entityProduct.id == this.productIdToPopupSelectReturnProduct) {
                    if (!isOverWrite)
                    {
                        this.dtoPurchaseOrder.returnProducts[purchasedProductCounter] = dtoProduct;                        
                    }
                    tempProducts[tempProductsCounter] = this.dtoPurchaseOrder.returnProducts[purchasedProductCounter];
                    tempProductsCounter++;
                }
                else
                {
                    tempProducts[tempProductsCounter] = this.dtoPurchaseOrder.returnProducts[purchasedProductCounter];
                    tempProductsCounter++;
                }
            }
            this.dtoPurchaseOrder.returnProducts = tempProducts;      
        }
        this.calculateBalance();
    }
    showSelectedPurchaseOrderReturnedProductDeleteModal(event: Event, productId: number)
    {
        this.productIdToPopupDeleteReturnProduct = productId;
        this.selectedPurchaseOrderReturnedProductDeleteModal.config.backdrop = false;
        this.selectedPurchaseOrderReturnedProductDeleteModal.show();
    }
    deleteSelectedReturnedProductFromPurchaseOrder(event: Event)
    {
        let tempDTOProductlist: DTOProduct[] = Array();
        this.selectedPurchaseOrderReturnedProductDeleteModal.hide();
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.returnProducts.length; purchasedProductCounter++) {
            if (this.dtoPurchaseOrder.returnProducts[purchasedProductCounter].entityProduct.id != this.productIdToPopupDeleteReturnProduct) {
                tempDTOProductlist[tempDTOProductlist.length] = this.dtoPurchaseOrder.returnProducts[purchasedProductCounter];
            }
        }
        this.dtoPurchaseOrder.returnProducts = tempDTOProductlist;
        this.calculateBalance();
    }
    //Return products section ends
}



