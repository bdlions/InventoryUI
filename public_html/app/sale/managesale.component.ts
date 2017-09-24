import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/sale/managesale.component.html'
})

export class ManageSaleComponent { 
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        
    }

    ngOnInit() {
        
    }
}




