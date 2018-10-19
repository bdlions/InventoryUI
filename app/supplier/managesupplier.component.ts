import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {TabsetComponent} from 'ngx-bootstrap';
import {EntityUser} from '../dto/EntityUser';
import {EntityProductSupplier} from "../dto/EntityProductSupplier";
import {EntitySupplier} from "../dto/EntitySupplier";
import {EntityUserRole} from "../dto/EntityUserRole";
import {DTOSupplier} from '../dto/DTOSupplier';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityPurchaseOrderPayment} from "../dto/EntityPurchaseOrderPayment";
import {DTOPurchaseOrderPayment} from "../dto/DTOPurchaseOrderPayment";
import {NavigationManager} from "../services/NavigationManager";
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/managesupplier.component.html',
    providers: [WebAPIService, DatePipe]
})

export class ManageSupplierComponent {
    @ViewChild('manageSupplierProductModal') public manageSupplierProductModal: ModalDirective;
    @ViewChild('manageSupplierSelectedProductDeleteModal') public manageSupplierSelectedProductDeleteModal: ModalDirective;
    @ViewChild('manageSupplierMessageDispalyModal') public manageSupplierMessageDispalyModal: ModalDirective;
    private datePipe: DatePipe;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private reqDTOSupplier: DTOSupplier;
    private dtoSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    
    private totalPaymentAmount:number;
    
    public showPaymentDatePicker: boolean = false;
    public paymentDate: Date = new Date();
    public minDate: Date = void 0;
    private entityPurchaseOrderPayment: EntityPurchaseOrderPayment;
    private purchaseOrderPaymentList: DTOPurchaseOrderPayment[];
    private paymentOrdersLimit: number = 10;
    private paymentOrdersOffset: number = 0;
    
    
    //private searchDTOSupplier: DTOSupplier;
    private showNavBar: boolean = false;
    private activeMenu: string = "managesupplier";
    private supplierId: number;
    //    private manageSupplierSuccessMessage: string;
    private manageSupplierErrorMessage: string;
    
    private entityProductSupplierList: EntityProductSupplier[];
    
    private reqDTOSupplierProductList: DTOSupplier;
    
    private disableSaveButton: boolean = false;
    private disablePaymentSaveButton: boolean = false;
    
    //constants & constraints
    private maxSupplierLeftPanel: number = 10;    
    
    supplierProductLength = 0;
    supplierProductPageSize = 10;
    supplierProductPageSizeOptions = [5, 10];
    
    private reqDTOProduct: DTOProduct;
    private productRequestId: number;
    private productList: EntityProduct[];
    private productIdToBeDeleted: number;
    productLength = 0;
    productPageSize = 10;
    productPageSizeOptions = [5, 10];
    
    paymentLength = 0;
    paymentPageSize = 10;
    paymentPageSizeOptions = [5, 10];

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
        this.totalPaymentAmount = 0;
        this.datePipe = datepipe;
        this.webAPIService = webAPIService;
        this.reqDTOSupplier = new DTOSupplier();
        this.reqDTOSupplier.entitySupplier = new EntitySupplier();
        this.reqDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier.entityUserRole = new EntityUserRole();
        
        this.reqDTOSupplierProductList = new DTOSupplier();
        this.reqDTOSupplierProductList.entityUser = new EntityUser();
        this.reqDTOSupplierProductList.offset = 0;
        this.reqDTOSupplierProductList.limit = 10;

        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();        
        this.dtoSupplier.entityProductSupplierList = null;
        this.dtoSupplier.epsListToBeDeleted = Array();

        this.reqDTOSupplier.limit = 10;
        this.reqDTOSupplier.offset = 0;
        this.fetchSupplierList();
        
        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = this.productPageSize;
        this.reqDTOProduct.offset = 0;
        this.productList = Array();
        this.productRequestId = ACTION.FETCH_PRODUCTS;
        this.fetchProductList();
        
        this.entityPurchaseOrderPayment = new EntityPurchaseOrderPayment();
        this.purchaseOrderPaymentList = Array();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.supplierId = params['supplierId'];            
            if(this.supplierId != null && this.supplierId > 0)
            {
                let dtoSupplier: DTOSupplier = new DTOSupplier();
                dtoSupplier.entitySupplier = new EntitySupplier();
                dtoSupplier.entityUser = new EntityUser();
                dtoSupplier.entityUserRole = new EntityUserRole();
                dtoSupplier.entitySupplier.id = this.supplierId;
                this.fetchSupplierInfo(dtoSupplier);
            }            
        });
    }
    
    //Modal Window hide starts
    public hideManageSupplierProductModal(): void 
    {
        this.manageSupplierProductModal.hide();
    }
    public hideManageSupplierSelectedProductDeleteModal(): void 
    {
        this.manageSupplierSelectedProductDeleteModal.hide();
    }
    public hideManageSupplierMessageDispalyModal(): void {
        this.manageSupplierMessageDispalyModal.hide();
    }    
    //Modal window hide ends

    //Supplier product list manage starts
    setSupplierProductList(event: Event)
    {
        if (this.dtoSupplier.entityProductSupplierList == null)
        {
            if (this.dtoSupplier.entityUser.id != null && this.dtoSupplier.entityUser.id > 0)
            {
                this.reqDTOSupplierProductList.entityUser.id = this.dtoSupplier.entityUser.id;
            }
            else
            {
                this.reqDTOSupplierProductList.entityUser.id = 0;
            }
            this.fetchSupplierProductList();
        }
    }    
    fetchSupplierProductList()
    {
        let requestBody: string = JSON.stringify(this.reqDTOSupplierProductList);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_PRODUCT_LIST), requestBody).then(result => {
            if (result.success) {
                if(result.list != null)
                {
                    this.dtoSupplier.entityProductSupplierList = result.list;
                    this.supplierProductLength = result.counter;
                }
                else
                {
                    this.dtoSupplier.entityProductSupplierList = Array();
                }
            }
        });
    }    
    public showManageSupplierProductModal(event: Event, productId: number) 
    {
        this.manageSupplierProductModal.config.backdrop = false;
        this.manageSupplierProductModal.show();
    }    
    onSupplierProductPaginateChange(event:PageEvent)
    {
        this.reqDTOSupplierProductList.limit = event.pageSize;
        this.reqDTOSupplierProductList.offset = (event.pageIndex * event.pageSize) ;
        this.fetchSupplierProductList();
    }
    selectedProductFromModal(event: Event, productId: number)
    {
        this.manageSupplierProductModal.config.backdrop = false;
        this.manageSupplierProductModal.hide();
        this.appendProductInSupplierProductList(productId);
    }
    appendProductInSupplierProductList(productId: number)
    {
        let entityProduct: EntityProduct = new EntityProduct();
        for (let counter: number = 0; counter < this.productList.length; counter++)
        {
            if (this.productList[counter].id == productId)
            {
                entityProduct = this.productList[counter];
            }
        }
        if (entityProduct.id <= 0)
        {
            return;
        }
        let entityProductSupplier: EntityProductSupplier = new EntityProductSupplier();
        entityProductSupplier.productId = entityProduct.id;
        entityProductSupplier.productName = entityProduct.name;
        let isAppend: boolean = true;
        let tempEntityProductSupplierList: EntityProductSupplier[] = Array();
        for (let counter: number = 0; counter < this.dtoSupplier.entityProductSupplierList.length; counter++)
        {
            if (this.dtoSupplier.entityProductSupplierList[counter].productId == entityProduct.id)
            {
                isAppend = false;
                tempEntityProductSupplierList[tempEntityProductSupplierList.length] = entityProductSupplier;
            }
            else
            {
                tempEntityProductSupplierList[tempEntityProductSupplierList.length] = this.dtoSupplier.entityProductSupplierList[counter];
            }
        }
        if (isAppend)
        {
            tempEntityProductSupplierList[tempEntityProductSupplierList.length] = entityProductSupplier;
        }        
        this.dtoSupplier.entityProductSupplierList = tempEntityProductSupplierList;
        //if this supplier is in deleted list then remove this supplier from deleted list.
        let tempEpsList: EntityProductSupplier[] = Array();
        for (let counter: number = 0; counter < this.dtoSupplier.epsListToBeDeleted.length; counter++)
        {
            if (this.dtoSupplier.epsListToBeDeleted[counter].productId != productId)
            {
                tempEpsList[tempEpsList.length] = this.dtoSupplier.epsListToBeDeleted[counter];
            }
        }
        this.dtoSupplier.epsListToBeDeleted = tempEpsList;
    }
    public showManageSupplierSelectedProductDeleteModal(event: Event, productId: number) 
    {
        this.manageSupplierSelectedProductDeleteModal.config.backdrop = false;
        this.manageSupplierSelectedProductDeleteModal.show();
        this.productIdToBeDeleted = productId;
    }
    deleteSelectedProduct(event: Event)
    {
        let tempEntityProductSupplierList: EntityProductSupplier[] = Array();
        for (let counter: number = 0; counter < this.dtoSupplier.entityProductSupplierList.length; counter++)
        {
            if (this.dtoSupplier.entityProductSupplierList[counter].productId == this.productIdToBeDeleted)
            {
                //ignoring this supplier and add it to be delete list
                if (this.dtoSupplier.epsListToBeDeleted == null)
                {
                    this.dtoSupplier.epsListToBeDeleted = Array();
                }
                this.dtoSupplier.epsListToBeDeleted[this.dtoSupplier.epsListToBeDeleted.length] = this.dtoSupplier.entityProductSupplierList[counter];
            }
            else
            {
                tempEntityProductSupplierList[tempEntityProductSupplierList.length] = this.dtoSupplier.entityProductSupplierList[counter];
            }
        }
        this.dtoSupplier.entityProductSupplierList = tempEntityProductSupplierList;
        this.manageSupplierSelectedProductDeleteModal.config.backdrop = false;
        this.manageSupplierSelectedProductDeleteModal.hide();
    }
    //Supplier product list manage starts
    
    
    //Product List Management Starts
    public fetchProductList() {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS), requestBody).then(result => {
            if (result.success && result.products != null) {
                this.productList = result.products;
                this.productLength = result.totalProducts;
            }
            else {
                
            }
        });
    }    
    public searchProductsByName() {
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS_BY_NAME), requestBody).then(result => {
            if (result.success && result.products != null) {
                this.productList = result.products;
                this.productLength = result.totalProducts;
            }
            else {
                
            }
        });
    }    
    searchManageSupplierProduct(event: Event)
    {
        this.reqDTOProduct.limit = this.productPageSize;
        this.reqDTOProduct.offset = 0;
        if (this.reqDTOProduct.entityProduct.name != null && this.reqDTOProduct.entityProduct.name != "")
        {
            this.productRequestId = ACTION.FETCH_PRODUCTS_BY_NAME;
            this.searchProductsByName();
            return;
        }
        //if nothing is set then get all products
        this.productRequestId = ACTION.FETCH_PRODUCTS;
        this.fetchProductList();
    }    
    onProductPaginateChange(event:PageEvent)
    {
        this.reqDTOProduct.limit = event.pageSize;
        this.reqDTOProduct.offset = (event.pageIndex * event.pageSize) ;
        if (this.productRequestId == ACTION.FETCH_PRODUCTS)
        {
            this.fetchProductList();
        }
        else if (this.productRequestId == ACTION.FETCH_PRODUCTS_BY_NAME)
        {
            this.searchProductsByName();
        }
    }
    onPaymentPaginateChange(event:PageEvent)
    {
        this.paymentOrdersLimit = event.pageSize;
        this.paymentOrdersOffset = (event.pageIndex * event.pageSize) ;
        this.entityPurchaseOrderPayment = new EntityPurchaseOrderPayment();
        this.searchSupplierPayments(null);
    }
    //Product List Management Ends
    
    searchSupplier(event: Event) 
    {
        if (this.reqDTOSupplier.entitySupplier.supplierName != null && this.reqDTOSupplier.entitySupplier.supplierName != "") 
        {
            this.reqDTOSupplier.limit = 10;
            this.reqDTOSupplier.offset = 0;
            this.fetchSupplierListByName();
        }
        else {
            this.reqDTOSupplier.limit = 10;
            this.reqDTOSupplier.offset = 0;
            this.fetchSupplierList();
        }
    }

    newSupplier(event: Event) {
        this.disableSaveButton = false;
        this.supplierId = 0;
        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();
        this.entityPurchaseOrderPayment = new EntityPurchaseOrderPayment();
        this.purchaseOrderPaymentList = Array();
    }

    saveSupplier(event: Event) {
        //check supplier first name
        if (this.dtoSupplier.entityUser.userName == null || this.dtoSupplier.entityUser.userName == "") {
            this.manageSupplierErrorMessage = "Name is required.";
            this.manageSupplierMessageDispalyModal.config.backdrop = false;
            this.manageSupplierMessageDispalyModal.show();
            return;
        }
        if (this.dtoSupplier.entityProductSupplierList != null)
        {
            for (let counter: number = 0; counter < this.dtoSupplier.entityProductSupplierList.length; counter++)
            {
                if (this.dtoSupplier.entityProductSupplierList[counter].productId == null || this.dtoSupplier.entityProductSupplierList[counter].productId < 0)
                {
                    this.manageSupplierErrorMessage = "Invalid product in Product List.";
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                    return;
                }
                else if (this.dtoSupplier.entityProductSupplierList[counter].supplierPrice == null || this.dtoSupplier.entityProductSupplierList[counter].supplierPrice+"" == "" || this.dtoSupplier.entityProductSupplierList[counter].supplierPrice < 0)
                {
                    this.manageSupplierErrorMessage = "In Product List, please assign price for the product " + this.dtoSupplier.entityProductSupplierList[counter].productName;
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                    return;
                }
            }
        }
        //set a default password for the supplier
        this.dtoSupplier.entityUser.password = "pass";
        //we are not sending deleted product list if we want to add a new supplier.
        if (this.dtoSupplier.entitySupplier.id == null || this.dtoSupplier.entitySupplier.id <= 0) 
        {
            this.dtoSupplier.epsListToBeDeleted = null;
        }
        
        this.disableSaveButton = true;
        let requestBody: string = JSON.stringify(this.dtoSupplier);
        if (this.dtoSupplier.entitySupplier.id > 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_SUPPLIER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                if (result.success) { 
                    this.dtoSupplier = result;                  
                    this.manageSupplierUpdateLeftPanel();
                }
                else {
                    this.manageSupplierErrorMessage = result.message;
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                }
            });
        }
        else {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SUPPLIER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                console.log(result);
                if (result.success) {
                    //response from server contains newly created supplier id and user id
                    this.dtoSupplier = result;
                    this.manageSupplierUpdateLeftPanel();
                }
                else {
                    this.manageSupplierErrorMessage = result.message;
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                }
            });
        }
        //reset this supplier, fetch supplier list again
    }
    selectedSupplier(event: Event, supplierId: number) {
        event.preventDefault();
        this.supplierId = supplierId;
        //this.router.navigate(["managesupplier", {productId: supplierId}]);
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++) {
            if (this.supplierList[supplierCounter].entitySupplier.id == supplierId) {
                this.dtoSupplier = this.supplierList[supplierCounter];
                this.dtoSupplier.entityProductSupplierList = null;
                this.dtoSupplier.epsListToBeDeleted = Array();
                this.setSupplierProductList(event);
                this.searchSupplierPayments(null);
                this.fetchSupplierPurchaseAndPaymentAmount();  
                this.entityPurchaseOrderPayment = new EntityPurchaseOrderPayment();
            }
        }
    }

    public fetchSupplierList() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS), requestBody).then(result => {
//            console.log(result);
            if (result.success && result.suppliers != null) {
                 //console.log(result.suppliers);
                this.supplierList = result.suppliers;
            }
            this.supplierList.reverse()
        });
    }
    
    public fetchSupplierListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_NAME), requestBody).then(result => {
//            console.log(result);
            if (result.success && result.suppliers != null) {
                 //console.log(result.suppliers);
                this.supplierList = result.suppliers;
            }
            this.supplierList.reverse()
        });
    }


    public fetchSupplierInfo(dtoSupplier: DTOSupplier) {
        let requestBody: string = JSON.stringify(dtoSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_INFO), requestBody).then(result => {
            console.log(result);
            if (result.success) {
                this.dtoSupplier = result;
                this.dtoSupplier.entityProductSupplierList = null;
                this.dtoSupplier.epsListToBeDeleted = Array();
                this.searchSupplierPayments(null);
                this.fetchSupplierPurchaseAndPaymentAmount();
                this.entityPurchaseOrderPayment = new EntityPurchaseOrderPayment();
            }
        });
    }
    
    public manageSupplierUpdateLeftPanel()
    {
        this.supplierId = this.dtoSupplier.entitySupplier.id;
        let tempSupplierList: DTOSupplier[] = Array();
        tempSupplierList[0] = this.dtoSupplier;
        let totalSupplier: number = 1;
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++)
        {
            if (this.supplierList[supplierCounter].entitySupplier.id != this.dtoSupplier.entitySupplier.id && totalSupplier <= this.maxSupplierLeftPanel)
            {
                tempSupplierList[totalSupplier] = this.supplierList[supplierCounter];
                totalSupplier++;
            }
        }
        this.supplierList = tempSupplierList;
    }
    
    savePurchasePayment(event: Event) 
    {
        //you must create a supplier before saving supplier payment
        if (this.dtoSupplier.entitySupplier.userId == null || this.dtoSupplier.entitySupplier.userId == 0) {
            this.manageSupplierErrorMessage = "Please create/select a supplier first before saving payment.";
            this.manageSupplierMessageDispalyModal.config.backdrop = false;
            this.manageSupplierMessageDispalyModal.show();
            return;
        }
        //payment amount is required
        if (this.entityPurchaseOrderPayment.amountOut == null) {
            this.manageSupplierErrorMessage = "Amount is required.";
            this.manageSupplierMessageDispalyModal.config.backdrop = false;
            this.manageSupplierMessageDispalyModal.show();
            return;
        }
        
        this.entityPurchaseOrderPayment.supplierUserId = this.dtoSupplier.entitySupplier.userId;
        this.entityPurchaseOrderPayment.supplierName = this.dtoSupplier.entityUser.userName;
        this.entityPurchaseOrderPayment.paymentDate = this.datepipe.transform(this.paymentDate, 'yyyy-MM-dd');
        this.disablePaymentSaveButton = true;
        let requestBody: string = JSON.stringify(this.entityPurchaseOrderPayment);
        if (this.entityPurchaseOrderPayment.id == null || this.entityPurchaseOrderPayment.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PURCHASE_ORDER_PAYMENT), requestBody).then(result => {
                this.disablePaymentSaveButton = false;
                if (result.success) 
                {
                    this.entityPurchaseOrderPayment = result;
                    //fetch supplier payment list
                    this.searchSupplierPayments(null);
                    //fetch supplier due
                    this.fetchEntitySupplierInfo();  
                    this.fetchSupplierPurchaseAndPaymentAmount();  
                    this.searchSupplierPayments(null);                
                }
                else
                {
                    this.manageSupplierErrorMessage = result.message;
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                }
            });
        }
        else {
            //update supplier payment here
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_PURCHASE_ORDER_PAYMENT), requestBody).then(result => {
                this.disablePaymentSaveButton = false;
                if (result.success) 
                {
                    //fetch supplier payment list
                    this.searchSupplierPayments(null);
                    //fetch supplier due
                    this.fetchEntitySupplierInfo();   
                    this.fetchSupplierPurchaseAndPaymentAmount();  
                    this.searchSupplierPayments(null);                    
                }
                else
                {
                    this.manageSupplierErrorMessage = result.message;
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                }
            });
        }
    }
    
    searchSupplierPayments(event: Event) 
    {
        if(this.dtoSupplier.entitySupplier.userId != null && this.dtoSupplier.entitySupplier.userId > 0)
        {
            let supplierUserId: number = this.dtoSupplier.entitySupplier.userId;
            //PURCHASE_ORDER_PAYMENT_TYPE_ID_PURCHASE_PAYMENT_OUT = 2
            //PURCHASE_ORDER_PAYMENT_TYPE_ID_ADD_NEW_PAYMENT_OUT = 3
            let paymentTypeIds : string = "2,3";
            let requestBody: string = "{\"supplierUserId\": " + supplierUserId + ", \"paymentTypeIds\":\"" + paymentTypeIds + "\", \"offset\": " + this.paymentOrdersOffset + ", \"limit\": " + this.paymentOrdersLimit + "}";
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDER_PAYMENT_SUMMARY), requestBody).then(result => {
                if (result.success && result.purchaseOrderPayments != null) {
                    this.purchaseOrderPaymentList = result.purchaseOrderPayments;
                    this.paymentLength = result.totalPurchaseOrderPayments;
                    this.totalPaymentAmount = result.totalPaymentAmount;
                }
                else {

                }
            });
        }
        
    }
    
    fetchEntitySupplierInfo()
    {
        let requestBody: string = "{\"supplierUserId\": " + this.dtoSupplier.entitySupplier.userId + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ENTITY_SUPPLIER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoSupplier.entitySupplier = result;
            }
        });
    }
    
    fetchSupplierPurchaseAndPaymentAmount()
    {
        let requestBody: string = "{\"supplierUserId\": " + this.dtoSupplier.entitySupplier.userId + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_PURCHASE_AND_PAYMENT_AMOUNT), requestBody).then(result => {
            if (result.success) {
                this.dtoSupplier.totalPurchaseAmount = result.totalPurchaseAmount;
                this.dtoSupplier.totalPaymentAmount = result.totalPaymentAmount;
            }
        });
    }
    
    setEntityPurchaseOrderPayment(event: Event, selectedEntityPurchaseOrderPayment: EntityPurchaseOrderPayment)
    {
        this.entityPurchaseOrderPayment = selectedEntityPurchaseOrderPayment;
        this.paymentDate = new Date(this.entityPurchaseOrderPayment.paymentDate);
    }
    
}


