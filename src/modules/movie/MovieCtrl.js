'use strict';

angular.module('200mins-web').controller('MovieCtrl', ['$rootScope', '$scope', '$stateParams', 'movieService', 'utilityService', function ($rootScope, $scope, $stateParams, movieService, utilityService) {

        /* --- MODELS --- */

        // $scope.getMovieParams;
        // $scope.movie;

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.getMovieParams = {movie_id: $stateParams.id};

            $scope.getMovie();

        };

        $scope.getMovie = function () {

            $rootScope.setNascentState(true);

            movieService.movieDetails($scope.getMovieParams).then(function (response) {

                switch (response.status) {

                    case 200:

                        $scope.movie = response.data.movie;

                        break;

                    case 404:

                        utilityService.notify(-1, 'Movie not found.');

                        $rootScope.changeState('movies');

                        break;

                    default:

                        utilityService.notify(-1, 'Service is down.');

                }

                $rootScope.setNascentState(false);

            });

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);