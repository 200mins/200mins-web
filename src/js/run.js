'use strict';

angular.module('200mins-web').run(['CONFIG', 'ENV', 'VERSION', '$location', '$mdDialog', '$mdSidenav', '$q', '$rootScope', '$state', '$window', 'localStorageService', 'utilityService', function (CONFIG, ENV, VERSION, $location, $mdDialog, $mdSidenav, $q, $rootScope, $state, $window, localStorageService, utilityService) {

        /* --- MODELS --- */

        // $rootScope.apiURL;
        // $rootScope.isUserInitialized;
        // $rootScope.nascent;
        // $rootScope.token;
        // $rootScope.user;

        /* --- FUNCTIONS --- */

        $rootScope.changeState = function (state, params) {

            if (typeof params === 'undefined') {

                $state.go(state);

            } else {

                $state.go(state, params);

            }

        };

        $rootScope.changeURL = function (url, newTab) {

            newTab = newTab ? '_blank' : '_self';

            $window.open(url, newTab);

        };

        $rootScope.closeSidenav = function () {

            $mdSidenav('sidenav').close();

        };

        $rootScope.logout = function (isSilent) {

            localStorageService.remove('token');

            localStorageService.remove('user');

            $rootScope.isUserInitialized = false;

            $rootScope.initializeUser();

            if (!isSilent) {

                utilityService.notify('Logging you out...');

            }

        };

        $rootScope.openSidenav = function () {

            $mdSidenav('sidenav').open();

        };

        $rootScope.setNascentState = function (bool) {

            $rootScope.nascent = bool;

        };

        $rootScope.showLoginDialog = function (e) {

            $mdDialog.show({
                controller: 'LoginCtrl',
                templateUrl: 'modules/user/login-dialog.html',
                parent: angular.element(document.body),
                targetEvent: e,
                clickOutsideToClose: true,
                openFrom: '#login-dialog-spawn',
                closeTo: '#login-dialog-spawn'

            });

        };

        $rootScope.initialize = function () {

            $rootScope.apiURL = CONFIG[ENV]['domain'] + ':' + CONFIG[ENV]['port'] + '/';

            $rootScope.isUserInitialized = false;

            $rootScope.nascent = false;

            $rootScope.token = null;

            $rootScope.user = null;

            var version = localStorageService.get('version');

            if (version !== VERSION) {

                localStorageService.clearAll();

                if (!localStorageService.set('version', VERSION)) {

                    utilityService.notify('Couldn\'t initialize app properly.');

                }

            }

            $rootScope.initializeUser();

        };

        $rootScope.initializeUser = function () {

            return $q(function (resolve, reject) {

                if (!$rootScope.isUserInitialized) {

                    var token = localStorageService.get('token');

                    var user = localStorageService.get('user');

                    if (token === null || user === null) {

                        $rootScope.token = null;

                        $rootScope.user = null;

                        reject();

                    } else {

                        $rootScope.token = token;

                        $rootScope.user = user;

                        $rootScope.isUserInitialized = true;

                        utilityService.notify('Hi ' + user.username + '!');

                        resolve();

                    }

                } else {

                    resolve();

                }

            });

        };

        /* --- RUN --- */

        $rootScope.$on('$stateChangeSuccess', function () {

            $rootScope.closeSidenav();

            if (ENV === 'PROD') {

                window.ga('send', 'pageview', {page: $location.path()});

            }

        });

        $rootScope.initialize();

    }]);