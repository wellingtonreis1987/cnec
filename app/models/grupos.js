var mongoose = require('mongoose');

var schema = mongoose.Schema({

    nome: {
        type: String
    },
    _grupo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'}]
});

mongoose.model('Grupos', schema);