import {Component, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityProductCategory} from '../dto/EntityProductCategory';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product/manageproductcategory.component.html',
    providers: [WebAPIService]
})

export class ManageProductCategoryComponent {
    @ViewChild('manageProductCategoryMessageDispalyModal') public manageProductCategoryMessageDispalyModal: ModalDirective;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private showNavBar: boolean = false;
    private activeMenu: string = "manageproductcategory";
    private disableSaveButton: boolean = false;
    private entityProductCategory: EntityProductCategory;
    private categoryId: number;
    private productCategoryList: EntityProductCategory[];    
    //constants & constraints
    private maxProductCategoryLeftPanel: number = 10;
    private manageProductCategoryErrorMessage: string;
    private searchTitle: string = "";
    
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
        
        this.entityProductCategory = new EntityProductCategory();
        this.productCategoryList = Array();
        this.fetchProductCategoryList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.categoryId = params['categoryId'];
            if(this.categoryId != null && this.categoryId > 0)
            {
                this.entityProductCategory = new EntityProductCategory();
                this.fetchCategoryInfo();  
            }                      
        });
    }
    
    public hideManageProductCategoryMessageDispalyModal(): void 
    {
        this.manageProductCategoryMessageDispalyModal.hide();
    }
    
    newProductCategory(event: Event) {
        this.disableSaveButton = false;
        this.categoryId = 0;
        this.entityProductCategory = new EntityProductCategory();  

    }
    
    saveProductCategory(event: Event) 
    {
        //show error message of any required field
        if (this.entityProductCategory.title == null || this.entityProductCategory.title == "") {
            this.manageProductCategoryErrorMessage = "Please enter product category title";
            this.manageProductCategoryMessageDispalyModal.config.backdrop = false;
            this.manageProductCategoryMessageDispalyModal.show();
            return;
        }
        
        this.disableSaveButton = true;
        let requestBody: string = JSON.stringify(this.entityProductCategory);        
        if (this.entityProductCategory.id > 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_PRODUCT_CATEGORY_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                console.log(result);
                if (result.success) {
                    this.manageProductCategoryUpdateLeftPanel();
                }
                else 
                {
                    //set error message and show it
                    this.manageProductCategoryErrorMessage = result.message;
                    this.manageProductCategoryMessageDispalyModal.config.backdrop = false;
                    this.manageProductCategoryMessageDispalyModal.show();
                }
            });
        }
        else {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_PRODUCT_CATEGORY_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                if (result.success) {
                    //setting response object from the server
                    this.entityProductCategory = result;
                    this.manageProductCategoryUpdateLeftPanel();
                }
                else {
                    //set error message and show it
                    this.manageProductCategoryErrorMessage = result.message;
                    this.manageProductCategoryMessageDispalyModal.config.backdrop = false;
                    this.manageProductCategoryMessageDispalyModal.show();
                }
            });
        }
    }
    
    public manageProductCategoryUpdateLeftPanel()
    {
        this.categoryId = this.entityProductCategory.id;
        //appending created/updated product category on top of left panel
        let tempProductCategoryList: EntityProductCategory[];
        tempProductCategoryList = Array();
        tempProductCategoryList[0] = this.entityProductCategory;
        let totalProduct: number = 1;
        let productCounter: number;
        for (productCounter = 0; productCounter < this.productCategoryList.length; productCounter++)
        {
            if (this.productCategoryList[productCounter].id != this.entityProductCategory.id && totalProduct <= this.maxProductCategoryLeftPanel)
            {
                tempProductCategoryList[totalProduct] = this.productCategoryList[productCounter];
                totalProduct++;
            }
        }
        this.productCategoryList = tempProductCategoryList;
    }
    
    fetchCategoryInfo()
    {
        let requestBody: string = "{\"categoryId\": " + this.categoryId + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_CATEGORY_INFO), requestBody).then(result => {
            if (result.success) {
                this.entityProductCategory = result;
            }
            else {
               
            }
        });
    }
    
    public fetchProductCategoryList() {
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ALL_PRODUCT_CATEGORIES), requestBody).then(result => {
            if (result.success && result.productCategories != null) {
                this.productCategoryList = result.productCategories;
            }
            else {
                
            }
        });
    }
    
    public selectedProductCategory(event: Event, categoryId: number) {
        this.categoryId = categoryId;
        for (let counter: number = 0; counter < this.productCategoryList.length; counter++)
        {
            if (this.productCategoryList[counter].id == categoryId)
            {
                this.entityProductCategory = this.productCategoryList[counter];
            }
        }
    }
    
    searchProductCategory(event: Event)
    {
        this.searchProductCategoryByTitle();
    }
    
    searchProductCategoryByTitle()
    {
        let requestBody: string = "{\"title\": \"" + this.searchTitle + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PRODUCT_CATEGORY_BY_TITLE), requestBody).then(result => {
            if (result.success && result.list) {
                this.productCategoryList = result.list;
            }
            else 
            {
               
            }
        });
    }
}
