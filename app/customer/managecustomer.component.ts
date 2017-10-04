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
import {EntityCustomer} from '../dto/EntityCustomer';
import {EntityUser} from '../dto/EntityUser';
import {DTOCustomer} from '../dto/DTOCustomer';

@Component({
    selector: 'app',
    templateUrl: 'app/html/customer/managecustomer.component.html',
    providers: [WebAPIService]
})

export class ManageCustomerComponent {
    private webAPIService: WebAPIService;
    private reqDTOCustomer: DTOCustomer;
    private dtoCustomer: DTOCustomer;
    private customerList: DTOCustomer[];
    private searchDTOCustomer: DTOCustomer;

    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.searchDTOCustomer = new DTOCustomer();
        this.searchDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer = new DTOCustomer();
        this.dtoCustomer = JSON.parse("{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"remarks\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}");
        this.customerList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"remarks\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        console.log(this.customerList);
    }

    ngOnInit() {

    }

    searchCustomer(event: Event) {
        console.log(this.searchDTOCustomer.entityUser.firstName);
    }
    newCustomer(event: Event) {
        console.log("New Customer");
    }
    saveCustomer(event: Event) {
        console.log("Save Customer");
    }
    selectedCustomer(event: Event, id: number) {
        console.log(id);
    }
}

