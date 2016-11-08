"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var PostListComponent = (function () {
    function PostListComponent(http, ngZone) {
        this.http = http;
        this.ngZone = ngZone;
    }
    PostListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _url = "https://jsonplaceholder.typicode.com/posts/";
        this.http.get(_url)
            .subscribe(function (res) {
            _this.ngZone.run(function () {
                console.log("para salir");
                _this.posts = res.json();
            });
        });
    };
    PostListComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n    <StackLayout>\n        <Image src=\"https://firebasestorage.googleapis.com/v0/b/fir-demo-83daf.appspot.com/o/logo-escuela-it.png?alt=media&token=76abcd06-1d1e-4fab-aa82-c3b2183d1bff\"></Image>\n        <Label text=\"Listado (\u2310\u25A0_\u25A0)\" class=\"title\"></Label> \n        <ListView [items]=\"posts\">\n            <template let-item=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\n                    <Label [nsRouterLink]=\"['/post/' , item.id]\"  class=\"listado\"  [class.odd]=\"odd\" [class.even]=\"even\" [text]='item.id + \": \" + item.title'></Label>\n            </template>\n        </ListView>\n    </StackLayout>\n    ",
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone])
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
//# sourceMappingURL=post.list.component.js.map