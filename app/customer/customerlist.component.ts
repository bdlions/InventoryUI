import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityCustomer} from '../dto/EntityCustomer';
import {DTOCustomer} from '../dto/DTOCustomer';

@Component({
    selector: 'app',
    templateUrl: 'app/html/customer/customerlist.component.html',
    providers: [WebAPIService]
})

export class CustomerListComponent {
    private webAPIService: WebAPIService;
    private reqDTOCustomer: DTOCustomer;
    private customerList: DTOCustomer[];
    private searchEntityCustomer: EntityCustomer;

    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.searchEntityCustomer = new EntityCustomer();
        this.reqDTOCustomer = new DTOCustomer();
        this.customerList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        console.log(this.customerList);
    }

    ngOnInit() {

    }
    searchCustomer(event: Event) {
        //        console.log("Search Customer");
        console.log(this.searchEntityCustomer.userId);
    }
}


