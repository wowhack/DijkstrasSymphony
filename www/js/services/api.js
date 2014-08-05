(function() {

  var module = angular.module('ds');

  module.factory('API', function(Auth, $q, $http) {


    var baseUrl = 'https://api.spotify.com/v1';

    return {

      getMe: function() {
        var ret = $q.defer();
        $http.get(baseUrl + '/me', {
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        }).success(function(r) {
          console.log('got userinfo', r);
          ret.resolve(r);
        }).error(function(err) {
          console.log('failed to get userinfo', err);
          ret.reject(err);
        });
        return ret.promise;
      },

      getMyUsername: function() {
        var ret = $q.defer();
        $http.get(baseUrl + '/me', {
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        }).success(function(r) {
          console.log('got userinfo', r);
          //ret.resolve(r.id);
          ret.resolve('test_1');
        }).error(function(err) {
          console.log('failed to get userinfo', err);
          //ret.reject(err);
          //
          ret.resolve('test_1');
        });
        return ret.promise;
      },

      getTrack: function(trackid) {
        var ret = $q.defer();
        $http.get(baseUrl + '/tracks/' + encodeURIComponent(trackid), {
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        }).success(function(r) {
          console.log('got track', r);
          ret.resolve(r);
        });
        return ret.promise;
      },

      getArtist: function(artistid) {
        var ret = $q.defer();
        $http.get(baseUrl + '/artists/' + encodeURIComponent(artistid), {
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        }).success(function(r) {
          console.log('got artist', r);
          ret.resolve(r);
        });
        return ret.promise;
      },


      getArtistTopTracks: function(artistid, country) {
        var ret = $q.defer();
        $http.get(baseUrl + '/artists/' + encodeURIComponent(artistid) + '/top-tracks?country=' + encodeURIComponent(country), {
          headers: {
            'Authorization': 'Bearer ' + Auth.getAccessToken()
          }
        }).success(function(r) {
          console.log('got artist top tracks', r);
          ret.resolve(r);
        });
        return ret.promise;
      },

      getSearchResults: function(query) {
        var ret = $q.defer();
        $http.get(baseUrl + '/search?type=track&q=' + encodeURIComponent(query), {
        }).success(function(r) {
          console.log('got search results', r);
          ret.resolve(r);
        });
        return ret.promise;
      },
      getArtistNames: function(artistName) {
        var ret = $q.defer();
        $http.get(baseUrl + '/search?type=artist&limit=5&q=' + encodeURIComponent(artistName), {
        }).success(function(r) {
          console.log('got search results', r);
          ret.resolve(r);
        });
        return ret.promise;
      }
    }
  });

})();
