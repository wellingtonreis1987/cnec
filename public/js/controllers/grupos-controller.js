angular.module('app').controller('GruposController',['$scope', '$http', function($scope, $http){
    $scope.grupos = [];

    $http.get('/v1/grupos')
    .success(function(data){
        $scope.grupos = data;
    })
    .error(function(erro){
        console.log(erro);
    });
}]);
