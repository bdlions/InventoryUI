import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {TabsetComponent} from 'ngx-bootstrap';
import {EntityUser} from '../dto/EntityUser';
import {EntitySupplier} from "../dto/EntitySupplier";
import {EntityUserRole} from "../dto/EntityUserRole";
import {DTOSupplier} from '../dto/DTOSupplier';
import {NavigationManager} from "../services/NavigationManager";


@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/managesupplier.component.html',
    providers: [WebAPIService]
})

export class ManageSupplierComponent {
    @ViewChild('manageSupplierMessageDispalyModal') public manageSupplierMessageDispalyModal: ModalDirective;
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private reqDTOSupplier: DTOSupplier;
    private dtoSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    //private searchDTOSupplier: DTOSupplier;
    private showNavBar: boolean = false;
    private activeMenu: string = "managesupplier";

    //    private manageSupplierSuccessMessage: string;
    private manageSupplierErrorMessage: string;
    
    //constants & constraints
    private maxSupplierLeftPanel: number = 10;

    constructor(private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager) {
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
        this.reqDTOSupplier.entityUserRole = new EntityUserRole();

        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();

        //this.dtoSupplier = JSON.parse("{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":3,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":3,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}");
        //this.supplierList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":1,\"remarks\":\"remarks of supplier1\",\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":2,\"userId\":2,\"remarks\":\"remarks of supplier2\",\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":2,\"firstName\":\"Nazmul\",\"lastName\":\"Islam\",\"email\":\"supplier2@gmail.com\",\"cell\":\"01912341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        //console.log(this.supplierList);
        this.fetchSupplierList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            let supplierId: number = params['supplierId'];
            this.reqDTOSupplier.entitySupplier.id = supplierId;
            this.fetchSupplierInfo();
        });
    }

    public hideManageSupplierMessageDispalyModal(): void {
        this.manageSupplierMessageDispalyModal.hide();
    }
    searchSupplier(event: Event) {
        console.log(this.reqDTOSupplier.entityUser.firstName);
    }

    newSupplier(event: Event) {
        this.dtoSupplier = new DTOSupplier();
        this.dtoSupplier.entitySupplier = new EntitySupplier();
        this.dtoSupplier.entityUser = new EntityUser();
        this.dtoSupplier.entityUserRole = new EntityUserRole();
    }

    saveSupplier(event: Event) {
        //check supplier first name
        if (this.dtoSupplier.entityUser.firstName == null || this.dtoSupplier.entityUser.firstName == "") {
            //            this.manageSupplierSuccessMessage = "";
            this.manageSupplierErrorMessage = "Enter supplier first name";
            this.manageSupplierMessageDispalyModal.config.backdrop = false;
            this.manageSupplierMessageDispalyModal.show();
            return;
        }
        //check supplier last name
        //        if (this.dtoSupplier.entityUser.lastName == null || this.dtoSupplier.entityUser.lastName == "") {
        //            this.manageSupplierErrorMessage = "";
        //            this.manageSupplierErrorMessage = "Enter supplier last name";
        //            this.manageSupplierMessageDispalyModal.config.backdrop = false;
        //            this.manageSupplierMessageDispalyModal.show();
        //            return;
        //        }
        //set a default password for the supplier
        this.dtoSupplier.entityUser.password = "pass";
        let requestBody: string = JSON.stringify(this.dtoSupplier);
        if (this.dtoSupplier.entitySupplier.id > 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_SUPPLIER_INFO), requestBody).then(result => {
                //console.log(result);
                if (result.success) {
                    //set success message
                    //this.manageSupplierSuccessMessage = result.message;
                    //this.manageSupplierErrorMessage = "";

                    //reset supplier
                    //this.newSupplier(event);

                    //update left panel supplier list
                    //this.reqDTOSupplier = new DTOSupplier();
                    //this.reqDTOSupplier.entitySupplier = new EntitySupplier();
                    //this.reqDTOSupplier.entityUser = new EntityUser();
                    //this.reqDTOSupplier.entityUserRole = new EntityUserRole();
                    //this.fetchSupplierList();
                    
                    this.manageSupplierUpdateLeftPanel();
                }
                else {
                    //set error message
                    //this.manageSupplierSuccessMessage = "";
                    this.manageSupplierErrorMessage = result.message;
                    //display pop up with message
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                }
            });
        }
        else {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SUPPLIER_INFO), requestBody).then(result => {
                console.log(result);
                if (result.success) {
                    //response from server contains newly created supplier id and user id
                    this.dtoSupplier = result;
                    this.manageSupplierUpdateLeftPanel();
                    //set success message
                    //this.manageSupplierSuccessMessage = result.message;
                    //this.manageSupplierErrorMessage = "";

                    //reset supplier
                    //this.newSupplier(event);

                    //update left panel supplier list
                    //this.reqDTOSupplier = new DTOSupplier();
                    //this.reqDTOSupplier.entitySupplier = new EntitySupplier();
                    //this.reqDTOSupplier.entityUser = new EntityUser();
                    //this.reqDTOSupplier.entityUserRole = new EntityUserRole();
                    //this.fetchSupplierList();
                }
                else {
                    //set error message
                    //this.manageSupplierSuccessMessage = "";
                    this.manageSupplierErrorMessage = result.message;
                    //display pop up with message
                    this.manageSupplierMessageDispalyModal.config.backdrop = false;
                    this.manageSupplierMessageDispalyModal.show();
                }
            });
        }
        //reset this supplier, fetch supplier list again
    }
    selectedSupplier(event: Event, supplierId: number) {
        event.preventDefault();
        //this.router.navigate(["managesupplier", {productId: supplierId}]);
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++) {
            if (this.supplierList[supplierCounter].entitySupplier.id == supplierId) {
                this.dtoSupplier = this.supplierList[supplierCounter];
            }
        }
    }

    public fetchSupplierList() {
        this.reqDTOSupplier.limit = 10;
        this.reqDTOSupplier.offset = 0;
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIERS), requestBody).then(result => {
//            console.log(result);
            if (result.success && result.suppliers != null) {
                 //console.log(result.suppliers);
                this.supplierList = result.suppliers;
            }
            this.supplierList.reverse()
        });
    }

    public fetchSupplierInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOSupplier);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SUPPLIER_INFO), requestBody).then(result => {
            console.log(result);
            if (result.success) {
                this.dtoSupplier = result;
            }
        });
    }
    
    public manageSupplierUpdateLeftPanel()
    {
        let tempSupplierList: DTOSupplier[] = Array();
        tempSupplierList[0] = this.dtoSupplier;
        let totalSupplier: number = 1;
        let supplierCounter: number;
        for (supplierCounter = 0; supplierCounter < this.supplierList.length; supplierCounter++)
        {
            if (this.supplierList[supplierCounter].entitySupplier.id != this.dtoSupplier.entitySupplier.id && totalSupplier <= this.maxSupplierLeftPanel)
            {
                tempSupplierList[totalSupplier] = this.supplierList[supplierCounter];
                totalSupplier++;
            }
        }
        this.supplierList = tempSupplierList;
    }
}


