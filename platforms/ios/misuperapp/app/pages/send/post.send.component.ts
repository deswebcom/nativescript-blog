import {Component, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
    selector: "post-send-component",
    template: '<Label text="POSTS (⌐■_■)" class="title"></Label>',
})
export class PostSendComponent {
    
    public posts:any;

    constructor (private http :Http, private ngZone : NgZone){}
    
    ngOnInit(){
        let _url = "https://jsonplaceholder.typicode.com/posts/";
        this.http.get ( _url )
            .subscribe((res:Response)=>{
                this.ngZone.run(() => {
                    console.log("para salir");
                    this.posts = res.json();      
                });
        });
    }

}
