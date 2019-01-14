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
import {AdminDashboardComponent} from './admindashboard.component';
import {SalesManDashboardComponent} from './salesmandashboard.component';
import {ManageProductCategoryComponent} from './product/manageproductcategory.component';
import {ProductCategoryListComponent} from './product/productcategorylist.component';
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
import {AdjustStockComponent} from './stock/adjuststock.component';
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
//sales report
import {SalesByProductSummary} from './report/sales/salesbyproductsummary.component';
import {SalesOrderSummary} from './report/sales/salesordersummary.component';
import {SalesOrderProfitSummary} from './report/sales/salesorderprofitsummary.component';
import {SaleOrderProfitComponent} from './report/sales/saleorderprofit.component';
import {SalesOrderDetails} from './report/sales/salesorderdetails.component';
import {SalesOrderProfit} from './report/sales/salesorderprofit.component';
import {CustomerPaymentSummary} from './report/sales/customerpaymentsummary.component';
import {CustomerPaymentByOrder} from './report/sales/customerpaymentbyorder.component';
import {CustomerOrderHistory} from './report/sales/customerorderhistory.component';
import {CustomerProductList} from './report/sales/customerproductlist.component';
import {CustomerListReport} from './report/sales/customerlistreport.component';
//purchase report
import {PurchaseOrderSummary} from './report/purchase/purchaseordersummary.component';
import {PurchasesByProductSummary} from './report/purchase/purchasesbyproductsummary.component';
import {PurchaseOrderDetails} from './report/purchase/purchaseorderdetails.component';
import {SupplierPaymentSummary} from './report/purchase/supplierpaymentsummary.component';
import {SupplierProductList} from './report/purchase/supplierproductlist.component';
import {SupplierListReport} from './report/purchase/supplierlistreport.component';
//stock report
import {EndingStockComponent} from './report/stock/endingstock.component';
//user
import {ManageUserComponent} from './user/manageuser.component';
import {UserListComponent} from './user/userlist.component';

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
        path: 'admindashboard',
        component: AdminDashboardComponent
    },
    {
        path: 'salesmandashboard',
        component: SalesManDashboardComponent
    },
    {
        path: 'manageproductcategory',
        component: ManageProductCategoryComponent
    },
    {
        path: 'productcategorylist',
        component: ProductCategoryListComponent
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
        path: 'adjuststock',
        component: AdjustStockComponent
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
        path: 'endingstock',
        component: EndingStockComponent
    },
    {
        path: 'salesbyproductsummary',
        component: SalesByProductSummary
    },
    {
        path: 'salesordersummary',
        component: SalesOrderSummary
    },
    {
        path: 'salesorderprofitsummary',
        component: SalesOrderProfitSummary
    },
    {
        path: 'saleorderprofit',
        component: SaleOrderProfitComponent
    },
    {
        path: 'salesorderdetails',
        component: SalesOrderDetails
    },
    {
        path: 'salesorderprofit',
        component: SalesOrderProfit
    },
    {
        path: 'customerpaymentsummary',
        component: CustomerPaymentSummary
    },
    {
        path: 'customerpaymentbyorder',
        component: CustomerPaymentByOrder
    },
    {
        path: 'customerorderhistory',
        component: CustomerOrderHistory
    },
    {
        path: 'customerproductlist',
        component: CustomerProductList
    },
    {
        path: 'customerlistreport',
        component: CustomerListReport
    },
    {
        path: 'purchaseordersummary',
        component: PurchaseOrderSummary
    },
    {
        path: 'purchasesbyproductsummary',
        component: PurchasesByProductSummary
    },
    {
        path: 'purchaseorderdetails',
        component: PurchaseOrderDetails
    },
    {
        path: 'supplierpaymentsummary',
        component: SupplierPaymentSummary
    },
    {
        path: 'supplierproductlist',
        component: SupplierProductList
    },
    {
        path: 'supplierlistreport',
        component: SupplierListReport
    },
    {
        path: 'manageuser',
        component: ManageUserComponent
    },
    {
        path: 'userlist',
        component: UserListComponent
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
        AdminDashboardComponent,
        SalesManDashboardComponent,
        ManageProductCategoryComponent,
        ProductCategoryListComponent,
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
        AdjustStockComponent,
        ProductComponent,
        ProfileComponent,
        TopNavbarComponent,
        FooterComponent,
        LoaderComponent,
        MatProgressSpinner, MatSpinner,
        CKEditorSample,
        EndingStockComponent,
        SalesByProductSummary,
        SalesOrderSummary,
        SalesOrderProfitSummary,
        SaleOrderProfitComponent,
        SalesOrderDetails,
        SalesOrderProfit,
        CustomerPaymentSummary,
        CustomerPaymentByOrder,
        CustomerOrderHistory,
        CustomerProductList,
        CustomerListReport,
        PurchaseOrderSummary,
        PurchasesByProductSummary,
        PurchaseOrderDetails,
        SupplierPaymentSummary,
        SupplierProductList,
        SupplierListReport,
        ManageUserComponent,
        UserListComponent,
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