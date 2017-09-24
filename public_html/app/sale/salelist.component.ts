
import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/salelist.component.html'
})

export class SaleListComponent { 
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        
    }

    ngOnInit() {
        
    }
}




