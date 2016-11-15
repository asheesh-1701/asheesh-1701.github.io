/**
 * Created by asheesh on 10/31/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.nav").controller("MainNavController", [
        "AuthService",

        "$mdSidenav",
        "$state",
        mainNavController
    ]);

    function mainNavController(authService, $mdSidenav, $state) {
        var self = this;

        self.$state = $state;
        self.authService = authService;

        self.toggleMainNav = function(){
            $mdSidenav("main-nav").toggle();
        };

        self.items = [
            {"title": "Quiz", url: "", "sref": "quiz"},
            {"title": "Vote", url: "", "sref": "vote"},
            {"title": "WipfliWay Reports", url: "", "sref": "wipfliwayList"}
        ];

        self.getLinks = function(){
            var links = [];
            angular.forEach(self.items, function(item){
                var currentState = $state.get(item.sref);
                if(authService.isUserAuthenticated() && authService.isUserAuthorized(currentState.data.accessorRoles)){
                    links.push(item);
                }
            });
            return links;
        };

        self.logout = function(){
            authService.logout();
            $state.transitionTo('login');
        };
    }
})();