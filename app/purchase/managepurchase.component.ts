import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {TabsetComponent} from 'ngx-bootstrap';

import {DTOPurchaseOrder} from '../dto/DTOPurchaseOrder';
import {EntityPurchaseOrder} from '../dto/EntityPurchaseOrder';

import {EntityUser} from '../dto/EntityUser';
import {EntitySupplier} from "../dto/EntitySupplier";
import {EntityUserRole} from "../dto/EntityUserRole";
import {DTOSupplier} from '../dto/DTOSupplier';

import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';

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
    private reqDTOProduct: DTOProduct;
    private productList: EntityProduct[];

    private entityProduct: EntityProduct;
    private searchEntityProduct: EntityProduct;
    //private productId: number;
    private productIdToPopupSelectProduct: number;
    private productIdToPopupDeleteProduct: number;

    private managePurchaseSuccessMessage: string;
    private managePurchaseErrorMessage: string;

    constructor(private marketAPI: MarketAPI, private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;

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

        this.reqDTOSupplier = new DTOSupplier();
        this.reqDTOSupplier.entitySupplier = new EntitySupplier();
        this.reqDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier.limit = 10;
        this.reqDTOSupplier.offset = 0;
        this.fetchSupplierList();
        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();

        //this.dtoSupplier = JSON.parse("{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":3,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":3,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}");
        //this.supplierList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":1,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":2,\"userId\":2,\"remarks\":10,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":2,\"firstName\":\"Nazmul\",\"lastName\":\"Islam\",\"email\":\"supplier2@gmail.com\",\"cell\":\"01912341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");

        this.fetchProductCategoryList();
        this.fetchProductTypeList();
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
        this.fetchProductList();


        this.searchEntityProduct = new EntityProduct();
        this.entityProduct = JSON.parse("{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"length\":\"10 cm\",\"width\":\"20 cm\",\"height\":\"30 cm\",\"weight\":\"40 cm\",\"remark\":\"This is a good product...\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}");
        //this.productCategoryList = JSON.parse("[{\"id\":1,\"title\":\"Product category1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product category2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.productTypeList = JSON.parse("[{\"id\":1,\"title\":\"Product type1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product type2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.uomList = JSON.parse("[{\"id\":1,\"title\":\"UOM1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"UOM2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.productList = JSON.parse("[{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":3,\"name\":\"product3\",\"code\":\"code3\",\"categoryId\":3,\"categoryTitle\":\"Product category3\",\"typeId\":3,\"typeTitle\":\"Product type3\",\"unitPrice\":30.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":4,\"name\":\"product4\",\"code\":\"code4\",\"categoryId\":4,\"categoryTitle\":\"Product category4\",\"typeId\":4,\"typeTitle\":\"Product type4\",\"unitPrice\":40.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":5,\"name\":\"product5\",\"code\":\"code5\",\"categoryId\":5,\"categoryTitle\":\"Product category5\",\"typeId\":5,\"typeTitle\":\"Product type5\",\"unitPrice\":50.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":6,\"name\":\"product6\",\"code\":\"code6\",\"categoryId\":6,\"categoryTitle\":\"Product category6\",\"typeId\":6,\"typeTitle\":\"Product type6\",\"unitPrice\":60.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":7,\"name\":\"product7\",\"code\":\"code7\",\"categoryId\":7,\"categoryTitle\":\"Product category7\",\"typeId\":7,\"typeTitle\":\"Product type17\",\"unitPrice\":70.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":8,\"name\":\"product8\",\"code\":\"code8\",\"categoryId\":8,\"categoryTitle\":\"Product category8\",\"typeId\":8,\"typeTitle\":\"Product type8\",\"unitPrice\":80.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":9,\"name\":\"product9\",\"code\":\"code9\",\"categoryId\":9,\"categoryTitle\":\"Product category9\",\"typeId\":9,\"typeTitle\":\"Product type9\",\"unitPrice\":90.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":10,\"name\":\"product10\",\"code\":\"code1\",\"categoryId\":10,\"categoryTitle\":\"Product category10\",\"typeId\":10,\"typeTitle\":\"Product type10\",\"unitPrice\":100.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":11,\"name\":\"product11\",\"code\":\"code11\",\"categoryId\":11,\"categoryTitle\":\"Product category11\",\"typeId\":11,\"typeTitle\":\"Product type11\",\"unitPrice\":110.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":12,\"name\":\"product12\",\"code\":\"code12\",\"categoryId\":12,\"categoryTitle\":\"Product category12\",\"typeId\":12,\"typeTitle\":\"Product type12\",\"unitPrice\":120.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.orderNo = params['orderNo'];
            this.setPurchaseOrderInfo(this.orderNo);



            //this.dtoPurchaseOrder = JSON.parse("{\"limit\":12,\"offset\":0,\"entityPurchaseOrder\":{\"id\":1,\"orderNo\":\"order1\",\"supplierUserId\":3,\"orderDate\":0,\"requestedShipDate\":0,\"subtotal\":0.0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoSupplier\":{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":0,\"userId\":0,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}");
            //this.dtoPurchaseOrder.products = JSON.parse("[{\"limit\":10, \"offset\":0, \"quantity\":50, \"entityProduct\":{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":100, \"entityProduct\":{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":20,\"saleUOMId\":20,\"purchaseUOMId\":20,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":50, \"entityProduct\":{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":100, \"entityProduct\":{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":20,\"saleUOMId\":20,\"purchaseUOMId\":20,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":50, \"entityProduct\":{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":100, \"entityProduct\":{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":20,\"saleUOMId\":20,\"purchaseUOMId\":20,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":50, \"entityProduct\":{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}},{\"limit\":10, \"offset\":0, \"quantity\":100, \"entityProduct\":{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":20,\"saleUOMId\":20,\"purchaseUOMId\":20,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}}]");
            //console.log(this.orderNo);
            //console.log(this.dtoPurchaseOrder);
            //console.log(this.dtoPurchaseOrder.products);
        });
    }

    searchPurchaseOrder(event: Event) {
        console.log(this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo);
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


    //    purchaseOrderProductPagination(event: Event) {
    //        let counter: number;
    //        let limit: number;
    //        let products: number;
    //        counter = 0;
    //        limit = this.dtoPurchaseOrder.limit;
    //        products = this.dtoPurchaseOrder.products.length;
    //        if (products == 0) {
    //            
    //        }
    //        if ((products % limit) == 0) {
    //            for (limit = 10; limit < products; limit + 10) {
    //                  counter = counter + 1;
    //            }
    //             //console.log(counter);
    //        }
    //        else {
    //            for (limit = 10; limit < products; limit + 10) {
    //                  counter = counter + 1;
    //            }
    //            counter = counter + 1;
    //             //console.log(counter);
    //        }
    //
    //    }

    //    test(event: Event) {
    //        this.dtoPurchaseOrder.products[this.dtoPurchaseOrder.products.length] = JSON.parse("{\"limit\":10, \"offset\":0, \"quantity\":50, \"entityProduct\":{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}}");
    //    }
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
            }
        });
    }

    public showPurchaseOrderSupplierModal(event: Event) {
        this.purchaseOrderSupplierModal.config.backdrop = false;
        this.purchaseOrderSupplierModal.show();
    }

    public searchPurchaseOrderSupplier(event: Event) {
        this.fetchSupplierList();
    }

    public selectedSupplier(event: Event, supplierId: number) {
        this.purchaseOrderSupplierModal.hide();
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++) {
            if (this.supplierList[supplierCounter].entitySupplier.id == supplierId) {
                this.dtoSupplier = this.supplierList[supplierCounter];
                this.dtoPurchaseOrder.entityPurchaseOrder.supplierUserId = this.dtoSupplier.entityUser.id;
            }
        }
    }

    //product section
    public searchPurchaseOrderProduct(event: Event) {
        this.fetchProductList();
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

    public fetchProductTypeList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_PRODUCT_TYPES), requestBody).then(result => {
            if (result.success && result.productTypes != null) {
                this.productTypeList = result.productTypes;
            }
            else {
                //console.log(result);
            }
        });
    }
    public fetchProductList() {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.products != null) {
                this.productList = result.products;
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

        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.productList.length; productCounter++) {
            if (this.productList[productCounter].id == productId) {
                dtoProduct.entityProduct = this.productList[productCounter];
            }
        }
        if (this.productIdToPopupSelectProduct == 0 && dtoProduct.entityProduct.id > 0) {
            this.dtoPurchaseOrder.products[this.dtoPurchaseOrder.products.length] = dtoProduct;
        }
        else {
            let purchasedProductCounter: number;
            for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoPurchaseOrder.products.length; purchasedProductCounter++) {
                if (this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.id == this.productIdToPopupSelectProduct) {
                    this.dtoPurchaseOrder.products[purchasedProductCounter] = dtoProduct;
                    break;
                }
            }
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
            let currentPrice: number = this.dtoPurchaseOrder.products[purchasedProductCounter].quantity * this.dtoPurchaseOrder.products[purchasedProductCounter].entityProduct.unitPrice - this.dtoPurchaseOrder.products[purchasedProductCounter].discount;
            this.dtoPurchaseOrder.products[purchasedProductCounter].total = currentPrice;
            totalPrice = totalPrice + currentPrice;
        }
        this.dtoPurchaseOrder.entityPurchaseOrder.total = totalPrice;
    }

    //purchase add/save section
    public newPurchaseOrder(event: Event) {
        this.resetPurchaseOrder();
    }

    public resetPurchaseOrder() {
        this.dtoPurchaseOrder = new DTOPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
        this.dtoPurchaseOrder.entityPurchaseOrder.id = 0;
        this.dtoPurchaseOrder.dtoSupplier = new DTOSupplier();
        this.dtoPurchaseOrder.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoPurchaseOrder.dtoSupplier.entityUser = new EntityUser();
        this.dtoPurchaseOrder.dtoSupplier.entityUserRole = new EntityUserRole();
        this.dtoPurchaseOrder.products = Array();

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
    }

    public savePurchaseOrder(event: Event) {
        //check purchase order no
        if (this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo == null || this.reqDTOPurchaseOrder.entityPurchaseOrder.orderNo == "") {
            this.managePurchaseSuccessMessage = "";
            this.managePurchaseErrorMessage = "Invalid purchase order no.";
            this.managePurchaseMessageDispalyModal.config.backdrop = false;
            this.managePurchaseMessageDispalyModal.show();
            return;
        }
        //check supplier selection
        if (this.dtoSupplier.entityUser.firstName == null || this.dtoSupplier.entityUser.firstName == "") {
            this.managePurchaseSuccessMessage = "";
            this.managePurchaseErrorMessage = "Select a supplier";
            this.managePurchaseMessageDispalyModal.config.backdrop = false;
            this.managePurchaseMessageDispalyModal.show();
            return;
        }
        //check product selection
        if (this.dtoPurchaseOrder.products == null) {
            this.managePurchaseSuccessMessage = "";
            this.managePurchaseErrorMessage = "Select a product";
            this.managePurchaseMessageDispalyModal.config.backdrop = false;
            this.managePurchaseMessageDispalyModal.show();
            return;
        }

        let requestBody: string = JSON.stringify(this.dtoPurchaseOrder);
        console.log(requestBody);
        if (this.dtoPurchaseOrder.entityPurchaseOrder.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PURCHASE_ORDER_INFO), requestBody).then(result => {
                if (result.success) {
                    //set success message
                    this.managePurchaseSuccessMessage = result.message;
                    this.managePurchaseErrorMessage = "";

                    //reset purchase order
                    this.resetPurchaseOrder();

                    //update left panel purchase order list
                    this.reqDTOPurchaseOrder = new DTOPurchaseOrder();
                    this.reqDTOPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
                    this.reqDTOPurchaseOrder.limit = 10;
                    this.reqDTOPurchaseOrder.offset = 0;
                    this.fetchPurchaseOrderList();
                }
                else {
                    //set error message
                    this.managePurchaseSuccessMessage = "";
                    this.managePurchaseErrorMessage = result.message;
                }
                //display pop up with message
                this.managePurchaseMessageDispalyModal.config.backdrop = false;
                this.managePurchaseMessageDispalyModal.show();
            });
        }
        else {
            //handle to update purchase order
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_PURCHASE_ORDER_INFO), requestBody).then(result => {
                console.log(result);
                if (result.success) {
                    //set success message
                    this.managePurchaseSuccessMessage = result.message;
                    this.managePurchaseErrorMessage = "";

                    //reset purchase order
                    this.resetPurchaseOrder();

                    //update left panel purchase order list
                    this.reqDTOPurchaseOrder = new DTOPurchaseOrder();
                    this.reqDTOPurchaseOrder.entityPurchaseOrder = new EntityPurchaseOrder();
                    this.reqDTOPurchaseOrder.limit = 10;
                    this.reqDTOPurchaseOrder.offset = 0;
                    this.fetchPurchaseOrderList();
                }
                else {
                    //set error message
                    this.managePurchaseSuccessMessage = "";
                    this.managePurchaseErrorMessage = result.message;
                }
                //display pop up with message
                this.managePurchaseMessageDispalyModal.config.backdrop = false;
                this.managePurchaseMessageDispalyModal.show();
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
        this.setPurchaseOrderInfo(orderNo);
    }
}



