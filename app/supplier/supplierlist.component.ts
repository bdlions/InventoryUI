import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityUser} from '../dto/EntityUser';
import {DTOSupplier} from '../dto/DTOSupplier';

@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/supplierlist.component.html',
    providers: [WebAPIService]
})

export class SupplierListComponent {
    private webAPIService: WebAPIService;
    private reqDTOSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    private searchDTOSupplier: DTOSupplier;
    private showNavBar: boolean = false;
    private activeMenu: string = "supplierlist";

    constructor(private marketAPI: MarketAPI, private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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
        this.searchDTOSupplier = new DTOSupplier();
        this.searchDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier = new DTOSupplier();
        this.supplierList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":1,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":2,\"userId\":2,\"remarks\":10,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":2,\"firstName\":\"Nazmul\",\"lastName\":\"Islam\",\"email\":\"supplier2@gmail.com\",\"cell\":\"01912341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        console.log(this.supplierList);
        //this.fetchSupplierList();
    }

    ngOnInit() {

    }
    searchSupplier(event: Event) {
        console.log(this.searchDTOSupplier.entityUser.firstName);
    }
    showSupplier(event: Event, id: number) {
        //console.log(id);
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesupplier");
        this.router.navigate(["managesupplier", {supplierId: id}]);
    }
    public fetchSupplierList() {
        this.reqDTOSupplier.limit = 10;
        this.reqDTOSupplier.offset = 0;
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS), requestBody).then(result => {
            console.log(result);
            if (result.success && result.suppliers != null) {
                this.supplierList = result.suppliers;
                console.log(this.supplierList);
            }
        });
    }
}



