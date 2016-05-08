'use strict';

angular.module('200mins-web').controller('UserCtrl', ['$rootScope', '$scope', '$stateParams', function ($rootScope, $scope, $stateParams) {

        /* --- MODELS --- */

        // $scope.user;

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.username = $stateParams.username;

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);