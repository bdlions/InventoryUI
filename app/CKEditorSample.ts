/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'sample',
    template: `
  <ckeditor
    [(ngModel)]="ckeditorContent"
    [config]="{uiColor: '#ffffff'}"
    [readonly]="false"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    debounce="500">
  </ckeditor>
  `
})
export class CKEditorSample {
    ckeditorContent = "";
    constructor() {
        this.ckeditorContent = `<p>My HTML</p>`;
    }
    onReady(event: any){
        
    }
    onFocus(event: any){
        
    }
    onBlur(event: any){
        
    }
    onChange(event: any){
        
    }
     
}
