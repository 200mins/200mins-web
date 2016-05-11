'use strict';

angular.module('200mins-web').service('movieService', ['ENV', '$http', '$rootScope', function (ENV, $http, $rootScope) {

        this.getUserActivity = function (imdbID) {

            var config = {
                headers: {'Authorization': $rootScope.token}
            };

            return $http.get($rootScope.apiURL + 'movie/' + imdbID + '/user-activity', config).then(function (response) {

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

    }]);