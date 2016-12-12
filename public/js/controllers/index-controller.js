angular.module('app').controller('IndexController',['$scope', '$http', function($scope, $http){
    $scope.previlegios = [];

    $http.get('/v1/previlegios')
        .success(function(data){
            $scope.previlegios = data;
        })
        .error(function(erro){
            console.log(erro);
        });
}]);
