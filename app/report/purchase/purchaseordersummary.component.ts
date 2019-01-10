import {Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {DTOPurchaseOrder} from './../../dto/DTOPurchaseOrder';
import {EntityUser} from './../../dto/EntityUser';
import {EntitySupplier} from "./../../dto/EntitySupplier";
import {EntityUserRole} from "./../../dto/EntityUserRole";
import {DTOSupplier} from './../../dto/DTOSupplier';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/purchase/purchaseordersummary.component.html',
    providers: [WebAPIService, DatePipe]
})

export class PurchaseOrderSummary {
    private datePipe: DatePipe;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    
    @ViewChild('purchaseOrderSummarySupplierModal') public purchaseOrderSummarySupplierModal: ModalDirective;

    public showStartDatePicker: boolean = false;
    public showEndDatePicker: boolean = false;
    public fromDate: Date = new Date();
    public toDate: Date = new Date();
    public minDate: Date = void 0;

    private showNavBar: boolean = false;
    private activeMenu: string = "purchaseordersummary";
    
    private purchaseOrderList: DTOPurchaseOrder[];
    private totalPurchaseAmount: number;
    
    private reqDTOSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    private dtoSupplier: DTOSupplier;    
    private supplierRequestId: number;
    
    private offset: number;
    private limit: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    
    supplierLength = 0;
    supplierPageSize = 10;
    supplierPageSizeOptions = [5, 10];

    constructor(private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager, public datepipe: DatePipe) {
        this.navigationManager.showNavBarEmitter.subscribe((mode) => {
            if (mode !== null) {
                this.showNavBar = mode;
            }
        });
        this.navigationManager.menuActivationEmitter.subscribe((menuName) => {
            if (menuName !== null) {
                this.activeMenu = menuName;
            }
        });
        this.webAPIService = webAPIService;
        this.datePipe = datepipe;
        
        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();
        
        this.totalPurchaseAmount = 0;
        this.offset = 0;
        this.limit = this.pageSize;
        this.purchaseOrderList = Array();
        this.fetchPurchaseOrderList();
        
        this.reqDTOSupplier = new DTOSupplier();
        this.reqDTOSupplier.entitySupplier = new EntitySupplier();
        this.reqDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier.limit = this.supplierPageSize;
        this.reqDTOSupplier.offset = 0;
        this.supplierRequestId = ACTION.FETCH_SUPPLIERS;
        this.fetchSupplierList();
        
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
        });
    }
    
    public fetchPurchaseOrderList() {
        let fromDate: string = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
        let toDate: string = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
        let userId: number = -1;
        if (this.dtoSupplier.entityUser.id > 0)
        {
            userId = this.dtoSupplier.entityUser.id;
        }
        let requestBody: string = "{\"startDate\": \"" + fromDate + "\", \"endDate\": \"" + toDate + "\", \"userId\": \"" + userId + "\", \"offset\": \"" + this.offset + "\", \"limit\": \"" + this.limit + "\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_PURCHASE_ORDER_SUMMARY), requestBody).then(result => {
            if (result.success && result.purchaseOrders != null) {
                this.purchaseOrderList = result.purchaseOrders;
                this.length = result.totalPurchaseOrders;
                this.totalPurchaseAmount = result.totalPurchaseAmount;
            }
            else {
                
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.offset = (event.pageIndex * event.pageSize) ;
        this.limit = event.pageSize;
        this.fetchPurchaseOrderList();
    }
    
    searchPurchaseOrderSummary(event: Event) 
    {
        this.offset = 0;
        this.limit = this.pageSize;
        this.purchaseOrderList = Array();
        this.fetchPurchaseOrderList();
    }
    
    public showPurchaseOrder(event: Event, orderNo: string) {
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managepurchase");
        this.router.navigate(["managepurchase", {orderNo: orderNo}]);
    }
    
    printPurchaseOrderSummary(event: Event) {

    }
    
    //---------------------------------supplier section starts ----------------------------------------//
    public fetchSupplierList() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }
    
    public fetchSupplierListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_NAME), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }
    
    public fetchSupplierListByCell() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_CELL), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }
    
    public fetchSupplierListByEmail() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_EMAIL), requestBody).then(result => {
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.supplierLength = result.totalSuppliers;
            }
        });
    }

    public hidePurchaseOrderSummarySupplierModal(): void {
        this.purchaseOrderSummarySupplierModal.hide();
    }

    public showPurchaseOrderSummarySupplierModal(event: Event) {
        this.purchaseOrderSummarySupplierModal.config.backdrop = false;
        this.purchaseOrderSummarySupplierModal.show();
    }

    public searchPurchaseOrderSupplier(event: Event) {
        this.reqDTOSupplier.limit = this.supplierPageSize;
        this.reqDTOSupplier.offset = 0;
        if (this.reqDTOSupplier.entitySupplier.supplierName != null && this.reqDTOSupplier.entitySupplier.supplierName != "")
        {
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS_BY_NAME;
            this.fetchSupplierListByName();
        }
        else if (this.reqDTOSupplier.entitySupplier.cell != null && this.reqDTOSupplier.entitySupplier.cell != "")
        {
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS_BY_CELL;
            this.fetchSupplierListByCell();
        }
        else if (this.reqDTOSupplier.entitySupplier.email != null && this.reqDTOSupplier.entitySupplier.email != "")
        {
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS_BY_EMAIL;
            this.fetchSupplierListByEmail();
        }
        else
        {
            //if nothing is set then get all suppliers
            this.supplierRequestId = ACTION.FETCH_SUPPLIERS;
            this.fetchSupplierList();
        }        
    }

    public selectedSupplier(event: Event, supplierId: number) 
    {
        this.purchaseOrderSummarySupplierModal.hide();
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++) {
            if (this.supplierList[supplierCounter].entitySupplier.id == supplierId) {
                this.dtoSupplier = this.supplierList[supplierCounter];         
            }
        }
    }
    
    onSupplierPaginateChange(event:PageEvent)
    {
        this.reqDTOSupplier.limit = event.pageSize;
        this.reqDTOSupplier.offset = (event.pageIndex * event.pageSize) ;
        if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS)
        {
            this.fetchSupplierList();
        }
        else if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS_BY_NAME)
        {
            this.fetchSupplierListByName();
        }
        else if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS_BY_CELL)
        {
            this.fetchSupplierListByCell();
        }
        else if (this.supplierRequestId == ACTION.FETCH_SUPPLIERS_BY_EMAIL)
        {
            this.fetchSupplierListByEmail();
        }
    }
    //---------------------------------supplier section ends ----------------------------------------//

}

