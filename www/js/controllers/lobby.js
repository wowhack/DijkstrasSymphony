(function() {

  
angular.module('ds').controller('LobbyCtrl', function($scope, $rootScope, debounce, Auth, API, Game, $firebase) {
  $scope.username = Auth.getUsername();

  Game.getStartArtist();
  Game.getEndArtist();
  var time = new Date();
  var codeString = time.getHours() + "" +time.getMinutes();

  $scope.artistNames = []; 
  $scope.isStart = false;

  var ref = new Firebase("https://dijkstras-harmony.firebaseio.com/rooms");
  var sync = $firebase(ref);
  $scope.testArray = sync.$asArray();
  $scope.testArray.$add({ status: "pending",
                          owner: $scope.players,
                          code: codeString  
                        });
  /*$scope.testArray.$loaded().then(function() {
    for (index = 0; index < $scope.testArray.length; ++index) {
      $scope.testArray.$remove($scope.testArray[index]);
    }
    for(var i = 0; i < 10; i++) {
    $scope.testArray.$add({test: {i: Math.pow(i, i)}});
    }
  });*/


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