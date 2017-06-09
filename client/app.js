var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider)
{
	$routeProvider.when('/', 
	{
		controller:'MembersController',
		templateUrl: 'views/members.html'
	})
	.when('/members',
	{
		controller:'MembersController',
		templateUrl: 'views/members.html'
	})
	.when('/members/details/:id', 
	{
		controller:'MembersController',
		templateUrl:'views/member_details.html'
	})
	.when('/members/add', 
	{
		controller:'MembersController',
		templateUrl:'views/add_member.html'
	})
	.when('/members/edit/:id', 
	{
		controller:'MembersController',
		templateUrl:'views/edit_member.html'
	})
	.otherwise(
	{
		redirectTo:'/'
	}
	);

});
