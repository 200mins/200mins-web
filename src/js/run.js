'use strict';

angular.module('200mins-web').run(['$mdSidenav', '$rootScope', function ($mdSidenav, $rootScope) {

    $rootScope.closeSidenav = function () {

        $mdSidenav('sidenav').close();

    };
    
    $rootScope.openSidenav = function () {

        $mdSidenav('sidenav').open();

    };

}]);