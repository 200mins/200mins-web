'use strict';

angular.module('200mins-web').run(['CONFIG', 'ENV', 'VERSION', '$location', '$mdSidenav', '$rootScope', '$state', 'localStorageService', function (CONFIG, ENV, VERSION, $location, $mdSidenav, $rootScope, $state, localStorageService) {

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

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        window.ga('send', 'pageview', { page: $location.path() });

    });

    /* --- RUN --- */

    $rootScope.apiURL = CONFIG[ENV]['domain'] + ':' + CONFIG[ENV]['port'] + '/';

    // Version check

    var version = localStorageService.get('version');

    if (!version || version !== VERSION) {

        localStorageService.clearAll();

        localStorageService.set('version', VERSION);

    }

    // Show good movies to first-time visitor

    if (!localStorageService.get('filters')) {

        localStorageService.set('filters', { quality: '3D' });

    }

}]);