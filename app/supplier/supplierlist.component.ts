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
    templateUrl: 'app/html/supplier/supplierlist.component.html',
    providers: [WebAPIService]
})

export class SupplierListComponent {
    private webAPIService: WebAPIService;
    private reqDTOSupplier: DTOSupplier;
    private supplierList: DTOSupplier[];
    private searchDTOSupplier: DTOSupplier;

    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        this.searchDTOSupplier = new DTOSupplier();
        this.searchDTOSupplier.entityUser = new EntityUser();
        this.reqDTOSupplier = new DTOSupplier();
        this.supplierList = JSON.parse("[{\"limit\":0,\"offset\":0,\"entitySupplier\":{\"id\":1,\"userId\":3,\"remarks\":0,\"balance\":0.0,\"reasonCode\":1000,\"success\":false},\"entityUser\":{\"id\":3,\"firstName\":\"Nazmul\",\"lastName\":\"Hasan\",\"email\":\"supplier1@gmail.com\",\"cell\":\"01612341234\",\"password\":\"pass\",\"accountStatusId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},\"entityUserRole\":{\"id\":0,\"userId\":0,\"roleId\":0},\"reasonCode\":1000,\"success\":true}]");
        console.log(this.supplierList);
        //this.fetchSupplierList();
    }

    ngOnInit() {

    }
    searchSupplier(event: Event) {
        console.log(this.searchDTOSupplier.entityUser.firstName);
    }
    showSupplier(event: Event, id: number) {
        console.log(id);
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



