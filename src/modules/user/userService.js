'use strict';

angular.module('200mins-web').service('userService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', function (ENDPOINTS, ENV, $http, $rootScope) {

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

    }]);