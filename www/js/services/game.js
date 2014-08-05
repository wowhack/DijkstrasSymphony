(function() {

  var module = angular.module('ds');

  module.factory('Game', function(Auth, Echonest, $rootScope, $q, $http) {
    var _startArtist, 
        _endArtist, 
        _similarArtists;
    

    return {
      startGame: function() {
        console.log(_startArtist.id);
        console.log(_startArtist.id);
        console.log(_startArtist.id);
        Echonest.getSimilarSpotifyArtists(_startArtist.uri, 20).then(function(result){
          console.log(result);
        });

      },
      setStartArtist: function(a) {
        _startArtist = a;
      },
      setEndArtist: function(a) {
        _endArtist = a;
      },
      getStartArtist: function() {
        return _startArtist;
      },
      getEndArtist: function() {
       return  _endArtist;
      }
    }
  });

})();
