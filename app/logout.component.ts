import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {NavigationManager} from './services/NavigationManager';
import {WebAPIService} from './webservice/web-api-service';
import {PacketHeaderFactory} from './webservice/PacketHeaderFactory';
import {ACTION} from './webservice/ACTION';

@Component({
    selector: 'data-content',
    templateUrl: 'app/html/logout.component.html',
    providers: [WebAPIService]
})
export class LogoutComponent {
    private webAPIService: WebAPIService;
    constructor(public router: Router, public http: Http, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        let requestBody: string = "{}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_OUT), requestBody).then(result => {
            console.log(result);
        });
        //call server to logout
        //clear local storate
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("sessionId");
        //redirect to landing file
        this.navigationManager.showNavBar(false);
        this.navigationManager.setActiveMenu("login");
        this.router.navigate(["login"]);
    }
    
}

