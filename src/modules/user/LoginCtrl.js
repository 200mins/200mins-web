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
                password: md5.createHash($scope.credentials.password),
                username: $scope.credentials.username
            };

            userService.login(params).then(function (response) {

                if (typeof response === 'undefined') {

                    utilityService.notify(-1, 'Couldn\'t reach 200mins.');

                } else {

                    switch (response.status) {

                        case 200:

                            if (localStorageService.set('token', response.data.token) && localStorageService.set('user', response.data.user)) {

                                $rootScope.initializeUser().then(function () {

                                    $mdDialog.hide();

                                }, function () {

                                    utilityService.notify(-1, 'Couldn\'t log you in.');

                                });

                            }

                            break;

                        case 403:

                            utilityService.notify(-1, response.data);

                            break;

                        default:

                            utilityService.notify(-1, 'Service is down.');

                    }

                }

                $rootScope.setNascentState(false);

            });

        };

        $scope.register = function () {

            $rootScope.setNascentState(true);

            var data = {
                email: $scope.credentials.email,
                password: md5.createHash($scope.credentials.password),
                username: $scope.credentials.username
            };

            userService.register(data).then(function (response) {

                if (typeof response === 'undefined') {

                    utilityService.notify(-1, 'Couldn\'t reach 200mins.');

                } else {

                    switch (response.status) {

                        case 200:

                            if (localStorageService.set('token', response.data.token) && localStorageService.set('user', response.data.user)) {

                                $rootScope.initializeUser().then(function () {

                                    $mdDialog.hide();

                                }, function () {

                                    utilityService.notify(-1, 'Couldn\'t log you in.');

                                });

                            }

                            break;

                        case 403:

                            utilityService.notify(-1, response.data);

                            break;

                        default:

                            utilityService.notify(-1, 'Service is down.');

                    }

                }

                $rootScope.setNascentState(false);

            });

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);