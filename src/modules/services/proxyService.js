'use strict';

angular.module('200mins-web').service('proxyService', ['ENV', '$http', '$rootScope', function (ENV, $http, $rootScope) {

        this.getListMovies = function (params) {

            var config = {params: params};

            return $http.get($rootScope.apiURL + 'proxy/list_movies', config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getListMovies: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getListMovies: ', err);

                }

                return err;

            });

        };

        this.getMovieDetails = function (params) {

            var config = {params: params};

            return $http.get($rootScope.apiURL + 'proxy/movie_details', config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getMovieDetails: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getMovieDetails: ', err);

                }

                return err;

            });

        };

    }]);