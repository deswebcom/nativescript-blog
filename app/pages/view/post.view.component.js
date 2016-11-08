"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var PostViewComponent = (function () {
    function PostViewComponent(http, ngZone, router, route) {
        var _this = this;
        this.http = http;
        this.ngZone = ngZone;
        this.router = router;
        this.route = route;
        this.title = "";
        this.body = "";
        this.id$ = route.params.map(function (r) { return r["id"]; });
        router.events.subscribe(function (e) {
            console.log("--EVENT-->: " + e.toString());
            //this.callPost(e.id);
            _this.callPost((e.url).replace("/post/", ""));
        });
    }
    PostViewComponent.prototype.callPost = function (id) {
        var _this = this;
        console.log(id);
        var _url = "https://jsonplaceholder.typicode.com/posts/" + id;
        this.http.get(_url)
            .subscribe(function (res) {
            _this.ngZone.run(function () {
                var response = res.json();
                _this.title = response.title;
                _this.body = response.body;
            });
        });
    };
    PostViewComponent = __decorate([
        core_1.Component({
            selector: "post-view-component",
            template: "\n                <StackLayout>\n                    <Label text=\"{{title}} \u1633\u2665\u25E1\u2665\u1630\" class=\"title\" textWrap=\"true\"></Label>\n                    <Label class=\"body\" text='{{body}}' textWrap=\"true\"></Label>\n                    <Label class=\"body\" text='\u1559( \u0361\u00B0 \u25E1 \u0361\u00B0 )\u1557' textWrap=\"true\"></Label>\n                    <Image src=\"https://firebasestorage.googleapis.com/v0/b/fir-demo-83daf.appspot.com/o/elnati.jpg?alt=media&token=52b596a7-0e74-425e-9715-f958a8ae2599\"></Image>\n                </StackLayout>\n        ",
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone, router_1.Router, router_1.ActivatedRoute])
    ], PostViewComponent);
    return PostViewComponent;
}());
exports.PostViewComponent = PostViewComponent;
//# sourceMappingURL=post.view.component.js.map