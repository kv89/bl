'use strict';

/* Controllers */


myApp.controller('AppCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
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
	$scope.liked = {};
	$http({
		method: 'GET',
		url: '/api/blog/getAllBlogs'
	}).then(function(data, status, headers, config) {
		// console.log('--< success > ');
    	$scope.blogs = data.data;
  	}, function(data, status, headers, config) {
  		// console.log('--< error > ', data);
    	$scope.blogs = [];
  	});

  	$scope.like = function( blog ){
  		if(Number.isInteger(blog.likes)){
  			blog.likes = blog.likes+1;
  		} else {
  			blog.likes = 1;
  		}
		// console.log("liking blog : ", blog._id);
		if( blog._id ) {
			$http({
				method: 'GET',
				url: 'http://ipinfo.io/json'
			}).then(function( resp ){
				// console.log(resp);
				resp.data.datetime = new Date();
				$http({
					  method: 'POST',
					  url: '/api/blog/like',
					  data: {
						  	_id: blog._id,
						  	likes: blog.likes,
						  	location: resp.data
						  }
				});
				/*.then(function(data, status, headers, config) {
			    	// console.log(" --> liked : ", data);
			  	}, function(data, status, headers, config) {
			    	// console.log(" --> like failed : ", data);

			  	});*/
		   	});
		}
	}
}]);

myApp.controller('CreateBlogCtrl', ['$rootScope', '$scope', '$routeParams','$http', '$location', '$window', '$anchorScroll',
				 'loginService',
							function($rootScope, $scope, $routeParams, $http, $location, $window, $anchorScroll, loginService) {
	$scope.user = {};
	$scope.blog = {};
	console.log('to edit : ', $routeParams.id);
	console.log('is logged in : ', loginService.isLoggedIn);
	$scope.isLoggedIn = loginService.isLoggedIn|| false;
	$scope.signin = function (){
		$scope.isLoggedIn = loginService.isLoggedIn;

		loginService.doLogin($scope.user.email, $scope.user.password, function( err, resp ){
			$scope.isLoggedIn = resp;
		});

		// console.log(' sign req for : ', $scope.user);
		// $http({
		//   method: 'POST',
		//   url: '/api/user/signin',
		//   data: {
		//   	email: btoa($scope.user.email),
		//   	password: btoa($scope.user.password)
		//   }
		// }).then(function(data, status, headers, config) {
	 //    	// $location.path( "/createBlog" );
	 //    	// console.log(' ->> ', data);
	 //    	$scope.isLoggedIn = data;
	 //    	$rootScope.isLoggedIn = data;
	 //  	}, function(data, status, headers, config) {
	 //  		console.log(' err ->> ', data);
	 //    	$scope.isLoggedIn = false;
	 //  	});
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

	
	$scope.previewBlog = function(){
		// $scope.isPreview = true;
		// $scope.b = $scope.blog;

		$location.hash('preview');
		setTimeout(function(){
			$anchorScroll();
		}, 0);
    };
	

}]);

myApp.controller('AdminCtrl', ['$rootScope', '$scope', '$http', '$location', '$window', '$anchorScroll','loginService',
							function($rootScope, $scope, $http, $location, $window, $anchorScroll, loginService) {
	$scope.page = 'admin';
	$scope.user = {};
	// loginService.serviceFunction();
	// $http({
	// 	method: 'GET',
	// 	url: '/api/blog/getAllBlogs'
	// }).then(function(data, status, headers, config) {
	// 	// console.log('--< success > ');
 //    	$scope.blogs = data.data;
 //  	}, function(data, status, headers, config) {
 //  		// console.log('--< error > ', data);
 //    	$scope.blogs = [];
 //  	});

  	$scope.isLoggedIn = loginService.isLoggedIn; //checkLoggedIn();
  	$scope.signin = function (){

		loginService.doLogin($scope.user.email, $scope.user.password, 
			function( err, resp ){
				$scope.isLoggedIn = resp;				
				$http({
					method: 'GET',
					url: '/api/blog/getAllBlogs'
				}).then(function(data, status, headers, config) {
					// console.log('--< success > ');
			    	$scope.blogs = data.data;
			    	// console.log(Object.keys(data.data[0]))

			  	}, function(data, status, headers, config) {
			  		// console.log('--< error > ', data);
			    	$scope.blogs = [];
			  	});

			});
	}

  	console.log('isLoggedIn : ', $scope.isLoggedIn);

  	$scope.deleteBlog = function(blogId){
  		console.log('deleting blog..', blogId);
  		$http({
  			method: 'POST',
  			url: '/api/blog/delete',
  			data:{
  				_id: blogId
  			}
  		}).then(function(data, status, headers, config){
  			console.log('delete success - ', data, status, headers, config);
  		}, 
  		function(data, status, headers, config){
  			console.log('err - ', data);
  		});
  	}
}]);