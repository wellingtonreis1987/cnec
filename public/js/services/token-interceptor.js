angular.module('app').factory('tokenInterceptor', function ($q, $window, $location) {
    var interceptor = {};

    interceptor.request = function (config) {
        // enviar o token na requisição
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
            config.headers['x-access-token'] = $window.sessionStorage.token;
        }
        return config;
    };

    interceptor.response = function (response) {
        var token = response.headers('x-access-token');
        if (token != null) {
            $window.sessionStorage.token = token;
        }
        return response;
    };

    interceptor.responseError = function(rejection) {

        if (rejection != null && rejection.status === 401) {
            delete $window.sessionStorage.token;
            $location.path("/login");
        }
        return $q.reject(rejection);
    };

    return interceptor;
});