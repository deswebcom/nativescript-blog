// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ActivatedRoute, Router, Event } from '@angular/router';

import { AppComponent } from "./app.component";

import { PostViewComponent } from "./pages/view/post.view.component";
import { PostSendComponent } from "./pages/send/post.send.component";
import { PostListComponent } from "./pages/list/post.list.component";

import { routes } from './routes/routes';

@NgModule({
    declarations: [AppComponent, PostViewComponent, PostSendComponent, PostListComponent],
    bootstrap: [AppComponent],
    imports: [
            NativeScriptModule, 
            NativeScriptHttpModule,
            NativeScriptRouterModule,
            NativeScriptRouterModule.forRoot(routes)
            ],
    providers: []
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);