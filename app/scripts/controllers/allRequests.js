'use strict';

/**
 * @ngdoc function
 * @name heatApp.controller:reqCtrl
 * @description
 * # reqCtrl
 * New Request Controller of the heatApp
 */
angular.module('heatApp')
  .controller('AllRequests', function ($rootScope, VisitorService, $scope, Auth, $state, $location) {
  	$scope.allData = {};

	var init = function(){
		$scope.authData = Auth.$getAuth();
		
		if($scope.authData === null){
			$state.go('login', {}, {reload:true});
		}else{
			$scope.userID = $scope.authData.uid;
		}
		var syncData = VisitorService.readData();
		syncData.$bindTo($scope, 'allData');
	};

	$scope.parJson = function (json) {
		return JSON.parse(json);
    };

	$scope.logout = function(){
		Auth.$unauth();
		$location.path('/login')
	};

	$scope.openModal = function(request){
		if(!request.showModal){
			$scope.modalContent = request;
			$scope.genCoupons = JSON.parse(request.copounsGenerated);
			request.showModal = true;	
			$scope.showModal = true;	
		}else{
			$scope.showModal = false;	
			request.showModal = false;
			$scope.modalContent = null;
			$scope.genCoupons = null;
		}
		
	};	

	$scope.$watch('allData', function(newValue, oldValue){
		if(newValue !== oldValue){
			// console.log('Got it', newValue);
			delete newValue.$id;
			delete newValue.$priority;
			$scope.requests = newValue;
			var maxValue = 0;
			for(var i in $scope.requests){
				if($scope.requests[i].date > maxValue && $scope.requests[i].status !== 'ready'){
					maxValue = $scope.requests[i].date;
					$scope.maxId = i;
				}
				$scope.requests[i].showModal = false;
			}
			$scope.latestReq = $scope.requests[$scope.maxId];

			if($scope.latestReq)
				$scope.coupons = $scope.parJson($scope.latestReq.copounsGenerated);
		}
	});

	init();
  });