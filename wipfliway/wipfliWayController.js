/**
 * Created by asheesh on 10/31/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.wipfliway").controller("WipfliWayController", [
        "WipfliWayService",

        "$scope",
        wipfliWayController
    ]);

    function wipfliWayController(wipfliWayService, $scope) {
        var self = this;
        var resetForm = function(){
            self.appreciation = {
                "sender": "",
                "receiver":"",
                "reason":""
            };
        };
        resetForm();

        self.submitAppreciation = function(){
            var form = $scope.wipfliWayForm;
            if(form.$valid){
                wipfliWayService.create(self.appreciation).then(
                    function(response){
                        form.$setPristine();
                        form.$setUntouched();
                        resetForm();
                        $scope.showSuccessToast("appreciation saved successfully.", "bottom right");
                    },
                    function(error){
                        $scope.showErrorToast(error.data.message ? error.data.message : "Error Occurred", "bottom right");
                    }
                )
            }
        };
    }
})();