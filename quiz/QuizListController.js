/**
 * Created by asheesh on 10/31/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.quiz").controller("QuizListController", [
        "QuizService",

        "$mdToast",
        mainNavController
    ]);

    function mainNavController(quizService, $mdToast) {
        var self = this;
        self.quizes = [];

        quizService.getAll().then(
            function(data){
                self.quizes = data;
            },
            function(error){
                $scope.showErrorToast("Error Occurred", "bottom right");
            }
        );
    }
})();