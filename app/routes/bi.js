module.exports = function(app){
    var api = app.api.bi;
    app.get('/v1/bi', api.lista);
}