'use strict';

/**
 * @ngdoc function
 * @name heatApp.controller:authController
 * @description
 * # authController
 * Auth Controller of the heatApp
 */
angular.module('heatApp')
  .controller('LoginCtrl', function (Auth, UserService, $state, $scope, $rootScope) {
    $scope.email = '';
    $scope.password = '';
    $scope.message = null;

	$scope.logout = function(){
		Auth.$unauth();
		$state.go('login');
	};

	$scope.login =  function() {

		Auth.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		}).then(function(data) {
			$scope.email = null;
			$scope.password = null;
			$state.go('home');
		}).catch(function(error) {
			$scope.message = 'there was an error! ' + error;
		});
	};
  });
