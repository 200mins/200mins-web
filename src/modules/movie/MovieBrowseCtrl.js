'use strict';

angular.module('200mins-web').controller('MovieBrowseCtrl', ['$scope', 'localStorageService', 'movieService', 'utilityService', function ($scope, localStorageService, movieService, utilityService) {

    /* --- MODELS --- */

    // $scope.getMoviesParams = { limit: INT(1+), page: INT(1+) };
    // $scope.isEOC = false;
    // $scope.isNascent = false;
    // $scope.movies = [];
    // $scope.numMovies = INT;
    // $scope.selectedMovie = { id: INT, reason: 'download' || 'info' };

    /* --- FUNCTIONS --- */

    $scope.initialize = function () {

        $scope.getMoviesParams = { limit: 20, page: 1 };

        $scope.isEOC = false;

        $scope.isNascent = false;

        $scope.movies = [];

        // $scope.numMovies = null; // One-time bound

        $scope.selectedMovie = { id: null, reason: null };

        var filters = localStorageService.get('filters');

        !!filters ? $scope.getMoviesParams = utilityService.mergeObjects($scope.getMoviesParams, filters, true) : null;

        $scope.getMovies();

    };

    $scope.getMovies = function () {

        $scope.isNascent = true;

        movieService.getMovies($scope.getMoviesParams).then(function (response) {

            if (response && response.status === 200) {

                $scope.movies = $scope.movies.concat(response.data.movies);

                $scope.numMovies = response.data.movie_count;

                if (response.data.movies.length === $scope.getMoviesParams.limit) {

                    ++$scope.getMoviesParams.page;

                } else {

                    utilityService.notify(0, 'That\'s all we got.');

                    $scope.isEOC = true;

                }

            } else {

                utilityService.notify(-1, 'Couldn\'t get movies.');

                $scope.isEOC = true;

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