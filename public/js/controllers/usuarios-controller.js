angular.module('app').controller('UsuariosController',
    ['$scope', '$http', '$filter', 'NgTableParams', 'recursoUsuario', '$routeParams', 'cadastroDeUsuarios', 'modalService',
    function($scope, $http, $filter, NgTableParams, recursoUsuario, $routeParams, cadastroDeUsuarios, modalService){

        $scope.usuario = {};
        $scope.usuarios = {};
        $scope.filtros = [];
        $scope.mensagem = '';

        recursoUsuario.query(
            function(data){
                $scope.usuarios = data;
                $scope.tableParams = new NgTableParams({}, { counts: [], dataset: data });
            }, function(error){
                console.log(error);
                $scope.mensagem = 'Não foi possível obter a lista de usuários';
            }
        );

        if ($routeParams.usuarioId) {

            recursoUsuario.get({usuarioId : $routeParams.usuarioId},
                function(data) {
                    data.dados.nascimento = new Date($filter('date')(data.dados.nascimento, 'dd/MM/yyyy'));
                    $scope.usuario = data;
                },
                function (erro) {
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível obter a usuário'
                }
            );
        }

        $scope.pesquisar = function () {
            $http.post("/v1/usuarios/pesquisar",
                {
                    nome : $scope.filtros.nome,
                    cpf : $scope.filtros.cpf,
                    empresa : $scope.filtros.empresa,
                    cnpj : $scope.filtros.cnpj
                }).then(function (usuarios) {
                    if(usuarios.data.length > 0){
                        $scope.usuarios = usuarios.data;
                        $scope.tableParams = new NgTableParams({}, { counts: [], dataset: usuarios.data });
                    }else{
                        $scope.tableParams = new NgTableParams({}, { counts: [], dataset: [] });
                        $scope.mensagem = 'Nenhum usuário encontrado!';
                    }
                },
                function (error) {
                    console.log(error);
                });
        }

        $scope.submeter = function () {
            if ($scope.formulario.$valid) {
                cadastroDeUsuarios.cadastrar($scope.usuario)
                    .then(function(dados) {
                        $scope.mensagem = dados.mensagem;
                        if (dados.inclusao) {
                            $scope.usuario = {};
                            $scope.formulario.$setPristine()
                        };
                    })
                    .catch(function(erro) {
                        $scope.mensagem = erro.mensagem;
                    });
            }
        };

        $scope.remover = function(usuario){

            var modalOptions = {
                closeButtonText: 'Cancela',
                actionButtonText: 'Remover',
                headerText: 'Deseja remover ' + usuario.nome + '?',
                bodyText: 'Tem certeza que deseja remover?'
            };
            modalService.showModal({}, modalOptions)
                .then(function (result) {
                    recursoUsuario.delete({usuarioId : usuario._id},
                        function(){
                            var indiceDoUsuario = $scope.usuarios.indexOf(usuario);
                            $scope.usuarios.splice(indiceDoUsuario, 1);

                            $scope.tableParams = new NgTableParams({}, { counts: [], dataset: $scope.usuarios });
                            $scope.tableParams.reload();

                            $scope.mensagem = 'Usuário ' + usuario.nome + ' removido com sucesso!';
                        },
                        function(erro){
                            console.log(erro);
                            $scope.mensagem = 'Não foi possível apagar a foto ' + usuario.nome;
                        }
                    );
                });
        };

}]);