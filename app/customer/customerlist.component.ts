import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {MarketAPI} from './../services/MarketAPI.service';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityCustomer} from '../dto/EntityCustomer';
import {EntityUser} from '../dto/EntityUser';
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
    //private searchDTOCustomer: DTOCustomer;
    private showNavBar: boolean = false;
    private activeMenu: string = "customerlist";

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
        //this.searchDTOCustomer = new DTOCustomer();
        //this.searchDTOCustomer.entityUser = new EntityUser();
        
        this.reqDTOCustomer = new DTOCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        //this.customerList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":2,\"userId\":2,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Mohiuddin\",\"lastName\":\"Mishu\",\"email\":\"customer2@gmail.com\",\"cell\":\"01511223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":2,\"userId\":2,\"roleId\":2},\"reasonCode\":1000,\"success\":true}]");
        //console.log(this.customerList);
        this.fetchCustomerList();
    }

    ngOnInit() {

    }
    searchCustomer(event: Event) {
        console.log(this.reqDTOCustomer.entityUser.firstName);
    }
    showCustomer(event: Event, id: number) {
        //console.log(id);
        event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managecustomer");
        this.router.navigate(["managecustomer", {customerId: id}]);
    }
    
    public fetchCustomerList() {
        this.reqDTOCustomer.limit = 10;
        this.reqDTOCustomer.offset = 0;
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS), requestBody).then(result => {
            console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
            }
        });
    }
}


