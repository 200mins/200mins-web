'use strict';

angular.module('200mins-web').controller('SearchCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'proxyService', 'utilityService', function ($rootScope, $scope, $state, $stateParams, $timeout, proxyService, utilityService) {

        /* --- Models --- */

        // $scope.isSearchActive;
        // $scope.query;
        // $scope.suggestions;
        // $scope.timeout;

        /* --- Functions --- */

        $scope.initialize = function () {

            $scope.query = $stateParams.q;

            if (typeof $scope.query !== 'undefined') {

                $scope.isSearchActive = true;
                
                $scope.timeout = 0;

                $scope.search();

            } else {
                
                $scope.isSearchActive = false;

                $scope.query = '';

                $scope.timeout = 2000;

            }

            $scope.suggestions = [];

        };

        $scope.search = function () {
            
            $scope.isSearchActive = true;

            $timeout.cancel($scope.searchTimeout);

            if ($scope.query.length >= 2) {

                $scope.searchTimeout = $timeout(function () {
                    
                    var params = {query_term: $scope.query};

                    proxyService.getListMovies(params).then(function (response) {

                        if (typeof response === 'undefined') {

                            utilityService.notify('Service is down.');

                        } else {

                            switch (response.status) {

                                case 200:

                                    $scope.suggestions = response.data.movies;

                                    break;

                                default:

                                    utilityService.notify('Service is down.');

                            }

                        }
                        
                        $scope.isSearchActive = false;

                        $scope.timeout = 2000;

                    });

                }, $scope.timeout);

            } else {
                
                $scope.isSearchActive = false;
                
                $scope.timeout = 2000;
                
            }

        };

        $scope.showMovieDetails = function (movieID) {

            $rootScope.changeURL($state.href('movie', {id: movieID}), true);

        };

        /* --- Run --- */

        $scope.initialize();

    }]);