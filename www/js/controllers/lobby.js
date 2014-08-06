(function() {

angular.module('ds').controller('LobbyCtrl', function($scope, $rootScope, $ionicLoading, debounce, Auth, API, Game, $firebase) {

  $scope.username = Auth.getUsername();

  Game.getStartArtist();
  Game.getEndArtist();

  $scope.artistNames = []; 
  $scope.isStart = false;
  $scope.roomId = Game.roomId;
  var baseUrl = "https://dijkstras-harmony.firebaseio.com/";
  var ref = new Firebase(baseUrl);

  var rooms = ref.child("rooms");
  userName = Auth.getUsername();

  var gameRoom = rooms.child(userName).set({
      status: "pending",
      owner: userName,
      players: {}
  });

rooms.child(userName).child('players').child(userName).set({
  status: 'ready'
});

var ref2 = new Firebase('https://dijkstras-harmony.firebaseio.com/rooms/' + userName); // assume value here is {foo: "bar"}
var obj = $firebase(ref2).$asObject();

obj.$bindTo($rootScope, "room").then(function() {
   // console.log($rootScope.room); // {foo: "bar"}
});

  $rootScope.$on('login', function() {
    $scope.username = Auth.getUsername();
  });




  $scope.getArtistNames = function(artistName, isStart) {
    $scope.isStart = isStart;
    
    (isStart) ? $scope.selectedStart = false : $scope.selectedEnd = false;
    
    if(artistName.length === 0) return $scope.artistNames = [];

    API.getArtistNames(artistName).then(function(result){
      $scope.artistNames = result.artists.items; 
    });
  };

  $scope.selectArtist = function(artistObject, isStart) {
    $scope.isStart = isStart;1

    if (isStart) {
      Game.setStartArtist(artistObject);
      $scope.start = artistObject.name;
      $scope.selectedStart = true;
    } else {
      Game.setEndArtist(artistObject);
      $scope.end = artistObject.name;
      $scope.selectedEnd = true;
    }
    $scope.artistNames = [];
  };  
  
  $scope.startGame = function() {
    $ionicLoading.show({
      template: 'Starting game..',
      duration: 500
    });
    rooms.child(userName).child('players').child(userName).set({
      status: 'playing',
      currentArtist: '',
      score: 0
    });
    rooms.child(userName).update({
      status: "started"
    });
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