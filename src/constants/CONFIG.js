'use strict';

angular.module('200mins-web').constant('CONFIG', {

    DEV: {
        base: '/200mins/200mins-web/src/index.html',
        domain: 'http://localhost',
        port: 1339
    },

    PROD: {
        base: '/',
        domain: 'http://api.200mins.com',
        port: 80
    }

});