/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "./services/NavigationManager";

@Component({
    selector: 'app',
    templateUrl: 'app/html/home.component.html'
})

export class HomeComponent {
    public showDatePicker: boolean = false;
    public sampleDate: Date = new Date();
    public minDate: Date = void 0;
    
    private showNavBar: boolean = false;
    private activeMenu: string = "home";

    constructor(private router: Router, private navigationManager: NavigationManager) {
        this.navigationManager.showNavBarEmitter.subscribe((mode) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
                this.showNavBar = mode;
            }
        });
        this.navigationManager.menuActivationEmitter.subscribe((menuName) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (menuName !== null) {
                this.activeMenu = menuName;
            }
        });

    }

    //    constructor(private marketAPI: MarketAPI, private router: Router) 
    //    {
    //        
    //    }

    ngOnInit() {

    }


    goHome(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("home");
        this.router.navigate(["home"]);
    }
    goManageProduct(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("manageproduct");
        this.router.navigate(["manageproduct", {productId: 0 }]);
    }
    goProductList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("productlist");
        this.router.navigate(["productlist"]);
    }
    goManageCustomer(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managecustomer");
        this.router.navigate(["managecustomer"]);
    }
    goCustomerList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("customerlist");
        this.router.navigate(["customerlist"]);
    }
    goManageSupplier(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesupplier");
        this.router.navigate(["managesupplier"]);
    }
    goSupplierList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("supplierlist");
        this.router.navigate(["supplierlist"]);
    }
    goManagePurchase(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managepurchase");
        this.router.navigate(["managepurchase"]);
    }
    goPurchaseList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("purchaselist");
        this.router.navigate(["purchaselist"]);
    }
    goManageSale(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesale");
        this.router.navigate(["managesale"]);
    }
    goSaleList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("salelist");
        this.router.navigate(["salelist"]);
    }
    goCurrentStock(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("currentstock");
        this.router.navigate(["currentstock"]);
    }
    goProduct(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("products");
        this.router.navigate(["products"]);
    }
    goProfile(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("profile");
        this.router.navigate(["profile"]);
    }


}