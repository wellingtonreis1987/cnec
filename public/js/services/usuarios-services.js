angular.module('usuariosServices', ['ngResource'])
    .factory('recursoUsuario', function($resource){
        return $resource('/v1/usuarios/:usuarioId', null, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('cadastroDeUsuarios', function(recursoUsuario, $q, $rootScope){
        var service = {};
        var evento = 'usuarioCadastrado';

        service.cadastrar = function(usuarios) {
            return $q(function(resolve, reject) {
                if(usuarios._id){
                    recursoUsuario.update({usuarioId: usuarios._id}, usuarios, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Usuário ' + usuarios.dados.nome + ' atualizado com sucesso',
                            inclusao: false
                        });
                    }, function(erro) {
                        console.log(erro);
                        reject({
                            mensagem: 'Não foi possível atualizar o usuário ' + usuarios.dados.nome
                        });
                    });
                } else {
                    recursoUsuario.save(usuarios, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Usuário ' + usuarios.dados.nome + ' incluído com sucesso',
                            inclusao: true
                        });
                    }, function(erro) {
                        console.log(erro);
                        reject({
                            mensagem: 'Não foi possível incluir o usuário ' + usuarios.dados.nome
                        });
                    });
                }
            });
        };
        return service;
    })
    .factory('recursoUsuarioPorCnpj', function($resource){
        return $resource('/v1/usuarios/cnpj/:nuCnpj', null, {
            query: {method:'GET', isArray:true}
        });
    });