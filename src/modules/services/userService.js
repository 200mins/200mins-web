'use strict';

angular.module('200mins-web').service('userService', ['ENV', '$http', '$rootScope', 'localStorageService', 'utilityService', function (ENV, $http, $rootScope, localStorageService, utilityService) {

        this.getMovieLike = function (username) {

            return $http.get($rootScope.apiURL + 'user/' + username + '/movie-like').then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getMovieLike: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getMovieLike: ', err);

                }

                return err;

            });

        };

        this.getMovieDownload = function (username) {

            return $http.get($rootScope.apiURL + 'user/' + username + '/movie-download').then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getMovieDownload: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getMovieDownload: ', err);

                }

                return err;

            });

        };

        this.getMoviePlay = function (username) {

            return $http.get($rootScope.apiURL + 'user/' + username + '/movie-play').then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getMoviePlay: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getMoviePlay: ', err);

                }

                return err;

            });

        };

        this.getMovieWatched = function (username) {

            return $http.get($rootScope.apiURL + 'user/' + username + '/movie-mark-watched').then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getMovieWatched: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getMovieWatched: ', err);

                }

                return err;

            });

        };

        this.getMovieWatchLater = function (username) {

            return $http.get($rootScope.apiURL + 'user/' + username + '/movie-mark-watch-later').then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getMovieWatchLater: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getMovieWatchLater: ', err);

                }

                return err;

            });

        };

        this.getLocation = function () {

            return $http.get('http://ip-api.com/json').then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('getLocation: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('getLocation: ', err);

                }

                return err;

            });

        };

        this.login = function (username, params) {

            var config = {params: params};

            return $http.get($rootScope.apiURL + 'user/' + username + '/session', config).then(function (response) {

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

            return $http.post($rootScope.apiURL + 'user', data).then(function (response) {

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

                return;

            } else {

                user.karma += delta;

                if (localStorageService.set('user', user)) {

                    return;

                } else {

                    utilityService.notify('Couldn\'t update your karma.');

                    return;

                }

            }

        };

    }]);