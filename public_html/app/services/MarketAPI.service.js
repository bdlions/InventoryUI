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
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var MarketAPI = (function () {
    function MarketAPI(http) {
        this.http = http;
        //    private serveletURL:string = "http://192.168.8.231:8080/market?request=";
        this.serveletURL = "http://localhost:8080/market?request=";
    }
    MarketAPI.prototype.get = function (request) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //let body = new URLSearchParams();
        //body.set('request', request);
        //        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        //        return this.http.post(this.serveletURL, body, options).
        //            map((res: Response) => res.json()).
        //            toPromise().
        //            then(function (response) {
        //                return response;
        //            });
        return this.http.get(this.serveletURL + request)
            .map(function (res) { return res.json(); })
            .toPromise()
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return MarketAPI;
}());
MarketAPI = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MarketAPI);
exports.MarketAPI = MarketAPI;
//# sourceMappingURL=MarketAPI.service.js.map