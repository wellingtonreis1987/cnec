angular.module('app').filter('sexo', function() {
    return function(input) {
        var out = "";
        if(input){
            if(input == 'M'){
                out = 'Masculino';
            }else{
                out = 'Feminino';
            }
        }
        return out;
    };
});