'use strict';

angular.module('heatApp')
	.factory('VisitorService', function ($firebaseArray, $firebaseObject) {
		function newVisitor (id){
			var ref = new Firebase('https://heatui.firebaseio.com/newreq/'+id);
			return $firebaseArray(ref);
		}

		function readData (id){
			var ref = new Firebase('https://heatui.firebaseio.com/newreq/'+id);
			return $firebaseObject(ref);
		}

		return {
			newVisitor: newVisitor,
			readData: readData
		}
  });
