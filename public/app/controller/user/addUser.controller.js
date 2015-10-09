angular.module('app').controller('AddUserCtrl', function($scope, UserService, $location){
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };
    $scope.addUser = function(){
        UserService.addUser($scope.user).then(function(User){
            if(User){
                $scope.user = null;
                Reporter.notification.success('The user has been successfully added');
                $location.path('/users');
            }
        });
    };
});