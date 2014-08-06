(function() {

  var module = angular.module('ds');
  var results = "5";

  module.factory('Game', function(Auth, Echonest, $rootScope, $q, $http, $firebase) {
  var ref = new Firebase("https://dijkstras-harmony.firebaseio.com/players");

    var _startArtist, 
        _endArtist, 
        _similarArtists,
        _steps,
        _currentArtist,
        _players = $firebase(ref).$asArray();

    return {
      startGame: function() {
        _currentArtist = _startArtist;
        _steps = 0;

        Echonest.getSimilarSpotifyArtists(_currentArtist, results).then(function(sa){
          _similarArtists = sa;
          $rootScope.$emit('play');

        }, function(reason) {
          alert('Failed: ' + reason)
        });

      },
      selectSimilarArtist: function(artist) {
        _steps += 1;
        if(artist.name == _endArtist.name) return $rootScope.$emit('won');;
        _currentArtist = artist;

        Echonest.getSimilarSpotifyArtists(_currentArtist, results).then(function(sa){
          _similarArtists = sa;
          $rootScope.$emit('updateGame');

        }, function(reason) {
          alert('Failed: ' + reason)
        });
      },
      setStartArtist: function(a) {
        _startArtist = a;
      },
      setEndArtist: function(a) {
        _endArtist = a;
      },
      getSteps: function() {
        return _steps;
      },
      getStartArtist: function() {
        return _startArtist;
      },
      getEndArtist: function() {
       return _endArtist;
      },
      getCurrentArtist: function() {
       return _currentArtist;
      },
      getSimilarArtists: function(){
        return _similarArtists;
      },
      addPlayer: function(playerName) {
        _players.$add({name: playerName});
      },
      getPlayers: function() {
        return _players;
      },
      getPlayerByUsername: function(userName) {
        console.log(_players);
      }
    }
  });

})();
