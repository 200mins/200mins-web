'use strict';

angular.module('200mins-web').controller('MovieFilterCtrl', ['$rootScope', '$scope', 'localStorageService', 'utilityService', function ($rootScope, $scope, localStorageService, utilityService) {

    /* --- MODELS --- */

    // $scope.filter = {
    //     genre: 'action' || 'adventure' || 'animation' || 'biography' || 'comedy' || 'crime' || 'documentary' || 'drama' || 'family' || 'fantasy' || 'film-noir' || 'history' || 'horror' || 'music' || 'musical' || 'mystery' || 'romance' || 'sci-fi' || 'sport' || 'thriller' || 'war' || 'western',
    //     minimum_rating: INT(0-9),
    //     order_by: 'asc' || 'desc',
    //     quality: '3D' || '720p' || '1080p',
    //     sort_by: 'date_added' || 'download_count' || 'peers' || 'rating' || 'seeds' || 'title' || 'year'
    // };

    /* --- FUNCTIONS --- */

    $scope.initialize = function () {

        var filters = localStorageService.get('filters');

        // TODO: Link default values to form inputs
        $scope.filters = !!filters ? { genre: null, minimum_rating: 0, order_by: null, quality: null, sort_by: null } : filters;

    };

    $scope.clearFilters = function () {

        localStorageService.remove('filters');

        utilityService.notify(1, 'Filters were cleared.');

        $rootScope.changeState('movie.browse');

    };

    // TODO: Don't save null filters
    $scope.saveFilters = function () {

        if (localStorageService.set('filters', $scope.filters)) {

            utilityService.notify(1, 'Filters were saved.');

            $rootScope.changeState('movie.browse');

        } else {

            utilityService.notify(-1, 'Couldn\'t save filters.')

        }

    };

    /* --- RUN --- */

    $scope.initialize();

    // TODO: Remove this
    localStorageService.set('filters', { genre: 'sci-fi', minimum_rating: 8 });

}]);