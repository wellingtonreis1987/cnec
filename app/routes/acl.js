module.exports = function(app){
    var api = app.api.acl;
    app.get('/v1/previlegios', api.allow);
}