'use strict';

angular.module('200mins-web').service('activityService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', function (ENDPOINTS, ENV, $http, $rootScope) {

        this.download = function (data) {

            var config = {headers: {'Authorization': $rootScope.token}};

            return $http.post($rootScope.apiURL + ENDPOINTS.download, data, config).then(function (response) {

                if (ENV !== 'PROD') {

                    console.info('download: ', response);

                }

                return response;

            }, function (err) {

                if (ENV !== 'PROD') {

                    console.warn('download: ', err);

                }

                return err;

            });

        };

    }]);