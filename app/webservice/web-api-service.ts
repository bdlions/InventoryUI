import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Packet} from './Packet'
import {PacketHeader} from './PacketHeader'
import {LoaderService} from './loader.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/finally';

@Injectable()
export class WebAPIService {
    private actionUrl = window.SITE_URL + 'request';
    constructor(private http: Http, private loaderService: LoaderService) {}

    getResponse(packetHeader: PacketHeader, packetBody: string = null) {
        //var packet = new Packet();

        //packet.packetHeader = packetHeader;
        //        if (packetBody != null && packetBody != "" ){
        ////            packet.packetBody = JSON.parse(packetBody);
        //            packet.packetBody = packetBody;
        //        }
        this.showLoader();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = new URLSearchParams();
        body.set('packetHeader', JSON.stringify(packetHeader));
        body.set('packetBody', packetBody);
        //        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.actionUrl, body, options).
            finally(() => {
                this.hideLoader();
            }).
            map((res: Response) => res.json()).
            toPromise().
            then(function (response) {
                return response;
            });
    };


    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }

}


