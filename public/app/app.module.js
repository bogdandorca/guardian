angular.module('app', ['ngRoute']).config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './partials/dashboard',
            controller: 'DashboardCtrl'
        })
        .when('/login', {
            templateUrl: './public/login'
        })
        .otherwise({
            templateUrl: './partials/404'
        });

    $locationProvider.html5Mode(true);
});