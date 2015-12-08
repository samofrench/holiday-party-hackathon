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
		},
 		decodeJwt: function (token) {
		    var segments = token.split('.');

		    if (segments.length !== 3) {
		      throw new Error('Not enough or too many segments');
		    }

		    // All segment should be base64
		    var headerSeg = segments[0];
		    var payloadSeg = segments[1];
		    var signatureSeg = segments[2];

		    // base64 decode and parse JSON
		    var header = JSON.parse(base64urlDecode(headerSeg));
		    var payload = JSON.parse(base64urlDecode(payloadSeg));

		    return {
		      header: header,
		      payload: payload,
		      signature: signatureSeg
		    }

			function base64urlDecode(str) {
			  return new Buffer(base64urlUnescape(str), 'base64').toString();
			};

			function base64urlUnescape(str) {
			  str += Array(5 - str.length % 4).join('=');
			  return str.replace(/\-/g, '+').replace(/_/g, '/');
			}
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