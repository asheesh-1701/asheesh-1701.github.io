/**
 * Created by asheesh on 11/1/2016.
 */
(function(){
    "use strict";

    angular.module("ConnectApp.common").factory("Utils", [
        "$mdToast",
        utils
    ]);

    function utils($mdToast){

        var init = function($rootScope){
            $rootScope.showToast = function(message, position, delay){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position(position)
                        .hideDelay(delay));
            };

            $rootScope.showErrorToast = function(message, position){
                $rootScope.showToast(message ? message : "Error Occurred", position, 5000);
            };

            $rootScope.showSuccessToast = function(message, position){
                $rootScope.showToast(message, position, 5000);
            };
        };

        return {
            init: init
        }
    };

})();