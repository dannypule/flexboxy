skillApp.controller('ProfileController', ['$firebaseArray', 'FIREBASE_URL','$rootScope', '$scope', 'Authentication', function($firebaseArray, FIREBASE_URL, $rootScope, $scope, Authentication){

	var ref = new Firebase(FIREBASE_URL + '/users/' + Authentication.authenticatedId + '/skills');
	var skills = $firebaseArray(ref);

	$scope.skills = skills;

	$scope.authenticatedId = Authentication.authenticatedId;

	$scope.addSkill = function(){
		skills.$add({
			skill 			: $scope.skill.name,
			experience	: $scope.skill.experience,
			skillLevel	: $scope.skill.skillLevel,
			levelsTaught	: $scope.skill.levelsTaught,
			comments		: $scope.skill.comments
		});
		$('#modal1').closeModal();
		$scope.skill = '';
	}; //addSkill

	$scope.beginDeleting = function(){
		$scope.deleting = true;
	}; // beginDeleting

	$scope.endDeleting = function(){
		$scope.deleting = false;
	}; // endDeleting

	$scope.deleteSkill = function(key){
		skills.$remove(key);
		$scope.deleting = false;
	}; // deleteSkill

	// console.log(user);

	$scope.openAddSkill = function(){
		$('#modal1').openModal();
	};

	$scope.closeAddSkill = function(){
		$('#modal1').closeModal();
	};


}]);