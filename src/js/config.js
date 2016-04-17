'use strict';

angular.module('200mins-web').config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    localStorageServiceProvider.setPrefix('200mins');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'modules/home/home.html'
        });

}]);