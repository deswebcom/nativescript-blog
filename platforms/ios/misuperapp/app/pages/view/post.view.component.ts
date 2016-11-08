import {Component, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { Observable } from "rxjs/Rx";


import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
    selector: "post-view-component",
     template: `
                <StackLayout>
                    <Label text="{{title}} ᘳ♥◡♥ᘰ" class="title" textWrap="true"></Label>
                    <Label class="body" text='{{body}}' textWrap="true"></Label>
                    <Label class="body" text='ᕙ( ͡° ◡ ͡° )ᕗ' textWrap="true"></Label>
                    <Image src="https://firebasestorage.googleapis.com/v0/b/fir-demo-83daf.appspot.com/o/elnati.jpg?alt=media&token=52b596a7-0e74-425e-9715-f958a8ae2599"></Image>
                </StackLayout>
        `,
})
export class PostViewComponent {

    title = "";
    body = "";

    public id$: Observable<string>;
    constructor (private http :Http, private ngZone : NgZone ,private router: Router, private route: ActivatedRoute){
        
        this.id$ = route.params.map(r => r["id"]);
        router.events.subscribe((e) => {
            console.log("--EVENT-->: " + e.toString());
            //this.callPost(e.id);
            this.callPost( (e.url).replace("/post/" , "") );
        });

    }
    

    callPost(id){
        console.log(id);
        let _url = "https://jsonplaceholder.typicode.com/posts/" + id;
        this.http.get ( _url )
            .subscribe((res:Response)=>{
                this.ngZone.run(() => {
                    let response = res.json();
                    this.title =  response.title;
                    this.body = response.body; 
                });
        });
    }

}
