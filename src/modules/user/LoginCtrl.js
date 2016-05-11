'use strict';

angular.module('200mins-web').controller('LoginCtrl', ['$mdDialog', '$rootScope', '$scope', 'localStorageService', 'md5', 'userService', 'utilityService', function ($mdDialog, $rootScope, $scope, localStorageService, md5, userService, utilityService) {

        /* --- MODELS --- */

        // $scope.credentials;
        // $scope.isRegistrationAllowed;

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.credentials = {
                email: '',
                username: '',
                password: ''
            };

            $scope.isRegistrationAllowed = true;

        };

        $scope.closeLoginDialog = function () {

            $mdDialog.cancel();

        };

        $scope.login = function () {

            $rootScope.setNascentState(true);

            var params = {
                password: md5.createHash($scope.credentials.password)
            };

            userService.getSession($scope.credentials.username, params).then(function (response) {

                if (typeof response === 'undefined') {

                    utilityService.notify('Couldn\'t reach 200mins.');

                } else {

                    switch (response.status) {

                        case 200:

                            if (localStorageService.set('token', response.data.token) && localStorageService.set('user', response.data.user)) {

                                $rootScope.initializeUser().then(function () {

                                    $mdDialog.hide();

                                    utilityService.notify('Hi ' + response.data.user.username + '!');

                                }, function () {

                                    utilityService.notify('Couldn\'t log you in.');

                                });

                            }

                            break;

                        case 403:

                            utilityService.notify(response.data);

                            break;

                        case 404:

                            utilityService.notify(response.data);

                            break;

                        default:

                            utilityService.notify('Service is down.');

                    }

                }

                $rootScope.setNascentState(false);

            });

        };

        $scope.register = function () {

            $rootScope.setNascentState(true);

            var data = {
                city: null,
                countryCode: null,
                email: $scope.credentials.email,
                password: md5.createHash($scope.credentials.password),
                username: $scope.credentials.username
            };

            userService.getLocation().then(function (response) {

                if (typeof response === 'undefined') {

                    utilityService.notify('Please try again.');

                } else {

                    data.city = response.data.city;
                    data.countryCode = response.data.countryCode;

                    userService.create(data).then(function (response) {

                        if (typeof response === 'undefined') {

                            utilityService.notify('Couldn\'t reach 200mins.');

                        } else {

                            switch (response.status) {

                                case 201:

                                    if (localStorageService.set('token', response.data.token) && localStorageService.set('user', response.data.user)) {

                                        $rootScope.initializeUser().then(function () {

                                            $mdDialog.hide();

                                            utilityService.notify('Hi ' + response.data.user.username + '!');

                                        }, function () {

                                            utilityService.notify('Couldn\'t log you in.');

                                        });

                                    }

                                    break;

                                case 403:

                                    utilityService.notify(response.data);

                                    break;

                                default:

                                    utilityService.notify('Service is down.');

                            }

                        }

                        $rootScope.setNascentState(false);

                    });

                }

            });

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);