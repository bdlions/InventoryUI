import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class NavigationManager {

    private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    private _currentActivatedMenu: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();
    public menuActivationEmitter: Observable<string> = this._currentActivatedMenu.asObservable();

    constructor() {}

    public showNavBar(show: boolean) {
        this._showNavBar.next(show);
    }

    public setActiveMenu(activeMenu:string){
        this._currentActivatedMenu.next(activeMenu);
    }
}