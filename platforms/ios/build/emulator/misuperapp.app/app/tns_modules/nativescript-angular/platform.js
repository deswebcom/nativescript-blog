require('globals');
require('./zone.js/dist/zone-nativescript');
require('reflect-metadata');
require('./polyfills/array');
require('./polyfills/console');
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var application = require("application");
var frame_1 = require("ui/frame");
var page_1 = require('ui/page');
var trace_1 = require("./trace");
var text_view_1 = require('ui/text-view');
var dom_adapter_1 = require('./dom-adapter');
var resource_loader_1 = require('./resource-loader');
var nativescriptIntl = require("nativescript-intl");
global.Intl = nativescriptIntl;
var nativescript_module_1 = require("./nativescript.module");
exports.NativeScriptModule = nativescript_module_1.NativeScriptModule;
exports.NS_COMPILER_PROVIDERS = [
    compiler_1.COMPILER_PROVIDERS,
    {
        provide: core_2.COMPILER_OPTIONS,
        useValue: {
            providers: [
                { provide: compiler_1.ResourceLoader, useClass: resource_loader_1.FileSystemResourceLoader },
                { provide: compiler_1.ElementSchemaRegistry, useClass: dom_adapter_1.NativeScriptElementSchemaRegistry },
            ]
        },
        multi: true
    }
];
exports.onBeforeLivesync = new core_2.EventEmitter();
exports.onAfterLivesync = new core_2.EventEmitter();
var lastBootstrappedModule;
var NativeScriptPlatformRef = (function (_super) {
    __extends(NativeScriptPlatformRef, _super);
    function NativeScriptPlatformRef(platform, appOptions) {
        _super.call(this);
        this.platform = platform;
        this.appOptions = appOptions;
    }
    NativeScriptPlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) {
        var _this = this;
        this._bootstrapper = function () { return _this.platform.bootstrapModuleFactory(moduleFactory); };
        this.bootstrapApp();
        return null; //Make the compiler happy
    };
    NativeScriptPlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        var _this = this;
        if (compilerOptions === void 0) { compilerOptions = []; }
        this._bootstrapper = function () { return _this.platform.bootstrapModule(moduleType, compilerOptions); };
        this.bootstrapApp();
        return null; //Make the compiler happy
    };
    NativeScriptPlatformRef.prototype.bootstrapApp = function () {
        var _this = this;
        global.__onLiveSyncCore = function () { return _this.livesyncModule(); };
        var mainPageEntry = this.createNavigationEntry(this._bootstrapper);
        application.start(mainPageEntry);
    };
    NativeScriptPlatformRef.prototype.livesyncModule = function () {
        trace_1.rendererLog("ANGULAR LiveSync Started");
        exports.onBeforeLivesync.next(lastBootstrappedModule ? lastBootstrappedModule.get() : null);
        var mainPageEntry = this.createNavigationEntry(this._bootstrapper, function (compRef) { return exports.onAfterLivesync.next(compRef); }, function (error) { return exports.onAfterLivesync.error(error); });
        mainPageEntry.animated = false;
        mainPageEntry.clearHistory = true;
        var frame = frame_1.topmost();
        if (frame) {
            if (frame.currentPage && frame.currentPage.modal) {
                frame.currentPage.modal.closeModal();
            }
            frame.navigate(mainPageEntry);
        }
    };
    NativeScriptPlatformRef.prototype.onDestroy = function (callback) {
        this.platform.onDestroy(callback);
    };
    Object.defineProperty(NativeScriptPlatformRef.prototype, "injector", {
        get: function () {
            return this.platform.injector;
        },
        enumerable: true,
        configurable: true
    });
    ;
    NativeScriptPlatformRef.prototype.destroy = function () {
        this.platform.destroy();
    };
    Object.defineProperty(NativeScriptPlatformRef.prototype, "destroyed", {
        get: function () {
            return this.platform.destroyed;
        },
        enumerable: true,
        configurable: true
    });
    NativeScriptPlatformRef.prototype.createNavigationEntry = function (bootstrapAction, resolve, reject, isReboot) {
        var _this = this;
        if (isReboot === void 0) { isReboot = false; }
        var navEntry = {
            create: function () {
                var page = new page_1.Page();
                if (_this.appOptions) {
                    page.actionBarHidden = _this.appOptions.startPageActionBarHidden;
                }
                var onLoadedHandler = function (args) {
                    page.off('loaded', onLoadedHandler);
                    //profiling.stop('application-start');
                    trace_1.rendererLog('Page loaded');
                    //profiling.start('ng-bootstrap');
                    trace_1.rendererLog('BOOTSTRAPPING...');
                    bootstrapAction().then(function (moduleRef) {
                        //profiling.stop('ng-bootstrap');
                        trace_1.rendererLog('ANGULAR BOOTSTRAP DONE.');
                        lastBootstrappedModule = new WeakRef(moduleRef);
                        if (resolve) {
                            resolve(moduleRef);
                        }
                        return moduleRef;
                    }, function (err) {
                        trace_1.rendererError('ERROR BOOTSTRAPPING ANGULAR');
                        var errorMessage = err.message + "\n\n" + err.stack;
                        trace_1.rendererError(errorMessage);
                        var view = new text_view_1.TextView();
                        view.text = errorMessage;
                        page.content = view;
                        if (reject) {
                            reject(err);
                        }
                    });
                };
                page.on('loaded', onLoadedHandler);
                return page;
            }
        };
        if (isReboot) {
            navEntry.animated = false;
            navEntry.clearHistory = true;
        }
        return navEntry;
    };
    NativeScriptPlatformRef.prototype.liveSyncApp = function () {
    };
    return NativeScriptPlatformRef;
}(core_2.PlatformRef));
// Dynamic platfrom 
var _platformNativeScriptDynamic = core_2.createPlatformFactory(compiler_1.platformCoreDynamic, 'nativeScriptDynamic', exports.NS_COMPILER_PROVIDERS);
function platformNativeScriptDynamic(options, extraProviders) {
    //Return raw platform to advanced users only if explicitly requested
    if (options && options.bootInExistingPage === true) {
        return _platformNativeScriptDynamic(extraProviders);
    }
    else {
        return new NativeScriptPlatformRef(_platformNativeScriptDynamic(extraProviders), options);
    }
}
exports.platformNativeScriptDynamic = platformNativeScriptDynamic;
// "Static" platform
var _platformNativeScript = core_2.createPlatformFactory(core_1.platformCore, 'nativeScript');
function platformNativeScript(options, extraProviders) {
    //Return raw platform to advanced users only if explicitly requested
    if (options && options.bootInExistingPage === true) {
        return _platformNativeScript(extraProviders);
    }
    else {
        return new NativeScriptPlatformRef(_platformNativeScript(extraProviders), options);
    }
}
exports.platformNativeScript = platformNativeScript;
//# sourceMappingURL=platform.js.map