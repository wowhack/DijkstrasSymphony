(function() {

  var module = angular.module('ds');

  module.factory('Echonest', function($q, $http, Auth, API) {
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
      getSimilarSpotifyArtists: function(artist, results) {
         var deferred = $q.defer();

         $http({method: 'GET',
            url: baseUrl + "/artist/similar?api_key=" + developerKey +"&id=" + encodeURIComponent(artist.uri) + "&results=" + results + "&format=json&bucket=" + encodeURIComponent('id:spotify')
            }).success(function(r) {
              var previewPromiseArray = [],
                  artistImagePromiseArray = [];

              r.response.artists.forEach(function(artist){
                var parsedId = artist.foreign_ids[0].foreign_id.replace('spotify:artist:','');
                previewPromiseArray.push(API.getArtistTopTracks(parsedId, Auth.getUserCountry()));
                artistImagePromiseArray.push(API.getArtist(parsedId));

              });

              $q.all(previewPromiseArray).then(function(previews){
                $q.all(artistImagePromiseArray).then(function(images){
                  var similarArtists = [];
                  if(previews.length !== images.length) return deferred.reject('Not enough Similar Artists');
                  previews.forEach(function(preview,index){
                    
                    similarArtists[index] = {
                      name: images[index].name,
                      id: images[index].id,
                      uri: images[index].uri,
                      image: (images[index].images[0]) ? images[index].images[0].url : '',
                      tracks: preview.tracks
                    }
                  });

                  deferred.resolve(similarArtists);
                });
              });
              

            }).error(function(error) {
              console.log(error);
              deferred.reject(error);
          });

        return deferred.promise;
      }
    }
  });

})();
  