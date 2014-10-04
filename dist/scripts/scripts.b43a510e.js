"use strict";angular.module("melodigeniAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/fragor",{templateUrl:"views/fragor.html",controller:"FragorCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("melodigeniAppApp").controller("MainCtrl",["$scope","$location","$sce","sr","lastfm",function(a,b,c,d,e){function f(a){for(var b,c,d=a.length;0!==d;)c=Math.floor(Math.random()*d),d-=1,b=a[d],a[d]=a[c],a[c]=b;return a}function g(){0==j?e.getArtistInfo(a.currentlyPlaying.artist).then(function(a){console.log("Artist info: ",a),i("artistName",a)}):1==j?e.getArtistInfo(a.currentlyPlaying.artist).then(function(a){console.log("Artist info: ",a),i("yearFormed",a)}):2==j?e.getArtistInfo(a.currentlyPlaying.artist).then(function(a){console.log("Artist info: ",a),i("artistImage",a)}):3==j&&e.getArtistInfo(a.currentlyPlaying.artist).then(function(b){console.log("Artist info: ",b),a.artistResult=b}),j++}function h(a,b){b=parseInt(b);var c=Math.floor(10*Math.random()-5),d=parseInt(b+c),e=parseInt((new Date).getFullYear());if(console.log("====="),console.log("originalYear",b),console.log("tempNumber",c),console.log("tempYear",d),console.log("year",e),console.log("answers",a),(d>e||d==b||0==c)&&getCheckNumber(a,b),"undefined"!=typeof a&&a.length>0)for(var f=0;f<a.length;f++)parseInt(a[f].text)==d&&getCheckNumber(a,b);return d}function i(b,c){if("artistName"===b){console.log("Trying to create a question with artist names.");var d=new Array;d.push({text:c.artist.name,correct:!0});for(var e=0;2>=e;e++)d.push({text:c.artist.similar.artist[e].name,correct:!1});console.log("answers",d),console.log("Suffled answers",f(d)),a.question={question:"Vad heter artisten?",answers:f(d)}}else if("yearFormed"===b){console.log("Year formed",c.artist.bio.yearformed),"undefined"==typeof c.artist.bio.yearformed&&g();var d=new Array;d.push({text:c.artist.bio.yearformed,correct:!0});for(var e=0;2>=e;e++)d.push({text:h(d,c.artist.bio.yearformed),correct:!1});a.question={question:"Vilket år började "+a.currentlyPlaying.artist+"?",answers:f(d)}}else if("artistImage"===b){console.log("Trying to create a question with artist images.");var d=new Array;d.push({image:c.artist.image[4]["#text"],correct:!0});for(var e=0;2>=e;e++)d.push({image:c.artist.similar.artist[e].image[4]["#text"],correct:!1});console.log("answers",d),console.log("Suffled answers",f(d)),a.question={question:"Hur ser "+a.currentlyPlaying.artist+" ut?",answers:f(d)}}}var j=0;d.getChannels().then(function(b){a.channels=b}),a.selectChannel=function(b){a.currentChannel=b,d.getCurrentlyPlaying(b.id).then(function(b){console.log("Currently:",b.playlist.song),a.currentlyPlaying={},a.currentlyPlaying.artist=b.playlist.song.artist,a.currentlyPlaying.title=b.playlist.song.title,g()})},a.checkAnswer=function(b){b.correct?(console.info("Rätt svar!"),g()):console.info("Fel svar!"),a.question.answers[a.question.answers.indexOf(b)].selected=!0},a.renderHtml=function(a){return c.trustAsHtml(a)},a.reloadPage=function(){window.location.reload()}}]),angular.module("melodigeniAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("melodigeniAppApp").service("sr",["$q","$http",function(a,b){function c(c){var d=a.defer(),e="";return c+=c.indexOf("?")>-1?"&format=json&callback=JSON_CALLBACK&pagination=false":"?format=json&callback=JSON_CALLBACK&pagination=false",b.jsonp(c).success(function(a){e=a,console.info(a),d.resolve(a)}),d.promise}return{getChannels:function(){var b=a.defer();return c("http://api.sr.se/api/v2/channels").then(function(a){b.resolve(a)}),b.promise},getCurrentlyPlaying:function(b){var d=a.defer();return c("http://api.sr.se/api/v2/playlists/rightnow?channelid="+b).then(function(a){d.resolve(a)}),d.promise}}}]),angular.module("melodigeniAppApp").service("lastfm",["$q","$http",function(a,b){function c(c){var e=a.defer(),f="";return c=c.indexOf("?")>-1?c+"&api_key="+d+"&format=json&callback=JSON_CALLBACK":c+"?api_key="+d+"&format=json&callback=JSON_CALLBACK",b.jsonp(c).success(function(a){f=a,console.info(a),e.resolve(a)}),e.promise}var d="b3786a8ea8b3e571d0c6415b8b723c49";return{getArtistInfo:function(b){var d=a.defer();return c("http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist="+b).then(function(a){d.resolve(a)}),d.promise}}}]);