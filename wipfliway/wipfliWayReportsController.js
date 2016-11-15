/**
 * Created by asheesh on 10/31/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.wipfliway").controller("WipfliWayReportsController", [
        "WipfliWayService",

        "$rootScope",
        "$scope",
        "$mdDialog",
        wipfliWayReportsController
    ]);

    function wipfliWayReportsController(wipfliWayService, $rootScope, $scope, $mdDialog) {
        var self = this;
        self.appreciations = [];

        wipfliWayService.getAll().then(
            function(data){
                self.appreciations = data;
            },
            function(error){
                $scope.showErrorToast("Error Occurred", "bottom right");
            }
        );

        self.deleteAppreciation = function (event, appreciaition) {
            var deleteConfirm = $mdDialog.confirm()
                .title('Are you sure?')
                .textContent('Would you like to delete this Appreciation?')
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(deleteConfirm).then(function() {
                wipfliWayService.deleteAppreciation(appreciaition._id).then(
                    function(data){
                        self.appreciations.splice(self.appreciations.indexOf(appreciaition), 1);
                        $scope.showSuccessToast("appreciation deleted successfully.", "bottom right")
                    },
                    function(error){
                        $scope.showErrorToast(error.data.message, "bottom right");
                    }
                );
            });
        };

        var onMenuItemClicked = function(id){
            console.log(id);
        };

        var menu = {
            "event": "wipfli-reports-menu-clicked",
            "options":[
                {"ariaLabel": "Filter", "icon": "filter_list", "id": "filter"},
                {"ariaLabel": "Assessment", "icon": "assessment", "id": "assessment"}
            ]
        };
        $rootScope.$broadcast('menu-changed', menu);
        $scope.$on(menu.event, function(event, id) {
            onMenuItemClicked(id);
        });
    }
})();