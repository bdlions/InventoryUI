/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LoaderState} from '../loaderstate';
@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    constructor() {}
    show() {
        this.loaderSubject.next(<LoaderState> {show: true});
    }
    hide() {
        this.loaderSubject.next(<LoaderState> {show: false});
    }
}