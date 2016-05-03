'use strict';

angular.module('200mins-web').service('activityService', ['ENV', '$http', '$rootScope', 'userService', function (ENV, $http, $rootScope, userService) {

        this.postMovieDownload = function (imdbID, quality) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-download?quality=' + quality, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('postMovieDownload: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('postMovieDownload: ', err);

                }

                return err;

            });

        };

        this.postMovieLike = function (imdbID, value) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-like?value=' + value, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('postMovieLike: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('postMovieLike: ', err);

                }

                return err;

            });

        };

        this.postMovieMarkWatchLater = function (imdbID, value) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-mark-watch-later?value=' + value, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('postMovieMarkWatchLater: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('postMovieMarkWatchLater: ', err);

                }

                return err;

            });

        };

        this.postMovieMarkWatched = function (imdbID, value) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-mark-watched?value=' + value, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('postMovieMarkWatched: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('postMovieMarkWatched: ', err);

                }

                return err;

            });

        };

        this.postMoviePlay = function (imdbID, quality) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-play?quality=' + quality, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('postMoviePlay: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('postMoviePlay: ', err);

                }

                return err;

            });

        };

    }]);