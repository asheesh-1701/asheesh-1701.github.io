/**
 * Created by asheesh on 10/31/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.auth").controller("LoginController", [
        "AuthService",

        "$scope",
        "$state",
        loginController
    ]);

    function loginController(authService, $scope, $state) {
        var self = this;
        self.credentials= {
            "username": "",
            "password":""
        };

        self.auth = authService;

        self.authenticate = function(){
            var form = $scope.loginForm;
            if(form.$valid){
                authService.authenticate(self.credentials.username, self.credentials.password).then(
                    function(response){
                        $state.transitionTo("quiz");
                    },
                    function(error){
                        $scope.showErrorToast(error.data.message, "bottom right");
                    }
                )
            }
        };
    }
})();