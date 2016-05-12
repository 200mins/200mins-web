'use strict';

angular.module('200mins-web').controller('HomeCtrl', ['$scope', 'userService', 'utilityService', function ($scope, userService, utilityService) {

        /* --- MODELS --- */

        // $scope.newUsers = [];

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.newUsers = [];

            $scope.getNewUsers();

        };

        $scope.getNewUsers = function () {

            userService.getNewUsers().then(function (response) {

                if (typeof response === 'undefined') {

                    utilityService.notify('Couldn\'t get new users.');

                } else {

                    switch (response.status) {

                        case 200:

                            $scope.newUsers = response.data;

                            break;

                        default:

                            utilityService.notify('Service is down.');

                    }

                }

            });

        };
        
        /* --- RUN --- */
        
        $scope.initialize();

    }]);