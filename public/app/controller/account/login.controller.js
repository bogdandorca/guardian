angular.module('app').controller('LoginCtrl', function($scope, $location, $window, AuthService){
    (function(){
        if(AuthService.isLoggedIn()){
            $location.path('/');
        }
    })();

    $scope.error = null;

    $scope.userCredentials = {
        email: null,
        password: null
    };

    $scope.login = function(){
        AuthService.login($scope.userCredentials).then(function(user){
            if(user){
                $scope.error = null;
                $window.location.href = '/';
            } else {
                $scope.error = 'Please make sure your credentials are correct.';
            }
        });
    };
});