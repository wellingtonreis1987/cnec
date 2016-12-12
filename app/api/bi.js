var api = {};

api.lista = function(req, res){
    var dados = [
        { _id: 1, ano : 2010, reprovados : 65, aprovados : 35 },
        { _id: 2, ano : 2011, reprovados : 78, aprovados : 22 },
        { _id: 3, ano : 2012, reprovados : 80, aprovados : 20 },
        { _id: 4, ano : 2013, reprovados : 81, aprovados : 19 },
        { _id: 5, ano : 2014, reprovados : 86, aprovados : 14 },
        { _id: 6, ano : 2015, reprovados : 77, aprovados : 23 },
        { _id: 7, ano : 2016, reprovados : 90, aprovados : 10 }
    ];

    res.json(dados);
}

module.exports = api;