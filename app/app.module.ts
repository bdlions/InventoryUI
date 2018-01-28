import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BsDropdownModule, CarouselModule, TypeaheadModule, DatepickerModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import {enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';


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
import {FooterComponent} from './footer.component';
import {NavigationManager} from './services/NavigationManager';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderComponent} from './loader.component'
import {LoaderService} from './webservice/loader.service'
import {WebAPIService} from './webservice/web-api-service'
import { CKEditorModule } from 'ng2-ckeditor';
import {CKEditorSample} from './CKEditorSample';
//report
import {SalesByProductSummery} from './report/sales/salesbyproductsummery.component';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatSpinner,
    MatProgressSpinner,
    MatFormFieldControl,
    MatOptionModule,
    MatFormFieldModule,
} from '@angular/material';

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
        path: 'ck',
        component: CKEditorSample
    },
    {
        path: '**',
        component: AppComponent
    },
    {
        path: 'salesbyproductsummery',
        component: SalesByProductSummery
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
        TabsModule.forRoot(),
        MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatMenuModule,
        MatPaginatorModule,
        BrowserAnimationsModule, MatButtonModule, FileUploadModule,
        RouterModule.forRoot(appRoutes),
        CKEditorModule
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatOptionModule,
        MatSelectModule, MatButtonModule,
        MatMenuModule,
        MatProgressSpinner, MatSpinner,
        MatFormFieldModule, MatOptionModule,
        MatSelectModule, MatButtonModule,
        MatMenuModule,MatProgressSpinner, MatSpinner,
        FileUploadModule,
        LoaderComponent
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
        FooterComponent,
        LoaderComponent,
        MatProgressSpinner, MatSpinner,
        CKEditorSample,
        SalesByProductSummery,
    ],
    providers: [
        NavigationManager,
        WebAPIService,
        LoaderService,
        
        {provide: LocationStrategy, useValue: '/InventoryUI/', useClass: HashLocationStrategy}


    ],
    bootstrap: [AppTemplate]
    //    bootstrap: [HomeComponent]
})

export class AppModule {}