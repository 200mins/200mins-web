'use strict';

angular.module('200mins-web').constant('ENDPOINTS', {

    // activityService

    download: 'activity/download',
    stream: 'activity/stream',
    like: 'activity/like',
    unlike: 'activity/unlike',
    markWatch: 'activity/markwatch',
    unmarkWatch: 'activity/unmarkwatch',
    markWatched: 'activity/markwatched',
    unmarkWatched: 'activity/unmarkwatched',

    // movieService

    getStatus: 'movie/status',
    listMovies: 'proxy/listmovies',
    movieDetails: 'proxy/moviedetails',
    movieSuggestions: 'proxy/moviesuggestions',

    // userService

    login: 'user/login',
    register: 'user/register'

});