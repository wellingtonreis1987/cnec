angular.module('app').controller('LoginController', ['$scope', '$http', '$window', '$location', '$cookieStore',
    function($scope, $http, $window, $location, $cookieStore){
    $scope.usuarios = {};
    $scope.mensagem = '';

    $scope.autenticar = function(){
        var usuarios = $scope.usuarios;

        $http.post('/autenticar',
            {
                login : usuarios.login,
                senha : usuarios.senha
            }
        ).then(function(usuarios){
            $cookieStore.put('usuario', usuarios.data);
            $location.path('/index');
        }, function(error){
            console.log(error);
            $scope.mensagem = 'Login ou senha inválidos';
        });
    };
}]);