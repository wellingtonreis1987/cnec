// modulo http
var http = require('http');
// configurações do express
var app = require('./config/express');
// Configurações do banco de dados
require('./config/database')('localhost/dbnews');

// criando servidor e excutando na porta 3000
http.createServer(app).listen(3000,function(){
    console.log('servidor iniciado!');
});