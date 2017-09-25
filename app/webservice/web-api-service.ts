import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Packet} from './Packet'
import {PacketHeader} from './PacketHeader'


@Injectable()
export class WebAPIService {
    private actionUrl = window.SITE_URL + 'RequestServlet';
    constructor(private http: Http) {}

    getResponse(packetHeader:PacketHeader, packetBody:string = null) {
        //var packet = new Packet();
        
        //packet.packetHeader = packetHeader;
//        if (packetBody != null && packetBody != "" ){
////            packet.packetBody = JSON.parse(packetBody);
//            packet.packetBody = packetBody;
//        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = new URLSearchParams();
        body.set('packetHeader', JSON.stringify(packetHeader));
        body.set('packetBody', packetBody);
//        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.actionUrl, body, options).
            map((res: Response) => res.json()).
            toPromise().
            then(function (response) {
                return response;
            });
    };

}


