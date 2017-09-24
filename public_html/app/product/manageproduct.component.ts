/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product/manageproduct.component.html'
})

export class ManageProductComponent { 
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        
    }

    ngOnInit() {
        
    }
}
