'use strict';

angular.module('200mins-web').service('movieService', ['ENV', '$http', '$rootScope', function (ENV, $http, $rootScope) {

        this.getStatus = function (imdbID) {

            var config = {
                headers: {'Authorization': $rootScope.token}
            };

            return $http.get($rootScope.apiURL + 'movie/' + imdbID + '/status', config).then(function (response) {

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