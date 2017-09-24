import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/customer/customerlist.component.html'
})

export class CustomerListComponent { 
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        
    }

    ngOnInit() {
        
    }
}


