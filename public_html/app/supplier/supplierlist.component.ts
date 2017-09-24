import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/supplier/supplierlist.component.html'
})

export class SupplierListComponent { 
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        
    }

    ngOnInit() {
        
    }
}



