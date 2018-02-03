import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class NavigationManager {

    private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    private _currentActivatedMenu: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private _isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();
    public menuActivationEmitter: Observable<string> = this._currentActivatedMenu.asObservable();
    public isAdminEmitter: Observable<boolean> = this._isAdmin.asObservable();

    constructor() {}

    public showNavBar(show: boolean) {
        this._showNavBar.next(show);
    }

    public setActiveMenu(activeMenu:string){
        this._currentActivatedMenu.next(activeMenu);
    }
    
    public setIsAdmin(isAdmin: boolean){
        this._isAdmin.next(isAdmin);
    }
}