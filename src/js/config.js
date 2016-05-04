'use strict';

angular.module('200mins-web').config(['$compileProvider', '$httpProvider', '$mdThemingProvider', '$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function ($compileProvider, $httpProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        $compileProvider.debugInfoEnabled(false);

        $httpProvider.useApplyAsync(true);

        $mdThemingProvider.theme('default')
                .primaryPalette('pink')
                .accentPalette('indigo');

        $urlRouterProvider.otherwise('/');

        localStorageServiceProvider.setPrefix('200mins');

        $stateProvider

                .state('filters', {
                    controller: 'FiltersCtrl',
                    templateUrl: 'modules/filters/filters.html',
                    url: '/filters'
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
                });

    }]);