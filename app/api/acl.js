var api = {};

api.allow = function(req, res){
    var allowed = [
        { _id: 1, url: '/usuarios', titulo: 'Usuários' },
        { _id: 2, url: '/bi', titulo: 'Business Intelligence' }
    ];

    res.json(allowed);
}

module.exports = api;