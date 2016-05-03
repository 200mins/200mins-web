'use strict';

angular.module('200mins-web').controller('MoviesCtrl', ['$rootScope', '$scope', 'activityService', 'localStorageService', 'movieService', 'utilityService', function ($rootScope, $scope, activityService, localStorageService, movieService, utilityService) {

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

            $scope.selectedMovie = {id: null, intention: null};

            $scope.filters = localStorageService.get('filters');

            if ($scope.filters !== null) {

                $scope.getMoviesParams = utilityService.mergeObjects($scope.getMoviesParams, $scope.filters, true);

            }

            $scope.getMovies();

        };

        $scope.movieDownload = function (imdbID, torrent, e) {

            $rootScope.initializeUser().then(function () {

                activityService.postMovieDownload(imdbID, torrent.quality).then(function (response) {

                    if (typeof response === 'undefined') {

                        utilityService.notify('Couldn\'t reach 200mins.');

                    } else {

                        switch (response.status) {

                            case 200:

                                $rootScope.changeURL(torrent.url, false);

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

                    }

                });

            }, function () {

                $rootScope.showLoginDialog(e);

            });

        };

        $scope.getMovies = function () {

            $scope.isNascent = true;

            movieService.getListMovies($scope.getMoviesParams).then(function (response) {

                if (response && response.status === 200) {

                    $scope.numMovies = response.data.movie_count;

                    if (response.data.movie_count > 0) {

                        $scope.movies = $scope.movies.concat(response.data.movies);

                        if (response.data.movies.length === $scope.getMoviesParams.limit) {

                            ++$scope.getMoviesParams.page;

                        } else {

                            utilityService.notify('That\'s all we got.');

                            $scope.isEOC = true;

                        }

                    } else {

                        utilityService.notify('That\'s all we got.');

                        $scope.isEOC = true;

                    }

                } else {

                    utilityService.notify('Couldn\'t get movies.');

                    $scope.isEOC = true;

                }

                $scope.isNascent = false;

            });

        };

        $scope.resetSelectedMovie = function () {

            $scope.selectedMovie = {id: null, intention: null};

        };

        $scope.selectMovie = function (id, intention) {

            $scope.selectedMovie = {
                id: id,
                intention: intention
            };

        };

        $scope.moviePlay = function (movie, torrent, e) {

            $rootScope.initializeUser().then(function () {

                activityService.postMoviePlay(movie.imdb_code, torrent.quality).then(function (response) {

                    if (typeof response === 'undefined') {

                        utilityService.notify('Couldn\'t reach 200mins.');

                    } else {

                        switch (response.status) {

                            case 200:

                                var magnetURL = 'magnet:?xt=urn:btih:' + torrent.hash + '&dn=' + encodeURIComponent(movie.title_long) + '&tr=udp://tracker.openbittorrent.com:80&tr=udp://torrent.gresille.org:80/announce';

                                $rootScope.changeURL(magnetURL, false);

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

                    }

                });

            }, function () {

                $rootScope.showLoginDialog(e);

            });

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);