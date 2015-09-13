angular.module('app', ['ngRoute']).config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './partials/dashboard',
            controller: 'DashboardCtrl'
        })
        .when('/users', {
            templateUrl: './partials/users',
            controller: 'UserCtrl'
        })
        .when('/login', {
            templateUrl: './public/login'
        })
        .otherwise({
            templateUrl: './partials/404'
        });

    $locationProvider.html5Mode(true);
});
angular.module('app').controller('DashboardCtrl', function($scope){
    $scope.message = 'Working!!!';
});
angular.module('app').controller('UserCtrl', function($scope, UserService){
    $scope.users = null;

    $scope.getUsers = function(){
        UserService.getUsers(function(response){
            if(response){
                $scope.users = response;
            } else {
                toastr.error('Your request could not be processed');
            }
        });
    };

    $scope.getUsers();
});
angular.module('app').filter('RoleFilter', function(){
    return function(role){
        var roleNames = {
            0: 'user',
            1: 'admin',
            2: 'master'
        };

        return roleNames[role] ? roleNames[role] : 'none';
    };
});
angular.module('app').factory('UserService', function($http){
    return {
        getUsers: function(callback){
            $http.get('/api/users')
                .success(function(users){
                    callback(users);
                })
                .error(function(err){
                    callback(null);
                });
        }
    };
});