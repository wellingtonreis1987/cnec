angular.module('app').controller('LogoutController', function($scope, $http, $window, $location){
    delete $window.sessionStorage.token;
    $location.path('/login');
});