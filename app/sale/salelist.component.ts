
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationManager} from "../services/NavigationManager";
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';
import {DTOSaleOrder} from '../dto/DTOSaleOrder';
import {EntitySaleOrder} from '../dto/EntitySaleOrder';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/salelist.component.html',
    providers: [WebAPIService]
})

export class SaleListComponent {
    private webAPIService: WebAPIService;
    private reqDTOSaleOrder: DTOSaleOrder;
    private saleOrderList: DTOSaleOrder[];
    private showNavBar: boolean = false;
    private activeMenu: string = "salelist";

    constructor(private router: Router, private navigationManager: NavigationManager, webAPIService: WebAPIService) {
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
        this.reqDTOSaleOrder = new DTOSaleOrder();
        this.reqDTOSaleOrder.entitySaleOrder = new EntitySaleOrder();
        //this.saleOrderList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":1,\"orderNo\":\"order1\",\"customerUserId\":4,\"statusId\":0,\"saleDate\":0,\"discount\":0.0,\"total\":0.0,\"paid\":0.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":0,\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false},{\"limit\":0,\"offset\":0,\"entitySaleOrder\":{\"id\":2,\"orderNo\":\"order2\",\"customerUserId\":2,\"statusId\":0,\"saleDate\":0,\"discount\":10.0,\"total\":10.0,\"paid\":10.0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"dtoCustomer\":{\"limit\":0,\"offset\":0,\"entityCustomer\":{\"id\":0,\"userId\":0,\"balance\":10.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":1,\"accountStatusId\":1,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":false},\"products\":[],\"reasonCode\":1000,\"success\":false}]");
        //console.log(this.saleOrderList);
        this.fetchSaleOrderList();
    }

    ngOnInit() {

    }

    public searchSaleOrder(event: Event) {
        this.fetchSaleOrderList();
    }
    
    public showSaleOrder(event: Event, orderNo: string) {
        //console.log(id);
         event.preventDefault();
        this.navigationManager.showNavBar(true);
        this.navigationManager.setActiveMenu("managesale");
        this.router.navigate(["managesale", {orderNo: orderNo}]);
    }
    
    public fetchSaleOrderList() {
        this.reqDTOSaleOrder.offset = 0;
        this.reqDTOSaleOrder.limit = 10;
        let requestBody: string = JSON.stringify(this.reqDTOSaleOrder);
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_SALE_ORDERS), requestBody).then(result => {
            if (result.success && result.saleOrders != null) {
                this.saleOrderList = result.saleOrders;
            }
            else {
                
            }
        });
    }
}