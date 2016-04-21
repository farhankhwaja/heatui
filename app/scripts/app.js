'use strict';

/**
 * @ngdoc overview
 * @name heatApp
 * @description
 * # heatApp
 *
 * Main module of the application.
 */
angular
  .module('heatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'firebase',
    'ngMaterial',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'NewReq'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/index.html',
        controller: ''
      });
  })
  .run(function($rootScope, $state, UserService) {
      $rootScope.$on('$stateChangeStart', function() {
        var loggedInUser = UserService.getLoggedInUser();
        if(loggedInUser) {
          $rootScope.loggedInUserData = UserService.getUserData(loggedInUser.uid);
        }
      });
    });
