angular.module('app').filter('cep', function() {
    return function(input) {
        var out = "";
        if(input){
            out = input.replace(/\D/g,"");
            out = out.replace(/^(\d{5})(\d)/,"$1-$2");
        }
        return out;
    };
});
