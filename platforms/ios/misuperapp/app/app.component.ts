import {Component, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";



@Component({
    selector: "my-app",
    template: "<page-router-outlet></page-router-outlet>",
})
export class AppComponent {

}
