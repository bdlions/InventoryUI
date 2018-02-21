import {Component} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {DTOProduct} from './../../dto/DTOProduct';
import {WebAPIService} from './../../webservice/web-api-service';
import {PacketHeaderFactory} from './../../webservice/PacketHeaderFactory';
import {ACTION} from './../../webservice/ACTION';
import {NavigationManager} from "../../services/NavigationManager";
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: 'app/html/report/stock/endingstock.component.html',
    providers: [WebAPIService]
})

export class EndingStockComponent {
    private webAPIService: WebAPIService;
    private subscribe: Subscription;

    
    public maxStock: number = 0;
    public offset: number = 0;
    public limit: number = 10;

    private showNavBar: boolean = false;
    private activeMenu: string = "salesordersummary";
    
    private productList: DTOProduct[];
    
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10];
    
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
        let requestBody: string = "{\"maxStock\": " + this.maxStock + ", \"offset\": " + this.offset + ", \"limit\": " + this.limit + "}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_ENDING_CURRENT_STOCK), requestBody).then(result => {
            if(result.success && result.list != null)
            {
                this.productList = result.list;
                this.length = result.counter;
                //if we get default ending stock list then maximum stock quantity is identified and set from the result
                if (this.maxStock == 0)
                {
                    let tempMaxStock: number = 0;
                    for (let counter: number = 0; counter < this.productList.length; counter++)
                    {
                        if (this.productList[counter].quantity > tempMaxStock)
                        {
                            tempMaxStock = this.productList[counter].quantity;
                        }
                    }
                    this.maxStock = tempMaxStock;
                }                
            }
        });
    }
    
    searchEndingStock(event: Event)
    {
        this.offset = 0;
        this.limit = 10;
        this.fetchEndingStockList();
    }

    onPaginateChange(event:PageEvent){
        this.limit = event.pageSize;
        this.offset = (event.pageIndex * event.pageSize) ;
        this.fetchEndingStockList();
    }
}


