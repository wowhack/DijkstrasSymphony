
var module = angular.module('ds', ['ionic']);

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

    checkUser();
  });


module.factory('debounce', function($timeout) {
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(callback, interval);
        };
    }; 
}); 
