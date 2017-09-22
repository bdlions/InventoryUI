/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MarketAPI {
//    private serveletURL:string = "http://192.168.8.231:8080/market?request=";
    private serveletURL:string = "http://localhost:8080/market?request=";
    constructor (private http: Http) {}
    get(request:string){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //let body = new URLSearchParams();
        //body.set('request', request);
//        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
//        return this.http.post(this.serveletURL, body, options).
//            map((res: Response) => res.json()).
//            toPromise().
//            then(function (response) {
//                return response;
//            });
        
        return this.http.get(this.serveletURL + request)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         .toPromise()
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
}
