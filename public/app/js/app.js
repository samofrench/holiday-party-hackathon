var app = angular.module('SweaterApp', ['SweaterServices', 'SweaterCtrls', 'ngRoute']);

app.config([
	'$routeProvider',
	'$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/views/sweaters.html',
			controller: 'SweaterCtrl'
		})
		.when('/new', {
			templateUrl: 'app/views/newSweater.html',
			controller: 'NewSweaterCtrl'
		})
		.when('/sweaters/:id', {
			templateUrl: 'app/views/showSweater.html',
			controller: 'ShowSweaterCtrl'
		})
		.when('/about', {
			templateUrl: 'app/views/about.html'
		})
		.when('/login', {
    		templateUrl: 'app/views/auth.html',
    		controller: 'LoginCtrl'
  		})
		.when('/signup', {
    		templateUrl: 'app/views/auth.html',
    		controller: 'SignupCtrl'
  		})
  		.when('/users/', {
  			templateUrl: 'app/views/users.html',
  			controller: 'UserCtrl'
  		})
  		.when('/users/:id', {
  			templateUrl: 'app/views/showUser.html',
  			controller: 'ShowUserCtrl'
  		})
  		.otherwise({
			templateUrl: 'app/views/error.html'
		});

		$locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(['$rootScope', 'Auth', '$route', function($rootScope, Auth, $route) {

	$rootScope.logout = function() {
    	Auth.removeToken();
	    $route.reload();
 	};

	$rootScope.isLoggedIn = function() {
    	return Auth.isLoggedIn.apply(Auth);
  	}
}]);