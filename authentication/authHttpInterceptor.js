(function() {
    "use strict";

    angular.module("ConnectApp")
        .factory("AuthHttpInterceptor", ["$q", authHttpInterceptor]);

    function authHttpInterceptor($q) {
        var token = "x-access-token";
        function setAuthHeader(config) {
            config.headers['x-access-token'] = sessionStorage.getItem(token);
        };

        return {
            request: function(config) {
                if (config.url.indexOf("api") >= 0) {
                    setAuthHeader(config);
                }
                return config || $q.when(config);
            }
        };
    }

})();