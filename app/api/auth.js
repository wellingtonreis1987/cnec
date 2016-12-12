var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken'); // importando o módulo
var sha1 = require('sha1');

module.exports = function(app) {

    var api = {};
    var model = mongoose.model('Usuarios');

    api.autentica = function(req, res) {
        var passwordHash = sha1(req.body.senha);
        model.findOne({
                login: req.body.login,
                senha: passwordHash
            })
            .then(function(usuarios) {
                if (usuarios) {
                    var token = jwt.sign( {login: usuarios.login}, app.get('secret'), {
                        expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
                    });
                    res.set('x-access-token', token); // adicionando token no cabeçalho de resposta
                    res.json(usuarios); // enviando a resposta
                } else {
                    console.log('Login/senha inválidos');
                    res.sendStatus(401);
                }
            });
    };

    api.verificaToken = function(req, res, next) {

        var token = req.headers['x-access-token']; // busca o token no header da requisição

        if (token) {
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if (err) {
                    res.sendStatus(401);
                } else {
                    // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                    req.usuario = decoded;
                    next();
                }
            });
        } else {
            return res.sendStatus(401);
        }

    };

    return api;
};