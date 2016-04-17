'use strict';

angular.module('200mins-web').service('utilityService', ['$mdToast', function ($mdToast) {

    this.notify = function (severity, message) {

        $mdToast.showSimple(message);

    };

}]);