import {Component} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {DTOProduct} from './../../dto/DTOProduct';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/stock/endingstock.component.html',
    providers: [WebAPIService]
})

export class EndingStockComponent {
    private webAPIService: WebAPIService;
    private subscribe: Subscription;

    
    public maxStock: number = 10;

    private showNavBar: boolean = false;
    private activeMenu: string = "salesordersummary";
    
    private productList: DTOProduct[];

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
        this.productList = Array();
        this.fetchEndingStockList();
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            
        });
    }
    
    public fetchEndingStockList() {
        let requestBody: string = "{\"maxStock\": " + this.maxStock + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ENDING_CURRENT_STOCK), requestBody).then(result => {
            if(result.success)
            {
                this.productList = result.list;
            }
            console.log(this.productList);
        });
    }
    
    searchEndingStock(event: Event)
    {
        this.fetchEndingStockList();
    }

}


