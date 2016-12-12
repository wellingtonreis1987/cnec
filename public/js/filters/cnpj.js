angular.module('app').filter('cnpj', function() {
    return function(input) {
        var out = "";
        if(input){
            out = input.replace(/\D/g,"");
            out = out.replace(/^(\d{2})(\d)/,"$1.$2");
            out = out.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
            out = out.replace(/\.(\d{3})(\d)/,".$1/$2");
            out = out.replace(/(\d{4})(\d)/,"$1-$2");
        }
        return out;
    };
});
