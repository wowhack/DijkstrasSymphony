
var module = angular.module('ds', ['ionic', 'firebase']);

module.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('splash', {
      url: "/",
      templateUrl: "templates/splash.html"
    })

    .state('host', {
      url: "/host",
      templateUrl: "templates/host.html",
      controller: 'HostCtrl'
    })

    .state('join', {
      url: "/join",
      templateUrl: "templates/join.html",
      controller: 'JoinCtrl'
    })

    .state('lobby', {
      templateUrl: "templates/lobby.html",
      controller: 'LobbyCtrl'
    })

    .state('play', {
      templateUrl: "templates/play.html",
      controller: 'PlayCtrl'
    })

    .state('won', {
      templateUrl: "templates/won.html",
      controller: 'wonCtrl'
    })

  $urlRouterProvider.otherwise('/');

});

module.run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

});


module.controller('AppCtrl', function($rootScope, $scope, Auth, API, $state, $location) {

    function checkUser() {
      API.getMe().then(function(userInfo) {
        Auth.setUsername(userInfo.id);
        Auth.setUserCountry(userInfo.country);
        $rootScope.$emit('login');
        $location.replace();
      }, function(err) {
        $scope.showplayer = false;
        $scope.showlogin = true;
        $location.replace();
      });
    }

    window.addEventListener("message", function(event) {
      console.log('got postmessage', event);
      var hash = JSON.parse(event.data);
      if (hash.type == 'access_token') {
        Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
        checkUser();
      }
      }, false);

    $rootScope.isLoggedIn = (Auth.getAccessToken() != '');
    
    $rootScope.$on('login', function() {
      $state.go('lobby');
    });

    $rootScope.$on('logout', function() {
      $state.go('splash');
    });

    $rootScope.$on('play', function() {
      $state.go('play');
    });

    $rootScope.$on('won', function() {
      $state.go('won');
    });

    checkUser();
  });

module.config(['$provide', function ($provide) {
    $provide.decorator('$q', ['$delegate', function ($delegate) {
        var $q = $delegate;

        // Extention for q
        $q.allSettled = $q.allSettled || function (promises) {
            var deferred = $q.defer();
            if (angular.isArray(promises)) {
                var states = [];
                var results = [];
                var didAPromiseFail = false;

                // First create an array for all promises with their state
                angular.forEach(promises, function (promise, key) {
                    states[key] = false;
                });

                // Helper to check if all states are finished
                var checkStates = function (states, results, deferred, failed) {
                    var allFinished = true;
                    angular.forEach(states, function (state, key) {
                        if (!state) {
                            allFinished = false;
                        }
                    });
                    if (allFinished) {
                        if (failed) {
                            deferred.reject(results);
                        } else {
                            deferred.resolve(results);
                        }
                    }
                }

                // Loop through the promises
                // a second loop to be sure that checkStates is called when all states are set to false first
                angular.forEach(promises, function (promise, key) {
                    $q.when(promise).then(function (result) {
                        states[key] = true;
                        results[key] = result;
                        checkStates(states, results, deferred, didAPromiseFail);
                    }, function (reason) {
                        states[key] = true;
                        results[key] = reason;
                        didAPromiseFail = true;
                        checkStates(states, results, deferred, didAPromiseFail);
                    });
                });
            } else {
                throw 'allSettled can only handle an array of promises (for now)';
            }

            return deferred.promise;
        };

        return $q;
    }]);
}]);


module.factory('debounce', function($timeout) {
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(callback, interval);
        };
    }; 
}); 