(function() {

var module = angular.module('ds');

module.controller('HostCtrl', function($scope, Auth) {
  $scope.isLoggedIn = false;

  $scope.login = function() {
    // do login!
    console.log('do login...');

    Auth.openLogin();
    // $scope.$emit('login');
  }
});



})();