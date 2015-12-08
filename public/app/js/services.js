angular.module('SweaterServices', ['ngResource'])
.factory('Sweater', ['$resource', function($resource, Auth) {
	return $resource('http://localhost:3000/api/sweaters/:id');
}])
.factory('Auth', ['$window', function($window) {
	return {
		saveToken: function(token) {
			$window.localStorage['secretsweater-token'] = token;
		},
		getToken: function() {
			return $window.localStorage['secretsweater-token'];
		},
		removeToken: function() {
			$window.localStorage.removeItem('secretsweater-token');
		},
		isLoggedIn: function() {
			var token = this.getToken();
			return token ? true : false
		}
	};
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();

			if(token) {
				config.headers.Authorization = 'Bearer ' +token;
			}
			return config;
		}
	};
}]);