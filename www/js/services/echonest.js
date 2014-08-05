(function() {

  var module = angular.module('ds');

  module.factory('Echonest', function($q, $http) {
    var baseUrl = "http://developer.echonest.com/api/v4";
    var developerKey = "ZFNKJYGHULQUXXRZC";
    
    delete $http.defaults.headers.common['X-Requested-With'];

    return {
      getSimilarArtists: function(artistName, results) {
      	 var deferred = $q.defer();

      	 $http({method: 'GET',
      	 		url: baseUrl + "/artist/similar?api_key=" + developerKey +"&name=" + artistName + "&results=" + results + "&format=json"
      	 		}).success(function(data) {
      				deferred.resolve(data);
      		    }).error(function(error) {
					deferred.reject(error);
			});

      	return deferred.promise;
      },
      getSimilarSpotifyArtists: function(artistURI, results) {
         var deferred = $q.defer();

         $http({method: 'GET',
            url: baseUrl + "/artist/similar?api_key=" + developerKey +"&id=" + encodeURIComponent(artistURI) + "&results=" + results + "&format=json&bucket=" + encodeURIComponent('id:spotify')
            }).success(function(r) {
              deferred.resolve(r.response.artists);
              }).error(function(error) {
          deferred.reject(error);
      });

        return deferred.promise;
      }
    }
  });

})();
  