import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {EntityCustomer} from '../../dto/EntityCustomer';
import {DTOCustomer} from '../../dto/DTOCustomer';
import {EntityUser} from '../../dto/EntityUser';
import {EntityUserRole} from "../../dto/EntityUserRole";
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/sales/salesbyproductsummery.component.html',
    providers: [WebAPIService]
})

export class SalesByProductSummery {
    private webAPIService: WebAPIService;
    private subscribe: Subscription;
    private reqDTOCustomer: DTOCustomer;
    private dtoCustomer: DTOCustomer;
    private customerList: DTOCustomer[];
    //private searchDTOCustomer: DTOCustomer;
    private showNavBar: boolean = false;
    private activeMenu: string = "managecustomer";
    private customerId: number;
    //    private manageCustomerSuccessMessage: string;
    private manageCustomerErrorMessage: string;
    
    //constants & constraints
    private maxCustomerLeftPanel: number = 10;

    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager) {
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
        this.reqDTOCustomer.entityCustomer = new EntityCustomer();
        this.reqDTOCustomer.entityUser = new EntityUser();
        this.reqDTOCustomer.entityUserRole = new EntityUserRole();

        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();
        //this.dtoCustomer = JSON.parse("{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"remarks\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}");
        //this.customerList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":1,\"userId\":4,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":4,\"firstName\":\"Alamgir\",\"lastName\":\"Kabir\",\"email\":\"customer1@gmail.com\",\"cell\":\"01711223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true},{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":2,\"userId\":2,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"firstName\":\"Mohiuddin\",\"lastName\":\"Mishu\",\"email\":\"customer2@gmail.com\",\"cell\":\"01511223344\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":2,\"userId\":2,\"roleId\":2},\"reasonCode\":1000,\"success\":true}]");
        //console.log(this.customerList);
        this.reqDTOCustomer.limit = 10;
        this.reqDTOCustomer.offset = 0;
        this.fetchCustomerList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            let customerId: number = params['customerId'];
            this.customerId = customerId;
            this.reqDTOCustomer.entityCustomer.id = customerId;
            this.fetchCustomerInfo();
        });
    }
    searchSalesByProductSummary(event: Event){
        
    }
    searchCustomer(event: Event) 
    {
        if (this.reqDTOCustomer.entityCustomer.customerName != null && this.reqDTOCustomer.entityCustomer.customerName != "") 
        {
            this.reqDTOCustomer.limit = 10;
            this.reqDTOCustomer.offset = 0;
            this.fetchCustomerListByName();
        }
        else 
        {
            this.reqDTOCustomer.limit = 10;
            this.reqDTOCustomer.offset = 0;
            this.fetchCustomerList();
        }
    }

    newCustomer(event: Event) {
        this.customerId = 0;
        //console.log("New Customer");
        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();
    }

   

    public fetchCustomerList() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
            }
        });
    }
    
    public fetchCustomerListByName() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMERS_BY_NAME), requestBody).then(result => {
            //console.log(result);
            if (result.success && result.customers != null) {
                this.customerList = result.customers;
            }
        });
    }

    public fetchCustomerInfo() {
        let requestBody: string = JSON.stringify(this.reqDTOCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMER_INFO), requestBody).then(result => {
            //console.log(result);
            if (result.success) {
                this.dtoCustomer = result;
            }
        });
    }
    
    public manageCustomerUpdateLeftPanel()
    {
        this.customerId = this.dtoCustomer.entityCustomer.id;
        let tempCustomerList: DTOCustomer[] = Array();
        tempCustomerList[0] = this.dtoCustomer;
        let totalCustomers: number = 1;
        let customerCounter: number;
        for (customerCounter = 0; customerCounter < this.customerList.length; customerCounter++)
        {
            if (this.customerList[customerCounter].entityCustomer.id != this.dtoCustomer.entityCustomer.id && totalCustomers <= this.maxCustomerLeftPanel)
            {
                tempCustomerList[totalCustomers] = this.customerList[customerCounter];
                totalCustomers++;
            }
        }
        this.customerList = tempCustomerList;
    }
}

