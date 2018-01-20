import {Component, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {TabsetComponent} from 'ngx-bootstrap';
import {DTOProduct} from '../dto/DTOProduct';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';
import {EntityUOM} from '../dto/EntityUOM';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product/manageproduct.component.html',
    providers: [WebAPIService]
})

export class ManageProductComponent {
    @ViewChild('manageProductMessageDispalyModal') public manageProductMessageDispalyModal: ModalDirective;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private reqDTOProduct: DTOProduct;
    private reqEntiryProduct: EntityProduct;
    private entityProduct: EntityProduct;
    private dtoProduct: DTOProduct;
    //private searchEntityProduct: EntityProduct;
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    private uomList: EntityUOM[];
    private productList: EntityProduct[];
    private productId: number;
    private showNavBar: boolean = false;
    private activeMenu: string = "manageproduct";

    //    private manageProductSuccessMessage: string;
    private manageProductErrorMessage: string;
    
    //constants & constraints
    private maxProductLeftPanel: number = 10;

    constructor(private router: Router, public route: ActivatedRoute, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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


        //this.searchEntityProduct = new EntityProduct();
        this.entityProduct = new EntityProduct();

        this.dtoProduct = new DTOProduct();
        this.dtoProduct.entityProduct = new EntityProduct();
        this.dtoProduct.entityProductType = new EntityProductType();
        this.dtoProduct.entityProductCategory = new EntityProductCategory();

        //this.fetchProductCategoryList();
        //this.fetchProductTypeList();
        //this.fetchUOMList();

        this.reqDTOProduct = new DTOProduct();
        this.reqDTOProduct.entityProduct = new EntityProduct();
        this.reqDTOProduct.limit = 10;
        this.reqDTOProduct.offset = 0;
        this.fetchProductList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.productId = params['productId'];
            this.dtoProduct = new DTOProduct();
            this.dtoProduct.entityProduct = new EntityProduct();
            this.dtoProduct.entityProductType = new EntityProductType();
            this.dtoProduct.entityProductCategory = new EntityProductCategory();
            this.fetchProductCategoryList();
            
            //console.log(this.productId);
        });
    }
    public hideManageProductMessageDispalyModal(): void {
        this.manageProductMessageDispalyModal.hide();
    }
    searchProduct(event: Event) {
        //console.log(this.searchEntityProduct.name);

        if (this.reqDTOProduct.entityProduct.name != null && this.reqDTOProduct.entityProduct.name != "") {
            this.reqDTOProduct.limit = 10;
            this.reqDTOProduct.offset = 0;
            this.searchProductsByName();
        }
        else {
            this.reqDTOProduct.limit = 10;
            this.reqDTOProduct.offset = 0;
            this.fetchProductList();
        }
    }

    newProduct(event: Event) {
        this.productId = 0;
        //console.log(this.entityProduct.name);
        this.dtoProduct = new DTOProduct();
        this.dtoProduct.entityProduct = new EntityProduct();
        this.dtoProduct.entityProductCategory = new EntityProductCategory();
        this.dtoProduct.entityProductType = new EntityProductType();

    }
    saveProduct(event: Event) {
        //check product name
        if (this.dtoProduct.entityProduct.name == null || this.dtoProduct.entityProduct.name == "") {
            //            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Enter a product name";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }
        //check product type
        if (this.dtoProduct.entityProductType.title == null || this.dtoProduct.entityProductType.title == "") {
            //            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Select a product type";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }
        //check product category
        if (this.dtoProduct.entityProductCategory.title == null || this.dtoProduct.entityProductCategory.title == "") {
            //            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Select a product category";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }
        //check product price
        if (this.dtoProduct.entityProduct.unitPrice == null || this.dtoProduct.entityProduct.unitPrice < 0) {
            //            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Select a valid product price";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }

        //console.log(this.dtoProduct.entityProductType);

        this.dtoProduct.entityProduct.categoryId = this.dtoProduct.entityProductCategory.id;
        this.dtoProduct.entityProduct.categoryTitle = this.dtoProduct.entityProductCategory.title;
        this.dtoProduct.entityProduct.typeId = this.dtoProduct.entityProductType.id;
        this.dtoProduct.entityProduct.typeTitle = this.dtoProduct.entityProductType.title;

        let requestBody: string = JSON.stringify(this.dtoProduct.entityProduct);
        if (this.dtoProduct.entityProduct.id > 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_PRODUCT_INFO), requestBody).then(result => {
                console.log(result);
                if (result.success) {
                    this.manageProductUpdateLeftPanel();
                }
                else 
                {
                    //set error message
                    //                    this.manageProductSuccessMessage = "";
                    this.manageProductErrorMessage = result.message;
                    //console.log(result);
                    //display pop up with message
                    this.manageProductMessageDispalyModal.config.backdrop = false;
                    this.manageProductMessageDispalyModal.show();
                }

            });
        }
        else {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_INFO), requestBody).then(result => {
                // console.log(result);
                if (result.success) {
                    //setting response object from the server
                    this.dtoProduct.entityProduct = result;
                    this.manageProductUpdateLeftPanel();
                }
                else {
                    //set error message
                    //                    this.manageProductSuccessMessage = "";
                    this.manageProductErrorMessage = result.message;
                    //display pop up with message
                    this.manageProductMessageDispalyModal.config.backdrop = false;
                    this.manageProductMessageDispalyModal.show();
                }

            });
        }

    }
    
    public manageProductUpdateLeftPanel()
    {
        this.productId = this.dtoProduct.entityProduct.id;
        //appending created/updated product on top of left panel
        let tempProductList: EntityProduct[];
        tempProductList = Array();
        tempProductList[0] = this.dtoProduct.entityProduct;
        let totalProdct: number = 1;
        let productCounter: number;
        for (productCounter = 0; productCounter < this.productList.length; productCounter++)
        {
            if (this.productList[productCounter].id != this.dtoProduct.entityProduct.id && totalProdct <= this.maxProductLeftPanel)
            {
                tempProductList[totalProdct] = this.productList[productCounter];
                totalProdct++;
            }
        }
        this.productList = tempProductList;
    }
    
    public selectedProduct(event: Event, productId: number) {
        this.productId = productId;
        //event.preventDefault();
        //this.router.navigate(["manageproduct", {productId: productId}]);

        let productCounter: number;
        for (productCounter = 0; productCounter < this.productList.length; productCounter++) {
            if (this.productList[productCounter].id == productId) {
                this.dtoProduct.entityProduct = this.productList[productCounter];

                for (let counter: number = 0; counter < this.productCategoryList.length; counter++) {
                    if (this.dtoProduct.entityProduct.categoryId == this.productCategoryList[counter].id) {
                        this.dtoProduct.entityProductCategory = this.productCategoryList[counter];
                    }
                }
                for (let counter: number = 0; counter < this.productTypeList.length; counter++) {
                    if (this.dtoProduct.entityProduct.typeId == this.productTypeList[counter].id) {
                        this.dtoProduct.entityProductType = this.productTypeList[counter];
                    }
                }
            }
        }
    }


    public fetchProductCategoryList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_PRODUCT_CATEGORIES), requestBody).then(result => {
            if (result.success && result.productCategories != null) {
                this.productCategoryList = result.productCategories;
                this.fetchProductTypeList();
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
                this.fetchUOMList();
            }
            else {
                //console.log(result);
            }
        });
    }

    public fetchUOMList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_UOMS), requestBody).then(result => {
            if (result.success && result.uoms != null) {
                this.uomList = result.uoms;
                if (this.productId > 0)
                {
                    this.fetchProductInfo(this.productId);
                }
            }
            else {
                //console.log(result);
            }
        });
    }

    public fetchProductList() {
        //this.reqDTOProduct.limit = 10;
        //this.reqDTOProduct.offset = 0;
        //this.reqDTOProduct.entityProduct = this.reqEntityProduct;
        let requestBody: string = JSON.stringify(this.reqDTOProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCTS), requestBody).then(result => {
            console.log(result);
            if (result.success && result.products != null) {
                this.productList = result.products;
            }
            else {
                //console.log(result);
            }
        });
    }

    public fetchProductInfo(productId: number) {
        this.reqEntiryProduct = new EntityProduct();
        this.reqEntiryProduct.id = productId;
        let requestBody: string = JSON.stringify(this.reqEntiryProduct);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_INFO), requestBody).then(result => {
            //console.log(result);
            if (result.success) {
                this.dtoProduct = new DTOProduct();
                this.dtoProduct.entityProduct = new EntityProduct();
                this.dtoProduct.entityProductCategory = new EntityProductCategory();
                this.dtoProduct.entityProductType = new EntityProductType();
                this.dtoProduct.entityProduct = result;
                for (let counter: number = 0; counter < this.productCategoryList.length; counter++) {
                    if (this.dtoProduct.entityProduct.categoryId == this.productCategoryList[counter].id) {
                        this.dtoProduct.entityProductCategory = this.productCategoryList[counter];
                    }
                }
                for (let counter: number = 0; counter < this.productTypeList.length; counter++) {
                    if (this.dtoProduct.entityProduct.typeId == this.productTypeList[counter].id) {
                        this.dtoProduct.entityProductType = this.productTypeList[counter];
                    }
                }
                //this.entityProduct = result;
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
            }
            else {
                //console.log(result);
            }
        });
    }
}
