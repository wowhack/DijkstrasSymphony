(function() {

  
angular.module('ds').controller('wonCtrl', function($scope, $rootScope, Game, $firebase, Auth) {
	 var baseUrl = "https://dijkstras-harmony.firebaseio.com/";
  var ref = new Firebase(baseUrl);
  var rooms = ref.child("rooms");
  var username = Auth.getUsername();

	$scope.startArtist = Game.getStartArtist();
	$scope.endArtist = Game.getEndArtist();
	$scope.steps = Game.getSteps();

    rooms.child(userName).child("players").child(username).update({
      status: "completed"
    });
})



})();