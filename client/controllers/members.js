var myApp = angular.module('myApp');

myApp.controller('MembersController', ['$scope', '$http', '$location', '$routeParams',
	function($scope,$http,$location,$routeParams)
	{
		//function - retrieves member info in response  object as json format
		// access data portion and using @$scope.members
		$scope.getMembers = function()
		{
			$http.get('/api/members').then(function(response)
			{
				$scope.members = response.data;
				
			});
		}


		$scope.getMember = function()
		{
			//function lists member info by _id
			$http.get('/api/members/'+$routeParams.id).then(function(response)
			{
				$scope.member = response.data;
				
			});
		}

		$scope.addMember = function()
		{
			//http post protocol to add member
			// afer addition complete, redirect to list of members page
			$http.post('/api/members', $scope.member).then(function(response)
			{
				window.location.href ='#!/members';
				
			});
		}

		$scope.updateMember = function()
		{
			//http put protocol to update member info
			//after update, redirect to list of members page
			var id = $routeParams.id;
			$http.put('/api/members/'+id, $scope.member).then(function(response)
			{
				window.location.href ='#!/members';
				
			});
		}

		$scope.removeMember = function(id)
		{
			//http delete protocol to remove member of list
			$http.delete('/api/members/'+id).then(function(response)
			{
				window.location.href ='#!/members';
				
			});
		}


	}]);