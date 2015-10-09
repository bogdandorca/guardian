angular.module('app').controller('AccountCtrl', function($scope, $location, $window, AuthService){
    $scope.User = null;

    $scope.initializeSession = AuthService.initUserSession().then(function(user){
        if(user){
            $scope.User = user;
        }
    });

    $scope.userIsLoggedIn = function(){
        return AuthService.isLoggedIn();
    };

    $scope.logout = function(){
        AuthService.logout().then(function(){
            $window.location.href = '/login';
        });
    };
});