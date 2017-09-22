import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

import {NavigationManager} from "./services/NavigationManager";

@Component({
    selector: "navbar",
    templateUrl: "app/html/topnavbar.html"
})

export class TopNavbarComponent {
    private showNavBar: boolean = false;
    private activeMenu: string = "home";

    constructor(private router:Router, private navigationManager: NavigationManager) {
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

    goHome(event: Event) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("home");
        this.router.navigate(["home"]);
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
