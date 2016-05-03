'use strict';

angular.module('200mins-web').service('activityService', ['ENV', '$http', '$rootScope', 'userService', function (ENV, $http, $rootScope, userService) {

        this.download = function (imdbID, quality) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/download?quality=' + quality, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('download: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('download: ', err);

                }

                return err;

            });

        };

        this.like = function (imdbID, value) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-like?value=' + value, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('like: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('like: ', err);

                }

                return err;

            });

        };

        this.markWatch = function (imdbID, value) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-watch-later?value=' + value, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('markWatch: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('markWatch: ', err);

                }

                return err;

            });

        };

        this.markWatched = function (imdbID, value) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/movie-watched?value=' + value, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('markWatched: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('markWatched: ', err);

                }

                return err;

            });

        };

        this.play = function (imdbID, quality) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + 'activity/' + imdbID + '/play?quality=' + quality, null, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('play: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('play: ', err);

                }

                return err;

            });

        };

    }]);