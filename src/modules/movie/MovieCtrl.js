'use strict';

angular.module('200mins-web').controller('MovieCtrl', ['$rootScope', '$scope', '$stateParams', 'activityService', 'movieService', 'utilityService', function ($rootScope, $scope, $stateParams, activityService, movieService, utilityService) {

        /* --- MODELS --- */

        // $scope.getMovieParams;
        // $scope.movie;
        // $scope.movieStatus;

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.getMovieParams = {movie_id: $stateParams.id};

            $scope.movieStatus = {
                isMovieDownload: false,
                isMovieLike: false,
                isMovieMarkWatchLater: false,
                isMovieMarkWatched: false,
                isMoviePlay: false
            };

            $scope.getMovie();

        };

        $scope.getMovie = function () {

            $rootScope.setNascentState(true);

            movieService.getMovieDetails($scope.getMovieParams).then(function (response) {

                switch (response.status) {

                    case 200:

                        $scope.movie = response.data.movie;

                        $rootScope.initializeUser().then(function () {

                            $scope.getUserActivity();

                        });

                        break;

                    case 404:

                        utilityService.notify('Movie not found.');

                        $rootScope.changeState('movies');

                        break;

                    default:

                        utilityService.notify('Service is down.');

                }

                $rootScope.setNascentState(false);

            });

        };

        $scope.getUserActivity = function () {

            movieService.getUserActivity($scope.movie.imdb_code).then(function (response) {

                switch (response.status) {

                    case 200:

                        $scope.movieStatus = response.data;

                        break;

                    case 403:

                        utilityService.notify(response.data);

                        break;

                    case 401:

                        $rootScope.logout(true);

                        utilityService.notify(response.data);

                        break;

                    default:

                        utilityService.notify('Service is down.');

                }

            });

        };

        $scope.movieLike = function (imdbID, value, e) {

            $rootScope.initializeUser().then(function () {

                activityService.postMovieLike(imdbID, value).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isMovieLike = !$scope.movieStatus.isMovieLike;

                            break;

                        case 403:

                            utilityService.notify(response.data);

                            break;

                        case 401:

                            $rootScope.logout(true);

                            utilityService.notify(response.data);

                            break;

                        default:

                            utilityService.notify('Service is down.');

                    }

                });

            }, function () {

                $rootScope.showLoginDialog(e);

            });

        };

        $scope.movieMarkWatchLater = function (imdbID, value, e) {

            $rootScope.initializeUser().then(function () {

                activityService.postMovieMarkWatchLater(imdbID, value).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isMovieMarkWatchLater = !$scope.movieStatus.isMovieMarkWatchLater;

                            break;

                        case 403:

                            utilityService.notify(response.data);

                            break;

                        case 401:

                            $rootScope.logout(true);

                            utilityService.notify(response.data);

                            break;

                        default:

                            utilityService.notify('Service is down.');

                    }

                });

            }, function () {

                $rootScope.showLoginDialog(e);

            });
        };

        $scope.movieMarkWatched = function (imdbID, value, e) {

            $rootScope.initializeUser().then(function () {

                activityService.postMovieMarkWatched(imdbID, value).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isMovieMarkWatched = !$scope.movieStatus.isMovieMarkWatched;

                            break;

                        case 403:

                            utilityService.notify(response.data);

                            break;

                        case 401:

                            $rootScope.logout(true);

                            utilityService.notify(response.data);

                            break;

                        default:

                            utilityService.notify('Service is down.');

                    }

                });

            }, function () {

                $rootScope.showLoginDialog(e);

            });
        };

        /* --- RUN --- */

        $rootScope.initializeUser().then(function () {

            $scope.initialize();

        }, function () {

            $scope.initialize();

        });

    }]);