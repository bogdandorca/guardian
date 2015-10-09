angular.module('app').controller('RegisterCtrl', function($scope, UserService, AuthService, $location, $window){
    (function(){
        if(AuthService.isLoggedIn()){
            $location.path('/');
        }
    })();

    var that = this;
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 1
    };
    $scope.emailConfirmation = '';
    $scope.passwordConfirmation = '';

    $scope.emailsMatch = function(){
        return $scope.emailConfirmation === $scope.user.email;
    };
    $scope.passwordsMatch = function(){
        return $scope.passwordConfirmation === $scope.user.password;
    };

    $scope.register = function(){
        UserService.addUser($scope.user).then(function(user){
            if(user){
                that.resetUserForm();
                $window.location.href = '/';
            }
        });
    };

    this.resetUserForm = function(){
        $scope.user = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    };
});