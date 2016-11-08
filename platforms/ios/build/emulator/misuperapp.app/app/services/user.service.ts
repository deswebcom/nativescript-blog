import { Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: Http, private ngZone: NgZone) { 
  }
  
  getToken(user:User) {
    
    let _url = "https://jsonplaceholder.typicode.com";
    this.http.get ( _url )
      .subscribe((res:Response)=>{
         this.ngZone.run(() => {
            return (res.json());      
          });
      });
  }
}