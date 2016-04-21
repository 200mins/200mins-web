'use strict';

angular.module('200mins-web').constant('ENDPOINTS', {

    // activityService

    download: 'activity/download',
    like: 'activity/like',
    unlike: 'activity/unlike',
    markWatch: 'activity/markwatch',
    unmarkWatch: 'activity/unmarkwatch',
    markWatched: 'activity/markwatched',
    unmarkWatched: 'activity/unmarkwatched',

    // collectionService

    createCollection: 'collection/create',
    deleteCollection: 'collection/delete',
    updateCollection: 'collection/update',

    // franchiseService

    createFranchise: 'franchise/create',
    deleteFranchise: 'franchise/delete',
    updateFranchise: 'franchise/update',

    // movieService

    listMovies: 'proxy/listmovies',
    movieDetails: 'proxy/moviedetails',
    movieSuggestions: 'proxy/moviesuggestions',

    // reviewService

    createReview: 'review/create',
    deleteReview: 'review/delete',
    updateReview: 'review/update',

    // userService

    login: 'user/login',
    register: 'user/register'

});