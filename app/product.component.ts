/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './services/MarketAPI.service';
import { FileUploader } from 'ng2-file-upload';

const URL = window.SITE_URL + 'FileUploadServlet';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product.component.html'
})

export class ProductComponent { 
    public uploader:FileUploader = new FileUploader({url: URL});
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
            
        };
    }

    ngOnInit() {
        
    }
    

}