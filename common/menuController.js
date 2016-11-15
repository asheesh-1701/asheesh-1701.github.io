/**
 * Created by asheesh on 10/31/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.common").controller("MenuController", [

        "$scope",
        "$rootScope",
        menuController
    ]);

    function menuController($scope, $rootScope) {
        var self = this;

        self.menu = [];

        $scope.$on('menu-changed', function(event, menu) {
            self.menu = menu;
        });

        self.onMenuItemClicked = function(id){
            $rootScope.$broadcast(self.menu.event, id);
        };
    }
})();