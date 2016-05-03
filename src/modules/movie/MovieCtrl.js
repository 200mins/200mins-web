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
                isLike: false,
                isWatchLater: false,
                isWatched: false
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

                            $scope.getMovieStatus();

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

        $scope.getMovieStatus = function () {

            movieService.getStatus($scope.movie.imdb_code).then(function (response) {

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

        $scope.like = function (imdbID, value, e) {

            $rootScope.initializeUser().then(function () {

                activityService.like(imdbID, value).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isLike = !$scope.movieStatus.isLike;

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

        $scope.markWatch = function (imdbID, value, e) {

            $rootScope.initializeUser().then(function () {

                activityService.markWatch(imdbID, value).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isWatchLater = !$scope.movieStatus.isWatchLater;

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
        }

        $scope.markWatched = function (imdbID, value, e) {

            $rootScope.initializeUser().then(function () {

                activityService.markWatched(imdbID, value).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isWatched = !$scope.movieStatus.isWatched;

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

        $scope.initialize();

    }]);