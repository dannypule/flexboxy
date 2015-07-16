skillApp.factory('Authentication', ['$firebaseArray', '$firebaseObject', '$rootScope', '$firebaseAuth', '$routeParams', '$location', 'FIREBASE_URL', '$location', function($firebaseArray, $firebaseObject, $rootScope, $firebaseAuth, $routeParams, $location, FIREBASE_URL, $location){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
	  if (authUser) {
	  	var id = auth.$getAuth().uid.replace("simplelogin:", "");
	    var ref = new Firebase(FIREBASE_URL + '/users/' + id);
	    var user = $firebaseObject(ref);
	    $rootScope.currentUser = '';
	    $rootScope.currentUser = user;
	    $rootScope.id = id;
	    // var authenticatedId = auth.$getAuth().uid.replace("simplelogin:", "");

	  } else {
	    $rootScope.currentUser = '';
	    // var authenticatedId = null;
	  }
	});

	var authData =  auth.$getAuth();
	// console.log(authData);

	// temp object
	var myObject = {
		// authenticatedId: authenticatedId,

			// auth.$getAuth(function(authUser) {
			//   if (authUser) {
			//   	var id = authUser.uid.replace("simplelogin:", "");
			//     var ref = new Firebase(FIREBASE_URL + '/users/' + id);
			//     var user = $firebaseObject(ref);
			//     $rootScope.currentUser = '';
			//     $rootScope.currentUser = user;
			//     $rootScope.id = id;

			//   } else {
			//     $rootScope.currentUser = '';
			//   }
			// });



		login: function(user){
			return auth.$authWithPassword({
				email: user.email,
				password: user.password
			}); // $authWithPassword
		}, // login

		register: function (user) {
			return auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				var ref = new Firebase(FIREBASE_URL+'/users');
				// var firebaseUsers = $firebaseArray(ref);

				// removes simplelogin: from the uid
				var uid = regUser.uid.replace("simplelogin:", "");

				var userInfo = {
					date 			: Firebase.ServerValue.TIMESTAMP,
					regUser		: uid,
					firstname	: user.firstname,
					lastname	: user.lastname,
					city			: user.city,
					country		: user.country,
					image			: user.image,
					email			: user.email
				}; //userInfo

				ref.child(uid).set(userInfo); //http://stackoverflow.com/questions/28635854/set-key-on-user-register-object-with-firebase
			}); //promise
		}, //register

		logout: function(){
			ref.unauth();
			$rootScope.currentUser = '';
			$location.path('/login');
		} // logout
	}; // myObject

	return myObject;

}]); // Authentication