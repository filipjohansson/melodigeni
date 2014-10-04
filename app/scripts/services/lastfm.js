'use strict';

/**
 * @ngdoc service
 * @name melodigeniAppApp.lastfm
 * @description
 * # lastfm
 * Service in the melodigeniAppApp.
 */
angular.module('melodigeniAppApp')
    .service('lastfm', function lastfm($q, $http) {
        // Please be nice to my API key
        var key ='b3786a8ea8b3e571d0c6415b8b723c49';

        function callLastFM(url) {
            var d = $q.defer();

            var result = '';

            if (url.indexOf('?') > -1) { // There is already arguments
                url = url + '&api_key=' + key + '&format=json&callback=JSON_CALLBACK';
            } else { // There is no arguments
                url = url + '?api_key=' + key + '&format=json&callback=JSON_CALLBACK';
            }

            $http.jsonp(url).success(function(r) {
                result = r;
                // console.info(r);
                d.resolve(r);
            });

            return d.promise;
        }

        return {
            getArtistInfo: function(artist) {
                var d = $q.defer();

                callLastFM('http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=' + artist).then(function(r) {
                    d.resolve(r);
                });

                return d.promise;
            }
        };
});
