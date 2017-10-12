import {Component} from '@angular/core';
import {Router} from '@angular/router'
import {MarketAPI} from './services/MarketAPI.service';
import {NavigationManager} from './services/NavigationManager';
import {UserType} from './user.type';
import {User} from './user';
import {FormControl} from '@angular/forms';
import {EntityUser} from './dto/EntityUser';
import {WebAPIService} from './webservice/web-api-service';
import {PacketHeaderFactory} from './webservice/PacketHeaderFactory';
import {ACTION} from './webservice/ACTION';

@Component({
    selector: 'data-content',
    templateUrl: 'app/html/app.component.html',
    providers: [WebAPIService]
})

export class AppComponent {
    private webAPIService: WebAPIService;
    private serviceResult: string;
    private userTypes: UserType[];
    private selectedUsers: User[];
    private entityUser: EntityUser;
    private errorMessage:string;
    private message:string;
    constructor(private marketAPI: MarketAPI, private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.entityUser = new EntityUser();
        
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        
        if (username != null && username != "" && password != null && password != ""){
            this.loginUser(username,password);
        }
    }




    ngOnInit() {
        var buyers = [new User(1, "Buyer 1"), new User(2, "Buyer 2"),];
        var sellers = [new User(1, "Seller 1"), new User(2, "Seller 2"),];
        this.userTypes = [new UserType(1, "Buyer", buyers),
        new UserType(2, "Seller", sellers)];
        this.selectedUsers = this.userTypes[0].users;

        //        this.marketAPI.get("%7B\"actn\"%3A2%7D").then(result => {
        //            this.serviceResult = JSON.stringify(result);
        //        });
        //        this.marketAPI.get("%7B\"actn\"%3A2%7D").then(result => {
        //            this.serviceResult = JSON.stringify(result);
        //        });
        //        this.marketAPI.get("%7B\"actn\"%3A2%7D").then(result => {
        //            this.serviceResult = JSON.stringify(result);
        //        });
        //        this.marketAPI.get("%7B\"actn\"%3A2%7D").then(result => {
        //            this.serviceResult = JSON.stringify(result);
        //        });

    }
    goHome(event: Event) {
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("home");
        this.router.navigate(["home"]);

    }

    getSelectedUsers(value: number) {
        console.log(value);
        console.log(this.userTypes[value]);
        this.selectedUsers = this.userTypes[value].users;
        console.log(this.selectedUsers);
    }

    login(event: Event) {
        
        if (this.entityUser.userName == null || this.entityUser.userName == "")
        {
            this.errorMessage = "Username is required.";
            return;
        }
        if (this.entityUser.password == null || this.entityUser.password == "")
        {
            this.errorMessage = "Password is required.";
        }
        
        this.loginUser(this.entityUser.userName, this.entityUser.password);
    }
    
    loginUser(username:string, password:string){
        let requestBody: string = "{\"userName\": \"" + username + "\", \"password\": \"" + password+"\"}";
        
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_IN), requestBody).then(result =>{
            if (result != null && result.success){
                if (result.sessionId != null && result.sessionId != ""){
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    localStorage.setItem("sessionId", result.sessionId);
                    
                    this.navigationManager.showNavBar(true);
                    this.navigationManager.setActiveMenu("home");
                    this.router.navigate(["home"]);
                }
                else{
                    localStorage.removeItem("sessionId");
                    this.errorMessage = "Invalid session.";
                }
            }
            else{
                this.errorMessage = result.message;
            }
        });
    }
}