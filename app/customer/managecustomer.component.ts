import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {EntityCustomer} from '../dto/EntityCustomer';
import {DTOCustomer} from '../dto/DTOCustomer';
import {EntityUser} from '../dto/EntityUser';
import {EntitySaleOrderPayment} from "../dto/EntitySaleOrderPayment";
import {DTOSaleOrderPayment} from "../dto/DTOSaleOrderPayment";
import {EntityUserRole} from "../dto/EntityUserRole";
import {NavigationManager} from "../services/NavigationManager";
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/customer/managecustomer.component.html',
    providers: [WebAPIService, DatePipe]
})

export class ManageCustomerComponent {
    @ViewChild('manageCustomerMessageDispalyModal') public manageCustomerMessageDispalyModal: ModalDirective;
    private datePipe: DatePipe;
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
    
    private disableSaveButton: boolean = false;
    private disablePaymentSaveButton: boolean = false;
    
    //constants & constraints
    private maxCustomerLeftPanel: number = 10;
    
    private totalPaymentAmount: number;
    
    public showPaymentDatePicker: boolean = false;
    public paymentDate: Date = new Date();
    public minDate: Date = void 0;
    private entitySaleOrderPayment: EntitySaleOrderPayment;
    private saleOrderPaymentList: DTOSaleOrderPayment[];
    private paymentOrdersLimit: number = 10;
    private paymentOrdersOffset: number = 0;
    
    paymentLength = 0;
    paymentPageSize = 10;
    paymentPageSizeOptions = [5, 10];

    constructor( private router: Router, public route: ActivatedRoute, webAPIService: WebAPIService, private navigationManager: NavigationManager, public datepipe: DatePipe) {
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
        this.totalPaymentAmount = 0;
        this.datePipe = datepipe;
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
        
        this.entitySaleOrderPayment = new EntitySaleOrderPayment();
        this.saleOrderPaymentList = Array();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.customerId = params['customerId'];
            if(this.customerId != null && this.customerId > 0)
            {
                let dtoCustomer: DTOCustomer = new DTOCustomer();
                dtoCustomer.entityCustomer = new EntityCustomer();
                dtoCustomer.entityUser = new EntityUser();
                dtoCustomer.entityUserRole = new EntityUserRole();
                dtoCustomer.entityCustomer.id = this.customerId;
                this.fetchCustomerInfo(dtoCustomer);
            }            
        });
    }
    public hideManageCustomerMessageDispalyModal(): void {
        this.manageCustomerMessageDispalyModal.hide();
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
        this.disableSaveButton = false;
        this.customerId = 0;
        this.dtoCustomer = new DTOCustomer();
        this.dtoCustomer.entityCustomer = new EntityCustomer();
        this.dtoCustomer.entityUser = new EntityUser();
        this.dtoCustomer.entityUserRole = new EntityUserRole();
    }
    
    onPaymentPaginateChange(event:PageEvent)
    {
        this.paymentOrdersLimit = event.pageSize;
        this.paymentOrdersOffset = (event.pageIndex * event.pageSize) ;
        this.entitySaleOrderPayment = new EntitySaleOrderPayment();
        this.searchCustomerPayments(null);
    }
    
    searchCustomerPayments(event: Event) 
    {
        if(this.dtoCustomer.entityCustomer.userId != null && this.dtoCustomer.entityCustomer.userId > 0)
        {
            let customerUserId: number = this.dtoCustomer.entityCustomer.userId;
            //SALE_ORDER_PAYMENT_TYPE_ID_SALE_PAYMENT_OUT = 2
            //SALE_ORDER_PAYMENT_TYPE_ID_ADD_NEW_PAYMENT_OUT = 3
            let paymentTypeIds : string = "2,3";
            let requestBody: string = "{\"customerUserId\": " + customerUserId + ", \"paymentTypeIds\":\"" + paymentTypeIds + "\", \"offset\": " + this.paymentOrdersOffset + ", \"limit\": " + this.paymentOrdersLimit + "}";
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDER_PAYMENT_SUMMARY), requestBody).then(result => {
                if (result.success && result.saleOrderPayments != null) {
                    this.saleOrderPaymentList = result.saleOrderPayments;
                    this.paymentLength = result.totalSaleOrderPayments;
                    this.totalPaymentAmount = result.totalPaymentAmount;
                }
                else {

                }
            });
        }
        
    }

    saveCustomer(event: Event) {
        //check customer user name
        if (this.dtoCustomer.entityUser.userName == null || this.dtoCustomer.entityUser.userName == "") {
            this.manageCustomerErrorMessage = "Name is required.";
            this.manageCustomerMessageDispalyModal.config.backdrop = false;
            this.manageCustomerMessageDispalyModal.show();
            return;
        }

        this.dtoCustomer.entityUser.password = "pass";
        
        this.disableSaveButton = true;
        let requestBody: string = JSON.stringify(this.dtoCustomer);
        if (this.dtoCustomer.entityCustomer.id > 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_CUSTOMER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                //console.log(result);
                if (result.success) {
                    this.dtoCustomer = result;    
                    this.manageCustomerUpdateLeftPanel();
                }
                else {
                    
                    this.manageCustomerErrorMessage = result.message;
                    this.manageCustomerMessageDispalyModal.config.backdrop = false;
                    this.manageCustomerMessageDispalyModal.show();
                }
            });
        }
        else {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_CUSTOMER_INFO), requestBody).then(result => {
                this.disableSaveButton = false;
                //console.log(result);
                if (result.success) {
                    this.dtoCustomer = result;
                    this.manageCustomerUpdateLeftPanel();
                }
                else {
                    //set error message
                    //                    this.manageCustomerSuccessMessage = "";
                    this.manageCustomerErrorMessage = result.message;

                    //display pop up with message
                    this.manageCustomerMessageDispalyModal.config.backdrop = false;
                    this.manageCustomerMessageDispalyModal.show();
                }
            });
        }
        //reset this customer, fetch customer list again
    }
    
    saveSalePayment(event: Event) 
    {
        //you must create a customer before saving customer payment
        if (this.dtoCustomer.entityCustomer.userId == null || this.dtoCustomer.entityCustomer.userId == 0) {
            this.manageCustomerErrorMessage = "Please create/select a customer first before saving payment.";
            this.manageCustomerMessageDispalyModal.config.backdrop = false;
            this.manageCustomerMessageDispalyModal.show();
            return;
        }
        //payment amount is required
        if (this.entitySaleOrderPayment.amountOut == null) {
            this.manageCustomerErrorMessage = "Amount is required.";
            this.manageCustomerMessageDispalyModal.config.backdrop = false;
            this.manageCustomerMessageDispalyModal.show();
            return;
        }
        
        this.entitySaleOrderPayment.customerUserId = this.dtoCustomer.entityCustomer.userId;
        this.entitySaleOrderPayment.customerName = this.dtoCustomer.entityUser.userName;
        this.entitySaleOrderPayment.paymentDate = this.datepipe.transform(this.paymentDate, 'yyyy-MM-dd');
        this.disablePaymentSaveButton = true;
        let requestBody: string = JSON.stringify(this.entitySaleOrderPayment);
        if (this.entitySaleOrderPayment.id == null || this.entitySaleOrderPayment.id == 0) {
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.ADD_SALE_ORDER_PAYMENT), requestBody).then(result => {
                this.disablePaymentSaveButton = false;
                if (result.success) 
                {
                    this.entitySaleOrderPayment = result;
                    //fetch supplier payment list
                    this.searchCustomerPayments(null);
                    //fetch supplier due
                    this.fetchEntityCustomerInfo();  
                    this.fetchCustomerSaleAndPaymentAmount();
                    this.searchCustomerPayments(null);                  
                }
                else
                {
                    this.manageCustomerErrorMessage = result.message;
                    this.manageCustomerMessageDispalyModal.config.backdrop = false;
                    this.manageCustomerMessageDispalyModal.show();
                }
            });
        }
        else {
            //update customer payment here
            this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.UPDATE_SALE_ORDER_PAYMENT), requestBody).then(result => {
                this.disablePaymentSaveButton = false;
                if (result.success) 
                {
                    //fetch supplier payment list
                    this.searchCustomerPayments(null);
                    //fetch supplier due
                    this.fetchEntityCustomerInfo(); 
                    this.fetchCustomerSaleAndPaymentAmount();
                    this.searchCustomerPayments(null);                      
                }
                else
                {
                    this.manageCustomerErrorMessage = result.message;
                    this.manageCustomerMessageDispalyModal.config.backdrop = false;
                    this.manageCustomerMessageDispalyModal.show();
                }
            });
        }
    }
    
    fetchEntityCustomerInfo()
    {
        let requestBody: string = "{\"customerUserId\": " + this.dtoCustomer.entityCustomer.userId + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ENTITY_CUSTOMER_INFO), requestBody).then(result => {
            if (result.success) {
                this.dtoCustomer.entityCustomer = result;
            }
        });
    }
    
    setEntitySaleOrderPayment(event: Event, selectedEntitySaleOrderPayment: EntitySaleOrderPayment)
    {
        this.entitySaleOrderPayment = selectedEntitySaleOrderPayment;
        this.paymentDate = new Date(this.entitySaleOrderPayment.paymentDate);
    }
    
    selectedCustomer(event: Event, customerId: number) {
        event.preventDefault();
        this.customerId = customerId;
        //this.router.navigate(["managecustomer", {customerId: customerId}]);
        let customerCounter: number;
        for (customerCounter = 0; customerCounter < this.customerList.length; customerCounter++) {
            if (this.customerList[customerCounter].entityCustomer.id == customerId) {
                this.dtoCustomer = this.customerList[customerCounter];
                this.searchCustomerPayments(null);
                this.fetchCustomerSaleAndPaymentAmount();
                this.entitySaleOrderPayment = new EntitySaleOrderPayment();
            }
        }
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

    public fetchCustomerInfo(dtoCustomer: DTOCustomer) {
        let requestBody: string = JSON.stringify(dtoCustomer);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMER_INFO), requestBody).then(result => {
            //console.log(result);
            if (result.success) {
                this.dtoCustomer = result;
                this.searchCustomerPayments(null);
                this.fetchCustomerSaleAndPaymentAmount();
                this.entitySaleOrderPayment = new EntitySaleOrderPayment();
            }
        });
    }
    
    fetchCustomerSaleAndPaymentAmount()
    {
        let requestBody: string = "{\"customerUserId\": " + this.dtoCustomer.entityCustomer.userId + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_CUSTOMER_SALE_AND_PAYMENT_AMOUNT), requestBody).then(result => {
            if (result.success) {
                this.dtoCustomer.totalSaleAmount = result.totalSaleAmount;
                this.dtoCustomer.totalPaymentAmount = result.totalPaymentAmount;
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

