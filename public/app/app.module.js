angular.module('app', ['ngRoute', 'ngAnimate']).config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './partials/public/home'
        })
        .when('/dashboard', {
            templateUrl: './partials/private/dashboard',
            controller: 'DashboardCtrl'
        })
        .when('/users', {
            templateUrl: './partials/private/users',
            controller: 'UserCtrl'
        })
        .when('/user/create', {
            templateUrl: './partials/private/addUser',
            controller: 'AddUserCtrl'
        })
        .when('/user/:id', {
            templateUrl: './partials/private/profile',
            controller: 'ProfileCtrl'
        })
        .when('/user/edit/:id', {
            templateUrl: './partials/private/editUser',
            controller: 'EditUserCtrl'
        })
        .when('/register', {
            templateUrl: './partials/public/register',
            controller: 'RegisterCtrl'
        })
        .when('/login', {
            templateUrl: './partials/public/login',
            controller: 'LoginCtrl'
        })
        .otherwise({
            templateUrl: './partials/public/404'
        });

    $locationProvider.html5Mode(true);
});