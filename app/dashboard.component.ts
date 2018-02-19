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
    templateUrl: 'app/html/dashboard.component.html'
})

export class DashboardComponent {
    public showDatePicker: boolean = false;
    public sampleDate: Date = new Date();
    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "dashboard";

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
    goSaleList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("salelist");
        this.router.navigate(["salelist"]);
    }
    goPurchaseList(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("purchaselist");
        this.router.navigate(["purchaselist"]);
    }
}