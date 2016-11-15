/**
 * Created by asheesh on 11/1/2016.
 */
(function(){
    "use strict";

    angular.module("ConnectApp.auth").factory("AuthService", [
        "BASE_URL",

        "$resource",
        "$q",
        "$state",
        authService
    ]);

    function authService(BASE_URL, $resource, $q, $state){
        var token = "x-access-token";
        var loggedUser = "LoggedUser";
        var fcmSubscription = "FcmSubscription";
        var reg;
        var sub;
        var isSubscribed = false;

        var resource = $resource(BASE_URL, null, {
            login: {
                url: BASE_URL + "webapi/v1/login",
                method: "POST"
            },
            saveFcmEndpoint: {
                url: BASE_URL + "webapi/token/v1/users/:id",
                method: "PUT"
            }
        });

        var isUserAuthenticated = function(){
            return sessionStorage.getItem(loggedUser) != null;
        };

        var isUserAuthorized = function(stateAccessorRoles){
            var authorized = false;
            angular.forEach(getLoggedUser().roles, function(role){
                if(stateAccessorRoles.indexOf(role) >= 0){
                    authorized = true;
                }
            });
            return authorized;
        };

       var getLoggedUser = function(){
           var userJsonString = sessionStorage.getItem(loggedUser);
           if(userJsonString == null){
               return null;
           }
           return JSON.parse(userJsonString);
       };

        var startListening = function($rootScope){
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                if(toState.data.requiresAuth && !isUserAuthenticated()){
                    $state.transitionTo("login");
                    event.preventDefault();
                } else if(toState.data.accessorRoles && toState.data.accessorRoles.length > 0){
                    if(isUserAuthenticated()){
                        if(!isUserAuthorized(toState.data.accessorRoles)){
                            $state.transitionTo("unauthorized");
                            event.preventDefault();
                        }
                    }
                }
            });
        };

        var getFcmSubscription = function () {
            var fcmSubs = sessionStorage.getItem(fcmSubscription);
            if(fcmSubs == null){
                return null;
            }
            return JSON.parse(fcmSubs);
        };

        var saveFcmSubscription = function (subscription) {
            sessionStorage.setItem(fcmSubscription, JSON.stringify(subscription));
        };

        function subscribe() {
            reg.pushManager.subscribe({userVisibleOnly: true}).
                then(function(pushSubscription){
                    sub = pushSubscription;
                    saveFcmSubscription(sub);
                    var endpoint = sub.endpoint.substr(sub.endpoint.lastIndexOf("/") + 1);
                    resource.saveFcmEndpoint({id: getLoggedUser()._id},{"fcmSubscription": endpoint});
                    console.log('Subscribed! Endpoint:', sub.endpoint);
                    isSubscribed = true;
                });
        }

        function unsubscribe() {
            //reg.unregister().then(function(boolean) {
            //    // if boolean = true, unregister is successful
            //});
            if(sub){
                sub.unsubscribe().then(function(event) {
                    //subscribeButton.textContent = 'Subscribe';
                    console.log('Unsubscribed!', event);
                    isSubscribed = false;
                }).catch(function(error) {
                    console.log('Error unsubscribing', error);
                    //subscribeButton.textContent = 'Subscribe';
                });
            }

        }

        var initFcmSubscription = function () {
            if ('serviceWorker' in navigator) {
                console.log('Service Worker is supported');
                navigator.serviceWorker.register('sw.js').then(function() {
                    return navigator.serviceWorker.ready;
                }).then(function(serviceWorkerRegistration) {
                    reg = serviceWorkerRegistration;
                    subscribe();
                    console.log('Service Worker is ready :^)', reg);
                }).catch(function(error) {
                    console.log('Service Worker Error :^(', error);
                });
            }
        };

        var logout = function(){
            unsubscribe();
            sessionStorage.clear();
        };

        var authenticate = function(username, password){
            return $q(function (resolve, reject) {
                resource.login(null,{"username": username, "password": password},
                    function (response) {
                        if(response.success){
                            sessionStorage.setItem(loggedUser, JSON.stringify(response.user));
                            sessionStorage.setItem(token, response.token);
                            initFcmSubscription();
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

        return {
            startListening: startListening,
            getLoggedUser: getLoggedUser,
            authenticate: authenticate,
            isUserAuthenticated: isUserAuthenticated,
            isUserAuthorized: isUserAuthorized,
            logout: logout,

            saveFcmSubscription: saveFcmSubscription,
            getFcmSubscription: getFcmSubscription
        }
    };

})();