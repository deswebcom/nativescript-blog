"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var AppComponent = (function () {
    function AppComponent(http, ngZone) {
        this.http = http;
        this.ngZone = ngZone;
        this.counter = 16;
        this.username = '';
        this.password = '';
    }
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.posts + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.onTap = function () {
        this.counter--;
    };
    AppComponent.prototype.ngOnInit = function () {
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
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map