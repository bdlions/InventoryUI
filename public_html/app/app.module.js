"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ngx_bootstrap_1 = require("ngx-bootstrap");
//import {FileUploadModule } from 'ng2-file-upload';
var core_2 = require("@angular/core");
var router_1 = require("@angular/router");
var MarketAPI_service_1 = require("./services/MarketAPI.service");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home.component");
var product_component_1 = require("./product.component");
var profile_component_1 = require("./profile.component");
var app_template_1 = require("./app.template");
var topnavbar_component_1 = require("./topnavbar.component");
var NavigationManager_1 = require("./services/NavigationManager");
var common_1 = require("@angular/common");
var appRoutes = [
    {
        path: '',
        component: app_component_1.AppComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'products',
        component: product_component_1.ProductComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: '**',
        component: app_component_1.AppComponent
    },
];
core_2.enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ngx_bootstrap_1.BsDropdownModule.forRoot(),
                ngx_bootstrap_1.CarouselModule.forRoot(),
                ngx_bootstrap_1.TypeaheadModule.forRoot(),
                ngx_bootstrap_1.DatepickerModule.forRoot(),
                ngx_bootstrap_1.ModalModule.forRoot(),
                //FileUploadModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            declarations: [
                /**
                 * This is for templating
                 */
                app_template_1.AppTemplate,
                /**
                 * All are components of the template
                 */
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                product_component_1.ProductComponent,
                profile_component_1.ProfileComponent,
                topnavbar_component_1.TopNavbarComponent,
            ],
            providers: [
                MarketAPI_service_1.MarketAPI,
                NavigationManager_1.NavigationManager,
                //        {provide: APP_BASE_HREF, useValue: '/InventoryUI'}
                { provide: common_1.LocationStrategy, useValue: '/InventoryUI/', useClass: common_1.HashLocationStrategy }
            ],
            bootstrap: [app_template_1.AppTemplate]
            //    bootstrap: [HomeComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map