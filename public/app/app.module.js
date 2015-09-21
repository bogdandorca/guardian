angular.module('app', ['ngRoute']).config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './partials/dashboard',
            controller: 'DashboardCtrl'
        })
        .when('/public/register', {
            templateUrl: './partials/register',
            controller: 'AddUserCtrl'
        })
        .when('/users', {
            templateUrl: './partials/users',
            controller: 'UserCtrl'
        })
        .when('/user/create', {
            templateUrl: './partials/addUser',
            controller: 'AddUserCtrl'
        })
        .when('/user/:id', {
            templateUrl: './partials/profile',
            controller: 'ProfileCtrl'
        })
        .when('/user/edit/:id', {
            templateUrl: './partials/editUser',
            controller: 'EditUserCtrl'
        })
        .when('/login', {
            templateUrl: './public/login'
        })
        .otherwise({
            templateUrl: './partials/404'
        });

    $locationProvider.html5Mode(true);
});