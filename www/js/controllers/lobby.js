(function() {

  
angular.module('ds').controller('LobbyCtrl', function($scope, $rootScope, debounce, Auth, API, Playback, Game) {
  $scope.username = Auth.getUsername();

  Game.getStartArtist();
  Game.getEndArtist();

  $scope.artistNames = []; 
  $scope.isStart = false; 


  

    $scope.players = [{name: 'gustav'}];


  $rootScope.$on('login', function() {
    $scope.username = Auth.getUsername();
  });

  $scope.getArtistNames = function(artistName, isStart) {
    $scope.isStart = isStart;
    
    if(artistName.length === 0) return $scope.artistNames = [];

    API.getArtistNames(artistName).then(function(result){
      $scope.artistNames = result.artists.items; 
    });
  };

  $scope.selectArtist = function(artistObject, isStart) {
    $scope.isStart = isStart;

    if (isStart) {
      Game.setStartArtist(artistObject);
      $scope.start = artistObject.name;
    } else {
      Game.setEndArtist(artistObject);
      $scope.end = artistObject.name;
    }

    console.log(artistObject);
    $scope.artistNames = [];
    

  };  
  
  $scope.startGame = function() {
    Game.startGame();
  }

  $scope.logout = function() {
    Auth.logout();
  }

  $scope.checkAmountOfPlayers = function() {
    return $scope.players.length < 1;
  }


});



})();