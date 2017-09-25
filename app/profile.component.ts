/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Component, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {MarketAPI} from './services/MarketAPI.service';
import { ModalDirective } from 'ngx-bootstrap';
import {WebAPIService} from './webservice/web-api-service';
import {PacketHeaderFactory} from './webservice/PacketHeaderFactory';
import {ACTION} from './webservice/ACTION';

@Component({
    selector: 'app',
    templateUrl: 'app/html/profile.component.html',
    providers: [WebAPIService]
})

export class ProfileComponent { 
    private webAPIService: WebAPIService;
    @ViewChild('sampleModal') public sampleModal:ModalDirective;
    
    constructor(private marketAPI: MarketAPI, private router: Router, webAPIService: WebAPIService) 
    {
        this.webAPIService = webAPIService;
        setInterval(() => { this.sampleModal.hide(); }, 1000 * 20);
        
        
    }
    
    public hideChildModal(): void {
        this.sampleModal.hide();
    }

    ngOnInit() {
        
    }
    
    public showModal(event: Event){
        this.sampleModal.config.backdrop = false; 
        this.sampleModal.show();
    }
    
    public pingServer(event: Event){
        let username:string = "nazhasan15@gmail.com";
        let password:string = "password";
        let requestBody: string = "{\"userName\": \"" + username + "\", \"password\": \"" + password+"\"}";
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_IN), requestBody).then(result =>{

        });
    }
    

}