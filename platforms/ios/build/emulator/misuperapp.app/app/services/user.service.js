"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http, ngZone) {
        this.http = http;
        this.ngZone = ngZone;
    }
    UserService.prototype.getToken = function (user) {
        var _this = this;
        var _url = "https://jsonplaceholder.typicode.com";
        this.http.get(_url)
            .subscribe(function (res) {
            _this.ngZone.run(function () {
                return (res.json());
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map