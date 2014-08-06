(function() {

  
angular.module('ds').controller('PlayCtrl', function($scope, $rootScope, Playback, Game) {

  $scope.similarArtists = Game.getSimilarArtists();
  $scope.currentArtist = Game.getCurrentArtist();
  $scope.endArtist = Game.getEndArtist();
  $scope.steps = Game.getSteps();
  
  $scope.playIndex = 0;
  $scope.nextSong = null;

  $rootScope.$on('updateGame', function(){
    console.log('Called updateGame()');
    $scope.similarArtists = Game.getSimilarArtists();
    $scope.currentArtist = Game.getCurrentArtist();
    $scope.endArtist = Game.getEndArtist();
    $scope.steps = Game.getSteps();
    
    $scope.playIndex = 0; 
    $scope.nextSong = null;
  });

  $rootScope.$on('login', function() {
    $scope.username = Auth.getUsername();
  });



  $scope.playSong = function(similarArtist) {
    Playback.startPlayingFromPreview(similarArtist.tracks[$scope.playIndex]);
    
    clearTimeout($scope.nextSong);
    $scope.playIndex = ($scope.playIndex + 1) % similarArtist.tracks.length;
    
    $scope.nextSong = setTimeout(function(){
      $scope.playSong(Playback.startPlayingFromPreview(similarArtist.tracks[$scope.playIndex]))
    },30000);

  }

  $scope.stopSong = function() {
    Playback.stopPlaying();
  }

  $scope.selectSimilarArtist = function(artistObject) {
    Game.selectSimilarArtist(artistObject);
  }

  $scope.setBackground = function(imageUrl) {
    return { 'background-image': 'url(' + imageUrl + ')' }    
  }

})

})();