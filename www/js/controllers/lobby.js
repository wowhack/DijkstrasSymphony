(function() {

  
angular.module('ds').controller('LobbyCtrl', function($scope, $rootScope, debounce, Auth, API, Game, $firebase) {
  $scope.username = Auth.getUsername();

  Game.getStartArtist();
  Game.getEndArtist();

  $scope.artistNames = []; 
  $scope.isStart = false;

  var ref = new Firebase("https://dijkstras-harmony.firebaseio.com/rooms");
  var sync = $firebase(ref);
  
  $scope.rooms = sync.$asArray();
  $scope.rooms.$add({ status: "pending",
                          owner: Auth.getUsername(),
                          code: Math.floor((Math.random() * 100000) + 1),
                          players: {name: Auth.getUsername()}
                        });

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

  // TODO: Kollar inte det här rummet.
  $scope.checkAmountOfPlayers = function() {
    //return $scope.players.length < 1;
    return false;
  }


});



})();