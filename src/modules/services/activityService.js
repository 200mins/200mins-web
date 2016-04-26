'use strict';

angular.module('200mins-web').service('activityService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', 'userService', function (ENDPOINTS, ENV, $http, $rootScope, userService) {

        this.download = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.download, data, config).then(function (response) {

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

        this.like = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.like, data, config).then(function (response) {

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

        this.unlike = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.unlike, data, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('unlike: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('unlike: ', err);

                }

                return err;

            });

        };

        this.markWatch = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.markWatch, data, config).then(function (response) {

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

        this.unmarkWatch = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.unmarkWatch, data, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('unmarkWatch: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('unmarkWatch: ', err);

                }

                return err;

            });

        };

        this.markWatched = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.markWatched, data, config).then(function (response) {

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

        this.unmarkWatched = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.unmarkWatched, data, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('unmarkWatched: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('unmarkWatched: ', err);

                }

                return err;

            });

        };

        this.stream = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.stream, data, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('stream: ', response);

                }

                userService.updateKarma(response.data.karmaDelta);

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('stream: ', err);

                }

                return err;

            });

        };

    }]);