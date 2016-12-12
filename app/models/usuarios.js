var mongoose = require('mongoose');

var schema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    dados: {
        cpf: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String
        },
        endereco: {
            type: String
        },
        uf: {
            type: String
        },
        cep: {
            type: String
        },
        nascimento: {
            type: Date // format Date('2014-01-01')
        },
        sexo: {
            type: String,
            required: true
        },
    },
    empresa: {
        cnpj: {
            type: String
        },
        nome: {
            type: String
        },
        telefone: {
            type: String
        },
        endereco: {
            type: String
        },
        uf: {
            type: String
        },
        cep: {
            type: String
        }
    },
    grupo: {type: mongoose.Schema.Types.ObjectId, ref: 'Grupos'}
});

mongoose.model('Usuarios', schema);