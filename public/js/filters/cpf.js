angular.module('app').filter('cpf', function() {
    return function(input) {
        var out = "";
        if(input){
            out = input.replace(/\D/g,"");
            out = out.replace(/(\d{3})(\d)/,"$1.$2");
            out = out.replace(/(\d{3})(\d)/,"$1.$2");

            out = out.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
        }
        return out;
    };
});