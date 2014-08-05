(function() {

  var module = angular.module('ds');

  module.factory('Echonest', function($q, $http) {
    var baseUrl = "http://developer.echonest.com/api/v4";
    var developerKey = "ZFNKJYGHULQUXXRZC";

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
      }
    }
  });

})();