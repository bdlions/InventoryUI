import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BsDropdownModule, CarouselModule, TypeaheadModule, DatepickerModule, ModalModule} from 'ngx-bootstrap';
import {FileUploadModule } from 'ng2-file-upload';
import {enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';


import {MarketAPI} from './services/MarketAPI.service';
import {AppComponent} from './app.component';
import {LogoutComponent} from './logout.component';
import {ManageProductComponent} from './product/manageproduct.component';
import {ProductListComponent} from './product/productlist.component';
import {ManageCustomerComponent} from './customer/managecustomer.component';
import {CustomerListComponent} from './customer/customerlist.component';
import {ManageSupplierComponent} from './supplier/managesupplier.component';
import {SupplierListComponent} from './supplier/supplierlist.component';
import {ManagePurchaseComponent} from './purchase/managepurchase.component';
import {PurchaseListComponent} from './purchase/purchaselist.component';
import {ManageSaleComponent} from './sale/managesale.component';
import {SaleListComponent} from './sale/salelist.component';
import {CurrentStockComponent} from './stock/currentstock.component';
import {HomeComponent} from './home.component';
import {ProductComponent} from './product.component';
import {ProfileComponent} from './profile.component';
import {AppTemplate} from './app.template';
import {TopNavbarComponent} from './topnavbar.component';
import {NavigationManager} from './services/NavigationManager';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'login',
        component: AppComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'manageproduct',
        component: ManageProductComponent
    },
    {
        path: 'productlist',
        component: ProductListComponent
    },
    {
        path: 'managecustomer',
        component: ManageCustomerComponent
    },
    {
        path: 'customerlist',
        component: CustomerListComponent
    },
    {
        path: 'managesupplier',
        component: ManageSupplierComponent
    },
    {
        path: 'supplierlist',
        component: SupplierListComponent
    },
    {
        path: 'managepurchase',
        component: ManagePurchaseComponent
    },
    {
        path: 'purchaselist',
        component: PurchaseListComponent
    },
    {
        path: 'managesale',
        component: ManageSaleComponent
    },
    {
        path: 'salelist',
        component: SaleListComponent
    },
    {
        path: 'currentstock',
        component: CurrentStockComponent
    },
    {
        path: 'products',
        component: ProductComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: '**',
        component: AppComponent
    },

];

enableProdMode();
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        TypeaheadModule.forRoot(),
        DatepickerModule.forRoot(),
        ModalModule.forRoot(),
        FileUploadModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        /**
         * This is for templating
         */
        AppTemplate,

        /**
         * All are components of the template
         */
        AppComponent,
        LogoutComponent,
        HomeComponent,
        ManageProductComponent,
        ProductListComponent,
        ManageCustomerComponent,
        CustomerListComponent,
        ManageSupplierComponent,
        SupplierListComponent,
        ManagePurchaseComponent,
        PurchaseListComponent,
        ManageSaleComponent,
        SaleListComponent,
        CurrentStockComponent,
        ProductComponent,
        ProfileComponent,
        TopNavbarComponent,
    ],
    providers: [
        MarketAPI, 
        NavigationManager,
        
//        {provide: APP_BASE_HREF, useValue: '/InventoryUI'}
          {provide: LocationStrategy, useValue: '/InventoryUI/', useClass: HashLocationStrategy}


    ],
    bootstrap: [AppTemplate]
//    bootstrap: [HomeComponent]
})

export class AppModule {}