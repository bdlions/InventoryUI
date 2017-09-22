"use strict";
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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var NavigationManager = (function () {
    function NavigationManager() {
        this._showNavBar = new BehaviorSubject_1.BehaviorSubject(null);
        this._currentActivatedMenu = new BehaviorSubject_1.BehaviorSubject(null);
        this.showNavBarEmitter = this._showNavBar.asObservable();
        this.menuActivationEmitter = this._currentActivatedMenu.asObservable();
    }
    NavigationManager.prototype.showNavBar = function (show) {
        this._showNavBar.next(show);
    };
    NavigationManager.prototype.setActiveMenu = function (activeMenu) {
        this._currentActivatedMenu.next(activeMenu);
    };
    return NavigationManager;
}());
NavigationManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NavigationManager);
exports.NavigationManager = NavigationManager;
//# sourceMappingURL=NavigationManager.js.map