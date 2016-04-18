'use strict';

angular.module('200mins-web').run(['CONFIG', 'ENV', '$mdSidenav', '$rootScope', '$state', 'localStorageService', function (CONFIG, ENV, $mdSidenav, $rootScope, $state, localStorageService) {

    /* --- MODELS --- */

    // $rootScope.apiURL;

    /* --- FUNCTIONS --- */

    $rootScope.changeState = function (state, params) {

        if (!!params) {

            $state.go(state, params);

        } else {

            $state.go(state);

        }

    };

    $rootScope.closeSidenav = function () {

        $mdSidenav('sidenav').close();

    };

    $rootScope.openSidenav = function () {

        $mdSidenav('sidenav').open();

    };

    /* --- RUN --- */

    $rootScope.apiURL = CONFIG[ENV]['domain'] + ':' + CONFIG[ENV]['port'] + '/';

    // Show good movies to first-time visitor

    if (!localStorageService.get('filters')) {

        localStorageService.set('filters', { quality: '3D' });

    }

}]);