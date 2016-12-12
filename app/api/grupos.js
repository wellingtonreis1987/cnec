var mongoose = require('mongoose');
module.exports = function (app) {
    var api = {};
    var model = mongoose.model('Grupos');

    api.lista = function(req, res){
        model
            .find()
            .then(function (grupos) {
                res.json(grupos);
            }, function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    }

    return api;
};