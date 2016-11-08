"use strict";
var post_list_component_1 = require("../pages/list/post.list.component");
var post_view_component_1 = require("../pages/view/post.view.component");
var post_send_component_1 = require("../pages/send/post.send.component");
exports.routes = [
    { path: "", redirectTo: "/posts", pathMatch: "full" },
    { path: "posts", component: post_list_component_1.PostListComponent },
    { path: "post/:id", component: post_view_component_1.PostViewComponent },
    { path: "send", component: post_send_component_1.PostSendComponent }
];
//# sourceMappingURL=routes.js.map