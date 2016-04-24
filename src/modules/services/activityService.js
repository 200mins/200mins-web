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