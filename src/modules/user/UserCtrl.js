'use strict';

angular.module('200mins-web').controller('UserCtrl', ['$rootScope', '$scope', '$state', '$stateParams', function ($rootScope, $scope, $state, $stateParams) {

    /* --- MODELS --- */

    // $scope.tabs;
    // $scope.user;

    /* --- FUNCTIONS --- */

    $scope.initialize = function () {

        $scope.tabs = [
            {
                label: 'Activity',
                icon: 'img/ic_pets_black_24px.svg',
                state: 'user.activity'
            },
            {
                label: 'Downloads',
                icon: 'img/ic_cloud_download_black_24px.svg',
                state: 'user.downloads'
            },
            {
                label: 'Likes',
                icon: 'img/ic_favorite_black_24px.svg',
                state: 'user.likes'
            },
            {
                label: 'Watched',
                icon: 'img/ic_visibility_black_24px.svg',
                state: 'user.watched'
            },
            {
                label: 'Watch Later',
                icon: 'img/ic_watch_later_black_24px.svg',
                state: 'user.watch-later'
            },
            {
                label: 'Plays',
                icon: 'img/ic_play_arrow_black_24px.svg',
                state: 'user.plays'
            }
        ];

        $scope.tabs.forEach(function(tab, i){
            if(tab.state === $state.current.name){
                $scope.activeTab = i;
            }
        });

        $scope.username = $stateParams.username;

    };

    $scope.changeTab = function (i) {

        $rootScope.changeState($scope.tabs[i].state, { username: $rootScope.user.username });

    };

    /* --- RUN --- */

    $scope.initialize();

}]);