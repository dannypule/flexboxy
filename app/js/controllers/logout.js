skillApp.controller('LogoutController', ['Authentication', function(Authentication){
	Authentication.logout();
}]);