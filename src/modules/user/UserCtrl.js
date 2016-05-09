'use strict';

angular.module('200mins-web').controller('UserCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'userService', 'utilityService', function ($rootScope, $scope, $state, $stateParams, userService, utilityService) {

        /* --- MODELS --- */

        // $scope.tabs;
        // $scope.user;

        /* --- FUNCTIONS --- */

        $scope.initialize = function () {

            $scope.tabs = [
                {
                    label: 'Statistics',
                    icon: 'img/ic_show_chart_black_24px.svg',
                    state: 'user.statistics'
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

            $scope.user = {username : $stateParams.username};

            $scope.updateActiveTab();

            $scope.getUser();

        };

        $scope.changeTab = function (i) {

            $rootScope.changeState($scope.tabs[i].state, {username: $scope.user.username});

        };

        $scope.getUser = function () {

            userService.getUser($scope.user.username).then(function (response) {

                if (!response) {

                    utilityService.notify('Service is down.');

                } else {

                    switch (response.status) {

                        case 200:

                            $scope.user = response.data;

                            break;

                        default:

                            utilityService.notify('Service is down.');

                    }

                }

            });

        };

        $scope.updateActiveTab = function () {

            $scope.tabs.forEach(function (tab, i) {
                if (tab.state === $state.current.name) {
                    $scope.activeTab = i;
                }
            });

        };

        /* --- RUN --- */

        $scope.initialize();

    }]);