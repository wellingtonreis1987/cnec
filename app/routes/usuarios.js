module.exports = function(app){
    var api = app.api.usuarios;
    app.route('/v1/usuarios')
        .get(api.lista)
        .post(api.adiciona);

    app.route('/v1/usuarios/:id')
        .get(api.buscaPorId)
        .delete(api.removePorId)
        .put(api.atualiza);

    app.route('/v1/usuarios/cnpj/:nuCnpj')
        .get(api.buscaPorCnpj);

    app.route('/v1/usuarios/pesquisar')
        .post(api.pesquisa);
}
