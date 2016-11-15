/**
 * Created by asheesh on 11/1/2016.
 */
(function () {
    "use strict";

    angular.module("ConnectApp")
        .config(['$stateProvider', '$urlRouterProvider', routeConfig]);

    function routeConfig($stateProvider, $urlRouterProvider) {
        //$locationProvider.html5Mode(true);
        $stateProvider
            .state("quiz", {
                data: { requiresAuth: true, accessorRoles: ["User"] },
                url: "/quiz",
                templateUrl: "quiz/quizList.html"
            })
            .state("vote", {
                data: { requiresAuth: true, accessorRoles: ["User"] },
                url: "/vote",
                templateUrl: "vote/vote.html"
            })
            .state("wipfliway", {
                data: { requiresAuth: false, accessorRoles: ["User"] },
                url: "/wipfliway/create",
                templateUrl: "wipfliway/wipfliway.html"
            })
            .state("wipfliwayList", {
                data: { requiresAuth: true, accessorRoles: ["Admin"] },
                url: "/wipfliway/list",
                templateUrl: "wipfliway/wipfliReports.html"
            })
            .state("login", {
                data: { requiresAuth: false, accessorRoles: ["User"] },
                url: "/login",
                templateUrl: "authentication/login.html"
            })
            .state("unauthorized", {
                data: { requiresAuth: false, accessorRoles: ["User"] },
                url: "/unauthorized",
                templateUrl: "error/unauthorized.html"
            });

        $urlRouterProvider.otherwise("/quiz");
    }

})();