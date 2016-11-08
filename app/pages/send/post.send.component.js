"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var PostSendComponent = (function () {
    function PostSendComponent(http, ngZone) {
        this.http = http;
        this.ngZone = ngZone;
    }
    PostSendComponent.prototype.ngOnInit = function () {
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
    PostSendComponent = __decorate([
        core_1.Component({
            selector: "post-send-component",
            template: '<Label text="POSTS (⌐■_■)" class="title"></Label>',
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone])
    ], PostSendComponent);
    return PostSendComponent;
}());
exports.PostSendComponent = PostSendComponent;
//# sourceMappingURL=post.send.component.js.map