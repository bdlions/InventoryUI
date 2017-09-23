"use strict";
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var MarketAPI_service_1 = require("./services/MarketAPI.service");
var NavigationManager_1 = require("./services/NavigationManager");
var user_type_1 = require("./user.type");
var user_1 = require("./user");
var AppComponent = (function () {
    function AppComponent(marketAPI, router, navigationManager) {
        this.marketAPI = marketAPI;
        this.router = router;
        this.navigationManager = navigationManager;
    }
    AppComponent.prototype.ngOnInit = function () {
        var buyers = [new user_1.User(1, "Buyer 1"), new user_1.User(2, "Buyer 2"),];
        var sellers = [new user_1.User(1, "Seller 1"), new user_1.User(2, "Seller 2"),];
        this.userTypes = [new user_type_1.UserType(1, "Buyer", buyers),
            new user_type_1.UserType(2, "Seller", sellers)];
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
    };
    AppComponent.prototype.goHome = function (event) {
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("home");
        this.router.navigate(["home"]);
    };
    AppComponent.prototype.getSelectedUsers = function (value) {
        console.log(value);
        console.log(this.userTypes[value]);
        this.selectedUsers = this.userTypes[value].users;
        console.log(this.selectedUsers);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'data-content',
            templateUrl: 'app/html/app.component.html'
        }),
        __metadata("design:paramtypes", [MarketAPI_service_1.MarketAPI,
            router_1.Router,
            NavigationManager_1.NavigationManager])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map