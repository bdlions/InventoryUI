/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Component, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './services/MarketAPI.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'app',
    templateUrl: 'app/html/profile.component.html'
})

export class ProfileComponent { 
    @ViewChild('sampleModal') public sampleModal:ModalDirective;
    
    constructor(private marketAPI: MarketAPI, private router: Router) 
    {
        setInterval(() => { this.sampleModal.hide(); }, 1000 * 20);
        
        
    }
    
    public hideChildModal(): void {
        this.sampleModal.hide();
    }

    ngOnInit() {
        
    }
    
    public showModal(event: Event){
        this.sampleModal.show();
    }
    
    public pingServer(event: Event){
        
    }
    

}