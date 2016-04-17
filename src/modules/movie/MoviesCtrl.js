'use strict';

angular.module('200mins-web').controller('MoviesCtrl', ['$scope', 'movieService', 'utilityService', function ($scope, movieService, utilityService) {

    /* --- MODELS --- */

    // $scope.isNascent = false;
    // $scope.getMoviesParams = { limit: 20, page: 1 };
    // $scope.movies = [];
    // $scope.selectedMovie = { id: null, reason: null };

    /* --- FUNCTIONS --- */

    $scope.initialize = function () {

        $scope.isNascent = false;

        $scope.getMoviesParams = { limit: 20, page: 1 };

        $scope.movies = [];

        $scope.selectedMovie = { id: null, reason: null };

        $scope.getMovies();

    };

    $scope.getMovies = function () {

        $scope.isNascent = true;

        movieService.getMovies($scope.getMoviesParams).then(function (response) {

            if (response && response.status === 200) {

                $scope.movies = $scope.movies.concat(response.data.movies);

                if (response.data.movies.length === $scope.getMoviesParams.limit) {

                    ++$scope.getMoviesParams.page;

                } else {

                    utilityService.notify(0, 'That\'s all we got.');

                }

            } else {

                utilityService.notify(-1, 'Couldn\'t get movies.');

            }

            $scope.isNascent = false;

        });

    };

    $scope.resetSelectedMovie = function () {

        $scope.selectedMovie = { id: null, reason: null };

    };

    $scope.selectMovie = function (id, reason) {

        $scope.selectedMovie = {
            id: id,
            reason: reason
        };

    };

    /* --- RUN --- */

    $scope.initialize();

}]);