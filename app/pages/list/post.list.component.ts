import {Component, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";



@Component({
    selector: "my-app",
    template: `
    <StackLayout>
        <Image src="https://firebasestorage.googleapis.com/v0/b/fir-demo-83daf.appspot.com/o/logo-escuela-it.png?alt=media&token=76abcd06-1d1e-4fab-aa82-c3b2183d1bff"></Image>
        <Label text="Listado (⌐■_■)" class="title"></Label> 
        <ListView [items]="posts">
            <template let-item="item" let-i="index" let-odd="odd" let-even="even">
                    <Label [nsRouterLink]="['/post/' , item.id]"  class="listado"  [class.odd]="odd" [class.even]="even" [text]='item.id + ": " + item.title'></Label>
            </template>
        </ListView>
    </StackLayout>
    `,
})
export class PostListComponent {
    
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
