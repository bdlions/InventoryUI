import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
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
import {NavigationManager} from "../services/NavigationManager";
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/managesupplier.component.html',
    providers: [WebAPIService]
})

export class ManageSupplierComponent {
    @ViewChild('manageSupplierProductModal') public manageSupplierProductModal: ModalDirective;
    @ViewChild('manageSupplierSelectedProductDeleteModal') public manageSupplierSelectedProductDeleteModal: ModalDirective;
    @ViewChild('manageSupplierMessageDispalyModal') public manageSupplierMessageDispalyModal: ModalDirective;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private reqDTOSupplier: DTOSupplier;
    private dtoSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    //private searchDTOSupplier: DTOSupplier;
    private showNavBar: boolean = false;
    private activeMenu: string = "managesupplier";
    private supplierId: number;
    //    private manageSupplierSuccessMessage: string;
    private manageSupplierErrorMessage: string;
    
    private entityProductSupplierList: EntityProductSupplier[];
    
    private reqDTOSupplierProductList: DTOSupplier;
    
    private disableSaveButton: boolean = false;
    
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

    constructor(private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager) {
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
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            let supplierId: number = params['supplierId'];
            this.supplierId = supplierId;
            this.reqDTOSupplier.entitySupplier.id = supplierId;
            this.fetchSupplierInfo();
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
    }

    saveSupplier(event: Event) {
        //check supplier first name
        if (this.dtoSupplier.entityUser.userName == null || this.dtoSupplier.entityUser.userName == "") {
            //            this.manageSupplierSuccessMessage = "";
            this.manageSupplierErrorMessage = "Name is required.";
            this.manageSupplierMessageDispalyModal.config.backdrop = false;
            this.manageSupplierMessageDispalyModal.show();
            return;
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
                //console.log(result);
                if (result.success) {                   
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


    public fetchSupplierInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_INFO), requestBody).then(result => {
            console.log(result);
            if (result.success) {
                this.dtoSupplier = result;
                this.dtoSupplier.entityProductSupplierList = null;
                this.dtoSupplier.epsListToBeDeleted = Array();
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
}


