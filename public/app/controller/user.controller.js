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