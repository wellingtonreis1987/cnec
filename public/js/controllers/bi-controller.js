angular.module('app').controller('BiController',['$scope', '$http', function($scope, $http){

    $scope.dados = [];
    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];

    $http.get('/v1/bi')
        .success(function(data){
            $scope.dados = data;

            $scope.labels = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
            $scope.series = ['Reprovados', 'Aprovados'];

            $scope.data = [
                ['65', '78', '80', '81', '86', '77', '90'],
                ['35', '22', '20', '19', '14', '23', '10']
            ];
        })
        .error(function(erro){
            console.log(erro);
        });

    //$scope.pesquisar = function () {
    //    $http.post("/v1/bi/pesquisar",
    //        {
    //            nome : $scope.filtros.nome,
    //            cpf : $scope.filtros.cpf,
    //            empresa : $scope.filtros.empresa,
    //            cnpj : $scope.filtros.cnpj
    //        }).then(function (usuarios) {
    //            if(usuarios.data.length > 0){
    //                $scope.usuarios = usuarios.data;
    //                $scope.tableParams = new NgTableParams({}, { counts: [], dataset: usuarios.data });
    //            }else{
    //                $scope.tableParams = new NgTableParams({}, { counts: [], dataset: [] });
    //                $scope.mensagem = 'Nenhum usuário encontrado!';
    //            }
    //        },
    //        function (error) {
    //            console.log(error);
    //        });
    //}
}]);
