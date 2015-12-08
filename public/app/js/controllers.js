angular.module('SweaterCtrls', ['SweaterServices'])
.controller('SweaterCtrl', ['$scope', 'Sweater', function($scope, Sweater) {
	$scope.sweaters = [];

	Sweater.query(function success(data) {
		$scope.sweaters = data;
		console.log(data);
	}, function error(data) {
		console.log(data);
	});

	$scope.deleteSweater = function(id, airplaneIdx) {
		Sweater.delete({id: id}, function success(data) {
			$scope.sweaters.splice(sweaterIdx, 1);
		}, function error(data) {
			console.log(data);
		});
	}
}]).controller('ShowSweaterCtrl', [
	'$scope',
	'$routeParams',
	'Sweater',
	function($scope, $routeParams, Sweater) {
		Sweater.get({id: $routeParams.id}, function success(data) {
			$scope.sweater = data;
			console.log(data);
		}, function error(data) {
			console.log(data);
		});
}]).controller('NewSweaterCtrl', [
	'$scope',
	'$location',
	'Sweater',
	'Auth',
	function($scope, $location, Sweater, Auth) {

		Auth.getToken();

		$scope.addSweater = function() {
			var params = {
				title: $scope.title,
				material: $scope.material,
				color: $scope.color,
				pompoms: $scope.pompoms,
				img: $scope.img,
				userId: $scope.userId 
			}

			var newSweater = new Sweater(params);
			newSweater.$save();
			console.log(newSweater);
			$location.path('/');
		}
	}

]).controller('LoginCtrl', [
  '$scope', 
  '$http',
  '$location',
  'Auth',
  function($scope, $http, $location, Auth) {
    $scope.user = {
      email: '',
      password: ''
    };
    $scope.actionName = 'Login';
    $scope.userAction = function() {
      $http.post('/api/auth', $scope.user).then(function(res) {
        Auth.saveToken(res.data.token);
        $location.path('/');
      }, function(res) {
        console.log(res.data);
      });
    };
}]).controller('SignupCtrl', [
  '$scope',
  '$http',
  '$location',
  'Auth',
  function($scope, $http, $location, Auth) {
    $scope.user = {
    	name: '',
     	email: '',
      	password: ''
    };
    $scope.actionName = 'SignUp';
    $scope.userAction = function() {
      $http.post('/api/users', $scope.user).then(function (res) {
        $http.post('/api/auth', $scope.user).then(function (res) {
            Auth.saveToken(res.data.token);
          $location.path('/');
        }, function (res) {
            console.log(res.data);
        });
      }, function (res) {
          console.log(res.data);
      });
    }
}]).controller('UserCtrl', ['$scope', 'User', function($scope, User) {
	$scope.users = [];

	User.query(function success(data) {
		$scope.users = data;
			console.log(data);
		}, function error(data) {
			console.log(data);
		});

}]).controller('ShowUserCtrl', [
	'$scope',
	'$routeParams',
	'User',
	function($scope, $routeParams, User) {
		User.get({id: $routeParams.id}, function success(data) {
			$scope.user = data;
			console.log(data);
		}, function error(data) {
			console.log(data);
		});

		$scope.deleteUser = function(id, userIdx) {
			User.delete({id: id}, function success(data) {
				$scope.users.splice(userIdx, 1);
			}, function error(data) {
				console.log(data);
			});
		}

}]);