(function() {
angular.module('ds').controller('JoinCtrl', function($scope, $q, $firebase) {
	var ref = new Firebase("https://dijkstras-harmony.firebaseio.com/rooms");
	var sync = $firebase(ref);
	var rooms = sync.$asArray();
	
	$scope.joinRoomByCode = function(code, newName) {
		for(var i = 0; i < rooms.length; i++) {
			if(rooms[i].code == code) {
				// Add ourself to the correct room.
			}
		}
	}	
})
})();