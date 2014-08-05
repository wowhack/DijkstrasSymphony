angular.module('ds', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

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

    .state('play', {
      url: "/play",
      controller: 'PlayCtrl'
    })

  $urlRouterProvider.otherwise('/');

})

.run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

})




.controller('SplashCtrl', function($scope) {

})

.controller('HostCtrl', function($scope) {

})

.controller('JoinCtrl', function($scope) {
  $scope.name = 'Name';

})

.controller('PlayCtrl', function($scope) {

})