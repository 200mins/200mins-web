'use strict';

angular.module('200mins-web').config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function ($mdThemingProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('green');

    $urlRouterProvider.otherwise('/');

    localStorageServiceProvider.setPrefix('200mins');

    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'modules/home/home.html'
        });

}]);