'use strict';

angular.module('200mins-web').service('utilityService', ['$mdToast', function ($mdToast) {

    this.mergeObjects = function (obj1, obj2, overwrite) {
        
        for (var key in obj2) {

            overwrite ? obj1[key] = obj2[key] : obj1.hasOwnProperty(key) ? null : obj1[key] = obj2[key];

        }

        return obj1;

    };

    this.notify = function (mode, message) {

        $mdToast.showSimple(message);

    };

}]);