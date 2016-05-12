'use strict';

angular

        .module('200mins-web')

        .service('userService', ['ENV', '$http', '$rootScope', 'localStorageService', 'utilityService', function (ENV, $http, $rootScope, localStorageService, utilityService) {

                /* --- 200mins API Services --- */

                this.create = function (data) {

                    return $http.post($rootScope.apiURL + 'user', data).then(function (response) {

                        if (ENV !== 'PROD') {

                            console.info('create: ', response);

                        }

                        // 201
                        return response;

                    }, function (err) {

                        if (ENV !== 'PROD') {

                            console.warn('create: ', err);

                        }

                        // 400 || 403 || 500
                        return err;

                    });

                };

                this.getNewUsers = function () {

                    return $http.get($rootScope.apiURL + 'user/new').then(function (response) {

                        if (ENV !== 'PROD') {

                            console.info('getNewUsers: ', response);

                        }

                        // 200
                        return response;

                    }, function (err) {

                        if (ENV !== 'PROD') {

                            console.warn('getNewUsers: ', err);

                        }

                        // 400 || 403 || 500    
                        return err;

                    });

                };

                this.getByUsername = function (username) {

                    return $http.get($rootScope.apiURL + 'user/' + username).then(function (response) {

                        if (ENV !== 'PROD') {

                            console.info('getByUsername: ', response);

                        }

                        // 200
                        return response;

                    }, function (err) {

                        if (ENV !== 'PROD') {

                            console.warn('getByUsername: ', err);

                        }

                        // 400 || 403 || 500    
                        return err;

                    });

                };

                this.getMovieDownload = function (username) {

                    return $http.get($rootScope.apiURL + 'user/' + username + '/movie-download').then(function (response) {

                        if (ENV !== 'PROD') {

                            console.info('getMovieDownload: ', response);

                        }

                        // 200
                        return response;

                    }, function (err) {

                        if (ENV !== 'PROD') {

                            console.warn('getMovieDownload: ', err);

                        }

                        // 500    
                        return err;

                    });

                };

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

                this.getMovieMarkWatchLater = function (username) {

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

                this.getMovieMarkWatched = function (username) {

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

                this.getSession = function (username, params) {

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

                /* --- Other Services --- */

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