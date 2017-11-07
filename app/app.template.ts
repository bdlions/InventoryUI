import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: '<navbar></navbar>'+
              '<router-outlet></router-outlet><app-footer></app-footer>',
})
export class AppTemplate {
    constructor() {}
}
