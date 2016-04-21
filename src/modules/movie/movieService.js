'use strict';

angular.module('200mins-web').service('movieService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', function (ENDPOINTS, ENV, $http, $rootScope) {

        this.listMovies = function (params) {

            var options = {params: params};

            return $http.get($rootScope.apiURL + ENDPOINTS.listMovies, options).then(function (response) {

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

    }]);