'use strict';

angular.module('200mins-web').constant('CONFIG', {

    DEV: {
        domain: 'http://localhost',
        port: 1337
    },

    PROD: {
        domain: 'http://200mins.com',
        port: 80
    }

});