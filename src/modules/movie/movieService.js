'use strict';

angular.module('200mins-web').service('movieService', ['ENDPOINTS', 'ENV', '$http', '$rootScope', function (ENDPOINTS, ENV, $http, $rootScope) {

    this.getMovies = function (params) {
        
        var options = {params: params};

        return $http.get($rootScope.apiURL + ENDPOINTS.getMovies, options).then(function (response) {

            if (ENV !== 'PROD') {

                console.info('getMovies: ', response);

            }

            return response;

        }, function (err) {

            if (ENV !== 'PROD') {

                console.warn('getMovies: ', err);

            }

        });

    };

}]);