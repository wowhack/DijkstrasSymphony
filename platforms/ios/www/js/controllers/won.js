(function() {

  
angular.module('ds').controller('wonCtrl', function($scope, $rootScope, Game) {
	$scope.startArtist = Game.getStartArtist();
	$scope.endArtist = Game.getEndArtist();
	$scope.steps = Game.getSteps();
})



})();