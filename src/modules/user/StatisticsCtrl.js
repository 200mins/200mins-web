'use strict';

angular.module('200mins-web').controller('StatisticsCtrl', ['$scope', 'userService', 'utilityService', function ($scope, userService, utilityService) {

        /* --- MODELS --- */

        // $scope.username

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

                $scope.updateActiveTab();

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);