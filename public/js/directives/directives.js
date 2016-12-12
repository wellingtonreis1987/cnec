angular.module('directives', [])
.directive('topBar', ['$cookieStore', function ($cookieStore) {
    // directive definition object (DDO)
    var ddo = {};
    var usuario = $cookieStore.get('usuario');

    ddo.restrict = "AE";
    ddo.scope = {};
    ddo.templateUrl = 'js/directives/top-bar.html';
    ddo.controller = function($scope) {
        $scope.nome = usuario.dados.nome;
    };

    return ddo;
}])
.directive('menuNavegation', function () {
    // directive definition object (DDO)
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {};
    ddo.templateUrl = 'js/directives/menu-navegation.html';

    return ddo;
})
.directive('footer', function(){
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {};
    ddo.templateUrl = 'js/directives/footer-bar.html';

    return ddo;
})
.directive('buttonAction', function(){
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {
        edit: "@",
        view: "@",
        remove: "&"
    };
    ddo.templateUrl = 'js/directives/button-action.html';

    return ddo;
})
.directive('meuFocus', function() {
    var ddo = {};
    ddo.restrict = "A";
    ddo.link = function(scope, element) {

        scope.$on('fotoCadastrada', function() {
            element[0].focus();
        });
    };

    return ddo;
})
.directive('cpfValido', function () {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function(strCPF) {
                var isValid = true;
                if(strCPF){
                    strCPF = strCPF.replace(/[^\d]+/g,'');
                    var Soma;
                    var Resto;
                    Soma = 0;
                    if (strCPF == "00000000000") {
                        isValid = false;
                    }

                    for (var i=1; i<=9; i++) {
                        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
                    }
                    Resto = (Soma * 10) % 11;

                    if ((Resto == 10) || (Resto == 11)) {
                        Resto = 0;
                    }
                    if (Resto != parseInt(strCPF.substring(9, 10)) ) {
                        isValid = false;
                    }

                    Soma = 0;
                    for (var i = 1; i <= 10; i++) {
                        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
                    }
                    Resto = (Soma * 10) % 11;

                    if ((Resto == 10) || (Resto == 11))  {
                        Resto = 0;
                    }
                    if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
                        isValid = false;
                    }
                }

                ngModel.$setValidity('cpfValido', isValid);
            });
        }
    }
})
.directive('cnpjValido', function () {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function(strCNPJ) {
                var isValid = true;
                if(strCNPJ){
                    strCNPJ = strCNPJ.replace(/[^\d]+/g,'');

                    var tamanho = strCNPJ.length - 2
                    var numeros = strCNPJ.substring(0,tamanho);
                    var digitos = strCNPJ.substring(tamanho);
                    var soma = 0;
                    var pos = tamanho - 7;
                    for (var i = tamanho; i >= 1; i--) {
                        soma += numeros.charAt(tamanho - i) * pos--;
                        if (pos < 2)
                            pos = 9;
                    }
                    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != digitos.charAt(0)){
                        isValid = false;
                    }

                    tamanho = tamanho + 1;
                    numeros = strCNPJ.substring(0,tamanho);
                    soma = 0;
                    pos = tamanho - 7;
                    for (i = tamanho; i >= 1; i--) {
                        soma += numeros.charAt(tamanho - i) * pos--;
                        if (pos < 2)
                            pos = 9;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != digitos.charAt(1)){
                        isValid = false;
                    }
                }

                ngModel.$setValidity('cnpjValido', isValid);
            });
        },
        controller: function($scope, $element, $attrs, recursoUsuarioPorCnpj) {
            $scope.$watch($attrs.ngModel, function(strCNPJ) {
                if(strCNPJ){
                    recursoUsuarioPorCnpj.query({nuCnpj : strCNPJ},
                        function(data) {
                            if(data[0]){
                                $scope.usuarios.empresa = data[0].empresa;
                            }else{
                                $scope.usuarios.empresa = {};
                                $scope.usuarios.empresa.cnpj = strCNPJ;
                            }
                        },
                        function (erro) {
                            console.log(erro);
                            $scope.mensagem = 'Não foi possível obter a usuário'
                        }
                    );
                }
            });
        }
    }
})
.directive('atualizar', ['$route', '$templateCache', function($route, $templateCache) {
    return {
        restrict: 'E',
        scope: {
            atualizar: "&"
        },
        link: function(scope, elem, attrs) {
            scope.atualizando = function () {
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            }
        },
        template: '<a href="#" ng-click="atualizando()" class="btn btn-secondary">Resetar</a>'
    }
}]);
