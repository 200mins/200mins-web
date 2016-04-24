'use strict';

angular.module('200mins-web').service('userService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', 'localStorageService', 'utilityService', function (ENDPOINTS, ENV, $http, $rootScope, localStorageService, utilityService) {

        this.checkUsername = function (params) {

            var options = {params: params};

            return $http.get($rootScope.apiURL + ENDPOINTS.checkUsername, options).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('checkUsername: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('checkUsername: ', err);

                }

                return err;

            });

        };

        this.login = function (params) {

            var options = {params: params};

            return $http.get($rootScope.apiURL + ENDPOINTS.login, options).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('login: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('login: ', err);

                }

                return err;

            });

        };

        this.register = function (data) {

            return $http.post($rootScope.apiURL + ENDPOINTS.register, data).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('register: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('register: ', err);

                }

                return err;

            });

        };

        this.updateKarma = function (delta) {
            
            var user = localStorageService.get('user');

            if (user === null) {

                utilityService.notify('Couldn\'t update your karma.');

            } else {

                user.karma += delta;

                if (localStorageService.set('user', user)) {

                    utilityService.notify('Your karma: ' + user.karma);

                } else {

                    utilityService.notify('Couldn\'t update your karma.');

                }

            }

        };

    }]);