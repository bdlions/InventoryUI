import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

import {NavigationManager} from "./services/NavigationManager";

@Component({
    selector: "navbar",
    templateUrl: "app/html/topnavbar.html"
})

export class TopNavbarComponent {
    private showNavBar: boolean = true;
    private activeMenu: string = "home";
    private selectedMenu: any;
    private isAdmin: boolean = false;

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
        this.navigationManager.isAdminEmitter.subscribe((mode) => {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
                this.isAdmin = mode;
            }
        });
        /*let roleIdString = localStorage.getItem("roleIdString");
        let roleIdArray: string[] = roleIdString.split(",");
        if (roleIdArray != null && roleIdArray.length > 0)
        {
            for (let counter: number = 0; counter < roleIdArray.length; counter++)
            {
                if (roleIdArray[counter] == "1")
                {
                    this.isAdmin = true;
                }
            }
        }
        console.log(roleIdArray);
        console.log(this.isAdmin);*/
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
        this.router.navigate(["manageproduct", {productId: 0}]);
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
    goLogout(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("logout");
        this.router.navigate(["logout"]);
    }
//    goCkEditor(event: Event) {
//        event.preventDefault();
//        this.navigationManager.showNavBar(true);
//        this.navigationManager.setActiveMenu("ck");
//        this.router.navigate(["ck"]);
//    }
    goSalesByProductSummary(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("salesbyproductsummary");
        this.router.navigate(["salesbyproductsummary"]);
    }
    goSalesOrderSummary(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("salesordersummary");
        this.router.navigate(["salesordersummary"]);
    }
    goSalesOrderDetails(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("salesorderdetails");
        this.router.navigate(["salesorderdetails"]);
    }
    goSalesOrderProfit(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("salesorderprofit");
        this.router.navigate(["salesorderprofit"]);
    }
    goCustomerPaymentSummary(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("customerpaymentsummary");
        this.router.navigate(["customerpaymentsummary"]);
    }
    goCustomerPaymentByOrder(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("customerpaymentbyorder");
        this.router.navigate(["customerpaymentbyorder"]);
    }
    goCustomerOrderHistory(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("customerorderhistory");
        this.router.navigate(["customerorderhistory"]);
    }
    goCustomerProductList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("customerproductlist");
        this.router.navigate(["customerproductlist"]);
    }
    goCustomerListReport(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("customerlistreport");
        this.router.navigate(["customerlistreport"]);
    }
    goPurchaseOrderSummary(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("purchaseordersummary");
        this.router.navigate(["purchaseordersummary"]);
    }
    goPurchaseOrderDetails(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("purchaseorderdetails");
        this.router.navigate(["purchaseorderdetails"]);
    }
    goSupplierPaymentSummary(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("supplierpaymentsummary");
        this.router.navigate(["supplierpaymentsummary"]);
    }
    goSupplierProductList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("supplierproductlist");
        this.router.navigate(["supplierproductlist"]);
    }
    goSupplierListReport(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("supplierlistreport");
        this.router.navigate(["supplierlistreport"]);
    }
    goEndingStock(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("endingstock");
        this.router.navigate(["endingstock"]);
    }
    goManageUser(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("manageuser");
        this.router.navigate(["manageuser"]);
    }
    goUserList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("userlist");
        this.router.navigate(["userlist"]);
    }
}
