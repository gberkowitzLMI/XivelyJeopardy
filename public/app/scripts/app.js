'use strict';

/**
 * @ngdoc overview
 * @name jeopardyApp
 * @description
 * # jeopardyApp
 *
 * Main module of the application.
 */
angular
  .module('Jeopardy', [
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/main.html',
        controller: 'Main'
      })
      .when('/admin', {
        templateUrl: '/app/views/admin.html',
        controller: 'Admin'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
