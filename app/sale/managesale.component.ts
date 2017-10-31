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
import {EntityUOM} from '../dto/EntityUOM';
import {DTOProduct} from '../dto/DTOProduct';

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
    private webAPIService: WebAPIService;
    private dtoSaleOrder: DTOSaleOrder;
    private orderNo: string;
    private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];

    private reqDTOCustomer: DTOCustomer;
    private dtoCustomer: DTOCustomer;
    private customerList: DTOCustomer[];
    //private searchDTOCustomer: DTOCustomer;

    private reqDTOProduct: DTOProduct;
    //private entityProduct: EntityProduct;
    //private searchEntityProduct: EntityProduct;
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    //private uomList: EntityUOM[];
    private productList: EntityProduct[];
    //private productId: number;
    private productIdToPopupSelectProduct: number;
    private productIdToPopupDeleteProduct: number;

    private reqStockDTOProduct: DTOProduct;
    private stockProductList: DTOProduct[];

    //    private manageSaleSuccessMessage : string;
    private manageSaleErrorMessage: string;

    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.reqDTOSaleOrder = new DTOSaleOrder();
        this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.reqDTOSaleOrder.limit = 10;
        this.reqDTOSaleOrder.offset = 0;
        this.fetchSaleOrderList();
        //this.saleOrderList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":1,\"orderNo\":\"order1\",\"customerUserId\":4,\"statusId\":0,\"saleDate\":0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false},{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":2,\"orderNo\":\"order2\",\"customerUserId\":2,\"statusId\":0,\"saleDate\":0,\"discount\":10.0,\"total\":10.0,\"paid\":10.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"accountStatusId\":1,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}]");

        this.dtoSaleOrder = new DTOSaleOrder();
        this.dtoSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.dtoSaleOrder.entitySaleOrder.id = 0;
        this.dtoSaleOrder.dtoCustomer = new DTOCustomer();
        this.dtoSaleOrder.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoSaleOrder.dtoCustomer.entityUser = new EntityUser();
        this.dtoSaleOrder.dtoCustomer.entityUserRole = new EntityUserRole();
        this.dtoSaleOrder.products = Array();

        //this.searchDTOCustomer = new DTOCustomer();
        //this.searchDTOCustomer.entityUser = new EntityUser();
        //this.reqDTOCustomer = new DTOCustomer();
        //this.dtoCustomer = JSON.parse("{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"remarks\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}");
        //this.customerList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":2,\"userId\":2,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Mohiuddin\",\"lastName\":\"Mishu\",\"email\":\"customer2@gmail.com\",\"cell\":\"01511223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":2,\"userId\":2,\"roleId\":2},\"reasonCode\":1000,\"success\":true}]");

        this.reqDTOCustomer = new DTOCustomer();
        this.reqDTOCustomer.entityCustomer = new EntityCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer.limit = 10;
        this.reqDTOCustomer.offset = 0;
        this.fetchCustomerList();
        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();

        this.fetchProductCategoryList();
        this.fetchProductTypeList();
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
        this.fetchProductList();

        this.reqStockDTOProduct = new DTOProduct();
        this.reqStockDTOProduct.entityProduct = new EntityProduct();
        this.reqStockDTOProduct.limit = 10;
        this.reqStockDTOProduct.offset = 0;
        this.fetchCurrentStock();

        //this.searchEntityProduct = new EntityProduct();
        //this.entityProduct = JSON.parse("{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"length\":\"10 cm\",\"width\":\"20 cm\",\"height\":\"30 cm\",\"weight\":\"40 cm\",\"remark\":\"This is a good product...\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}");
        //this.productCategoryList = JSON.parse("[{\"id\":1,\"title\":\"Product category1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product category2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.productTypeList = JSON.parse("[{\"id\":1,\"title\":\"Product type1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product type2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.uomList = JSON.parse("[{\"id\":1,\"title\":\"UOM1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"UOM2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.productList = JSON.parse("[{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":3,\"name\":\"product3\",\"code\":\"code3\",\"categoryId\":3,\"categoryTitle\":\"Product category3\",\"typeId\":3,\"typeTitle\":\"Product type3\",\"unitPrice\":30.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":4,\"name\":\"product4\",\"code\":\"code4\",\"categoryId\":4,\"categoryTitle\":\"Product category4\",\"typeId\":4,\"typeTitle\":\"Product type4\",\"unitPrice\":40.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":5,\"name\":\"product5\",\"code\":\"code5\",\"categoryId\":5,\"categoryTitle\":\"Product category5\",\"typeId\":5,\"typeTitle\":\"Product type5\",\"unitPrice\":50.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":6,\"name\":\"product6\",\"code\":\"code6\",\"categoryId\":6,\"categoryTitle\":\"Product category6\",\"typeId\":6,\"typeTitle\":\"Product type6\",\"unitPrice\":60.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":7,\"name\":\"product7\",\"code\":\"code7\",\"categoryId\":7,\"categoryTitle\":\"Product category7\",\"typeId\":7,\"typeTitle\":\"Product type17\",\"unitPrice\":70.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":8,\"name\":\"product8\",\"code\":\"code8\",\"categoryId\":8,\"categoryTitle\":\"Product category8\",\"typeId\":8,\"typeTitle\":\"Product type8\",\"unitPrice\":80.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":9,\"name\":\"product9\",\"code\":\"code9\",\"categoryId\":9,\"categoryTitle\":\"Product category9\",\"typeId\":9,\"typeTitle\":\"Product type9\",\"unitPrice\":90.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":10,\"name\":\"product10\",\"code\":\"code1\",\"categoryId\":10,\"categoryTitle\":\"Product category10\",\"typeId\":10,\"typeTitle\":\"Product type10\",\"unitPrice\":100.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":11,\"name\":\"product11\",\"code\":\"code11\",\"categoryId\":11,\"categoryTitle\":\"Product category11\",\"typeId\":11,\"typeTitle\":\"Product type11\",\"unitPrice\":110.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":12,\"name\":\"product12\",\"code\":\"code12\",\"categoryId\":12,\"categoryTitle\":\"Product category12\",\"typeId\":12,\"typeTitle\":\"Product type12\",\"unitPrice\":120.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //console.log(this.entityProduct);
        //console.log(this.productCategoryList);
        //console.log(this.productTypeList);
        //console.log(this.uomList);
        //console.log(this.productList);
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.orderNo = params['orderNo'];
            this.setSaleOrderInfo(this.orderNo);
        });
    }

    searchSaleOrder(event: Event) {
        console.log(this.reqDTOSaleOrder.entitySaleOrder.orderNo);
    }




    selectedSaleOrderCustomer(event: Event, id: number) {
        console.log(id);
    }
    selectedSaleOrderProduct(event: Event, id: number) {
        console.log(id);
    }

    selectedSaleOrderProductDetails(event: Event, id: number) {
        console.log(id);
    }
    selectedSaleOrderProductDelete(event: Event, id: number) {
        console.log(id);
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
        this.fetchCustomerList();
    }
    public fetchCustomerList() {
        this.reqDTOCustomer.limit = 10;
        this.reqDTOCustomer.offset = 0;
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
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
            }
        }
    }
    //product section
    searchSaleOrderProduct(event: Event) {
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
    public showSaleOrderProductModal(event: Event, productId: number) {
        this.productIdToPopupSelectProduct = productId;
        this.saleOrderProductModal.config.backdrop = false;
        this.saleOrderProductModal.show();
    }

    public selectedSaleOrderProductFromModal(event: Event, productId: number) {
        this.saleOrderProductModal.hide();
        let dtoProduct: DTOProduct = new DTOProduct();
        dtoProduct.entityProduct = new EntityProduct();
        let productCounter: number;
        for (productCounter = 0; productCounter < this.productList.length; productCounter++) {
            if (this.productList[productCounter].id == productId) {
                dtoProduct.entityProduct = this.productList[productCounter];
            }
        }
        if (this.productIdToPopupSelectProduct == 0 && dtoProduct.entityProduct.id > 0) {
            this.dtoSaleOrder.products[this.dtoSaleOrder.products.length] = dtoProduct;
        }
        else {
            let saleProductCounter: number;
            for (saleProductCounter = 0; saleProductCounter < this.dtoSaleOrder.products.length; saleProductCounter++) {
                if (this.dtoSaleOrder.products[saleProductCounter].entityProduct.id == this.productIdToPopupSelectProduct) {
                    this.dtoSaleOrder.products[saleProductCounter] = dtoProduct;
                    break;
                }
            }
        }
        this.calculateBalance();
    }

    public showSelectedSaleOrderProductDeleteModal(event: Event, productId: number) {
        this.productIdToPopupDeleteProduct = productId;
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
        let purchasedProductCounter: number;
        for (purchasedProductCounter = 0; purchasedProductCounter < this.dtoSaleOrder.products.length; purchasedProductCounter++) {
            let currentPrice: number = this.dtoSaleOrder.products[purchasedProductCounter].quantity * this.dtoSaleOrder.products[purchasedProductCounter].entityProduct.unitPrice - this.dtoSaleOrder.products[purchasedProductCounter].discount;
            this.dtoSaleOrder.products[purchasedProductCounter].total = currentPrice;
            totalPrice = totalPrice + currentPrice;
        }
        this.dtoSaleOrder.entitySaleOrder.total = totalPrice;
    }
    //sale save/update section
    public newSaleOrder(event: Event) {
        this.resetSaleOrder();
    }

    public resetSaleOrder() {
        this.dtoSaleOrder = new DTOSaleOrder();
        this.dtoSaleOrder.entitySaleOrder = new EntitySaleOrder();
        this.dtoSaleOrder.entitySaleOrder.id = 0;
        this.dtoSaleOrder.dtoCustomer = new DTOCustomer();
        this.dtoSaleOrder.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoSaleOrder.dtoCustomer.entityUser = new EntityUser();
        this.dtoSaleOrder.dtoCustomer.entityUserRole = new EntityUserRole();
        this.dtoSaleOrder.products = Array();

        this.reqDTOCustomer = new DTOCustomer();
        this.reqDTOCustomer.entityCustomer = new EntityCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer.limit = 10;
        this.reqDTOCustomer.offset = 0;
        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();

        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
    }

    saveSaleOrder(event: Event) {
         console.log(this.stockProductList);
        //check sale order no
        if (this.dtoSaleOrder.entitySaleOrder.orderNo == null || this.dtoSaleOrder.entitySaleOrder.orderNo == "") {
            //            this.manageSaleSuccessMessage = "";
            this.manageSaleErrorMessage = "Invalid sale order no.";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        //check customer selection
        if (this.dtoCustomer.entityUser.firstName == null || this.dtoCustomer.entityUser.firstName == "") {
            //            this.manageSaleSuccessMessage = "";
            this.manageSaleErrorMessage = "Select a customer";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
        //check product selection
        if (this.dtoSaleOrder.products == null) {
            //            this.manageSaleSuccessMessage = "";
            this.manageSaleErrorMessage = "Select a product";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }


        //-----------------------
        //check current stock before saving sale order
        let tempProductList: DTOProduct[] = this.dtoSaleOrder.products;
        let productCounter: number = 0;
        let isValidStock: boolean = false;
        for (productCounter = 0; productCounter < tempProductList.length; productCounter++) {
            let tempValid: boolean = false;
            let stockProductCounter: number = 0;
            for (stockProductCounter = 0; stockProductCounter < this.stockProductList.length; stockProductCounter++) {
                if (tempProductList[productCounter].entityProduct.id == this.stockProductList[stockProductCounter].entityProduct.id && tempProductList[productCounter].quantity <= this.stockProductList[stockProductCounter].quantity) {
                    tempValid = true;
                }
            }
            if (tempValid) {
                isValidStock = true;
            }
            else {
                this.manageSaleErrorMessage = "Insufficient Stock for the product : " + tempProductList[productCounter].entityProduct.name;
            }
        }
        if (!isValidStock) {
            //            this.manageSaleSuccessMessage = "";
            this.manageSaleMessageDispalyModal.config.backdrop = false;
            this.manageSaleMessageDispalyModal.show();
            return;
        }
       
        let requestBody: string = JSON.stringify(this.dtoSaleOrder);
        if (this.dtoSaleOrder.entitySaleOrder.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SALE_ORDER_INFO), requestBody).then(result => {
                if (result.success) {
                    //                    this.manageSaleSuccessMessage = result.message;
                    this.manageSaleErrorMessage = "";

                    this.resetSaleOrder();

                    //update left panel sale order list
                    this.reqDTOSaleOrder = new DTOSaleOrder();
                    this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
                    this.reqDTOSaleOrder.limit = 10;
                    this.reqDTOSaleOrder.offset = 0;
                    this.fetchSaleOrderList();

                    //update current stock
                    this.reqStockDTOProduct = new DTOProduct();
                    this.reqStockDTOProduct.entityProduct = new EntityProduct();
                    this.reqStockDTOProduct.limit = 10;
                    this.reqStockDTOProduct.offset = 0;
                    this.fetchCurrentStock();
                }
                else {
                    //                    this.manageSaleSuccessMessage = "";
                    this.manageSaleErrorMessage = result.message;

                    this.manageSaleMessageDispalyModal.config.backdrop = false;
                    this.manageSaleMessageDispalyModal.show();
                }
            });
        }
        else {
            //handle to update sale order
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_SALE_ORDER_INFO), requestBody).then(result => {
                console.log(result);
                if (result.success) {
                    //                    this.manageSaleSuccessMessage = result.message;
                    this.manageSaleErrorMessage = "";

                    this.resetSaleOrder();

                    //update left panel sale order list
                    this.reqDTOSaleOrder = new DTOSaleOrder();
                    this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
                    this.reqDTOSaleOrder.limit = 10;
                    this.reqDTOSaleOrder.offset = 0;
                    this.fetchSaleOrderList();

                    //update current stock
                    this.reqStockDTOProduct = new DTOProduct();
                    this.reqStockDTOProduct.entityProduct = new EntityProduct();
                    this.reqStockDTOProduct.limit = 10;
                    this.reqStockDTOProduct.offset = 0;
                    this.fetchCurrentStock();
                }
                else {
                    //                    this.manageSaleSuccessMessage = "";
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
        this.setSaleOrderInfo(orderNo);
    }

    public fetchCurrentStock() {
        let requestBody: string = JSON.stringify(this.reqStockDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CURRENT_STOCK), requestBody).then(result => {
            if (result.success && result.products != null) {
                this.stockProductList = result.products;
            }
            else {

            }
        });
    }
}




