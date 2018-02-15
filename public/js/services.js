'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services', [])
	.service('loginService', function($http){
		var _this = this;
		this.serviceFunction = function(){
			console.log('inside service .. ');
		}

		this.checkLoggedIn = function(){
			this.isLoggedIn = true;
			return this.isLoggedIn;
		}

		this.doLogin = function(email, password, cb){
			$http({
			  method: 'POST',
			  url: '/api/user/signin',
			  data: {
			  	email: btoa(email),
			  	password: btoa(password)
			  }
			}).then(function(data, status, headers, config) {
		    	// $location.path( "/createBlog" );
		    	// console.log(' ->> ', data);
		    	_this.isLoggedIn = data;
		    	cb(null, _this.isLoggedIn);
		    	// $rootScope.isLoggedIn = data;
		  	}, function(data, status, headers, config) {
		  		console.log(' err ->> ', data);
		    	_this.isLoggedIn = false;
		    	cb(data, _this.isLoggedIn);
		  	});	
		}


		
	});