angular.module('app').controller('AddUserCtrl', function($scope, UserService, $location){
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 0
    };
    $scope.addUser = function(){
        UserService.addUser($scope.user, function(User){
            if(User){
                $scope.user = null;
                $location.path('/users');
            }
        });
    };
    $scope.toggleRole = function(){
        if($scope.user.role && $scope.user.role === 1){
            $scope.user.role = 0;
        } else {
            $scope.user.role = 1;
        }
    };
});