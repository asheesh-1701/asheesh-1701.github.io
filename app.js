/**
 * Created by asheesh on 10/31/2016.
 */
(function(){
    "use strict";

    angular.module("ConnectApp", [
        "ConnectApp.nav",
        "ConnectApp.services",
        "ConnectApp.config",
        "ConnectApp.common",
        "ConnectApp.auth",
        "ConnectApp.wipfliway",
        "ConnectApp.quiz",

        "ui.router",
        "ngResource",
        "ngMaterial",
        "ngMessages"
    ])
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme("default")
            .primaryPalette("orange")
            .accentPalette("red");
    });

    angular.module('ConnectApp.nav', []);
    angular.module('ConnectApp.config', []);
    angular.module('ConnectApp.common', []);
    angular.module('ConnectApp.services', []);
    angular.module('ConnectApp.wipfliway', []);
    angular.module('ConnectApp.auth', []);
    angular.module('ConnectApp.quiz', []);


    angular.module("ConnectApp").run(["$rootScope", "AuthService", "Utils", function ($rootScope, authService, utils) {
        authService.startListening($rootScope);
        utils.init($rootScope);
    }]);

    angular.module("ConnectApp").config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push("AuthHttpInterceptor");
    }]);
})();