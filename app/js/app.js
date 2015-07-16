var skillApp = angular.module('skillApp', ['ngRoute', 'firebase'])
.constant('FIREBASE_URL', 'https://skillswap.firebaseio.com');

// var appControllers = angular.module('appControllers', 
// 	['firebase']);

skillApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl: '/views/home.html'
		}).
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/logout', {
			templateUrl: 'views/logout.html',
			controller: 'LogoutController'
		}).
		when('/swap', {
			templateUrl: 'views/swap.html',
			controller: 'RegistrationController'
		}).
		when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'
		}).
		when('/404', {
			templateUrl: 'views/404.html'
		}).
		otherwise({
			redirectTo: '/404'
		});
}]);