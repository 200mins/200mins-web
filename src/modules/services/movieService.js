'use strict';

angular.module('200mins-web').service('movieService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', function (ENDPOINTS, ENV, $http, $rootScope) {

        this.getStatus = function (params) {

            var config = {
                headers: {'Authorization': $rootScope.token},
                params: params
            };

            return $http.get($rootScope.apiURL + ENDPOINTS.getStatus, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getStatus: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getStatus: ', err);

                }

                return err;

            });

        };

        this.listMovies = function (params) {

            var config = {params: params};

            return $http.get($rootScope.apiURL + ENDPOINTS.listMovies, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('listMovies: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('listMovies: ', err);

                }

                return err;

            });

        };

        this.movieDetails = function (params) {

            var config = {params: params};

            return $http.get($rootScope.apiURL + ENDPOINTS.movieDetails, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('movieDetails: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('movieDetails: ', err);

                }

                return err;

            });

        };

    }]);