(function() {

  
angular.module('ds').controller('LobbyCtrl', function($scope, $rootScope, Auth, Playback, Game) {
  $scope.username = Auth.getUsername();


  $scope.players = [];


  $rootScope.$on('login', function() {
    $scope.username = Auth.getUsername();
  });

  $scope.startGame = function() {
    Playback.startPlaying('spotify:track:3ZFwuJwUpIl0GeXsvF1ELf');
  }

  $scope.logout = function() {
    Auth.logout();
  }

  $scope.checkAmountOfPlayers = function() {
    return $scope.players.length < 1;
  }


});



})();