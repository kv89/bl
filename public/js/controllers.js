'use strict';

/* Controllers */


myApp.controller('AppCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	// console.log($http);
	// $http({method: 'GET', url: '/api/name'}).
	// success(function(data, status, headers, config) {
 //    	$scope.name = data.name;
 //  	}).
 //  	error(function(data, status, headers, config) {
 //    	$scope.name = 'Error!'
 //  	});

  	$http({
	  method: 'GET',
	  url: '/api/name'
	}).then(function(data, status, headers, config) {
    	$scope.name = data.name;
    	$rootScope.isLoggedIn = false;
  	}, function(data, status, headers, config) {
    	$scope.name = 'Error!'
  	});
}]);

myApp.controller('MyCtrl1', ['$rootScope','$scope', '$http', function($rootScope, $scope, http) {
	$rootScope.isLoggedIn = false;
}]);

myApp.controller('MyCtrl2', ['$scope', '$http', function($scope, http) {

}]);

myApp.controller('BlogCtrl', ['$scope', '$http', function($scope, $http) {
	
	$http({
		method: 'GET',
		url: '/api/blog/getAllBlogs'
	}).then(function(data, status, headers, config) {
		console.log('--< success > ');
    	$scope.blogs = data.data;
  	}, function(data, status, headers, config) {
  		console.log('--< error > ', data);
    	$scope.blogs = [];
  	});
}]);

myApp.controller('CreateBlogCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope,$scope, $http, $location) {
	$scope.user = {};
	$scope.blog = {};
	$scope.signin = function (){
		// console.log(' sign req for : ', $scope.user);
		$http({
		  method: 'POST',
		  url: '/api/user/signin',
		  data: {
		  	email: btoa($scope.user.email),
		  	password: btoa($scope.user.password)
		  }
		}).then(function(data, status, headers, config) {
	    	// $location.path( "/createBlog" );
	    	// console.log(' ->> ', data);
	    	$scope.isLoggedIn = data;
	    	$rootScope.isLoggedIn = data;
	  	}, function(data, status, headers, config) {
	  		console.log(' err ->> ', data);
	    	$scope.isLoggedIn = false;
	  	});
	}

	$scope.save = function(){
		console.log(' ---- > ', $scope.htmlcontent);
		$http({
		  method: 'POST',
		  url: '/api/blog/creatBlog',
		  data: {
		  	htmlData: $scope.blog.htmlcontent,
		  	header: $scope.blog.header
		  }
		}).then(function(data, status, headers, config) {
	    	$location.path( "/blog" );
	  	}, function(data, status, headers, config) {
	    	$scope.name = 'Error!'
	  	});
	}
}]);
