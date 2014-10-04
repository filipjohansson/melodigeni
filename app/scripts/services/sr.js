'use strict';

/**
 * @ngdoc service
 * @name melodigeniAppApp.sr
 * @description
 * # sr
 * Service in the melodigeniAppApp.
 */
angular.module('melodigeniAppApp')
    .service('sr', function sr($q, $http) {
        function callSR(url) {
            var d = $q.defer();

            var result = '';

            if (url.indexOf('?') > -1) { // There is already arguments
                url = url + '&format=json&callback=JSON_CALLBACK&pagination=false';
            } else { // There is no arguments
                url = url + '?format=json&callback=JSON_CALLBACK&pagination=false';
            }

            $http.jsonp(url).success(function(r) {
                result = r;
                // console.info(r);
                d.resolve(r);
            });

            return d.promise;
        }

        return {
            getChannels: function() {
                var d = $q.defer();

                callSR('http://api.sr.se/api/v2/channels').then(function(r) {
                    d.resolve(r);
                });

                return d.promise;
            },
            getCurrentlyPlaying: function(id) {
                var d = $q.defer();

                callSR('http://api.sr.se/api/v2/playlists/rightnow?channelid=' + id).then(function(r) {
                    d.resolve(r);
                });

                return d.promise;
            }
        };
});
