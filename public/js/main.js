angular.module('app', ['directives', 'ngTable', 'ngRoute',
    'usuariosServices', 'ui.bootstrap', 'ui.mask', 'ngCookies', 'chart.js'])
    .config(function($routeProvider, $locationProvider, $httpProvider){

        $httpProvider.interceptors.push('tokenInterceptor');

        $locationProvider.html5Mode(true);

        /* INDEX */
        $routeProvider.when('/index', {
            templateUrl: 'partials/index/index.html',
            controller: 'IndexController'
        });
        /* FIM DE INDEX */

        /* LOGIN */
        $routeProvider.when('/login', {
            templateUrl: 'partials/login/login.html',
            controller: 'LoginController'
        });

        $routeProvider.when('/logout', {
            template: '',
            controller: 'LogoutController'
        });
        /* FIM DE LOGIN */

        /* USUARIOS */
        $routeProvider.when('/usuarios', {

            templateUrl: 'partials/usuarios/listar-usuarios.html',
            controller: 'UsuariosController'
        }).when('/usuarios/new', {

            templateUrl: 'partials/usuarios/usuario.html',
            controller: 'UsuariosController'
        }).when('/usuarios/view/:usuarioId', {

            templateUrl: 'partials/usuarios/visualizar-usuarios.html',
            controller: 'UsuariosController'
        }).when('/usuarios/edit/:usuarioId', {

            templateUrl: 'partials/usuarios/usuario.html',
            controller: 'UsuariosController'
        });
        /* FIM DE USUARIOS */

        /* INDEX */
        $routeProvider.when('/bi', {
            templateUrl: 'partials/bi/index.html',
            controller: 'BiController'
        });
        /* FIM DE INDEX */

        $routeProvider.otherwise({redirectTo: '/index'});
    });
