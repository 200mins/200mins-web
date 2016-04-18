'use strict';

angular.module('200mins-web').config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function ($mdThemingProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('pink');

    $urlRouterProvider.otherwise('/');

    localStorageServiceProvider.setPrefix('200mins');

    $stateProvider
        .state('home', {
            controller: 'HomeCtrl',
            templateUrl: 'modules/common/home.html',
            url: '/'
        })
        .state('movie', {
            abstract: true,
            template: '<ui-view/>',
            url: '/movies'
        })
        .state('movie.browse', {
            controller: 'MovieBrowseCtrl',
            templateUrl: 'modules/movie/movie-browse.html',
            url: '/'
        })
        .state('movie.filter', {
            controller: 'MovieFilterCtrl',
            templateUrl: 'modules/movie/movie-filter.html',
            url: '/filters'
        });

}]);