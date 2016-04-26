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
                isWatch: false,
                isWatched: false
            };

            $scope.getMovie();

        };

        $scope.getMovie = function () {

            $rootScope.setNascentState(true);

            movieService.movieDetails($scope.getMovieParams).then(function (response) {

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

            var params = {movieID: $scope.movie.imdb_code};

            movieService.getStatus(params).then(function (response) {

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

        $scope.like = function (e) {

            $rootScope.initializeUser().then(function () {

                var data = {movie: $scope.movie};

                activityService.like(data).then(function (response) {

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

        $scope.unlike = function () {

            $rootScope.initializeUser().then(function () {

                var data = {movie: $scope.movie};

                activityService.unlike(data).then(function (response) {

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

        $scope.markWatch = function (e) {

            $rootScope.initializeUser().then(function () {

                var data = {movie: $scope.movie};

                activityService.markWatch(data).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isWatch = !$scope.movieStatus.isWatch;

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

        $scope.unmarkWatch = function () {

            $rootScope.initializeUser().then(function () {

                var data = {movie: $scope.movie};

                activityService.unmarkWatch(data).then(function (response) {

                    switch (response.status) {

                        case 200:

                            $scope.movieStatus.isWatch = !$scope.movieStatus.isWatch;

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

        $scope.markWatched = function (e) {

            $rootScope.initializeUser().then(function () {

                var data = {movie: $scope.movie};

                activityService.markWatched(data).then(function (response) {

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

        $scope.unmarkWatched = function () {

            $rootScope.initializeUser().then(function () {

                var data = {movie: $scope.movie};

                activityService.unmarkWatched(data).then(function (response) {

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