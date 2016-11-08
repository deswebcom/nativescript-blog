import { AppComponent } from "../app.component";
import { PostListComponent } from "../pages/list/post.list.component";
import { PostViewComponent } from "../pages/view/post.view.component";
import { PostSendComponent } from "../pages/send/post.send.component";

export const routes = [
    { path: "", redirectTo: "/posts", pathMatch: "full" },
    { path: "posts", component: PostListComponent },
    { path: "post/:id", component: PostViewComponent },
    { path: "send", component: PostSendComponent }
];