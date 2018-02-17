import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityProductCategory} from '../dto/EntityProductCategory';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product/productcategorylist.component.html',
    providers: [WebAPIService]
})

export class ProductCategoryListComponent {
    private webAPIService: WebAPIService;
    private productCategoryList: EntityProductCategory[];
    private showNavBar: boolean = false;
    private activeMenu: string = "productcategorylist";    
    private searchTitle: string = "";

    constructor( private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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
        this.fetchProductCategoryList();
    }

    ngOnInit() {

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
    
    showProductCategory(event: Event, id: number) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("manageproductcategory");
        this.router.navigate(["manageproductcategory", {categoryId: id}]);
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


