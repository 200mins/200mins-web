'use strict';

angular.module('200mins-web').controller('MovieFilterCtrl', ['$rootScope', '$scope', 'localStorageService', 'utilityService', function ($rootScope, $scope, localStorageService, utilityService) {

    /* --- MODELS --- */

    // $scope.filter = {
    //     genre: ANY_GENRE,
    //     minimum_rating: INT(0-9),
    //     quality: ANY_QUALITY
    // };

    $scope.genres = [
        { name: 'Action', value: 'action' },
        { name: 'Adventure', value: 'adventure' },
        { name: 'Animation', value: 'animation' },
        { name: 'Biography', value: 'biography' },
        { name: 'Comedy', value: 'comedy' },
        { name: 'Crime', value: 'crime' },
        { name: 'Documentary', value: 'documentary' },
        { name: 'Drama', value: 'drama' },
        { name: 'Family', value: 'family' },
        { name: 'Fantasy', value: 'fantasy' },
        { name: 'Film-Noir', value: 'film-noir' },
        { name: 'History', value: 'history' },
        { name: 'Horror', value: 'horror' },
        { name: 'Music', value: 'music' },
        { name: 'Musical', value: 'musical' },
        { name: 'Mystery', value: 'mystery' },
        { name: 'Romance', value: 'romance' },
        { name: 'Sci-Fi', value: 'sci-fi' },
        { name: 'Sport', value: 'sport' },
        { name: 'Thriller', value: 'thriller' },
        { name: 'War', value: 'war' },
        { name: 'Western', value: 'western' }
    ];

    $scope.videoQualities = [
        { name: '3D', value: '3D' },
        { name: '720p', value: '720p' },
        { name: '1080p', value: '1080p' }
    ];

    /* --- FUNCTIONS --- */

    $scope.initialize = function () {

        $scope.filters = { genre: 'all', minimum_rating: 0, quality: 'all' };

        var filters = localStorageService.get('filters');

        !!filters ? $scope.filters = utilityService.mergeObjects($scope.filters, filters, true) : null;

    };

    $scope.clearFilters = function () {

        localStorageService.remove('filters');

        utilityService.notify(1, 'Filters were cleared.');

        $rootScope.changeState('movie.browse');

    };

    // TODO: Don't save null filters

    $scope.saveFilters = function () {

        var filters = {};

        angular.forEach($scope.filters, function (value, key) {

            if (value !== 'all' && value !== 0) {

                filters[key] = value;

            }

        });

        if (utilityService.isObjectEmpty(filters)) {

            localStorageService.remove('filters');

        } else {

            if (localStorageService.set('filters', filters)) {

                utilityService.notify(1, 'Filters were saved.');

                $rootScope.changeState('movie.browse');

            } else {

                utilityService.notify(-1, 'Couldn\'t save filters.')

            }

        }


    };

    /* --- RUN --- */

    $scope.initialize();

}]);