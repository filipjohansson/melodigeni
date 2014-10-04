'use strict';

/**
 * @ngdoc overview
 * @name melodigeniAppApp
 * @description
 * # melodigeniAppApp
 *
 * Main module of the application.
 */
angular
  .module('melodigeniAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/fragor', {
        templateUrl: 'views/fragor.html',
        controller: 'FragorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
