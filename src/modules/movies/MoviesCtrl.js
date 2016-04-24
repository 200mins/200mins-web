'use strict';

angular.module('200mins-web').controller('MoviesCtrl', ['$rootScope', '$scope', '$window', 'activityService', 'localStorageService', 'movieService', 'utilityService', function ($rootScope, $scope, $window, activityService, localStorageService, movieService, utilityService) {

        /* --- MODELS --- */

        // $scope.filters;
        // $scope.getMoviesParams;
        // $scope.isEOC;
        // $scope.isNascent;
        // $scope.movies;
        // $scope.numMovies;
        // $scope.selectedMovie;

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.getMoviesParams = {limit: 20, page: 1, sort_by: 'year'};

            $scope.isEOC = false;

            $scope.isNascent = false;

            $scope.movies = [];

            // $scope.numMovies = null; // One-time bound, hence not declared or initialized

            $scope.selectedMovie = {id: null};

            $scope.filters = localStorageService.get('filters');

            if ($scope.filters !== null) {

                $scope.getMoviesParams = utilityService.mergeObjects($scope.getMoviesParams, $scope.filters, true);

            }

            $scope.getMovies();

        };

        $scope.download = function (e, movie, torrent) {

            $rootScope.initializeUser().then(function () {

                var data = {
                    movie: utilityService.cleanMovie(movie),
                    quality: torrent.quality
                };

                activityService.download(data).then(function (response) {

                    if (typeof response === 'undefined') {

                        utilityService.notify(-1, 'Couldn\'t reach 200mins.');

                    } else {

                        switch (response.status) {

                            case 200:

                                $window.open(torrent.url, '_self');

                                break;

                            case 403:

                                utilityService.notify(-1, response.data);

                                break;

                            case 401:

                                $rootScope.logout(true);

                                utilityService.notify(-1, response.data);

                                break;

                            default:

                                utilityService.notify(-1, 'Service is down.');

                        }

                    }

                });

            }, function () {

                $rootScope.showLoginDialog(e);

            });

        };

        $scope.getMovies = function () {

            $scope.isNascent = true;

            movieService.listMovies($scope.getMoviesParams).then(function (response) {

                if (response && response.status === 200) {

                    $scope.numMovies = response.data.movie_count;

                    if (response.data.movie_count > 0) {

                        $scope.movies = $scope.movies.concat(response.data.movies);

                        if (response.data.movies.length === $scope.getMoviesParams.limit) {

                            ++$scope.getMoviesParams.page;

                        } else {

                            utilityService.notify(0, 'That\'s all we got.');

                            $scope.isEOC = true;

                        }

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

            $scope.selectedMovie = {id: null};

        };

        $scope.selectMovie = function (id) {

            $scope.selectedMovie = {
                id: id
            };

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);