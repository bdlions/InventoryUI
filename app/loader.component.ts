/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LoaderService} from './webservice/loader.service';
import {LoaderState} from './loaderstate';
@Component({
    selector: 'angular-loader',
    templateUrl: 'app/html/loader.template.html'
})
export class LoaderComponent implements OnInit {
    show = false;
    private subscription: Subscription;
    constructor(
        private loaderService: LoaderService
    ) {}
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

