'use strict';

angular.module('200mins-web').controller('FiltersCtrl', ['$rootScope', '$scope', 'localStorageService', 'utilityService', function ($rootScope, $scope, localStorageService, utilityService) {

        /* --- MODELS --- */

        // $scope.filter = {
        //     genre,
        //     minimum_rating,
        //     quality
        // };

        $scope.genres = [
            {name: 'Action', value: 'action'},
            {name: 'Adventure', value: 'adventure'},
            {name: 'Animation', value: 'animation'},
            {name: 'Biography', value: 'biography'},
            {name: 'Comedy', value: 'comedy'},
            {name: 'Crime', value: 'crime'},
            {name: 'Documentary', value: 'documentary'},
            {name: 'Drama', value: 'drama'},
            {name: 'Family', value: 'family'},
            {name: 'Fantasy', value: 'fantasy'},
            {name: 'Film-Noir', value: 'film-noir'},
            {name: 'History', value: 'history'},
            {name: 'Horror', value: 'horror'},
            {name: 'Music', value: 'music'},
            {name: 'Musical', value: 'musical'},
            {name: 'Mystery', value: 'mystery'},
            {name: 'Romance', value: 'romance'},
            {name: 'Sci-Fi', value: 'sci-fi'},
            {name: 'Sport', value: 'sport'},
            {name: 'Thriller', value: 'thriller'},
            {name: 'War', value: 'war'},
            {name: 'Western', value: 'western'}
        ];

        $scope.videoQualities = [
            {name: '3D', value: '3D'},
            {name: '720p', value: '720p'},
            {name: '1080p', value: '1080p'}
        ];

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.filters = {genre: 'all', minimum_rating: 0, quality: 'all'};

            var filters = localStorageService.get('filters');

            if (filters !== null) {

                $scope.filters = utilityService.mergeObjects($scope.filters, filters, true);

            }

        };

        $scope.clearFilters = function () {

            localStorageService.remove('filters');

            utilityService.notify('Filters were cleared.');

            $rootScope.changeState('movies');

        };

        $scope.saveFilters = function () {

            var filters = {};

            angular.forEach($scope.filters, function (value, key) {

                if (value !== 'all' && value !== 0) {

                    filters[key] = value;

                }

            });

            if (utilityService.isObjectEmpty(filters)) {

                localStorageService.remove('filters');

                utilityService.notify('Filters were saved.');

                $rootScope.changeState('movies');

            } else {

                if (localStorageService.set('filters', filters)) {

                    utilityService.notify('Filters were saved.');

                    $rootScope.changeState('movies');

                } else {

                    utilityService.notify('Couldn\'t save filters.');

                }

            }


        };

        /* --- RUN --- */

        $scope.initialize();

    }]);