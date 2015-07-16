skillApp.controller('RegistrationController', ['$scope', '$location', 'Authentication', '$firebaseObject', 'FIREBASE_URL', function($scope, $location, Authentication, $firebaseObject, FIREBASE_URL){

		$scope.login = function() {
			Authentication.login($scope.user)
			.then(function(user){
				$location.path('/profile');		
			}).catch(function(error){
				$scope.message = error.message;
			});
		}; // login

		$scope.register = function() {
			Authentication.register($scope.user)
				.then(function(user){
					Authentication.login($scope.user);
					$location.path('/profile');
				}).catch(function(error){
					$scope.message = error.message;
				});
		}; // register

		// $scope.logout = function() {
		// 	console.log("hi");
		// }; // logout

		var ref = new Firebase(FIREBASE_URL + '/countries');

		$scope.countries = $firebaseObject(ref);
	
}]);