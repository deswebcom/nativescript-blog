import {Component, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public counter: number = 16;
    public username:string = '';
    public password:string = '';
    public posts:any;

    constructor (private http :Http, private ngZone : NgZone){}

    public get message(): string {
       
        if (this.counter > 0) {
            return this.posts + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
    }

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
