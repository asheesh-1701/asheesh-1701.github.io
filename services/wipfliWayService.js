/**
 * Created by asheesh on 11/1/2016.
 */
(function(){
    "use strict";

    angular.module("ConnectApp.wipfliway").factory("WipfliWayService", [
        "BASE_URL",

        "$resource",
        "$q",
        wipfliWayService
    ]);

    function wipfliWayService(BASE_URL, $resource, $q){
        var resource = $resource(BASE_URL, null, {
            create: {
                url: BASE_URL + "webapi/v1/appreciation",
                method: "POST"
            },
            deleteAppreciation: {
                url: BASE_URL + "webapi/token/v1/appreciation/:id",
                method: "DELETE"
            },
            getAll: {
                url: BASE_URL + "webapi/token/v1/appreciation",
                method: "GET",
                isArray: false
            }
        });

        var create = function(appreciation){
            return $q(function (resolve, reject) {
                resource.create(null,appreciation,
                    function (response) {
                        if(response.success){
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    },
                    function (error) {
                        reject(error);
                    });
            });
        };

        var deleteAppreciation = function(appreciationId){
            return $q(function (resolve, reject) {
                resource.deleteAppreciation({id: appreciationId},
                    function (response) {
                        if(response.success){
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    },
                    function (error) {
                        reject(error);
                    });
            });
        };

        var getAll = function(){
            return $q(function (resolve, reject) {
                resource.getAll(null,
                    function (response) {
                        if(response.success){
                            resolve(response.appreciations);
                        } else {
                            reject(response);
                        }
                    },
                    function (error) {
                        reject(error);
                    });
            });
        };

        return {
            create: create,
            deleteAppreciation: deleteAppreciation,
            getAll: getAll
        }
    };

})();