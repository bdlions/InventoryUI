import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityUser} from '../dto/EntityUser';
import {EntitySupplier} from '../dto/EntitySupplier';
import {DTOSupplier} from '../dto/DTOSupplier';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/supplierlist.component.html',
    providers: [WebAPIService]
})

export class SupplierListComponent {
    private webAPIService: WebAPIService;
    private reqDTOSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    private totalDue: number = 0;
    //private searchDTOSupplier: DTOSupplier;
    private showNavBar: boolean = false;
    private activeMenu: string = "supplierlist";
    
    private requestId: number;
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];

    constructor( private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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
        //this.searchDTOSupplier = new DTOSupplier();
        //this.searchDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier = new DTOSupplier();
        this.reqDTOSupplier.entitySupplier = new EntitySupplier();
        this.reqDTOSupplier.entityUser = new EntityUser();
        //this.supplierList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":1,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":2,\"userId\":2,\"remarks\":10,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":2,\"firstName\":\"Nazmul\",\"lastName\":\"Islam\",\"email\":\"supplier2@gmail.com\",\"cell\":\"01912341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        //console.log(this.supplierList);
        this.reqDTOSupplier.limit = this.pageSize;
        this.reqDTOSupplier.offset = 0;
        this.requestId = ACTION.FETCH_SUPPLIERS;
        this.fetchSupplierList();
    }

    ngOnInit() {

    }
    searchSupplier(event: Event) {
        //console.log(this.reqDTOSupplier.entityUser.firstName);
        this.reqDTOSupplier.limit = this.pageSize;
        this.reqDTOSupplier.offset = 0;
        if (this.reqDTOSupplier.entitySupplier.supplierName != null && this.reqDTOSupplier.entitySupplier.supplierName != "")
        {
            this.requestId = ACTION.FETCH_SUPPLIERS_BY_NAME;
            this.fetchSupplierListByName();
            return;
        }
        //if nothing is set then get all suppliers
        this.requestId = ACTION.FETCH_SUPPLIERS;
        this.fetchSupplierList();
    }
    showSupplier(event: Event, id: number) {
        console.log(id);
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesupplier");
        this.router.navigate(["managesupplier", {supplierId: id}]);
    }
    public fetchSupplierList() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS), requestBody).then(result => {
            console.log(result);
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.length = result.totalSuppliers;
                this.totalDue = result.totalDue;
            }
        });
    }
    
    public fetchSupplierListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS_BY_NAME), requestBody).then(result => {
            console.log(result);
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                this.length = result.totalSuppliers;
            }
        });
    }
    
    onPaginateChange(event:PageEvent){
        this.reqDTOSupplier.limit = event.pageSize;
        this.reqDTOSupplier.offset = (event.pageIndex * event.pageSize) ;        
        if (this.requestId == ACTION.FETCH_SUPPLIERS)
        {
            this.fetchSupplierList();
        }
        else if (this.requestId == ACTION.FETCH_SUPPLIERS_BY_NAME)
        {
            this.fetchSupplierListByName();
        }
    }
    
    //--------------------- print entire supplier list ------------------------------//
    printSupplierList(event: Event)
    {
        window.printJS(window.SITE_URL +'supplierreport');
    }  
}



