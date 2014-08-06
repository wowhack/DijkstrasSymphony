(function() {

  
angular.module('ds').controller('PlayCtrl', function($scope, $rootScope, Playback, Game, $ionicSlideBoxDelegate) {

  $scope.similarArtists = Game.getSimilarArtists();
  $scope.currentArtist = Game.getCurrentArtist();
  $scope.endArtist = Game.getEndArtist();
  $scope.steps = Game.getSteps();
  
  $scope.playIndex = 0;
  $scope.nextSong = null;

  $rootScope.$on('updateGame', function(){
    $scope.similarArtists = Game.getSimilarArtists();
    $scope.currentArtist = Game.getCurrentArtist();
    $scope.endArtist = Game.getEndArtist();
    $scope.steps = Game.getSteps();
    
    $scope.playIndex = 0; 
    $scope.nextSong = null;

    $scope.slideHasChanged(0);
    $ionicSlideBoxDelegate.update();
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

  $scope.playSongOldSchool = function(uri) {
    Playback.startPlaying(uri);
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

  $scope.slideHasChanged = function(index) {
    var tracks = $scope.similarArtists[index].tracks;
    Playback.startPlayingFromPreview(tracks[$scope.playIndex]);
    
    clearTimeout($scope.nextSong);
    $scope.playIndex = ($scope.playIndex + 1) % tracks.length;
    
    $scope.nextSong = setTimeout(function(){
      Playback.startPlayingFromPreview(tracks[$scope.playIndex]);
    },30000);    
  }

 $scope.slideHasChanged(0);

})

})();