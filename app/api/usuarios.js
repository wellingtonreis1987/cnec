var mongoose = require('mongoose');
var sha1 = require('sha1')

module.exports = function(app){
    var api = {};
    var model = mongoose.model('Usuarios');

    api.lista = function(req, res){
        model.find()
            .then(function(usuarios){
                res.json(usuarios);
            }, function(error){
                console.log(error);
                res.sendStatus(500);
            });
    };

    api.adiciona = function (req, res) {

        var mailer = app.api.mailer;

        req.body.login = req.body.dados.email;
        req.body.senha = sha1('123');

        model
            .create(req.body)
            .then(function (usuarios) {
                mailer.config(usuarios.dados.email, 'Login e Senha', 'Login: ' + usuarios.login + ' Senha: 123');
                res.json(usuarios);
            }, function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    };

    api.pesquisa = function(req, res){
        var nome;
        if(req.body.nome)
            nome = new RegExp(".*" + req.body.nome.replace(/(\W)/g, "\\$1") + ".*", "i");

        var empresa;
        if(req.body.empresa)
            empresa = new RegExp(".*" + req.body.empresa.replace(/(\W)/g, "\\$1") + ".*", "i");

        model.find(
            {
                $or: [
                    {'dados.nome' : nome},
                    {'dados.cpf' : req.body.cpf},
                    {'empresa.nome' : empresa},
                    {'empresa.cnpj' : req.body.cnpj}
                ]
            })
            .then(function(usuarios){
                res.json(usuarios);
            }, function(error){
                console.log(error);
                res.sendStatus(500);
            });
    };

    api.buscaPorId = function (req, res) {

        model
            .findById(req.params.id)
            .populate('grupo')
            .then(function(usuarios) {
                if (!usuarios) throw new Error('Usuário não encontrada');
                res.json(usuarios);
            }, function(error) {
                console.log(error);
                res.sendStatus(500);
            });
    };

    api.buscaPorCnpj = function (req, res) {
        model
            .find({'empresa.cnpj' : req.params.nuCnpj}, { empresa: 1, _id: 0})
            .populate('grupo')
            .then(function(usuarios) {
                if (!usuarios) throw new Error('Usuário não encontrada');
                res.json(usuarios);
            }, function(error) {
                console.log(error);
                res.sendStatus(500);
            });
    };

    api.removePorId = function (req, res) {

        model
            .remove({'_id': req.params.id})
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    };

    api.atualiza = function (req, res) {
        model
            .findByIdAndUpdate(req.params.id, req.body)
            .then(function (usuarios) {
                res.json(usuarios);
            }, function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    };

    return api;
}