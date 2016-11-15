/**
 * Created by asheesh on 11/1/2016.
 */
(function() {
    "use strict";

    angular.module("ConnectApp.services").factory("QuizService", [
        "$q",
        "$resource",
        quizService
    ]);
//TODO: whole service
    function quizService($q, $resource) {
        var resource = $resource("basseUrl", null, {
            getAll: {
                url: "kldad",
                isArray: false
            }
        });


        function getAll() {
            return $q(function (resolve, reject) {
                //resource.getAll({},
                //    function (response) {
                //        resolve(response);
                //    },
                //    function (error) {
                //        reject(error);
                //    });
                resolve([
                    {title: "Quiz 1", description: "Description 1"},
                    {title: "Quiz 2", description: "Description 2"},
                    {title: "Quiz 3", description: "Description 3"},
                    {title: "Quiz 4", description: "Description 4"},
                    {title: "Quiz 5", description: "Description 5"}
                ]);
            });
        }

        return {
            getAll: getAll
        };

    }
})();