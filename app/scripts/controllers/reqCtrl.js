'use strict';

/**
 * @ngdoc function
 * @name heatApp.controller:reqCtrl
 * @description
 * # reqCtrl
 * New Request Controller of the heatApp
 */
angular.module('heatApp')
  .controller('NewReq', function ($rootScope, md5, VisitorService, $scope, Auth, $state) {
	$scope.md5 = md5;
	$scope.newVisitor = VisitorService.newVisitor($scope.userID);
	var syncData = VisitorService.readData($scope.userID);
	syncData.$bindTo($scope, 'data');

	$scope.addReq = function(){
		if($scope.visitorNumber){
			$scope.data = {
				date: Firebase.ServerValue.TIMESTAMP,
				text: $scope.visitorNumber,
				user: {
					username: $rootScope.loggedInUserData.username,
					email: $rootScope.loggedInUserData.email
				},
				copounsGenerated: 'none'
			};
			$scope.newVisitor.$add($scope.data);
			$scope.visitorNumber = '';
		}
	};

	$scope.init = function(){
		$scope.authData = Auth.$getAuth();
		
		if($scope.authData === null){
			$state.go('login', {}, {reload:true});
		}else{
			$scope.userID = $scope.authData.uid;
		}
	};

	$scope.logout = function(){
		Auth.$unauth();
		$state.go('login');
	};
	$scope.init();
  });