'use strict';

angular.module('200mins-web').controller('SearchCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'activityService', 'proxyService', 'utilityService', function ($rootScope, $scope, $state, $stateParams, $timeout, activityService, proxyService, utilityService) {

        /* --- Models --- */

        // $scope.isSearchActive;
        // $scope.query;
        // $scope.selectedMovie;
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
            
            $scope.selectedMovie = {id: null, intention: null};

            $scope.suggestions = [];

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

        /* --- Run --- */

        $scope.initialize();

    }]);