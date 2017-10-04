/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityUser} from '../dto/EntityUser';
import {DTOSupplier} from '../dto/DTOSupplier';


@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/managesupplier.component.html',
    providers: [WebAPIService]
})

export class ManageSupplierComponent {
    private webAPIService: WebAPIService;
    private reqDTOSupplier: DTOSupplier;
    private dtoSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    private searchDTOSupplier: DTOSupplier;

    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.searchDTOSupplier = new DTOSupplier();
        this.searchDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier = new DTOSupplier();
        this.dtoSupplier = JSON.parse("{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":3,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":3,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}");
        this.supplierList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":3,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":3,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        //console.log(this.supplierList);
    }

    ngOnInit() {

    }
    searchSupplier(event: Event) {
        console.log(this.searchDTOSupplier.entityUser.firstName);
    }
    newSupplier(event: Event) {
        console.log("New Supplier");
    }
    saveSupplier(event: Event) {
        console.log("Save Supplier");
    }
    selectedSupplier(event: Event, id: number) {
        console.log(id);
    }
}


