angular.module('app').filter('telefone', function() {
    return function(input) {
        var out = "";
        if(input){
            out = input.replace(/\D/g,"");
            out = out.replace(/^(\d{2})(\d)/g,"($1) $2");
            out = out.replace(/(\d)(\d{4})$/,"$1-$2");
        }
        return out;
    };
});