'use strict';

angular.module('200mins-web').service('utilityService', ['$mdToast', function ($mdToast) {

        this.cleanMovie = function (movie) {

            var cleanedMovie = {};

            var cleanedMovieKeys = {
                id: true,
                imdb_code: true,
                title: true,
                year: true,
                rating: true,
                runtime: true,
                genres: true,
                medium_cover_image: true
            };

            for (var key in cleanedMovieKeys) {

                if (movie.hasOwnProperty(key)) {

                    cleanedMovie[key] = movie[key];

                } else {

                    return false;

                }

            }

            return cleanedMovie;

        };

        this.isObjectEmpty = function (obj) {

            for (var key in obj) {

                return false;

            }

            return true;

        };

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