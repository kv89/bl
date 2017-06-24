'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'myApp.filters', 'myApp.services', 'myApp.directives', 'textAngular']).
 	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	    $routeProvider
	    	.when('/home', 
	    		{
	    			templateUrl: 'partials/home', 
	    			controller: 'MyCtrl1'
	    		})
	    	.when('/view2', 
	    		{
	    			templateUrl: 'partials/partial2', 
	    			controller: 'MyCtrl2'
	    		})
	    	.when('/blog', 
	    		{
	    			templateUrl: 'partials/blog', 
	    			controller: 'BlogCtrl'
	    		})
	    	.when('/createBlog', 
	    		{
	    			templateUrl: 'partials/create-blog', 
	    			controller: 'CreateBlogCtrl'
	    		})
	    	.otherwise({redirectTo: '/home'});

	    $locationProvider.html5Mode(true);

  }]);