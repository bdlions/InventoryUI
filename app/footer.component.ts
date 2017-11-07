import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {NavigationManager} from "./services/NavigationManager";

@Component({
    selector: "app-footer",
    templateUrl: "app/html/footer.html"
})

export class FooterComponent {
    private showNavBar: boolean = true;
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
}
