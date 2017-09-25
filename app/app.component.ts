/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Component} from '@angular/core';
import {Router} from '@angular/router'
import {MarketAPI} from './services/MarketAPI.service';
import {NavigationManager} from './services/NavigationManager';
import {UserType} from './user.type';
import {User} from './user';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'data-content',
    templateUrl: 'app/html/app.component.html'
})

export class AppComponent { 
    private serviceResult:string;
    private userTypes: UserType[];
    private selectedUsers: User[];
    
    constructor(
        private marketAPI: MarketAPI, 
        private router:Router,
        private navigationManager: NavigationManager
    ){}
    



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
    goHome(event:Event){
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
}