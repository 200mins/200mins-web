'use strict';

angular.module('200mins-web').constant('CONFIG', {

    DEV: {
        domain: 'http://localhost',
        port: 1339
    },

    PROD: {
        domain: 'http://api.200mins.com',
        port: 80
    }

});