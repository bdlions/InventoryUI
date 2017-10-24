import {Component,ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
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

    private manageProductSuccessMessage: string;
    private manageProductErrorMessage: string;

    constructor(private marketAPI: MarketAPI, private router: Router, public route: ActivatedRoute, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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
        //this.entityProduct = JSON.parse("{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"length\":\"10cm\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}");
        //this.productCategoryList = JSON.parse("[{\"id\":1,\"title\":\"Product category1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product category2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.productTypeList = JSON.parse("[{\"id\":1,\"title\":\"Product type1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product type2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.uomList = JSON.parse("[{\"id\":1,\"title\":\"UOM1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"UOM2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //this.productList = JSON.parse("[{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"length\":\"10cm\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":3,\"name\":\"product3\",\"code\":\"code3\",\"categoryId\":3,\"categoryTitle\":\"Product category3\",\"typeId\":3,\"typeTitle\":\"Product type3\",\"unitPrice\":30.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":4,\"name\":\"product4\",\"code\":\"code4\",\"categoryId\":4,\"categoryTitle\":\"Product category4\",\"typeId\":4,\"typeTitle\":\"Product type4\",\"unitPrice\":40.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":5,\"name\":\"product5\",\"code\":\"code5\",\"categoryId\":5,\"categoryTitle\":\"Product category5\",\"typeId\":5,\"typeTitle\":\"Product type5\",\"unitPrice\":50.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":6,\"name\":\"product6\",\"code\":\"code6\",\"categoryId\":6,\"categoryTitle\":\"Product category6\",\"typeId\":6,\"typeTitle\":\"Product type6\",\"unitPrice\":60.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":7,\"name\":\"product7\",\"code\":\"code7\",\"categoryId\":7,\"categoryTitle\":\"Product category7\",\"typeId\":7,\"typeTitle\":\"Product type17\",\"unitPrice\":70.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":8,\"name\":\"product8\",\"code\":\"code8\",\"categoryId\":8,\"categoryTitle\":\"Product category8\",\"typeId\":8,\"typeTitle\":\"Product type8\",\"unitPrice\":80.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":9,\"name\":\"product9\",\"code\":\"code9\",\"categoryId\":9,\"categoryTitle\":\"Product category9\",\"typeId\":9,\"typeTitle\":\"Product type9\",\"unitPrice\":90.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":10,\"name\":\"product10\",\"code\":\"code1\",\"categoryId\":10,\"categoryTitle\":\"Product category10\",\"typeId\":10,\"typeTitle\":\"Product type10\",\"unitPrice\":100.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":11,\"name\":\"product11\",\"code\":\"code11\",\"categoryId\":11,\"categoryTitle\":\"Product category11\",\"typeId\":11,\"typeTitle\":\"Product type11\",\"unitPrice\":110.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":12,\"name\":\"product12\",\"code\":\"code12\",\"categoryId\":12,\"categoryTitle\":\"Product category12\",\"typeId\":12,\"typeTitle\":\"Product type12\",\"unitPrice\":120.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        //console.log(this.entityProduct);
        //console.log(this.productCategoryList);
        //console.log(this.productTypeList);
        //console.log(this.uomList);
        //console.log(this.productList);

        this.fetchProductCategoryList();
        this.fetchProductTypeList();
        this.fetchUOMList();

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
            this.fetchProductInfo(this.productId);
            //console.log(this.productId);
        });
    }
    public hideManageProductMessageDispalyModal(): void {
        this.manageProductMessageDispalyModal.hide();
    }
    searchProduct(event: Event) {
        //console.log(this.searchEntityProduct.name);

        if (this.reqDTOProduct.entityProduct.name == null || this.reqDTOProduct.entityProduct.name == "") {
            return;
        }
        else {
            this.reqDTOProduct.limit = 10;
            this.reqDTOProduct.offset = 0;
            this.fetchProductList();
        }
    }

    newProduct(event: Event) {
        //console.log(this.entityProduct.name);
        this.dtoProduct = new DTOProduct();
        this.dtoProduct.entityProduct = new EntityProduct();
        this.dtoProduct.entityProductCategory = new EntityProductCategory();
        this.dtoProduct.entityProductType = new EntityProductType();

    }
    saveProduct(event: Event) {
        //check product name
        if (this.dtoProduct.entityProduct.name == null || this.dtoProduct.entityProduct.name == "") {
            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Enter a product name";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }
        //check product type
        if (this.dtoProduct.entityProductType.title == null || this.dtoProduct.entityProductType.title == "") {
            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Select a product type";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }
        //check product category
        if (this.dtoProduct.entityProductCategory.title == null || this.dtoProduct.entityProductCategory.title == "") {
            this.manageProductSuccessMessage = "";
            this.manageProductErrorMessage = "Select a product category";
            this.manageProductMessageDispalyModal.config.backdrop = false;
            this.manageProductMessageDispalyModal.show();
            return;
        }
        //check product price
//        if (this.dtoProduct.entityProduct.unitPrice == null || this.dtoProduct.entityProduct.unitPrice > 0) {
//            this.manageProductSuccessMessage = "";
//            this.manageProductErrorMessage = "Select a product price";
//            this.manageProductMessageDispalyModal.config.backdrop = false;
//            this.manageProductMessageDispalyModal.show();
//            return;
//        }

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
                    //this.productList = result.products;
                }
                else {
                    //console.log(result);
                }
            });
        }
        else {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_INFO), requestBody).then(result => {
                // console.log(result);
                if (result.success) {
                    //this.productList = result.products;
                }
                else {
                    //console.log(result);
                }
            });
        }

    }
    selectedProduct(event: Event, productId: number) {
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

    public fetchUOMList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_UOMS), requestBody).then(result => {
            if (result.success && result.uoms != null) {
                this.uomList = result.uoms;
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
            //console.log(result);
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
}
