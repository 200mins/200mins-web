'use strict';

angular.module('200mins-web').config(['ENV', '$compileProvider', '$locationProvider', '$mdThemingProvider', '$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function (ENV, $compileProvider, $locationProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        $compileProvider.debugInfoEnabled(false);

        $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('pink');

        if (ENV === 'PROD') {

            $locationProvider.html5Mode(true);

        }

        $urlRouterProvider.otherwise('/');

        localStorageServiceProvider.setPrefix('200mins');

        $stateProvider

                .state('filters', {
                    controller: 'FiltersCtrl',
                    templateUrl: 'modules/filters/filters.html',
                    url: '/filters'
                })

                .state('search', {
                    controller: 'SearchCtrl',
                    templateUrl: 'modules/search/search.html',
                    url: '/search?q'
                })

                .state('home', {
                    controller: 'HomeCtrl',
                    templateUrl: 'modules/home/home.html',
                    url: '/'
                })

                .state('movie', {
                    controller: 'MovieCtrl',
                    templateUrl: 'modules/movie/movie.html',
                    url: '/movie/:id'
                })

                .state('movies', {
                    controller: 'MoviesCtrl',
                    templateUrl: 'modules/movies/movies.html',
                    url: '/movies'
                })

                .state('user', {
                    controller: 'UserCtrl',
                    templateUrl: 'modules/user/user.html',
                    url: '/user/:username'
                })

                .state('user.statistics', {
                    controller: 'StatisticsCtrl',
                    templateUrl: 'modules/user/statistics.html',
                    url: '/statistics'
                })

                .state('user.downloads', {
                    controller: 'DownloadsCtrl',
                    templateUrl: 'modules/user/downloads.html',
                    url: '/downloads'
                })

                .state('user.plays', {
                    controller: 'PlaysCtrl',
                    templateUrl: 'modules/user/plays.html',
                    url: '/plays'
                })

                .state('user.likes', {
                    controller: 'LikesCtrl',
                    templateUrl: 'modules/user/likes.html',
                    url: '/likes'
                })

                .state('user.watch-later', {
                    controller: 'WatchLaterCtrl',
                    templateUrl: 'modules/user/watch-later.html',
                    url: '/watch-later'
                })

                .state('user.watched', {
                    controller: 'WatchedCtrl',
                    templateUrl: 'modules/user/watched.html',
                    url: '/watched'
                });

    }]);